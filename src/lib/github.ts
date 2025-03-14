//This file will take care of Github things via Octokit

import { AiSummariseCommit } from "./gemini";
import { Octokit } from "octokit";
import axios from "axios";
import { db } from "@/server/db";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const githubUrl = "https://github.com/docker/genai-stack";

type Response = {
  commitHash: string;
  commitMessage: string;
  commitAuthorName: string;
  commitAuthorAvatar: string;
  commitDate: string;
};

export const getCommitHashes = async (
  githubUrl: string,
): Promise<Response[]> => {
  // const [owner, repo] = githubUrl.split('/').slice(-2);
  // const response = await octokit.request(`GET /repos/${owner}/${repo}/commits`);
  // return response.data.map((commit) => ({
  //     commitHash: commit.sha,
  //     commitMessage: commit.commit.message,
  // }))

  const [owner, repo] = githubUrl.split('/').slice(-2);

  if(!owner || !repo){
    throw new Error("Invalid Github URL")
  }

  const { data } = await octokit.rest.repos.listCommits({
    owner,
    repo
  });
  const sortedCommits = data.sort(
    (a: any, b: any) =>
      new Date(b.commit.author.date).getTime() -
      new Date(a.commit.author.date).getTime(),
  );

  return sortedCommits.slice(0, 15).map((commit: any) => ({
    commitHash: commit.sha as string,
    commitMessage: commit.commit.message ?? "",
    commitAuthorName: commit.commit?.author?.name ?? "",
    commitAuthorAvatar: commit?.author?.avatar_url ?? "",
    commitDate: commit.commit?.author.date ?? "",
  }))

  
};

export const pollCommits = async(projectId: string )=> {
    const {project, githubUrl} = await fetchProjectGithubUrl(projectId)

    const commitHashes = await getCommitHashes(githubUrl);

    const unprocessedCommits = await filterUnprocessedCommits(projectId, commitHashes);
    // console.log(unprocessedCommits);

    const summaryResponses = await Promise.allSettled(unprocessedCommits.map(commit => {
      return summariseCommits(githubUrl, commit.commitHash)
    }))

    const summaries = summaryResponses.map((response) => {
      if(response.status === 'fulfilled'){
        return response.value as string
      }
      return ""
    })

    const commits = await db.commit.createMany({
      data: summaries.map((summary, index) => {
        console.log(`Processing commit ${index}`)
        return {
          projectId: projectId,
          commitHash: unprocessedCommits[index]!.commitHash,
          commitMessage: unprocessedCommits[index]!.commitMessage ?? "",
          commitAuthorName: unprocessedCommits[index]!.commitAuthorName,
          commitAuthorAvatar: unprocessedCommits[index]!.commitAuthorAvatar,
          commitDate: unprocessedCommits[index]!.commitDate,
          summary

        }
      })
    })
    return commits

    
}


//TODO: Find a way to push the diffs into GeminiAPI.
async function summariseCommits(githubUrl: string, commitHash: string){

    //get the diff
    //then pass the diff into AI

    const { data } = await axios.get(`${githubUrl}/commit/${commitHash}.diff`, {
        headers:{
            Accept: 'application/vnd.github.v3.diff'
        }
    })

    return await AiSummariseCommit(data) || "";
    

}

async function fetchProjectGithubUrl(projectId: string){
    const project = await db.project.findUnique({
        where: {id: projectId},
        select: {
            githubUrl: true, 
        }
    })

    if(!project?.githubUrl){
        throw new Error("Project has no Github URL")
    }

    return {project, githubUrl: project?.githubUrl}
}

async function filterUnprocessedCommits(projectId: string, commitHashes: Response[]){

    const processedCommits = await db.commit.findMany({
        where: { projectId }
    })

    const unprocessedCommits = commitHashes.filter((commit) => !processedCommits.some((processedCommit) => processedCommit.commitHash === commit.commitHash))
    return unprocessedCommits;
}

// await pollCommits('cm87b26jy0000djvidoa4mmkq').then(console.log) 