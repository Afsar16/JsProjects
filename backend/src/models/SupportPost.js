import mongoose from 'mongoose';

const supportPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    urgency: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studentName: { type: String, required: true },
    verified: { type: Boolean, default: true },
    status: { type: String, enum: ['Open', 'Accepted', 'Completed'], default: 'Open' },
    acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    scheduledTime: { type: Date, default: null }
  },
  { timestamps: true }
);

export default mongoose.model('SupportPost', supportPostSchema);
