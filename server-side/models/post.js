"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: "authorId" });
      Post.belongsTo(models.Category, { foreignKey: "categoryId" });
      Post.hasMany(models.Tag, { foreignKey: "postId" });
    }

    static async createPost(req) {
      const t = await sequelize.transaction();
      try {
        const { title, content, imgUrl, categoryId, tags } = req.body;
        const post = await Post.create(
          {
            title,
            slug: title.replaceAll(" ", "-"),
            content,
            imgUrl,
            categoryId,
            authorId: req.user.id,
          },
          { transaction: t }
        );
        await sequelize.models.Tag.bulkCreate(
          tags.map((tag) => {
            return {
              name: tag,
              postId: post.id,
            };
          }),
          { validate: true, transaction: t }
        );
        await t.commit();
      } catch (err) {
        t.rollback();
      }
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Title is required" },
          notEmpty: { msg: "Title is required" },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Slug is required" },
          notEmpty: { msg: "Slug is required" },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Content is required" },
          notEmpty: { msg: "Content is required" },
        },
      },
      imgUrl: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
