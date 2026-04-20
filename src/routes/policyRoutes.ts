import express from 'express';
import { getPolicies, createPolicy, updatePolicy, deletePolicy } from '../controllers/policyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPolicies); // Public
router.post('/', protect, createPolicy); // Protected
router.put('/:id', protect, updatePolicy); // Protected
router.delete('/:id', protect, deletePolicy); // Protected

export default router;
