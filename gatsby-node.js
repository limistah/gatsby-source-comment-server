/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.org/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
const axios = require("axios");

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  pluginOptions
) => {
  const { createTypes } = actions;
  const typeDefs = `
    type CommentServer implements Node {
      _id: String
      author: String
      string: String
      website: String
      content: String
      slug: String
      createdAt: Date
      updatedAt: Date
    }
  `;
  createTypes(typeDefs);

  const { createNode } = actions;
  const { limit, website } = pluginOptions;
  const _limit = parseInt(limit || 10000); // FETCH ALL COMMENTS
  const _website = website || "";

  const result = await axios({
    url: `https://gatsbyjs-comment-server.herokuapp.com/comments?limit=${_limit}&website=${_website}`,
  });

  const comments = result.data;

  function convertCommentToNode(comment, { createContentDigest, createNode }) {
    const nodeContent = JSON.stringify(comment);

    const nodeMeta = {
      id: createNodeId(`comments-${comment._id}`),
      parent: null,
      children: [],
      internal: {
        type: `CommentServer`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(comment),
      },
    };

    const node = Object.assign({}, comment, nodeMeta);
    createNode(node);
  }

  for (let i = 0; i < comments.data.length; i++) {
    const comment = comments.data[i];
    convertCommentToNode(comment, { createNode, createContentDigest });
  }
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    MarkdownRemark: {
      comments: {
        type: ["CommentServer"],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                website: { eq: source.fields.slug },
              },
            },
            type: "CommentServer",
            firstOnly: false,
          });
        },
      },
    },
  };
  createResolvers(resolvers);
};
