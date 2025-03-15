'use server'

import {createGoogleGenerativeAI} from "@ai-sdk/google"
import { createStreamableValue } from 'ai/rsc'
import { db } from "@/server/db";
import { generateEmbedding } from "@/lib/gemini";
//STREAMTEXT
import { streamText } from 'ai';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY
})

export async function askQuestion(question: string, projectId: string){

    const stream = createStreamableValue()

    const queryVector = await generateEmbedding(question)

    // console.log("QUERYVECTOR -------> ", queryVector);

    const vectorQuery = `[${queryVector.join(',')}]`

    // console.log("VECTOR QUERY-------> ", vectorQuery)

    //NOTE: Gemini-1.5-flash embeddings might not work with 2.0
    //GET THE SIMILARITY BETWEEN ALL VECTOR EMBEDDINGS AND THE ACTUAL EMBEDDINGS
    //GET THAT SCORE FROM THE SourceCodeEmbedding
    //SET A THRESHOLD OF 0.5 (works the best)
    //ORDER BY SIMILARITY (DESCENDING) 
    //TAKE TOP 10

    const result = await db.$queryRaw`
    SELECT "fileName", "sourceCode", "summary",
    1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
    FROM "SourceCodeEmbedding"
    WHERE 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > 0.2 
    AND "projectId" = ${projectId}
    ORDER BY similarity DESC
    LIMIT 10
    ` as { fileName: string; sourceCode: string; summary: string; similarity: number }[]

    console.log("queryResult---------> ", result)
    let context = ''

    //APPENDING ALL THE RELEVANT INFORMATION IN THE CONTEXT
    for (const doc of result) {
        context += `
        source: ${doc.fileName}\n
        code content: ${doc.sourceCode}\n
        summary: ${doc.summary}\n\n
        `
    }


    (async () => {
        const { textStream } = await streamText({
            model: google('gemini-1.5-flash'),
            prompt: `
            
            You are a code assistant who answers questions about the codebase. Your target audience is a technical team. The assistant is a brand-new, powerful, human-like artificial intelligence. It is an AI endowed with expert knowledge, helpfulness, cleverness, and articulateness.
            The AI is always friendly, kind, and inspiring, and is eager to provide vivid and thoughtful responses to the user. It holds all knowledge in its “brain,” and can accurately answer nearly any question.
            If the user is not asking about code or a specific file, the AI will provide a detailed answer, offering only a short code snippet if needed.
            Answer the question using all of the file summaries provided below. Do not base your answer solely on the first file. If relevant, synthesize information from multiple files.

            Based solely on the context below, provide a concise and direct answer. Do not include greetings or generic statements
            START OF CONTEXT BLOCK
            ${context}
            END OF CONTEXT BLOCK

            START QUESTION
            ${question}

            The AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
            If the user does not provide the answer to the question, the AI assistant will respond with:
            “I'm sorry, but I cannot answer that.”
            The AI assistant will not provide any previous responses; instead, it will mark new information from the conversation with inline annotations, indicating that it is not drawn directly from the context.
            The AI assistant will answer in Markdown and may include code snippets if needed. Be as detailed as possible when answering.
            `
        });

        for await(const chunk of textStream){
            stream.update(chunk)
        }

        stream.done()
    })()

    // (async () => {
    //     const fullPrompt = `
    //         You are a code assistant who answers questions about the codebase. Your target audience is a technical team. The assistant is a brand-new, powerful, human-like artificial intelligence. It is an AI endowed with expert knowledge, helpfulness, cleverness, and articulateness.
    //         The AI is always friendly, kind, and inspiring, and is eager to provide vivid and thoughtful responses to the user. It holds all knowledge in its “brain,” and can accurately answer nearly any question.
    //         If the user is not asking about code or a specific file, the AI will provide a detailed answer, offering only a short code snippet if needed.
    
    //         START OF CONTEXT BLOCK
    //         ${context}
    //         END OF CONTEXT BLOCK
    
    //         START QUESTION
    //         ${question}
    
    //         The AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
    //         If the user does not provide the answer to the question, the AI assistant will respond with:
    //         “I'm sorry, but I cannot answer that.”
    //         The AI assistant will not provide any previous responses; instead, it will mark new information from the conversation with inline annotations, indicating that it is not drawn directly from the context.
    //         The AI assistant will answer in Markdown and may include code snippets if needed. Be as detailed as possible when answering.
    //     `;
    
    //     // console.log("Full Prompt:", fullPrompt);
    
    //     const { textStream } = await streamText({
    //         model: google('gemini-1.5-flash'),
    //         prompt: fullPrompt,
    //     });
    
    //     for await(const chunk of textStream){
    //         stream.update(chunk)
    //     }
    //     stream.done()
    // })();

    return {
        output: stream.value, //NOT output: stream 
        filesReferences: result
    }
}