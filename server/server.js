import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import users from './routes/users.route.js';
import UsersDAO from './model/usersDAO.js';

const app = express();
dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/v1/users', users);

MongoClient.connect(process.env.USERS_DB_URI, {
	maxPoolSize: 50,
	wtimeoutMS: 250,
	useNewUrlParser: true,
})
	.catch((err) => {
		console.log(err.stack);
		process.exit(1);
	})
	.then(async (client) => {
		await UsersDAO.injectDB(client);
		app.listen(port, () => {
			console.log(`Server listening on port ${port}`);
		});
	});
