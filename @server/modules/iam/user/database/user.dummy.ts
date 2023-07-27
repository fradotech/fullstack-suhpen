import { RoleDefaultKeyEnum } from '../../role/common/role.enum'

// --- KEY: email --- \\
export const userDummies = [
  {
    name: 'Super Admin',
    email: 'admin@admin.com',
    password: 'Admin123',
    roleKey: RoleDefaultKeyEnum.SuperAdmin,
  },
  {
    name: 'Admin 2',
    email: 'admin2@admin.com',
    password: 'Admin123',
  },
  {
    name: 'Admin 3',
    email: 'admin3@admin.com',
    password: 'Admin123',
  },
  {
    name: 'User 1',
    email: 'user1@user.com',
    password: 'User123',
  },
  {
    name: 'User 2',
    email: 'user2@user.com',
    password: 'User123',
  },
  {
    name: 'User 3',
    email: 'user3@user.com',
    password: 'User123',
  },
]
