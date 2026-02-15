import SupportPost from '../models/SupportPost.js';

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    const [activeSessions, completedSessions, myPostsOpen, totalPosts, recentPosts] = await Promise.all([
      SupportPost.find({
        status: 'Accepted',
        $or: [{ createdBy: userId }, { acceptedBy: userId }]
      })
        .populate('createdBy', 'name')
        .populate('acceptedBy', 'name')
        .sort({ updatedAt: -1 }),
      SupportPost.find({
        status: 'Completed',
        $or: [{ createdBy: userId }, { acceptedBy: userId }]
      })
        .populate('createdBy', 'name')
        .populate('acceptedBy', 'name')
        .sort({ updatedAt: -1 })
        .limit(8),
      SupportPost.countDocuments({ createdBy: userId, status: { $ne: 'Completed' } }),
      SupportPost.countDocuments(),
      SupportPost.find({
        $or: [{ createdBy: userId }, { acceptedBy: userId }]
      })
        .sort({ updatedAt: -1 })
        .limit(6)
    ]);

    const engagementRate = totalPosts ? Math.round(((activeSessions.length + completedSessions.length) / totalPosts) * 100) : 0;

    return res.status(200).json({
      analytics: {
        totalSessions: activeSessions.length + completedSessions.length,
        activePostsCount: myPostsOpen,
        engagementRate
      },
      activeSessions,
      completedSessions,
      recentActivity: recentPosts
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load dashboard data.', error: error.message });
  }
};
