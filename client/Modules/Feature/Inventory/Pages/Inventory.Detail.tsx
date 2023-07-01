import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DescriptionContainer from '../../../../Components/Organisms/Description/DescriptionContainer'
import DescriptionItem from '../../../../Components/Organisms/Description/DescriptionItem'
import { Path } from '../../../../Enums/Path'
import { InventoryAction } from '../infrastructure/inventory.action'

const InventoryDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await InventoryAction.findOne(id)
  const { isLoading, data } = useQuery([InventoryDetail.name], fetch)
  const fields = data?.data && Object.keys(data.data)

  return (
    <>
      <PageHeader
        title="Inventory Detail"
        isLoading={isLoading}
        hrefIndex={Path.inventory.index}
        hrefEdit={Path.inventory.edit(id)}
        hrefDelete={Path.inventory.id(id)}
      />
      <Section>
        <DescriptionContainer>
          {fields?.map((key) => DescriptionItem(data?.data, key))}
        </DescriptionContainer>
      </Section>
    </>
  )
}

export default InventoryDetail
