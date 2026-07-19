import {
  revalidatePath,
} from "next/cache";

import {
  getServerSession,
} from "next-auth";

import {
  authOptions,
} from "@/lib/auth";

import {
  prisma,
} from "@/lib/prisma";

import {
  getGA4Properties,
} from "@/lib/ga4-admin";

interface ConnectGA4Body {
  projectId?: unknown;
  ga4PropertyId?: unknown;
  ga4PropertyName?: unknown;
}

function normalizePropertyId(
  value: string
): string {
  return value
    .trim()
    .replace(
      /^properties\//,
      ""
    );
}

export async function POST(
  request: Request
) {
  try {
    /*
    |--------------------------------------------------------------------------
    | Authentication
    |--------------------------------------------------------------------------
    */

    const session =
      await getServerSession(
        authOptions
      );

    if (!session?.user?.id) {
      return Response.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const accessToken =
  typeof session.accessToken === "string"
    ? session.accessToken
    : undefined;

const refreshToken =
  typeof session.refreshToken === "string"
    ? session.refreshToken
    : undefined;

if (
  !accessToken &&
  !refreshToken
) {
      return Response.json(
        {
          success: false,
          error:
            "Google perlu dihubungkan kembali.",
          code:
            "GOOGLE_REAUTH_REQUIRED",
        },
        {
          status: 403,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Parse Request Body
    |--------------------------------------------------------------------------
    */

    let body: ConnectGA4Body;

    try {
      body =
        await request.json() as
          ConnectGA4Body;
    } catch {
      return Response.json(
        {
          success: false,
          error:
            "Request body harus berupa JSON yang valid.",
        },
        {
          status: 400,
        }
      );
    }

    const projectId =
      typeof body.projectId ===
        "string"
        ? body.projectId.trim()
        : "";

    const rawPropertyId =
      typeof body.ga4PropertyId ===
        "string"
        ? body.ga4PropertyId
        : "";

    const ga4PropertyId =
      normalizePropertyId(
        rawPropertyId
      );

    if (
      !projectId ||
      !ga4PropertyId
    ) {
      return Response.json(
        {
          success: false,
          error:
            "projectId dan ga4PropertyId wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      projectId.length > 128 ||
      ga4PropertyId.length > 32 ||
      !/^\d+$/.test(
        ga4PropertyId
      )
    ) {
      return Response.json(
        {
          success: false,
          error:
            "Data request tidak valid.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Verify Project Ownership
    |--------------------------------------------------------------------------
    */

    const ownedProject =
      await prisma.project.findFirst({
        where: {
          id: projectId,
          userId:
            session.user.id,
        },

        select: {
          id: true,
        },
      });

    if (!ownedProject) {
      return Response.json(
        {
          success: false,
          error:
            "Project tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Verify GA4 Property
    |--------------------------------------------------------------------------
    |
    | Property ID dan nama dari browser tidak dipercaya.
    | Daftar property diambil ulang langsung dari Google.
    |
    */

    let accounts:
      Awaited<
        ReturnType<
          typeof getGA4Properties
        >
      >;

    try {
      accounts =
  await getGA4Properties(
    accessToken,
    refreshToken
  );
    } catch (error) {
      console.error(
        "GA4_PROPERTY_VERIFICATION_FAILED",
        {
          userId:
            session.user.id,

          error:
            error instanceof Error
              ? error.message
              : "Unknown error",
        }
      );

      return Response.json(
        {
          success: false,
          error:
            "Gagal memverifikasi property Google Analytics.",
          code:
            "GA4_VERIFICATION_FAILED",
        },
        {
          status: 502,
        }
      );
    }

    const propertyResourceName =
      `properties/${ga4PropertyId}`;

    const selectedProperty =
      accounts
        .flatMap(
          (account) =>
            account
              .propertySummaries ??
            []
        )
        .find(
          (property) =>
            property.property ===
            propertyResourceName
        );

    if (!selectedProperty) {
      return Response.json(
        {
          success: false,
          error:
            "Property GA4 tidak tersedia pada akun Google ini.",
        },
        {
          status: 403,
        }
      );
    }

    const ga4PropertyName =
      selectedProperty.displayName
        ?.trim() ||
      propertyResourceName;

    /*
    |--------------------------------------------------------------------------
    | Update Authorized Project
    |--------------------------------------------------------------------------
    */

    const updateResult =
      await prisma.project.updateMany({
        where: {
          id: projectId,
          userId:
            session.user.id,
        },

        data: {
          ga4PropertyId,
          ga4PropertyName,
        },
      });

    if (
      updateResult.count === 0
    ) {
      return Response.json(
        {
          success: false,
          error:
            "Project tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Read Updated Project
    |--------------------------------------------------------------------------
    */

    const project =
      await prisma.project.findFirst({
        where: {
          id: projectId,
          userId:
            session.user.id,
        },

        select: {
          id: true,
          projectName: true,
          gscSiteUrl: true,
          ga4PropertyId: true,
          ga4PropertyName: true,
        },
      });

    if (!project) {
      return Response.json(
        {
          success: false,
          error:
            "Project tidak ditemukan setelah diperbarui.",
        },
        {
          status: 404,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Revalidate Routes
    |--------------------------------------------------------------------------
    */

    revalidatePath(
      "/projects"
    );

    revalidatePath(
      "/dashboard"
    );

    revalidatePath(
      "/setup/ga4"
    );

    return Response.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(
      "CONNECT_GA4_FAILED",
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      }
    );

    return Response.json(
      {
        success: false,
        error:
          "Gagal menghubungkan Google Analytics.",
      },
      {
        status: 500,
      }
    );
  }
}