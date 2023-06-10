import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../../infrastructure/api.service'
import Loading from '../Loading/Loading'
import styles from './PageHeader.module.css'

interface IProps {
  title?: string
  isLoading?: boolean
  hrefIndex?: string
  hrefEdit?: string
  hrefDelete?: string
}

export const PageHeader: React.FC<IProps> = (props: IProps) => {
  const navigate = useNavigate()
  return (
    <>
      <Loading isLoading={props.isLoading} />
      <Row className={styles.container}>
        {props.title && <Title className={styles.title}>{props.title}</Title>}
        <Row>
          {props.hrefEdit && (
            <Link to={props.hrefEdit}>
              <Button type="primary" className={styles.actionButton}>
                <EditOutlined />
              </Button>
            </Link>
          )}
          {props.hrefDelete && (
            <Popconfirm
              title={'Are you sure want to delete?'}
              onConfirm={async () => {
                await API.delete(props.hrefDelete)
                navigate(props.hrefIndex)
              }}
            >
              <Button type="primary" className={styles.actionButton} danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          )}
        </Row>
      </Row>
    </>
  )
}
