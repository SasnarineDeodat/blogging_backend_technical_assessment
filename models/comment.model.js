const commentModel = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Comment;
};

export default commentModel;
