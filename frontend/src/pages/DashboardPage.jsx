import { useEffect, useMemo, useState } from 'react';
import api from '../api/client';
import PostCard from '../components/PostCard';
import PostFormModal from '../components/PostFormModal';
import PortalLayout from '../layouts/PortalLayout';
import { formatTimeAgo } from '../utils/time';

const DashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const [dashboard, setDashboard] = useState({ analytics: {}, activeSessions: [], completedSessions: [], recentActivity: [] });
  const [formOpen, setFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const loadData = async () => {
    const [{ data: postsData }, { data: dashboardData }, { data: meData }] = await Promise.all([
      api.get('/posts'),
      api.get('/dashboard'),
      api.get('/auth/me')
    ]);
    setPosts(postsData);
    setDashboard(dashboardData);
    setCurrentUser({ id: meData.user._id, name: meData.user.name });
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitPost = async (formData) => {
    if (editingPost) {
      await api.put(`/posts/${editingPost._id}`, formData);
    } else {
      await api.post('/posts', formData);
    }
    setEditingPost(null);
    setFormOpen(false);
    loadData();
  };

  const acceptPost = async (id) => {
    const scheduledTime = window.prompt('Set session date/time (YYYY-MM-DD HH:mm) optional:');
    await api.put(`/posts/${id}/accept`, { scheduledTime: scheduledTime || null });
    loadData();
  };

  const completePost = async (id) => {
    await api.put(`/posts/${id}/complete`);
    loadData();
  };

  const deletePost = async (id) => {
    await api.delete(`/posts/${id}`);
    loadData();
  };

  const widgetData = useMemo(
    () => [
      { label: 'Total Sessions', value: dashboard.analytics.totalSessions || 0 },
      { label: 'Active Posts', value: dashboard.analytics.activePostsCount || 0 },
      { label: 'Engagement Rate', value: `${dashboard.analytics.engagementRate || 0}%` }
    ],
    [dashboard.analytics]
  );

  if (!currentUser) return <div className="p-8">Loading...</div>;

  return (
    <PortalLayout>
      <div className="rounded-xl border bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
          <h2 className="text-3xl font-bold text-slate-800">🤝 Peer Learning & Academic Support</h2>
          <button
            onClick={() => {
              setEditingPost(null);
              setFormOpen(true);
            }}
            className="rounded bg-university-blue px-4 py-2 text-white"
          >
            + Post Help Request
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {widgetData.map((widget) => (
            <div key={widget.label} className="rounded-lg border bg-slate-50 p-4">
              <p className="text-xs uppercase text-slate-500">{widget.label}</p>
              <p className="text-2xl font-bold text-university-blue">{widget.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              user={currentUser}
              onAccept={acceptPost}
              onEdit={(target) => {
                setEditingPost(target);
                setFormOpen(true);
              }}
              onDelete={deletePost}
              onComplete={completePost}
            />
          ))}
        </div>

        <section className="mt-6 rounded-lg border bg-slate-50 p-4">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            {dashboard.recentActivity.map((item) => (
              <li key={item._id}>• {item.title} status changed to {item.status} ({formatTimeAgo(item.updatedAt)})</li>
            ))}
          </ul>
        </section>
      </div>

      <PostFormModal
        open={formOpen}
        onClose={() => {
          setEditingPost(null);
          setFormOpen(false);
        }}
        onSubmit={submitPost}
        editPost={editingPost}
      />
    </PortalLayout>
  );
};

export default DashboardPage;
