import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DescriptionContainer from '../../../Components/Organisms/Description/DescriptionContainer'
import DescriptionItem from '../../../Components/Organisms/Description/DescriptionItem'
import { Route } from '../../../Enums/Route'
import { userAction } from './user.action'

const UserDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await userAction.findOne(id)
  const { isLoading, data } = useQuery([UserDetail.name], fetch)
  const fields = data?.data && Object.keys(data.data)

  return (
    <>
      <PageHeader
        title="User Detail"
        isLoading={isLoading}
        hrefEdit={Route.user.edit(id)}
        hrefDelete={Route.user.id(id)}
      />
      <DescriptionContainer>
        {fields?.map((key) => DescriptionItem(data?.data, key))}
      </DescriptionContainer>
    </>
  )
}

export default UserDetail
