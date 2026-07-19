import { prisma } from "./prisma";

interface ResolveProjectForUserParams {
  userId: string;
  projectId?: string | null;
}


/*
|--------------------------------------------------------------------------
| Get Specific Project For User
|--------------------------------------------------------------------------
|
| Digunakan ketika user meminta project tertentu.
|
| Security:
| Project hanya dikembalikan jika:
| - id project cocok
| - userId pemilik cocok
|
*/

export async function getProjectForUser(
  projectId: string,
  userId: string
) {
  const normalizedProjectId =
    projectId.trim();

  const normalizedUserId =
    userId.trim();


  if (
    !normalizedProjectId ||
    !normalizedUserId
  ) {
    return null;
  }


  return prisma.project.findFirst({

    where: {

      id:
        normalizedProjectId,

      userId:
        normalizedUserId,

    },

  });

}



/*
|--------------------------------------------------------------------------
| Alias Untuk Server API
|--------------------------------------------------------------------------
|
| Digunakan oleh endpoint seperti:
| /api/export/pdf
| /api/export/excel
|
| Jangan mengambil project tanpa user check.
|
*/

export async function getProjectByIdForUser(
  projectId: string,
  userId: string
) {

  return getProjectForUser(
    projectId,
    userId
  );

}



/*
|--------------------------------------------------------------------------
| Get Latest Project
|--------------------------------------------------------------------------
|
| Dipakai ketika user membuka:
|
| /dashboard
|
| tanpa projectId.
|
*/

export async function getLatestProjectForUser(
  userId: string
) {


  const normalizedUserId =
    userId.trim();



  if (!normalizedUserId) {

    return null;

  }



  return prisma.project.findFirst({

    where: {

      userId:
        normalizedUserId,

    },


    orderBy: [

      {
        createdAt:
          "desc",
      },

      {
        id:
          "desc",
      },

    ],

  });


}





/*
|--------------------------------------------------------------------------
| Resolve Canonical Project
|--------------------------------------------------------------------------
|
| Source of truth project dashboard.
|
| Flow:
|
| Ada projectId
|       |
|       v
| cek ownership
|
|
| Tidak ada projectId
|       |
|       v
| ambil project terakhir
|
*/

export async function resolveProjectForUser({

  userId,

  projectId,

}: ResolveProjectForUserParams) {


  const normalizedProjectId =
    projectId?.trim();



  if(normalizedProjectId){


    return getProjectForUser(

      normalizedProjectId,

      userId

    );


  }



  return getLatestProjectForUser(

    userId

  );


}