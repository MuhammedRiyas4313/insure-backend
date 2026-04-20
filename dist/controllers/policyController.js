import Policy from '../models/Policy.js';
export const getPolicies = async (req, res) => {
    try {
        const policies = await Policy.find();
        res.json(policies);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createPolicy = async (req, res) => {
    const { policyName, premium, coverageAmount, duration, eligibility, benefits } = req.body;
    // Handle benefits if coming as a string (comma separated) or array
    const benefitsArray = Array.isArray(benefits)
        ? benefits
        : benefits.split(',').map((b) => b.trim());
    const policy = new Policy({
        policyName,
        premium,
        coverageAmount,
        duration,
        eligibility,
        benefits: benefitsArray
    });
    try {
        const newPolicy = await policy.save();
        res.status(201).json(newPolicy);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updatePolicy = async (req, res) => {
    const { id } = req.params;
    const { policyName, premium, coverageAmount, duration, eligibility, benefits } = req.body;
    const benefitsArray = Array.isArray(benefits)
        ? benefits
        : benefits.split(',').map((b) => b.trim());
    try {
        const updatedPolicy = await Policy.findByIdAndUpdate(id, { policyName, premium, coverageAmount, duration, eligibility, benefits: benefitsArray }, { new: true });
        res.json(updatedPolicy);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const deletePolicy = async (req, res) => {
    const { id } = req.params;
    try {
        await Policy.findByIdAndDelete(id);
        res.json({ message: 'Policy deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
