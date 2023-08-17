import { DeleteFilled, SaveFilled } from '@ant-design/icons'
import { Button, FormInstance, Popconfirm, Row } from 'antd'
import React from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Util } from '../../../../@server/common/utils/util'
import { PermissionMethodEnum } from '../../../../@server/modules/iam/permission/common/permission.enum'
import isHasPermission from '../../../Modules/Iam/Role/Components/isHasPermission'
import useModules from '../../../common/useModules'
import { API } from '../../../infrastructure/api.service'

export interface IFormActionButtonProps {
  form?: FormInstance<any>
  buttonActions?: React.ReactNode[]
  justify?: 'start' | 'end'
  style?: React.CSSProperties
  disabled?: boolean
  singleSubmitText?: string
}

const FormActionButton = (props: IFormActionButtonProps) => {
  const navigate = useNavigate()
  const { modules } = useModules()

  const isHasValue = React.useMemo(() => {
    return Util.objectIsEmpty(props.form?.getFieldsValue())
  }, [props.form?.getFieldsValue()])

  const renderIfHasPermission = (method: PermissionMethodEnum): boolean => {
    if (!method || !modules) return false
    const permissionKey = `${method}/${modules}/:id`
    return isHasPermission([permissionKey], true)
  }

  return (
    <Row
      justify={props.justify || 'end'}
      style={{
        marginTop: '24px',
        marginBottom: '16px',
        ...props.style,
      }}
    >
      <div style={{ width: '100%' }}>
        {props.buttonActions ? (
          props.buttonActions.map((field, key) => (
            <React.Fragment key={key}>{field}</React.Fragment>
          ))
        ) : (
          <React.Fragment>
            {renderIfHasPermission(PermissionMethodEnum.Put) && (
              <Button
                type="primary"
                htmlType="submit"
                disabled={props.disabled}
                style={{ float: 'right' }}
                icon={isHasValue ? <FaPaperPlane /> : <SaveFilled />}
              >
                {props.singleSubmitText || isHasValue ? 'Submit' : 'Update'}
              </Button>
            )}

            {renderIfHasPermission(PermissionMethodEnum.Delete) && (
              <Popconfirm
                title={'Are you sure want to delete?'}
                onConfirm={async () => {
                  await API.delete(location.pathname)
                  modules && navigate(`/${modules}`)
                }}
              >
                <Button
                  icon={<DeleteFilled />}
                  danger
                  style={{ float: 'right', marginRight: '6px' }}
                >
                  Delete
                </Button>
              </Popconfirm>
            )}
          </React.Fragment>
        )}
      </div>
    </Row>
  )
}

export default FormActionButton
