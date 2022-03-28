import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let users;

export default class UsersDAO {
	static async injectDB(conn) {
		if (users) {
			return;
		}
		try {
			users = await conn.db('number_game_users').collection('users');
		} catch (error) {
			console.error(
				`Unable to establish a collection handles in usersDAO: ${error}`
			);
		}
	}

	static async getUsers() {
		let cursor;

		try {
			cursor = await users.find({}).sort({ finalScore: -1 });
		} catch (error) {
			console.error(`Unable to issue find command, ${error}`);
		}

		try {
			const all_users = await cursor.toArray();
			return all_users;
		} catch (err) {
			console.error(`Unable to get users, ${err}`);
			return all_users;
		}
	}

	static async saveGameResults(userName, results, time, today) {
		try {
			const gameResults = {
				name: userName,
				attempts: results,
				timeToComplete: time,
				finalScore: Math.floor(time / results),
				date: today,
			};
			return await users.insertOne(gameResults);
		} catch (error) {
			console.error(`Unable to save game results: ${error}`);
			return { error };
		}
	}
}
