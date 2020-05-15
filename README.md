<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Source Comment Server
</h1>

A minimal plugin that pulls data from https://gatsbyjs-comment-server.herokuapp.com/. A nodeJS server that serves comment

## Installation

```js
npm install gatsby-source-comment-server
// or
yarn add gatsby-source-comment-server
```

Add into your `gatsby-config.js`:

```js
//...
module.exports{
  plugins: [
    {
      resolve: "gatsby-source-comment-server",
      options: {
        website: "Unique URL of this users blog/website"
      }
    }
  ]
}

```

## What it does

It pulls comments from the server using the website as a distinguishing factor. And adds a new field `comments` to MarkdownRemak type containing comments that is added with the page slug

## Posting of new comment

To post a new comment, a POST /comments can be made using a form with the following field in the body of the request.

- website: String
- slug: String
- name: String
- content: Content

## Consuming comments

To consume a comment update any MarkdownRemark query to look like

```
query {
  markdownRemark {
    comments: {
      _id
      name
      content
      website
      slug
    }
  }
}
```

And use the graphql helper to fetch the comments. These comments is an array and could be traversed and render using React.

```jsx
<ul>
  {comments &&
    comments.map((comment) => {
      return (
        <li>
          <div>{comment.author}</div>
          <div>{comment.content}</div>
        </li>
      );
    })}
</ul>
```
