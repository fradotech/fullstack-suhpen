import { LineConfig } from '@ant-design/charts'
import { Line } from '@ant-design/plots'
import React from 'react'

const DemoLine = () => {
  const data = [
    {
      month: 'Januari',
      value: 3,
    },
    {
      month: 'Februari',
      value: 4,
    },
    {
      month: 'Maret',
      value: 3.5,
    },
    {
      month: 'April',
      value: 5,
    },
    {
      month: 'Mei',
      value: 4.9,
    },
    {
      month: 'Juni',
      value: 6,
    },
    {
      month: 'Juli',
      value: 7,
    },
    {
      month: 'Agustus',
      value: 9,
    },
    {
      month: 'September',
      value: 13,
    },
  ]
  const config: LineConfig = {
    data,
    xField: 'month',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  }
  return <Line {...config} style={{ height: '200px' }} />
}

export default DemoLine
