import { Col, Form, FormProps, Grid, Row } from 'antd'
import FormActionButton, { IFormActionButtonProps } from './FormActionButton'

interface IFormProps extends FormProps {
  isFieldCentered?: boolean
  centered?: boolean
  button?: IFormActionButtonProps | false
}

const FormContainer = (props: IFormProps): JSX.Element => {
  const { isFieldCentered, centered: centered, children, ...rest } = props
  const { lg } = Grid.useBreakpoint()

  return (
    <Row justify={centered && !isFieldCentered ? 'center' : 'start'}>
      <Col
        span={centered ? (lg ? 10 : isFieldCentered ? 16 : 24) : 24}
        offset={isFieldCentered ? (lg ? 8 : 6) : 0}
      >
        <Form
          {...rest}
          layout={isFieldCentered ? 'horizontal' : props.layout}
          labelCol={
            isFieldCentered
              ? {
                  span: 8,
                  style: isFieldCentered && {
                    position: 'absolute',
                    transform: 'translateX(-100%)',
                  },
                }
              : undefined
          }
          wrapperCol={isFieldCentered ? { span: 18 } : undefined}
          style={{ ...props.style }}
        >
          <>
            {children}
            {props.button && <FormActionButton {...props.button} />}
          </>
        </Form>
      </Col>
    </Row>
  )
}

export default FormContainer
