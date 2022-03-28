import UsersDAO from '../model/usersDAO.js';

export default class UsersController {
	static async getAllUsers(req, res, next) {
		try {
			let users = await UsersDAO.getUsers();
			res.json(users);
		} catch (error) {
			console.log(`api, ${err}`);
			res.status(500).json({ error: err });
		}
	}

	static async saveGame(req, res, next) {
		try {
			const { name, attempts, timeToComplete } = req.body;
			const today = new Date();
			await UsersDAO.saveGameResults(name, attempts, timeToComplete, today);
			res.json({ status: 'success' });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}
