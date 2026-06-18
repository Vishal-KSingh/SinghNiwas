import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema(
  {
    tenantName: { type: String, required: true },
    roomNumber: { type: String, required: true },
    issueType: { type: String, required: true }, // e.g., Plumbing, Electrical
    description: { type: String, required: true },
    status: { 
      type: String, 
      default: 'Pending' 
    },
    adminReply: { 
      type: String, 
      default: '' 
    },
  },
  { 
    timestamps: true // Ye automatically createdAt aur updatedAt handle karega
  }
);

export default mongoose.models.Complaint || mongoose.model('Complaint', ComplaintSchema);