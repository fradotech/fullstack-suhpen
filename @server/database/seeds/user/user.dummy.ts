import { ERole } from '../../../modules/iam/role/infrastructure/role.enum'

// <--- KEY: email --->
export const userDummies = [
  {
    name: 'Super Admin',
    email: 'admin@admin.com',
    password: '$2b$10$eO7f13Ettz4rcp39kECXOeQSQ.IkIta9x0eNK8kJcliSeaj5RtIwi', // Admin123
    role: ERole.SuperAdmin,
  },
  {
    name: 'Admin 2',
    email: 'admin2@admin.com',
    password: '$2b$10$eO7f13Ettz4rcp39kECXOeQSQ.IkIta9x0eNK8kJcliSeaj5RtIwi', // Admin123
    role: ERole.Admin,
  },
  {
    name: 'Admin 3',
    email: 'admin3@admin.com',
    password: '$2b$10$eO7f13Ettz4rcp39kECXOeQSQ.IkIta9x0eNK8kJcliSeaj5RtIwi', // Admin123
    role: ERole.Admin,
  },
  {
    name: 'User 1',
    email: 'user1@user.com',
    password: '$2b$10$s7rzXa/GbiGA7YfUV/LTZ.RKJIdHQBA6qfXzXP/dpB86cj1xW/Ovy', // User123
    role: ERole.User,
  },
  {
    name: 'User 2',
    email: 'user2@user.com',
    password: '$2b$10$s7rzXa/GbiGA7YfUV/LTZ.RKJIdHQBA6qfXzXP/dpB86cj1xW/Ovy', // User123
    role: ERole.User,
  },
  {
    name: 'User 3',
    email: 'user3@user.com',
    password: '$2b$10$s7rzXa/GbiGA7YfUV/LTZ.RKJIdHQBA6qfXzXP/dpB86cj1xW/Ovy', // User123
    role: ERole.User,
  },
]
