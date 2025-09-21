import express from 'express'
import {
    getManager,
    createManager,
    updateManager} from '../controllers/managerControllers.js'


const router = express.Router();


router.get('/:cognitoId', getManager);
router.put('/:congitoId', updateManager)
router.post("/", createManager);



export default router;