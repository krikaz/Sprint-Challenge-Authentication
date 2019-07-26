const db = require('../database/dbConfig');
const RoutesModel = require('./routesModel');
const Routes = require('./routes');

beforeEach(async () => {
	await db('users').truncate();
});

describe('users.add', () => {
	it('is able to add a new user to the db', async () => {
		let users = await RoutesModel.findAll();
		expect(users).toHaveLength(0);

		await RoutesModel.add({ username: 'whiskeyjack', password: '1234' });
		await RoutesModel.add({ username: 'crokus', password: '1234' });
		await RoutesModel.add({ username: 'swedgen', password: '1234' });
		routes = await RoutesModel.findAll();
		expect(routes).toHaveLength(3);
	});

	it('is able to add the correct user', async () => {
		let users = await RoutesModel.findAll();
		expect(users).toHaveLength(0);

		await RoutesModel.add({ username: 'whiskeyjack', password: '1234' });
		await RoutesModel.add({ username: 'crokus', password: '1234' });
		await RoutesModel.add({ username: 'swedgen', password: '1234' });
		routes = await RoutesModel.findAll();

		expect(routes[0].username).toBe('whiskeyjack');
		expect(routes[1].username).toBe('crokus');
		expect(routes[2].username).toBe('swedgen');
	});
});

