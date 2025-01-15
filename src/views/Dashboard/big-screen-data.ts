import { EChartsOption } from 'echarts'

// 历年计划项目数量
export const yearlyProjectOptions: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['2019', '2020', '2021', '2022', '2023'],
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '项目数量',
      type: 'bar',
      barWidth: '60%',
      data: [120, 180, 150, 200, 250],
      itemStyle: {
        color: '#409EFF'
      }
    }
  ]
}

// 历年统市比比例
export const yearlyRatioOptions: EChartsOption = {
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['2019', '2020', '2021', '2022', '2023']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}%'
    }
  },
  series: [
    {
      name: '统市比',
      type: 'line',
      data: [65, 70, 75, 72, 80],
      smooth: true,
      lineStyle: {
        color: '#67C23A'
      },
      itemStyle: {
        color: '#67C23A'
      }
    }
  ]
}

// 区域地图配置
export const mapOptions: EChartsOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}'
  },
  title: {
    text: '区域分布',
    left: 'center',
    textStyle: {
      color: '#303133',
      fontSize: 16
    }
  },
  series: [
    {
      type: 'scatter',
      coordinateSystem: 'geo',
      data: [
        { name: '区域1', value: [121.5, 29.8, 3] },  // Adjusted for Ningbo coordinates
        { name: '区域2', value: [121.6, 29.9, 7] },
        { name: '区域3', value: [121.4, 29.7, 9] },
        { name: '区域4', value: [121.5, 29.6, 10] }
      ],
      symbolSize: 30,
      label: {
        show: true,
        formatter: '{@[2]}',
        position: 'inside',
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
      },
      itemStyle: {
        color: '#409EFF',
        borderColor: '#fff',
        borderWidth: 2
      }
    }
  ],
  geo: {
    map: 'ningbo',  // We'll need to register this map
    roam: false,    // Disable map dragging/zooming for better UX
    center: [121.5, 29.8],  // Center on Ningbo
    zoom: 1.2,
    label: {
      show: true,
      color: '#666'
    },
    itemStyle: {
      areaColor: '#f5f7fa',
      borderColor: '#e4e7ed',
      borderWidth: 1.5
    },
    emphasis: {
      itemStyle: {
        areaColor: '#ecf5ff'
      },
      label: {
        color: '#409EFF'
      }
    },
    select: {
      itemStyle: {
        areaColor: '#ecf5ff'
      }
    }
  }
}
