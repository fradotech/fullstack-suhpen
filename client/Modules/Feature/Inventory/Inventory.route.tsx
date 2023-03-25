import React from 'react'
import { Route } from 'react-router-dom'

const InventoryDetail = React.lazy(() => import('./Inventory.Detail'))
const InventoryForm = React.lazy(() => import('./Inventory.Form'))
const InventoryS = React.lazy(() => import('./Inventory.S'))

const path = '/inventories'

export const routesInventory = {
  inventory: {
    index: path,
    form: (productId?: string) => `${path}/${productId || ':productId'}/save`,
    edit: (id?: string) => `${path}/save/${id || ':id'}`,
    id: (id?: string) => `${path}/${id || ':id'}`,
    import: `${path}/sheet/import`,
    export: `${path}/sheet/export`,
  },
}

export default [
  <Route
    key={routesInventory.inventory.index}
    path={routesInventory.inventory.index}
    element={<InventoryS />}
  />,
  <Route
    key={routesInventory.inventory.form()}
    path={routesInventory.inventory.form()}
    element={<InventoryForm />}
  />,
  <Route
    key={routesInventory.inventory.id()}
    path={routesInventory.inventory.id()}
    element={<InventoryDetail />}
  />,
  <Route
    key={routesInventory.inventory.edit()}
    path={routesInventory.inventory.edit()}
    element={<InventoryForm />}
  />,
]
