const db = require('../data/dbConfig');

beforeEach(async () => {
	await db('users').truncate();
});

describe('users.insert', () => {
	it('is able to add user to the db!', async () => {
		let users = await Users.getAll();
		expect(users).toHaveLength(0);

		await Users.insert({ name: 'whiskeyjack' });
		await Users.insert({ name: 'crokus' });
		await Users.insert({ name: 'swedgen' });
		users = await Users.getAll();

		expect(users).toHaveLength(3);
	});

	it('is able to insert the correct users', async () => {
		let users = await Users.getAll();
		expect(users).toHaveLength(0);

		await Users.insert({ name: 'whiskeyjack' });
		await Users.insert({ name: 'crokus' });
		await Users.insert({ name: 'swedgen' });
		users = await Users.getAll();

		expect(users[0].name).toBe('whiskeyjack');
		expect(users[1].name).toBe('crokus');
		expect(users[2].name).toBe('swedgen');
	});

	it('returns the newly inserted user', async () => {
		const users = await Users.insert({ name: 'whiskeyjack' });
		expect(users.name).toBe('whiskeyjack');
	});
});
