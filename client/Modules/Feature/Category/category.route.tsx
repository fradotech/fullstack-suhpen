import { Route } from 'react-router-dom'
import CategoryDetail from './Pages/Category.Detail'
import CategoryForm from './Pages/Category.Form'
import CategoryIndex from './Pages/Category.Index'

const path = '/categories'

export const routesCategory = {
  category: {
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
    key={routesCategory.category.index}
    path={routesCategory.category.index}
    element={<CategoryIndex />}
  />,
  <Route
    key={routesCategory.category.form}
    path={routesCategory.category.form}
    element={<CategoryForm />}
  />,
  <Route
    key={routesCategory.category.id()}
    path={routesCategory.category.id()}
    element={<CategoryDetail />}
  />,
  <Route
    key={routesCategory.category.edit()}
    path={routesCategory.category.edit()}
    element={<CategoryForm />}
  />,
]
