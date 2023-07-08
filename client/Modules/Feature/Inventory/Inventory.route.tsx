import { Route } from 'react-router-dom'
import InventoryDetail from './Pages/Inventory.Detail'
import InventoryForm from './Pages/Inventory.Form'
import InventoryIndex from './Pages/Inventory.Index'
import { inventoryPath } from './infrastructure/inventory.path'

const path = inventoryPath

export default [
  <Route key={path.index} path={path.index} element={<InventoryIndex />} />,
  <Route key={path.form()} path={path.form()} element={<InventoryForm />} />,
  <Route key={path.id()} path={path.id()} element={<InventoryDetail />} />,
  <Route key={path.edit()} path={path.edit()} element={<InventoryForm />} />,
]
