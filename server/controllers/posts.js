import Post from '../models/Post.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    // console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post({
    ...post,
    creatore: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const newPost = req.body;
  const post = Post.findById({ _id });
  if (!post) return res.status(404).send('No post found');
  const updatedPost = await Post.findByIdAndUpdate(_id, newPost, { new: true });
  res.json(updatedPost);
};
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  const post = Post.findById(_id);
  if (!post) return res.status(404).send('No post found');
  await Post.findByIdAndRemove(_id);
  res.json({ message: 'Post deleted' });
};
export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) {
    return res.json({ message: 'unauthorized' });
  }
  // console.log(id);
  const post = await Post.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    // like
    post.likes.push(req.userId);
  } else {
    // dislike
    post.likes = post.likes.filter((id) => id !== String.req.userId);
  }
  // console.log(post);
  if (!post) return res.status(404).send('No post found');
  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
  res.json(updatedPost);
};
