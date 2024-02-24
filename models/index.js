import Sequelize from "sequelize";
import userModel from "./user.model.js";
import postModel from "./post.model.js";
import commentModel from "./comment.model.js";

// Initialize Sequelize connection to PostgreSQL database
const sequelize = new Sequelize(
  process.env.POSTGRESQL_DB, // Database name
  process.env.POSTGRESQL_USER, // Database user
  process.env.POSTGRESQL_PASSWORD, // Database password
  {
    host: process.env.POSTGRESQL_HOST, // Database host
    port: process.env.POSTGRESQL_PORT, // Database port
    dialect: process.env.POSTGRESQL_DIALECT, // Database dialect
    logging: false, // Disable SQL logging for cleaner console output

    // Connection pool settings for managing database connections
    pool: {
      max: 5, // Maximum number of connections in pool
      min: 0, // Minimum number of connections in pool
      acquire: 30000, // Maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000, // Maximum time, in milliseconds, that a connection can be idle before being released
    },
  },
);

// Initialize database object to hold our models
const db = {};

// Attach Sequelize library and initialized instance to the database object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.users = userModel(sequelize, Sequelize.DataTypes);
db.posts = postModel(sequelize, Sequelize.DataTypes);
db.comments = commentModel(sequelize, Sequelize.DataTypes);

// Relations
db.users.hasMany(db.posts);
db.posts.belongsTo(db.users);

db.posts.hasMany(db.comments);
db.comments.belongsTo(db.posts);

db.users.hasMany(db.comments);
db.comments.belongsTo(db.users);

export default db;
