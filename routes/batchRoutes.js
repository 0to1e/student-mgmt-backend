import express from 'express';
import {
  createBatch,
  getBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
} from '../controllers/batchController.js';

const router = express.Router();

router.post('/create', createBatch);
router.get('/getAll', getBatches);
router.get('/:id', getBatchById);
router.put('/update/:id', updateBatch);
router.delete('/delete/:id', deleteBatch);

export default router;