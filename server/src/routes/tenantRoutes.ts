import express from 'express'
import {
    getTenant,
    createTenant,
    updateTenant,
    getCurrentResidences,
    addFavoriteProperty,
    removeFavoriteProperty
} from '../controllers/tenantControllers.js'

const router = express.Router();


router.get('/:cognitoId', getTenant);
router.put("/:cognitoId", updateTenant);
router.get('/:cognitoId/current-residences', getCurrentResidences)
router.post('/:congitoId/favorites/:propertyId', addFavoriteProperty)
router.delete('/:congitoId/favorites/:propertyId', removeFavoriteProperty)
router.post("/", createTenant);


export default router;