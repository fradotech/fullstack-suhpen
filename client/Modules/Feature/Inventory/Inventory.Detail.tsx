import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DescriptionContainer from '../../../Components/Organisms/Description/DescriptionContainer'
import DescriptionItem from '../../../Components/Organisms/Description/DescriptionItem'
import { Route } from '../../../Enums/Route'
import { inventoryAction } from './inventory.action'

const InventoryDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await inventoryAction.findOne(id)
  const { isLoading, data } = useQuery([InventoryDetail.name], fetch)
  const fields = data?.data && Object.keys(data.data)

  return (
    <>
      <PageHeader
        title="Inventory Detail"
        isLoading={isLoading}
        hrefEdit={Route.inventory.edit(id)}
        hrefDelete={Route.inventory.id(id)}
      />
      <DescriptionContainer>
        {fields?.map((key) => DescriptionItem(data?.data, key))}
      </DescriptionContainer>
    </>
  )
}

export default InventoryDetail
