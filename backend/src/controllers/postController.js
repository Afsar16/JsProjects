import SupportPost from '../models/SupportPost.js';

export const createPost = async (req, res) => {
  try {
    const { title, description, urgency } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required.' });
    }

    const post = await SupportPost.create({
      title,
      description,
      urgency: urgency || 'Low',
      createdBy: req.user._id,
      studentName: req.user.name,
      verified: req.user.verifiedStudent
    });

    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create post.', error: error.message });
  }
};

export const getAllPosts = async (_req, res) => {
  try {
    const posts = await SupportPost.find()
      .populate('createdBy', 'name verifiedStudent')
      .populate('acceptedBy', 'name verifiedStudent')
      .sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch posts.', error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await SupportPost.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own posts.' });
    }

    const { title, description, urgency, status, scheduledTime } = req.body;

    post.title = title ?? post.title;
    post.description = description ?? post.description;
    post.urgency = urgency ?? post.urgency;
    post.status = status ?? post.status;
    post.scheduledTime = scheduledTime ?? post.scheduledTime;

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update post.', error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await SupportPost.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own posts.' });
    }

    await post.deleteOne();

    return res.status(200).json({ message: 'Post deleted.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete post.', error: error.message });
  }
};

export const acceptSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { scheduledTime } = req.body;

    const post = await SupportPost.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    if (post.createdBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot accept your own support post.' });
    }

    if (post.status !== 'Open') {
      return res.status(400).json({ message: 'Post is not open for acceptance.' });
    }

    post.status = 'Accepted';
    post.acceptedBy = req.user._id;
    post.scheduledTime = scheduledTime || null;

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to accept session.', error: error.message });
  }
};

export const completeSession = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await SupportPost.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    const isOwner = post.createdBy.toString() === req.user._id.toString();
    const isHelper = post.acceptedBy?.toString() === req.user._id.toString();

    if (!isOwner && !isHelper) {
      return res.status(403).json({ message: 'Only participants can complete session.' });
    }

    post.status = 'Completed';
    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to complete session.', error: error.message });
  }
};
