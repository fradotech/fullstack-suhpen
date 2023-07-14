export type TMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

export const PermissionMethodEnum = {
  get: {
    name: 'get' as TMethod,
    accessName: 'READ',
    color: '#00a120',
  },
  post: {
    name: 'post' as TMethod,
    accessName: 'WRITE',
    color: '#cf720e',
  },
  put: {
    name: 'put' as TMethod,
    accessName: 'EDIT',
    color: '#001fe6',
  },
  patch: {
    name: 'patch' as TMethod,
    accessName: 'MODIFY',
    color: '#45a8ff',
  },
  delete: {
    name: 'delete' as TMethod,
    accessName: 'DELETE',
    color: '#ff0033',
  },
}
