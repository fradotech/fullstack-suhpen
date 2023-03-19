import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { Link } from 'react-router-dom'
import { axiosService } from '../../../services/axios.service'
import Loading from '../Loading/Loading'
import styles from './PageHeader.module.css'

interface IProps {
  title: string
  isLoading?: boolean
  hrefEdit?: string
  hrefDelete?: string
}

export const PageHeader: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <Loading isLoading={props.isLoading} />
      <Row className={styles.container}>
        <Title className={styles.title}>{props.title}</Title>
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
              onConfirm={() => axiosService.delete(props.hrefDelete)}
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
