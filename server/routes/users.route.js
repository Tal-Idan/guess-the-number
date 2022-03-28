import express from 'express';
import UsersController from './../controller/users.controller.js';

const router = express.Router();

router.get('/', UsersController.getAllUsers);
router.post('/saveresults',UsersController.saveGame)

export default router;
