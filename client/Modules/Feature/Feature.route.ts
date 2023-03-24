import CategoryRoute from './Category/Category.route'
import InventoryRoute from './Product/Inventory/Inventory.route'
import ProductRoute from './Product/Product.route'

export default [...ProductRoute, ...CategoryRoute, ...InventoryRoute]
