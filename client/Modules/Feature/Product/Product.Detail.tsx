import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../Components/Molecules/Section/Section'
import DescriptionContainer from '../../../Components/Organisms/Description/DescriptionContainer'
import DescriptionItem from '../../../Components/Organisms/Description/DescriptionItem'
import { Route } from '../../../Enums/Route'
import InventoryS from '../Inventory/Inventory.S'
import { productAction } from './product.action'

const ProductDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await productAction.findOne(id)
  const { isLoading, data } = useQuery([ProductDetail.name], fetch)
  const fields = data?.data && Object.keys(data.data)

  return (
    <>
      <Section>
        <PageHeader
          title="Product Detail"
          isLoading={isLoading}
          hrefEdit={Route.product.edit(id)}
          hrefDelete={Route.product.id(id)}
        />
        <DescriptionContainer>
          {fields?.map((key) => DescriptionItem(data?.data, key))}
        </DescriptionContainer>
      </Section>
      <InventoryS productId={id} />
    </>
  )
}

export default ProductDetail
