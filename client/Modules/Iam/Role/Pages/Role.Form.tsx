import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { RoleCreateRequest } from '@server/modules/iam/role/infrastructure/role.request'
import { RoleResponse } from '@server/modules/iam/role/infrastructure/role.response'
import { Form } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../../Components/Organisms/Form/FormContainer'
import { Path } from '../../../../common/Path'
import RoleFieldsMain from '../common/RoleFieldsMain'
import RoleFieldsSelectPermissions from '../common/RoleFieldsSelectPermissions'
import { RoleAction } from '../infrastructure/role.action'

const RoleForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<RoleCreateRequest>()

  const fetch = async () => {
    setIsLoading(true)
    const res = await RoleAction.findOne(id)
    form.setFieldsValue(res.data)
    setIsLoading(false)
  }

  useQuery([RoleForm.name], id ? fetch : () => undefined, {
    refetchOnWindowFocus: false,
  })

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    let res: IApiRes<RoleResponse> | undefined
    if (!id) res = await RoleAction.create(data)
    if (id) res = await RoleAction.update(id, data)
    setIsLoading(false)
    res?.data && navigate(Path.role.index)
  }

  return (
    <>
      <PageHeader title={id ? 'Role' : 'New Role'} isLoading={isLoading} />
      <FormContainer
        onFinish={onFinish}
        form={form}
        layout="vertical"
        button={{ disabled: isLoading }}
      >
        <RoleFieldsMain form={form} />
      </FormContainer>
      <RoleFieldsSelectPermissions form={form} />
    </>
  )
}

export default RoleForm
