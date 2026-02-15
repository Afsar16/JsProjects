import { formatTimeAgo } from '../utils/time';
import ChatPanel from './ChatPanel';

const urgencyStyles = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-emerald-100 text-emerald-700'
};

const PostCard = ({ post, user, onAccept, onEdit, onDelete, onComplete }) => {
  const createdById = post.createdBy?._id || post.createdBy;
  const isOwner = createdById === user.id;
  const isAcceptedHelper = (post.acceptedBy?._id || post.acceptedBy) === user.id;

  return (
    <article className="rounded-lg border bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <h4 className="text-xl font-semibold text-slate-900">{post.title}</h4>
        <span className={`rounded px-2 py-0.5 text-xs font-semibold ${urgencyStyles[post.urgency]}`}>{post.urgency.toUpperCase()}</span>
      </div>
      <p className="mt-2 text-slate-600">{post.description}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3 border-b pb-3 text-sm text-slate-500">
        <span>{post.studentName}</span>
        {post.verified && <span className="rounded bg-emerald-100 px-2 py-0.5 text-emerald-700">Verified Student</span>}
        <span>{formatTimeAgo(post.createdAt)}</span>
        <span className="rounded bg-blue-100 px-2 py-0.5 text-blue-700">{post.status}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {post.status === 'Open' && !isOwner && (
          <button onClick={() => onAccept(post._id)} className="rounded bg-emerald-600 px-3 py-1 text-white">
            Accept Session
          </button>
        )}
        {isOwner && (
          <>
            <button onClick={() => onEdit(post)} className="rounded border px-3 py-1">
              Edit
            </button>
            <button onClick={() => onDelete(post._id)} className="rounded border border-red-200 px-3 py-1 text-red-600">
              Delete
            </button>
          </>
        )}
        {(isOwner || isAcceptedHelper) && post.status === 'Accepted' && (
          <button onClick={() => onComplete(post._id)} className="rounded bg-indigo-600 px-3 py-1 text-white">
            Mark Completed
          </button>
        )}
      </div>
      {(isOwner || isAcceptedHelper) && <ChatPanel post={post} currentUser={user} />}
    </article>
  );
};

export default PostCard;
