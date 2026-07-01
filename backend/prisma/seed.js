import '../app/config/env.js';
import bcrypt from 'bcryptjs';
import prisma from '../app/config/db.js';

const ROLES = ['admin', 'user'];

async function main() {
	const roles = {};
	for (const name of ROLES) {
		roles[name] = await prisma.role.upsert({
			where: { name },
			update: {},
			create: { name },
		});
	}

	const adminEmail = process.env.ADMIN_EMAIL || 'admin@vidforge.ai';
	const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
	const hashedPassword = await bcrypt.hash(adminPassword, 10);

	await prisma.user.upsert({
		where: { email: adminEmail },
		update: {},
		create: {
			name: 'Admin',
			email: adminEmail,
			password: hashedPassword,
			roleId: roles.admin.id,
		},
	});

	console.log(`Seeded roles: ${ROLES.join(', ')}`);
	console.log(`Seeded admin user: ${adminEmail}`);
}

main()
	.catch((error) => {
		console.error(error);
		process.exitCode = 1;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
