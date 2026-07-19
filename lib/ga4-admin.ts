import {
  google,
  analyticsadmin_v1beta,
} from "googleapis";

interface GoogleApiErrorDetails {
  status?: number;
  message: string;
}

/*
|--------------------------------------------------------------------------
| Read Safe Google API Error
|--------------------------------------------------------------------------
|
| Jangan mencetak seluruh response Google karena response dapat berisi
| informasi internal yang tidak perlu masuk ke terminal.
|
*/

function getGoogleApiErrorDetails(
  error: unknown
): GoogleApiErrorDetails {
  if (
    typeof error !== "object" ||
    error === null
  ) {
    return {
      message:
        "Unknown Google Analytics Admin API error",
    };
  }

  const apiError = error as {
    message?: unknown;
    code?: unknown;

    response?: {
      status?: unknown;

      data?: {
        error?: {
          message?: unknown;
        };
      };
    };
  };

  const responseMessage =
    apiError.response?.data?.error
      ?.message;

  const message =
    typeof responseMessage === "string"
      ? responseMessage
      : typeof apiError.message === "string"
        ? apiError.message
        : "Unknown Google Analytics Admin API error";

  const responseStatus =
    apiError.response?.status;

  const errorCode =
    apiError.code;

  const status =
    typeof responseStatus === "number"
      ? responseStatus
      : typeof errorCode === "number"
        ? errorCode
        : undefined;

  return {
    status,
    message,
  };
}

/*
|--------------------------------------------------------------------------
| Get GA4 Account and Property Summaries
|--------------------------------------------------------------------------
|
| accessToken tetap menjadi parameter pertama agar seluruh caller lama
| tetap berjalan.
|
| refreshToken bersifat opsional. Setelah caller mengirimkannya,
| OAuth2Client dapat memperoleh access token baru saat diperlukan.
|
*/

export async function getGA4Properties(
  accessToken?: string | null,
  refreshToken?: string | null
) {
  const normalizedAccessToken =
    accessToken?.trim() ||
    undefined;

  const normalizedRefreshToken =
    refreshToken?.trim() ||
    undefined;

  if (
    !normalizedAccessToken &&
    !normalizedRefreshToken
  ) {
    throw new Error(
      "Google credential tidak ditemukan."
    );
  }

  const clientId =
    process.env.GOOGLE_CLIENT_ID;

  const clientSecret =
    process.env.GOOGLE_CLIENT_SECRET;

  /*
   * Refresh token hanya bisa digunakan oleh OAuth client
   * yang memiliki client ID dan client secret.
   */

  if (
    normalizedRefreshToken &&
    (
      !clientId ||
      !clientSecret
    )
  ) {
    throw new Error(
      "Konfigurasi Google OAuth tidak lengkap."
    );
  }

  const oauth2Client =
    new google.auth.OAuth2(
      clientId,
      clientSecret
    );

  oauth2Client.setCredentials({
    access_token:
      normalizedAccessToken,

    refresh_token:
      normalizedRefreshToken,
  });

  const analyticsAdmin =
    google.analyticsadmin({
      version: "v1beta",
      auth: oauth2Client,
    });

 type AccountSummary =
  analyticsadmin_v1beta
    .Schema$GoogleAnalyticsAdminV1betaAccountSummary;

const accountSummaries:
  AccountSummary[] = [];

  const seenPageTokens =
    new Set<string>();

  let pageToken:
    string | undefined;

  try {
    do {
      const response =
        await analyticsAdmin
          .accountSummaries
          .list({
            pageSize: 200,
            pageToken,
          });

      accountSummaries.push(
        ...(
          response.data
            .accountSummaries ??
          []
        )
      );

      const nextPageToken =
        response.data
          .nextPageToken
          ?.trim() ||
        undefined;

      /*
       * Perlindungan agar API response yang tidak normal
       * tidak menyebabkan loop pagination tanpa akhir.
       */

      if (
        nextPageToken &&
        seenPageTokens.has(
          nextPageToken
        )
      ) {
        throw new Error(
          "Google Analytics mengembalikan page token yang berulang."
        );
      }

      if (nextPageToken) {
        seenPageTokens.add(
          nextPageToken
        );
      }

      pageToken =
        nextPageToken;
    } while (pageToken);

    return accountSummaries;
  } catch (error) {
    const details =
      getGoogleApiErrorDetails(
        error
      );

    console.error(
      "GA4_ACCOUNT_SUMMARIES_FAILED",
      {
        status:
          details.status,

        message:
          details.message,
      }
    );

    if (
      details.status === 401
    ) {
      throw new Error(
        "Credential Google sudah tidak valid. Silakan hubungkan kembali akun Google."
      );
    }

    if (
      details.status === 403
    ) {
      throw new Error(
        "Akun Google tidak memiliki izin untuk mengakses Google Analytics atau Analytics Admin API belum aktif."
      );
    }

    if (
      details.status === 429
    ) {
      throw new Error(
        "Batas permintaan Google Analytics sedang tercapai. Silakan coba kembali."
      );
    }

    throw new Error(
      "Tidak dapat mengambil daftar property Google Analytics."
    );
  }
}