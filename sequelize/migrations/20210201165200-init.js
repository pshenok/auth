/* eslint @typescript-eslint/explicit-function-return-type: 0 */
module.exports = {
	up: async (queryInterface, DataTypes) => {

		await queryInterface.createTable('users', {
			id: {
				type:         DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey:   true,
				field:        'id',
			},
			email: {
				type:      DataTypes.STRING,
				allowNull: false,
				unique:    true,
				field:     'email',
			},
			passwordHash: {
				type:      DataTypes.STRING,
				allowNull: false,
			},
			emailVerified: {
				type:         DataTypes.BOOLEAN,
				defaultValue: false,
				field:        'email_verified',
			},
			firstName: {
				type:      DataTypes.STRING,
				allowNull: true,
				field:     'first_name',
			},
			lastName: {
				type:      DataTypes.STRING,
				allowNull: true,
				field:     'last_name',
			},
			avatar: {
				type:      DataTypes.STRING,
				allowNull: true,
				field:     'avatar',
			},
			createdAt: {
				type:         DataTypes.DATE,
				defaultValue: DataTypes.fn('NOW'),
				allowNull:    false,
				field:        'created_at',
			},
			updatedAt: {
				type:         DataTypes.DATE,
				defaultValue: DataTypes.fn('NOW'),
				allowNull:    false,
				field:        'updated_at',
			},
		});

		await queryInterface.addIndex('users', { fields: ['first_name'] });
		await queryInterface.addIndex('users', { fields: ['last_name'] });
		await queryInterface.addIndex('users', { fields: ['created_at'] });

	},

	down: async (queryInterface) => {
		await queryInterface.dropTable('users');
	},
};
