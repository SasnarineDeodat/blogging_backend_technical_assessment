const postModel = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Assuming you want to keep track of the published status
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Post;
};

export default postModel;
