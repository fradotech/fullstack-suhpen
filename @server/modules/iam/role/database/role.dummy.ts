import { RoleDefaultKeyEnum } from '../common/role.enum'
import { RoleCreateRequest } from '../v1/role.request'

// <--- KEY: key --->
export const roleDummies: RoleCreateRequest[] = [
  {
    name: 'Super Admin',
    key: RoleDefaultKeyEnum.SuperAdmin,
    labelColor: '#001fe6',
  },
  {
    name: 'Admin',
    key: 'admin',
    labelColor: '#cf720e',
  },
  {
    name: 'Customer',
    key: RoleDefaultKeyEnum.Customer,
    labelColor: '#00a120',
  },
]
