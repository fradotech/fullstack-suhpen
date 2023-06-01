import { Route } from 'react-router-dom'
import ProductDetail from './Pages/Product.Detail'
import ProductForm from './Pages/Product.Form'
import ProductIndex from './Pages/Product.Index'

const path = '/products'

export const routesProduct = {
  product: {
    index: path,
    form: `${path}/save`,
    edit: (id?: string) => `${path}/save/${id || ':id'}`,
    id: (id?: string) => `${path}/${id || ':id'}`,
    import: `${path}/sheet/import`,
    export: `${path}/sheet/export`,
  },
}

export default [
  <Route
    key={routesProduct.product.index}
    path={routesProduct.product.index}
    element={<ProductIndex />}
  />,
  <Route
    key={routesProduct.product.form}
    path={routesProduct.product.form}
    element={<ProductForm />}
  />,
  <Route
    key={routesProduct.product.id()}
    path={routesProduct.product.id()}
    element={<ProductDetail />}
  />,
  <Route
    key={routesProduct.product.edit()}
    path={routesProduct.product.edit()}
    element={<ProductForm />}
  />,
]
