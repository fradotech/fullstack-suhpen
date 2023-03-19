import { ERole } from '../../../modules/iam/role/infrastructure/role.enum'

// <--- KEY: email --->
export const usersDummies = [
  {
    name: 'Admin',
    email: 'Admin@admin.com',
    password: '$2b$10$eO7f13Ettz4rcp39kECXOeQSQ.IkIta9x0eNK8kJcliSeaj5RtIwi', // Admin123
    role: ERole.Administrator,
  },
  {
    name: 'User1',
    email: 'user1@user.com',
    password: '$2b$10$s7rzXa/GbiGA7YfUV/LTZ.RKJIdHQBA6qfXzXP/dpB86cj1xW/Ovy', // User123
    role: ERole.User,
  },
  {
    name: 'User2',
    email: 'user2@user.com',
    password: '$2b$10$s7rzXa/GbiGA7YfUV/LTZ.RKJIdHQBA6qfXzXP/dpB86cj1xW/Ovy', // User123
    role: ERole.User,
  },
]
