const path = require("path")

async function buildPosts({ actions, graphql }) {
  const { data } = await graphql(`
    {
      posts: allSanityPost {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `)
  data.posts.nodes.forEach(post => {
    actions.createPage({
      path: "blog/" + post.slug.current,
      component: path.resolve("./src/templates/post.js"),
      context: {
        slug: post.slug.current,
      },
    })
  })
}

exports.createPages = async params => {
  await Promise.all([buildPosts(params)])
}
