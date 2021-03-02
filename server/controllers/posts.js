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
  const newPost = new Post(post);
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
  // console.log(id);
  const post = await Post.findById(id);
  // console.log(post);
  if (!post) return res.status(404).send('No post found');
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      likeCount: post.likeCount + 1,
    },
    { new: true }
  );
  res.json(updatedPost);
};
