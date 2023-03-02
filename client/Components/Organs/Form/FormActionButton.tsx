import { Button, Row } from 'antd'
import React from 'react'

export interface IFormActionButtonProps {
  buttonActions?: React.ReactNode[]
  justify?: 'start' | 'end'
  style?: React.CSSProperties
  disabled?: boolean
  singleSubmitText?: string
}

const FormActionButton = (props: IFormActionButtonProps) => {
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
              style={{ width: '100%' }}
            >
              {props.singleSubmitText || 'Save'}
            </Button>
          </React.Fragment>
        )}
      </div>
    </Row>
  )
}

export default FormActionButton
