// This model represents comments made by users on blog posts, capturing the comment content and its association with a specific post.
const commentModel = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    // The content field: a text field that stores the body of the comment.
    content: {
      type: DataTypes.TEXT,
      allowNull: false, // Cannot be null
    },
    // The postId field: an integer that references the ID of the post to which this comment belongs.
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Cannot be null
    },
  });

  return Comment;
};

export default commentModel;
