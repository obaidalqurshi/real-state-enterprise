import express from 'express'
import {
    getProperty,
    createProperty,
    getProperties} from '../controllers/propertyControllers.js'
import { authMiddleware } from '../middleware/authMiddleware.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({storage: storage})

const router = express.Router();



router.get('/', getProperties);
router.get('/:id', getProperty)
router.post("/", authMiddleware(["manager"]), upload.array("photos"), createProperty);



export default router;