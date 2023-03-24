import React from 'react'
import { PageHeader } from '../../Components/Molecules/Headers/PageHeader'
import DashboardProduct from './Sections/DashboardInventory'

const Dashboard: React.FC = () => {
  return (
    <>
      <PageHeader title="Dashboard" />
      <DashboardProduct />
    </>
  )
}

export default Dashboard
