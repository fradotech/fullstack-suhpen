import ProfileRoute from './Profile/Profile.route'
import RoleRoute from './Role/Role.route'
import UserRoute from './User/User.route'

export default [...ProfileRoute, ...UserRoute, ...RoleRoute]
