import { Route } from 'react-router-dom'
import VariantDetail from './Pages/Variant.Detail'
import VariantForm from './Pages/Variant.Form'
import VariantIndex from './Pages/Variant.Index'
import { variantPath } from './infrastructure/variant.path'

const path = variantPath

export default [
  <Route key={path.index} path={path.index} element={<VariantIndex />} />,
  <Route key={path.form()} path={path.form()} element={<VariantForm />} />,
  <Route key={path.id()} path={path.id()} element={<VariantDetail />} />,
  <Route key={path.edit()} path={path.edit()} element={<VariantForm />} />,
]
