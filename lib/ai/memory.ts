import { prisma } from "@/lib/prisma";



export async function createConversation({

  userId,

  projectId,

  title,

}: {

  userId: string;

  projectId?: string;

  title?: string;

}) {


  return prisma.aIConversation.create({

    data: {

      userId,

      projectId,

      title:
        title ?? "AI Consultant Session",

    },

  });

}





export async function saveAIMessage({

  conversationId,

  role,

  content,

  intent,

  confidence,

}: {

  conversationId: string;

  role: "user" | "assistant";

  content: string;

  intent?: string;

  confidence?: number;

}) {


  return prisma.aIMessage.create({

    data: {

      conversationId,

      role,

      content,

      intent,

      confidence,

    },

  });

}





export async function getConversationHistory({

  conversationId,

  limit = 10,

}: {

  conversationId: string;

  limit?: number;

}) {


  return prisma.aIMessage.findMany({

    where: {

      conversationId,

    },


    orderBy: {

      createdAt: "desc",

    },


    take: limit,


    select: {

      role: true,

      content: true,

    },

  });

}





export async function getLatestConversation({

  userId,

  projectId,

}: {

  userId: string;

  projectId?: string;

}) {


  return prisma.aIConversation.findFirst({

    where: {

      userId,

      projectId,

    },


    orderBy: {

      createdAt: "desc",

    },

  });

}