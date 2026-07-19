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
  getSearchConsoleSites,
} from "@/lib/google/gsc";

interface ConnectGSCBody {
  projectId?: unknown;
  gscSiteUrl?: unknown;
}

const ALLOWED_PERMISSIONS =
  new Set([
    "siteOwner",
    "siteFullUser",
  ]);

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

    const refreshToken =
      typeof session.refreshToken ===
        "string"
        ? session.refreshToken
        : "";

    if (!refreshToken) {
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

    let body: ConnectGSCBody;

    try {
      body =
        await request.json() as
          ConnectGSCBody;
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

    const gscSiteUrl =
      typeof body.gscSiteUrl ===
        "string"
        ? body.gscSiteUrl.trim()
        : "";

    if (
      !projectId ||
      !gscSiteUrl
    ) {
      return Response.json(
        {
          success: false,
          error:
            "projectId dan gscSiteUrl wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      projectId.length > 128 ||
      gscSiteUrl.length > 2048
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
    | Verify Search Console Property
    |--------------------------------------------------------------------------
    |
    | Jangan percaya property yang dikirim browser.
    | Ambil ulang daftar property langsung dari Google.
    |
    */

    let availableSites:
      Awaited<
        ReturnType<
          typeof getSearchConsoleSites
        >
      >;

    try {
      availableSites =
        await getSearchConsoleSites(
          refreshToken
        );
    } catch (error) {
      console.error(
        "GSC_PROPERTY_VERIFICATION_FAILED",
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
            "Gagal memverifikasi property Google Search Console.",
          code:
            "GSC_VERIFICATION_FAILED",
        },
        {
          status: 502,
        }
      );
    }

    const selectedSite =
      availableSites.find(
        (site) =>
          site.siteUrl ===
          gscSiteUrl
      );

    if (!selectedSite) {
      return Response.json(
        {
          success: false,
          error:
            "Property Search Console tidak tersedia pada akun Google ini.",
        },
        {
          status: 403,
        }
      );
    }

    const permissionLevel =
      selectedSite.permissionLevel;

    if (
      !permissionLevel ||
      !ALLOWED_PERMISSIONS.has(
        permissionLevel
      )
    ) {
      return Response.json(
        {
          success: false,
          error:
            "Akun Google tidak memiliki izin Owner atau Full User pada property ini.",
        },
        {
          status: 403,
        }
      );
    }

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
          gscSiteUrl:
            selectedSite.siteUrl,
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
          gscSiteUrl: true,
          ga4PropertyId: true,
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
      "/setup/gsc"
    );

    return Response.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(
      "CONNECT_GSC_FAILED",
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
          "Gagal menghubungkan Google Search Console.",
      },
      {
        status: 500,
      }
    );
  }
}