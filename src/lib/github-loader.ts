//This file is primary going to be function
//that allows to fetch the list of files via 
//a github link

import { generateEmbedding, summariseCode } from "./gemini"

import { Document } from "@langchain/core/documents"
//this is a class that allows you to look into the files of github repo
import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github"
import { db } from "@/server/db"

export const loadGithubRepo = async(githubUrl: string, githubToken?: string) =>{

    const loader = new GithubRepoLoader(githubUrl, {
        accessToken: githubToken || '',
        branch: 'main', //or any branch of that repository
        ignoreFiles: ['package-lock.json','yarn.lock','pnpm-lock.yaml','bun.lock'], //this array contains the files that I can ignore
        recursive: true, //recursively traverse through all files and dirs
        unknown: 'warn', //warn for unknown file types
        maxConcurrency: 5

    })

    const docs = await loader.load()
    return docs

}


// console.log(await loadGithubRepo('https://github.com/utkarsh125/shellmancer'))

//TODO: Take reference from what it returned. The only thing I am concerned about is source and id
// Document {
//     pageContent: "import chalk ...",
//     metadata: {
//       source: "src/commands/generateScript.js",
//       repository: "https://github.com/utkarsh125/shellmancer",
//       branch: "main",
//     },
//     id: undefined,


export const indexGithubRepo = async (projectId: string, githubUrl: string, githubToken?: string) => {
    const docs = await loadGithubRepo(githubUrl, githubToken)

    const allEmbeddings = await generateEmbeddings(docs)

    await Promise.allSettled(allEmbeddings.map(async (embedding, index) => {
        console.log(`Processing ${index} of ${allEmbeddings.length}`)
        if(!embedding) return;

        const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
            data: {
                summary: embedding.summary,
                sourceCode: embedding.sourceCode,
                fileName: embedding.fileName,
                projectId
            }
        })

        await db.$executeRaw`
        UPDATE "SourceCodeEmbedding"
        SET "summaryEmbedding" = ${embedding.embedding}::vector
        WHERE "id" = ${sourceCodeEmbedding.id}
        `
    }))
}

const generateEmbeddings = async(docs: Document[]) => {
    return await Promise.all(docs.map(async doc => {
        const summary = await summariseCode(doc)
        console.log("Logging Summary: ",summary);

        console.log("DocPageContent: ", doc.pageContent);
        const embedding = await generateEmbedding(summary);

        return {
            summary,
            embedding,
            sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
            fileName: doc.metadata.source
        }
    }))
}