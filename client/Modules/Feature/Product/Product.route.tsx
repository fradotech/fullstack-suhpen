import { Route } from 'react-router-dom'
import ProductDetail from './Pages/Product.Detail'
import ProductForm from './Pages/Product.Form'
import ProductIndex from './Pages/Product.Index'
import { productPath } from './infrastructure/product.path'

const path = productPath

export default [
  <Route key={path.index} path={path.index} element={<ProductIndex />} />,
  <Route key={path.form} path={path.form} element={<ProductForm />} />,
  <Route key={path.id()} path={path.id()} element={<ProductDetail />} />,
  <Route key={path.edit()} path={path.edit()} element={<ProductForm />} />,
]
