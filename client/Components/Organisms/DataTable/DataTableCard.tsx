import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { Card, Image } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './DataTable.module.css'

interface IProps {
  data: IBaseEntity[]
}

const DataTableCard: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      {props?.data?.map((data) => {
        return (
          <Link to={data.id}>
            <Card
              hoverable
              className={styles.card}
              bodyStyle={{ padding: '12px 6px' }}
              cover={
                <Image
                  preview={false}
                  className={styles.cardImage}
                  src={
                    data['image'] ||
                    data['avatar'] ||
                    data['attachment'] ||
                    data['thumbnail'] ||
                    data['product.thumbnail'] ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTePMj58FBFsHtzB3I_bU_u0tX1kEa0FGZ4NFqTMzGd2nI0KvKbP-XQJm-7KYbAhFjsei0&usqp=CAU'
                  }
                />
              }
            >
              {data['name'] ||
                data['title'] ||
                data['key'] ||
                data['product.name'] ||
                String(data)}
            </Card>
          </Link>
        )
      })}
    </>
  )
}

export default DataTableCard
