import AccountRoute from './Account/account.route'
import RoleRoute from './Role/role.route'
import UserRoute from './User/user.route'

export default [...AccountRoute, ...UserRoute, ...RoleRoute]
