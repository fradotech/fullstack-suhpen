import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DescriptionContainer from '../../../../Components/Organisms/Description/DescriptionContainer'
import DescriptionItem from '../../../../Components/Organisms/Description/DescriptionItem'
import { Path } from '../../../../Enums/Path'
import { PermissionAction } from '../infrastructure/permission.action'

const PermissionDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await PermissionAction.findOne(id)
  const { isLoading, data } = useQuery([PermissionDetail.name], fetch)
  const fields = data?.data && Object.keys(data.data)

  return (
    <>
      <PageHeader
        title="Permission Detail"
        isLoading={isLoading}
        hrefIndex={Path.permission.index}
        hrefEdit={Path.permission.edit(id)}
        hrefDelete={Path.permission.id(id)}
      />
      <Section>
        <DescriptionContainer>
          {fields?.map((key) => DescriptionItem(data?.data, key))}
        </DescriptionContainer>
      </Section>
    </>
  )
}

export default PermissionDetail
