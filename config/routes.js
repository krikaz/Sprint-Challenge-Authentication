const axios = require('axios');
const { authenticate } = require('../auth/authenticate');
const db = require('../database/dbConfig.js');
const bcrypt = require('bcryptjs');

module.exports = server => {
	server.post('/api/register', register);
	server.post('/api/login', login);
	server.get('/api/jokes', authenticate, getJokes);
};

async function add(user) {
	const [id] = await db('users').insert(user);
	return findById(id);
}

function findBy(filter) {
	return db('users').where(filter);
}

function findById(id) {
	return db('users')
		.where({ id })
		.first();
}

function register(req, res) {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 10);
	user.password = hash;

	add(user)
		.then(saved => {
			res.status(201).json(saved);
		})
		.catch(error => {
			res.status(500).json(error);
		});
}

function login(req, res) {
  let { username, password } = req.body;

	findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				// const token = generateToken(user);

				res.status(200).json({
					message: `Welcome ${user.username}!`,
					// token,
				});
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
		})
		.catch(error => {
			res.status(500).json(error);
		});
}

function getJokes(req, res) {
	const requestOptions = {
		headers: { accept: 'application/json' },
	};

	axios
		.get('https://icanhazdadjoke.com/search', requestOptions)
		.then(response => {
			res.status(200).json(response.data.results);
		})
		.catch(err => {
			res.status(500).json({ message: 'Error Fetching Jokes', error: err });
		});
}
