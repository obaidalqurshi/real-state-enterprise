import express from 'express'
import {
    getManager,
    createManager,
    updateManager,
    getManagerProperties} from '../controllers/managerControllers.js'


const router = express.Router();


router.get('/:cognitoId', getManager);
router.put('/:congitoId', updateManager)
router.get('/:congitoId/properties', getManagerProperties)
router.post("/", createManager);



export default router;