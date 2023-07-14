import { Route } from 'react-router-dom'
import CategoryForm from './Pages/Category.Form'
import CategoryIndex from './Pages/Category.Index'
import { categoryPath } from './infrastructure/category.path'

const path = categoryPath

export default [
  <Route key={path.index} path={path.index} element={<CategoryIndex />} />,
  <Route key={path.form} path={path.form} element={<CategoryForm />} />,
  <Route key={path.id()} path={path.id()} element={<CategoryForm />} />,
]
