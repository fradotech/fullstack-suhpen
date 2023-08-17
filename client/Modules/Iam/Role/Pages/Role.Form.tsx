import { RoleCreateRequest } from '@server/modules/iam/role/v1/role.request'
import { Form } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../../Components/Organisms/Form/FormContainer'
import { Path } from '../../../../common/Path'
import RoleFieldsMain from '../Components/RoleFieldsMain'
import RoleFieldsSelectPermissions from '../Components/RoleFieldsSelectPermissions'
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

    if (id) await RoleAction.update(id, data)
    else {
      const res = await RoleAction.create(data)
      res.data && navigate(Path.role.index)
    }

    setIsLoading(false)
  }

  return (
    <>
      <PageHeader title={id ? 'Role' : 'New Role'} />
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
