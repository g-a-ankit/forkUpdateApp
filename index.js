/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

// only for testing purpose
const { PrismaClient } = require("@prisma/client");
// const VISIBILITY = require("./prisma/schema.prisma/");
const prisma = new PrismaClient();

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
  // only for testing purpose

  // app.onAny(async (context) => {
  //   const a = await context.octokit.graphql(q);
  //   console.log(a.viewer.repositories.edges);
  // });

  // once the app is installed get username and associated repositories
  app.on("installation.created", async (context) => {
    handleInstall(context);
  });

  //once the app is uninstalled get username and associated repositories
  app.on("installation.deleted", async (context) => {
    handleUnintall(context);
  });

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    console.log("inserting into db ");
    const db = await prisma.user.create;
    ({
      data: {
        name: "ankit",
        email: "ankit@localhost",
        repoCount: 10,
        forkCount: 1,
        // repos: {
        //   name: "testing",
        //   created_at: "then",
        //   updated_at: "now",
        //   // visibility: VISIBILITY.PUBLIC,
        // },
        // forkedrepos: {
        //   name: "testing 2",
        //   parent: "me",
        //   created_at: "then",
        //   updated_at: "now",
        // },
      },
    });
    console.log("data into db ", db);
    console.log("data ", await prisma.user.findMany());
    return context.octokit.issues.createComment(issueComment);
  });
};

// function to handle when installation event occurs
const handleInstall = (context) => {
  console.log("new user installed the app");
  const user = context.payload.installation.account.login;
  const repos = context.payload.repositories;
  console.log(user);
  repos.forEach((repo) => {
    console.log(repo.name);
  });
};

// function to handle when uninstall event occurs
const handleUnintall = (context) => {
  console.log("user delted the app");
  const user = context.payload.installation.account.login;
  const repos = context.payload.repositories;
  console.log(user);
  repos.forEach((repo) => {
    console.log(repo.name);
  });
};
