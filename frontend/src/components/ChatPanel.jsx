import { useEffect, useState } from 'react';
import api from '../api/client';

const ChatPanel = ({ post, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const participantId =
    post.createdBy?._id === currentUser.id || post.createdBy === currentUser.id
      ? post.acceptedBy?._id || post.acceptedBy
      : post.createdBy?._id || post.createdBy;

  const loadMessages = async () => {
    const { data } = await api.get(`/messages/${post._id}`);
    setMessages(data);
  };

  useEffect(() => {
    if (post.status === 'Accepted' || post.status === 'Completed') {
      loadMessages();
    }
  }, [post._id, post.status]);

  const send = async () => {
    if (!text.trim() || !participantId) return;
    await api.post('/messages', {
      postId: post._id,
      receiverId: participantId,
      message: text
    });
    setText('');
    loadMessages();
  };

  if (!(post.status === 'Accepted' || post.status === 'Completed')) return null;

  return (
    <div className="mt-3 rounded border bg-slate-50 p-3">
      <p className="text-sm font-semibold text-slate-700">Session Chat</p>
      <div className="mt-2 max-h-28 space-y-1 overflow-y-auto rounded bg-white p-2 text-xs">
        {messages.length ? (
          messages.map((msg) => (
            <p key={msg._id}>
              <span className="font-semibold">{msg.senderId?.name}:</span> {msg.message}
            </p>
          ))
        ) : (
          <p className="text-slate-400">No messages yet.</p>
        )}
      </div>
      {participantId && (
        <div className="mt-2 flex gap-2">
          <input
            className="flex-1 rounded border px-2 py-1 text-xs"
            placeholder="Send a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={send} className="rounded bg-university-blue px-3 py-1 text-xs text-white">
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatPanel;
