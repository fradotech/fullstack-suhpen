import { RoleDefaultKeyEnum } from '../../role/common/role.enum'
import { UserCreateRequest } from '../v1/user.request'

// --- KEY: email --- \\
export const userDummies: UserCreateRequest[] = [
  {
    name: 'Super Admin',
    email: 'admin@gmail.com',
    password: 'Admin123',
    roleKey: RoleDefaultKeyEnum.SuperAdmin,
    roles: [],
  },
  {
    name: 'Admin 2',
    email: 'admin2@gmail.com',
    password: 'Admin123',
    roles: [],
  },
  {
    name: 'Admin 3',
    email: 'admin3@gmail.com',
    password: 'Admin123',
    roles: [],
  },
  {
    name: 'User 1',
    email: 'user1@gmail.com',
    password: 'User123',
    roles: [],
  },
  {
    name: 'User 2',
    email: 'user2@gmail.com',
    password: 'User123',
    roles: [],
  },
  {
    name: 'User 3',
    email: 'user3@gmail.com',
    password: 'User123',
    roles: [],
  },
]
