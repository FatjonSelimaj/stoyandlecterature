import { Router } from 'express';
import {
    createHistorySection,
    getHistorySections,
    getHistorySectionById,
    updateHistorySection,
    deleteHistorySection,
} from '../controllers/historySectionController';

const router = Router();

router.post('/history-sections', createHistorySection);
router.get('/history-sections', getHistorySections);
router.get('/history-sections/:id', getHistorySectionById);
router.put('/history-sections/:id', updateHistorySection);
router.delete('/history-sections/:id', deleteHistorySection);

export default router;
