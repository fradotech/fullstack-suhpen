import { Route } from 'react-router-dom'
import VariantForm from './Pages/Variant.Form'
import VariantIndex from './Pages/Variant.Index'
import { variantPath } from './infrastructure/variant.path'

const path = variantPath

export default [
  <Route key={path.index} path={path.index} element={<VariantIndex />} />,
  <Route key={path.form()} path={path.form()} element={<VariantForm />} />,
  <Route key={path.id()} path={path.id()} element={<VariantForm />} />,
]
