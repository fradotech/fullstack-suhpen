import { DeleteFilled, SaveFilled } from '@ant-design/icons'
import { Button, FormInstance, Popconfirm, Row } from 'antd'
import React from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Util } from '../../../../@server/common/utils/util'
import { PermissionMethodEnum } from '../../../../@server/modules/iam/permission/common/permission.enum'
import isHasPermission from '../../../Modules/Iam/Role/common/isHasPermission'
import useModules from '../../../common/useModules'
import { API } from '../../../infrastructure/api.service'

export interface IFormActionButtonProps {
  form?: FormInstance<any>
  buttonActions?: React.ReactNode[]
  justify?: 'start' | 'end'
  style?: React.CSSProperties
  disabled?: boolean
  singleSubmitText?: string
  hrefDelete?: string
}

const FormActionButton = (props: IFormActionButtonProps) => {
  const navigate = useNavigate()
  const { modules } = useModules()

  const isHasValue = React.useMemo(() => {
    return Util.objectIsEmpty(props.form?.getFieldsValue())
  }, [props.form?.getFieldsValue()])

  const renderIfHasPermission = (href: string | undefined): boolean => {
    if (!href) return false
    // TODO: validate custom props.hrefDelete
    const permissionKey = `${PermissionMethodEnum.delete.name}/${modules}/:id`
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
            <Button
              type="primary"
              htmlType="submit"
              disabled={props.disabled}
              style={{ float: 'right' }}
              icon={isHasValue ? <FaPaperPlane /> : <SaveFilled />}
            >
              {props.singleSubmitText || isHasValue ? 'Submit' : 'Update'}
            </Button>

            {renderIfHasPermission(props.hrefDelete || location.pathname) && (
              <Popconfirm
                title={'Are you sure want to delete?'}
                onConfirm={async () => {
                  await API.delete(props.hrefDelete || location.pathname)
                  modules && navigate(`/${modules}`)
                }}
              >
                <Button
                  type="primary"
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
