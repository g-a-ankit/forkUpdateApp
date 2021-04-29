/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

const { graphql } = require("@octokit/graphql");
const { Octokit } = require("@octokit/core");
const q = `query {
  viewer{
    email
    name
   repositories(first:10,isFork:true)
    {
       pageInfo{
         startCursor
         endCursor
         hasNextPage
         hasPreviousPage
       
       }
       totalDiskUsage
       totalCount
       nodes{
        
         name
       }
      edges{
        
        cursor
        node{
          name
        }
      }
    }
  }
  }`;
module.exports = async (app) => {
  app.log.info("Yay, the app was loaded!");
  // const octokit = new Octokit({ auth: `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` });

  // const response = await octokit.request("GET /orgs/NodeGitApps/repos", {
  //   org: "NodeGitApps",
  //   type: "public",
  // });
  const octokit = new Octokit({
    auth: `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`,
  });
  // app.onAny(async (context) => {
  //   const a = await context.octokit.graphql(q);
  //   console.log(a.viewer.repositories.edges);
  // });

  app.on("installation.created", async (context) => {
    console.log("new user installed the app");
  });

  app.on("installation.deleted", async (context) => {
    console.log("user delted the app");
  });
  const response = await octokit.graphql(q);
  //console.log(response.viewer.repositories.nodes)
  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    const a = await context.octokit.graphql(q);
    console.log(a.viewer.repositories.edges);
    return context.octokit.issues.createComment(issueComment);
  });
};
