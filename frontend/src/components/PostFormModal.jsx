import { useEffect, useState } from 'react';

const initialState = { title: '', description: '', urgency: 'Low' };

const PostFormModal = ({ open, onClose, onSubmit, editPost }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editPost) {
      setFormData({
        title: editPost.title,
        description: editPost.description,
        urgency: editPost.urgency
      });
    } else {
      setFormData(initialState);
    }
  }, [editPost]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">{editPost ? 'Edit Help Request' : 'Post Help Request'}</h3>
        <div className="space-y-3">
          <input
            className="w-full rounded border p-2"
            placeholder="Course / Topic"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          />
          <textarea
            className="w-full rounded border p-2"
            rows={4}
            placeholder="Describe your support request"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          />
          <select
            className="w-full rounded border p-2"
            value={formData.urgency}
            onChange={(e) => setFormData((prev) => ({ ...prev, urgency: e.target.value }))}
          >
            {['Low', 'Medium', 'High'].map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded border px-3 py-1">
            Cancel
          </button>
          <button onClick={() => onSubmit(formData)} className="rounded bg-university-blue px-4 py-1 text-white">
            {editPost ? 'Save Changes' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostFormModal;
