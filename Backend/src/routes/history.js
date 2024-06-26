const express = require('express')
const router = express.Router()
const HistoryController = require('../controllers/HistoyController')


router.get('/enProceso',HistoryController.getCartStatusProceso );
router.get('/enviado',HistoryController.getCartStatusEnviado );
router.get('/entregado',HistoryController.getCartStatusEntregado );
router.post('/',HistoryController.potCambioStatus );


module.exports = router;
