import CategoryRoute from './Category/category.route'
import InventoryRoute from './Inventory/inventory.route'
import ProductRoute from './Product/product.route'

export default [...ProductRoute, ...CategoryRoute, ...InventoryRoute]
