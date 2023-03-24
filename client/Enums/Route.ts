import { routesDashboard } from '../Modules/Dashboard/Dashboard.route'
import { routesCategory } from '../Modules/Feature/Category/Category.route'
import { routesInventory } from '../Modules/Feature/Product/Inventory/Inventory.route'
import { routesProduct } from '../Modules/Feature/Product/Product.route'
import { routesAccount } from '../Modules/Iam/Account/Account.route'
import { routesAuth } from '../Modules/Iam/Auth/Auth.route'
import { routesRole } from '../Modules/Iam/Role/Role.route'
import { routesUser } from '../Modules/Iam/User/User.route'

export const Route = {
  Home: '/',
  Attachment: '/attachments',

  ...routesDashboard,
  ...routesAuth,
  ...routesAccount,
  ...routesUser,
  ...routesRole,

  // <--- Feature --->

  ...routesProduct,
  ...routesCategory,
  ...routesInventory,
}
