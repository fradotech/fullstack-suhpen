import { Pie } from '@ant-design/plots'
import React from 'react'

const DemoPie = () => {
  const data = [
    {
      type: 'AXIS',
      value: 27,
    },
    {
      type: 'TRY',
      value: 25,
    },
    {
      type: 'Telkomsel',
      value: 18,
    },
    {
      type: 'XL',
      value: 15,
    },
    {
      type: 'Indosat',
      value: 10,
    },
    {
      type: 'Ini Ngeleig',
      value: 5,
    },
  ]
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  }
  return <Pie {...config} style={{ height: '280px' }} />
}

export default DemoPie
