const PostSchema = require("../models/post.js");

const getPosts = async (req, res) => {
  try {
    const getPosts = await PostSchema.find(req.body);
    res.status(200).json({ getPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createPosts = async (req, res) => {
  try {
    const newPost = await PostSchema.create(req.body);
    res.status(201).json({ newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detailPost = await PostSchema.findById(id);
    res.status(200).json({ detailPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await PostSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ updatePost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await PostSchema.findByIdAndRemove(id);
    res.status(201).json({ message: "Silme işlemi başarılı.." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchPost = async (req, res) => {
  try {
    const searchPost = await PostSchema.find({
      $or: [
        { name: { $regex: req.body.search, $options: "i" } },
        { description: { $regex: req.body.search, $options: "i" } },
      ],
    });
    res.status(200).json({ searchPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPosts,
  getDetail,
  getUpdate,
  deletePost,
  searchPost,
};
