const { User, Post, Category, Tag } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const createUser = await User.create({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: createUser.id,
        email: createUser.email,
        message: `Succesfully registered`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "EmailIsRequired" };
      if (!password) throw { name: "PasswordIsRequired" };
      const user = await User.findOne({
        where: { email },
      });
      if (!user || !comparePassword(password, user.password)) {
        throw { name: "EmailPasswordInvalid" };
      }
      res.status(200).json({
        access_token: signToken({ id: user.id }),
        username: user.username,
        email: user.email,
        role: user.role,
        message: `${user.username} is successfully logged in`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPosts(req, res, next) {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "username"],
          },
          {
            model: Category,
            attributes: ["id", "name"],
          },
          {
            model: Tag,
            attributes: ["id", "name"],
          },
        ],
        order: [["updatedAt", "DESC"]],
      });
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getPostById(req, res, next) {
    try {
      const { id: postId } = req.params;
      const post = await Post.findByPk(postId, {
        include: [
          {
            model: User,
            attributes: ["id", "username"],
          },
          {
            model: Category,
            attributes: ["id", "name"],
          },
          {
            model: Tag,
            attributes: ["id", "name"],
          },
        ],
      });
      if (!post) throw { name: "dataNotFound" };
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async createPostWithTag(req, res, next) {
    try {
      await Post.createPost(req);
      res.status(201).json({ message: "Post has successfully created" });
    } catch (error) {
      next(error);
    }
  }

  static async editPostById(req, res, next) {
    try {
      const { id: postId } = req.params;
      const { title, imgUrl, content, categoryId } = req.body;
      const post = await Post.findByPk(postId);
      if (!post) throw { name: "dataNotFound" };
      await post.update({
        title,
        imgUrl,
        content,
        categoryId,
      });
      res.status(200).json({ message: "Post has been successfully edited" });
    } catch (error) {
      next(error);
    }
  }

  static async deletePostById(req, res, next) {
    try {
      const { id: postId } = req.params;
      const post = await Post.findOne({
        where: {
          id: postId,
        },
      });
      if (!post) throw { name: "dataNotFound" };
      await post.destroy();
      res.status(200).json({ message: "Post has been successfully deleted" });
    } catch (error) {
      next(error);
    }
  }

  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        include: {
          model: Post,
          attributes: ["id", "title"],
        },
        order: [["createdAt", "ASC"]],
      });

      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryById(req, res, next) {
    try {
      const { id: categoryId } = req.params;
      const category = await Category.findOne({
        where: {
          id: categoryId,
        },
      });
      if (!category) throw { name: "dataNotFound" };
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async editCategoryById(req, res, next) {
    try {
      const { id: categoryId } = req.params;
      const { name: categoryName } = req.body;
      const category = await Category.findOne({
        where: {
          id: categoryId,
        },
      });
      if (!category) throw { name: "dataNotFound" };
      await category.update({ name: categoryName });
      res
        .status(200)
        .json({ message: "Category has been successfully edited" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategoryId(req, res, next) {
    try {
      const { id: categoryId } = req.params;
      const category = await Category.findOne({
        where: {
          id: categoryId,
        },
      });
      if (!category) throw { name: "dataNotFound" };
      await category.destroy();
      res.status(200).json({ message: "Category has successfully deleted" });
    } catch (error) {
      next(error);
    }
  }

  static async getTags(req, res, next) {
    try {
      const tags = await Tag.findAll({
        include: {
          model: Post,
          attributes: ["title"],
        },
      });
      res.status(200).json(tags);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
