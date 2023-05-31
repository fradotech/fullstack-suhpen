import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../Components/Molecules/Section/Section'
import DescriptionContainer from '../../../Components/Organisms/Description/DescriptionContainer'
import DescriptionItem from '../../../Components/Organisms/Description/DescriptionItem'
import { Route } from '../../../Enums/Route'
import { categoryAction } from './category.action'

const CategoryDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await categoryAction.findOne(id)
  const { isLoading, data } = useQuery([CategoryDetail.name], fetch)
  const fields = data?.data && Object.keys(data.data)

  return (
    <>
      <PageHeader
        title="Category Detail"
        isLoading={isLoading}
        hrefIndex={Route.category.index}
        hrefEdit={Route.category.edit(id)}
        hrefDelete={Route.category.id(id)}
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
