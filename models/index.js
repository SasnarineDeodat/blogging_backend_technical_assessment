import Sequelize from "sequelize";
import userModel from "./user.model.js";
import postModel from "./post.model.js";
import commentModel from "./comment.model.js";

const sequelize = new Sequelize(
  process.env.POSTGRESQL_DB,
  process.env.POSTGRESQL_USER,
  process.env.POSTGRESQL_PASSWORD,
  {
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    dialect: process.env.POSTGRESQL_DIALECT,
    logging: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

const db = {};

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
