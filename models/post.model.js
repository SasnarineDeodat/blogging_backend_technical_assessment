// This model represents blog posts created by users, including their title, content, and publication status.
const postModel = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    // The title field: A string that tells what the blog post is about.
    title: {
      type: DataTypes.STRING,
      allowNull: false, // Cannot be null
    },
    // The title field: It contains the main body of the blog post.
    content: {
      type: DataTypes.TEXT,
      allowNull: false, // Cannot be null
    },
    // Assuming you want to keep track of the published status
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Published status will be false by default
    },
  });

  return Post;
};

export default postModel;
