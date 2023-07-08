import CategoryRoute from './Category/Category.route'
import ProductRoute from './Product/Product.route'
import VariantRoute from './Variant/Variant.route'

export default [...ProductRoute, ...CategoryRoute, ...VariantRoute]
