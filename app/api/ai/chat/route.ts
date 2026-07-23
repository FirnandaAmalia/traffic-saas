import { NextRequest } from "next/server";

import {
  generateAIResponse,
} from "@/lib/ai/chat-engine";


import {
  loadProjectAIContext,
} from "@/lib/ai/context-loader";


import {
  createConversation,
  saveAIMessage,
  getLatestConversation,
} from "@/lib/ai/memory";


import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";



export async function POST(
  request: NextRequest
) {


  try {


    const body =
      await request.json();



    const {
      question,
      projectId,
    } = body;



    if(!question){

      return Response.json(

        {
          success:false,

          error:
          "question required"
        },

        {
          status:400
        }

      );

    }





    /*
    |--------------------------------------------------------------------------
    | AUTH SESSION
    |--------------------------------------------------------------------------
    */


    const session =
      await getServerSession(
        authOptions
      );



    if(
      !session?.user?.id ||
      !session.refreshToken
    ){

      return Response.json(

        {
          success:false,

          error:
          "Google session expired"
        },

        {
          status:401
        }

      );

    }





    const userId =
      session.user.id;



    const refreshToken =
      session.refreshToken;







    /*
    |--------------------------------------------------------------------------
    | LOAD AI CONTEXT
    |--------------------------------------------------------------------------
    */


    const {
      context
    } =
    await loadProjectAIContext({

      userId,

      projectId,

      refreshToken,

    });








    /*
    |--------------------------------------------------------------------------
    | CREATE CONVERSATION
    |--------------------------------------------------------------------------
    */


   const existingConversation =
await getLatestConversation({

  userId,

  projectId,

});



const conversation =
existingConversation ??
await createConversation({

  userId,

  projectId,

  title:
  question.slice(0,50),

});


    /*
    |--------------------------------------------------------------------------
    | SAVE USER MESSAGE
    |--------------------------------------------------------------------------
    */


    await saveAIMessage({

      conversationId:
        conversation.id,


      role:
        "user",


      content:
        question,

    });








    /*
    |--------------------------------------------------------------------------
    | GENERATE AI RESPONSE
    |--------------------------------------------------------------------------
    */


    const result =
      await generateAIResponse({

        context,

        question,

      });









    /*
    |--------------------------------------------------------------------------
    | SAVE ASSISTANT MESSAGE
    |--------------------------------------------------------------------------
    */


    await saveAIMessage({

      conversationId:
        conversation.id,


      role:
        "assistant",


      content:
        result.answer,


      confidence:
        result.confidence,

    });









    return Response.json({

      success:true,


      conversationId:
        conversation.id,


      ...result,


    });




  }

  catch(error:any){


    console.error(
      "AI CHAT ERROR",
      error
    );



    return Response.json(

      {

        success:false,


        error:
          error?.message ??
          "AI error"


      },

      {

        status:500

      }

    );


  }


}