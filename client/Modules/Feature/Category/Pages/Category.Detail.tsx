import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DescriptionContainer from '../../../../Components/Organisms/Description/DescriptionContainer'
import DescriptionItem from '../../../../Components/Organisms/Description/DescriptionItem'
import { Path } from '../../../../common/Path'
import { CategoryAction } from '../infrastructure/category.action'

const CategoryDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await CategoryAction.findOne(id)
  const { isLoading, data } = useQuery([CategoryDetail.name], fetch)
  const fields = data?.data && Object.keys(data.data)

  return (
    <>
      <PageHeader
        title="Category Detail"
        isLoading={isLoading}
        hrefIndex={Path.category.index}
        hrefEdit={Path.category.edit(id)}
        hrefDelete={Path.category.id(id)}
      />
      <Section>
        <DescriptionContainer>
          {fields?.map((key) => DescriptionItem(data?.data, key))}
        </DescriptionContainer>
      </Section>
    </>
  )
}

export default CategoryDetail
