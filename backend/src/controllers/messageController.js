import Message from '../models/Message.js';
import SupportPost from '../models/SupportPost.js';

export const sendMessage = async (req, res) => {
  try {
    const { postId, receiverId, message } = req.body;

    if (!postId || !receiverId || !message) {
      return res.status(400).json({ message: 'postId, receiverId, and message are required.' });
    }

    const post = await SupportPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Support post not found.' });
    }

    const allowedIds = [post.createdBy?.toString(), post.acceptedBy?.toString()].filter(Boolean);
    if (!allowedIds.includes(req.user._id.toString())) {
      return res.status(403).json({ message: 'You are not a participant in this session.' });
    }

    const payload = await Message.create({
      senderId: req.user._id,
      receiverId,
      postId,
      message
    });

    return res.status(201).json(payload);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to send message.', error: error.message });
  }
};

export const getMessagesByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await SupportPost.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Support post not found.' });
    }

    const allowedIds = [post.createdBy?.toString(), post.acceptedBy?.toString()].filter(Boolean);
    if (!allowedIds.includes(req.user._id.toString())) {
      return res.status(403).json({ message: 'You are not a participant in this session.' });
    }

    const messages = await Message.find({ postId })
      .populate('senderId', 'name')
      .populate('receiverId', 'name')
      .sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch messages.', error: error.message });
  }
};
