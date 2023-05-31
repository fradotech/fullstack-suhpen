import React from 'react'
import { Route } from 'react-router-dom'

const ProductDetail = React.lazy(() => import('./Product.Detail'))
const ProductForm = React.lazy(() => import('./Product.Form'))
const ProductS = React.lazy(() => import('./Product.Index'))

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
    element={<ProductS />}
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
