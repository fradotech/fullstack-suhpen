import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { Card, Col, Divider, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import { FilterState } from 'client/Components/Organisms/DataTable/DataTable.interface'
import React from 'react'
import DataTable from '../../../../client/Components/Organisms/DataTable/DataTable'
import { temperaturesColumns } from './dashboard-temperature.columns'
import { temperaturesData } from './dashboard-temperature.data'

const DashboardTemperature: React.FC = () => {
  return (
    <Col>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
        RANCANG BANGUN ALAT MONITORING PENETASAN PENYU SEMI ALAMI DI PULAU BUKU
        LIMAU, BELITUNG TIMUR
      </Title>
      <Row>
        <Card
          title="28° C"
          style={{ margin: '10px', backgroundColor: '#8dee9b' }}
        >
          Safe
        </Card>
        <Card
          title="25° C"
          style={{ margin: '10px', backgroundColor: '#ffea61' }}
        >
          Warning
        </Card>
        <Card
          title="45° C"
          style={{ margin: '10px', backgroundColor: '#F75964' }}
        >
          Danger
        </Card>
      </Row>
      <Divider />
      <DataTable
        columns={temperaturesColumns}
        dataSource={temperaturesData}
        onChange={function (filters: FilterState<IBaseEntity>): void {
          throw new Error('Function not implemented.')
        }}
      />
    </Col>
  )
}

export default DashboardTemperature
