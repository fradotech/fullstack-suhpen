export enum PermissionMethodEnum {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

export const PermissionMethodValue = {
  get: {
    name: PermissionMethodEnum.Get,
    accessName: 'READ',
    color: '#00a120',
  },
  post: {
    name: PermissionMethodEnum.Post,
    accessName: 'WRITE',
    color: '#cf720e',
  },
  put: {
    name: PermissionMethodEnum.Put,
    accessName: 'EDIT',
    color: '#001fe6',
  },
  patch: {
    name: PermissionMethodEnum.Patch,
    accessName: 'MODIFY',
    color: '#6b00a8',
  },
  delete: {
    name: PermissionMethodEnum.Delete,
    accessName: 'DELETE',
    color: '#ff0033',
  },
}
