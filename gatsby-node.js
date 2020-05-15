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

exports.sourceNodes = async ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type CommentServer implements Node {
      name: String
      author: String
      string: String
      website: String
      slug: String
      createdAt: Date
      updatedAt: Date
    }
  `;
  createTypes(typeDefs);
};
