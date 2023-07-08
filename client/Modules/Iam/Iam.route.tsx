import AccountRoute from './Account/Account.route'
import PermissionRoute from './Permission/Permission.route'
import RoleRoute from './Role/Role.route'
import UserRoute from './User/User.route'

export default [...AccountRoute, ...UserRoute, ...RoleRoute, ...PermissionRoute]
