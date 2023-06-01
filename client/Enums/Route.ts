import { routesDashboard } from '../Modules/Dashboard/Dashboard.route'
import { routesCategory } from '../Modules/Feature/Category/category.route'
import { routesInventory } from '../Modules/Feature/Inventory/inventory.route'
import { routesProduct } from '../Modules/Feature/Product/product.route'
import { routesAccount } from '../Modules/Iam/Account/account.route'
import { routesAuth } from '../Modules/Iam/Auth/auth.route'
import { routesRole } from '../Modules/Iam/Role/role.route'
import { routesUser } from '../Modules/Iam/User/user.route'

export const Route = {
  Home: '/',
  Attachment: '/attachments',

  ...routesDashboard,
  ...routesAuth,
  ...routesAccount,
  ...routesUser,
  ...routesRole,

  // --- Feature --- \\

  ...routesProduct,
  ...routesCategory,
  ...routesInventory,
}
