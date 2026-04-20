import mongoose from 'mongoose';
const policySchema = new mongoose.Schema({
    policyName: { type: String, required: true },
    premium: { type: Number, required: true },
    coverageAmount: { type: Number, required: true },
    duration: { type: String, required: true },
    eligibility: { type: String, required: true },
    benefits: { type: [String], required: true } // Stored as array, frontend handles comma separation
}, { timestamps: true });
export default mongoose.model('Policy', policySchema);
