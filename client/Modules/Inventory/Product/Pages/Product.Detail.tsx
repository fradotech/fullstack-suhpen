import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DescriptionContainer from '../../../../Components/Organisms/Description/DescriptionContainer'
import DescriptionItem from '../../../../Components/Organisms/Description/DescriptionItem'
import { Path } from '../../../../common/Path'
import VariantIndex from '../../Variant/Pages/Variant.Index'
import { ProductAction } from '../infrastructure/product.action'

const ProductDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await ProductAction.findOne(id)
  const { isLoading, data } = useQuery([ProductDetail.name], fetch)
  const fields = data?.data && Object.keys(data.data)

  return (
    <>
      <PageHeader
        title="Product Detail"
        isLoading={isLoading}
        hrefIndex={Path.product.index}
        hrefEdit={Path.product.edit(id)}
        hrefDelete={Path.product.id(id)}
      />
      <Section>
        <DescriptionContainer>
          {fields?.map((key) => DescriptionItem(data?.data, key))}
        </DescriptionContainer>
      </Section>
      <VariantIndex productId={id} />
    </>
  )
}

export default ProductDetail
