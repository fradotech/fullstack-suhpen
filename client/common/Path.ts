import { DashboardModule } from '../Modules/Dashboard/Dashboard.Module'
import { accountPath } from '../Modules/Iam/Account/infrastructure/account.path'
import { authPath } from '../Modules/Iam/Auth/infrastructure/auth.path'
import { permissionPath } from '../Modules/Iam/Permission/infrastructure/permission.path'
import { rolePath } from '../Modules/Iam/Role/infrastructure/role.path'
import { userPath } from '../Modules/Iam/User/infrastructure/user.path'

export const Path = {
  Home: '/',
  Attachment: '/attachments',

  ...authPath,
  dashboard: DashboardModule.path,
  account: accountPath,
  user: userPath,
  role: rolePath,
  permission: permissionPath,
}
