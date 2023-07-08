import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DescriptionContainer from '../../../../Components/Organisms/Description/DescriptionContainer'
import DescriptionItem from '../../../../Components/Organisms/Description/DescriptionItem'
import { Path } from '../../../../common/Path'
import { VariantAction } from '../infrastructure/variant.action'

const VariantDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await VariantAction.findOne(id)
  const { isLoading, data } = useQuery([VariantDetail.name], fetch)
  const fields = data?.data && Object.keys(data.data)

  return (
    <>
      <PageHeader
        title="Variant Detail"
        isLoading={isLoading}
        hrefIndex={Path.variant.index}
        hrefEdit={Path.variant.edit(id)}
        hrefDelete={Path.variant.id(id)}
      />
      <Section>
        <DescriptionContainer>
          {fields?.map((key) => DescriptionItem(data?.data, key))}
        </DescriptionContainer>
      </Section>
    </>
  )
}

export default VariantDetail
