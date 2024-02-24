// This model represents the users of the blogging platform, with fields for username, email, and password.
const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    // The username field: a string that must be provided (cannot be null) for each user.
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The email field: a unique string that must be provided for each user.
    // The 'unique' constraint ensures no two users can have the same email address.
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    // The password field: a string that must be provided for each user.
    // In practice, this should be a hashed password for security reasons.
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return User;
};
export default userModel;
