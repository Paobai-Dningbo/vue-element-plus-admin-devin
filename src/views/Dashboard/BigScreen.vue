<template>
  <div class="big-screen-page">
    <el-row>
      <!-- Header Section -->
      <el-col :span="24">
        <div class="header-section">
          <h1 class="main-title">XX区房屋征收一屏总览</h1>
          <div class="summary-stats">
            <div class="stat-item">
              <span class="label">计划项目数量:</span>
              <span class="value">349个</span>
            </div>
            <div class="stat-item">
              <span class="label">计划征收户数:</span>
              <span class="value">349户</span>
            </div>
            <div class="stat-item">
              <span class="label">计划征收面积:</span>
              <span class="value">349m²</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-section">
      <!-- Left Chart Section -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <div class="chart-container">
          <h3 class="chart-title">历年计划项目数量</h3>
          <Echart :options="yearlyProjectOptions" :height="300" />
        </div>
      </el-col>

      <!-- Middle Map Section -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <div class="chart-container">
          <h3 class="chart-title">区域分布</h3>
          <Echart :options="mapOptions" :height="300" />
        </div>
      </el-col>

      <!-- Right Chart Section -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <div class="chart-container">
          <h3 class="chart-title">历年统市比比例</h3>
          <Echart :options="yearlyRatioOptions" :height="300" />
        </div>
      </el-col>
    </el-row>

    <el-row class="progress-section">
      <el-col :span="24">
        <h3 class="section-title">项目进度</h3>
        <div class="progress-list">
          <div v-for="(item, index) in progressData" :key="index" class="progress-item">
            <div class="progress-info">
              <span class="progress-name">{{ item.name }}</span>
              <span class="progress-percentage">{{ item.percentage }}%</span>
            </div>
            <el-progress :percentage="item.percentage" :color="item.color" :stroke-width="10" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { Echart } from '@/components/Echart'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { yearlyProjectOptions, yearlyRatioOptions, mapOptions } from './big-screen-data'

// Register map data
const ningboGeoJson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'XX区' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [121.4, 29.6],
            [121.6, 29.6],
            [121.6, 29.9],
            [121.4, 29.9],
            [121.4, 29.6]
          ]
        ]
      }
    }
  ]
}

onMounted(() => {
  echarts.registerMap('ningbo', ningboGeoJson)
})

// Progress data
const progressData = ref([
  { name: '项目1', percentage: 75, color: '#409EFF' },
  { name: '项目2', percentage: 65, color: '#67C23A' },
  { name: '项目3', percentage: 45, color: '#E6A23C' }
])

// Window resize handling
const { width } = useWindowSize()

// Cleanup function
onUnmounted(() => {
  // Add any cleanup if needed
})
</script>

<style scoped>
.big-screen-page {
  min-height: 100vh;
  padding: 20px;
  background-color: #f0f2f5;
}

.header-section {
  margin-bottom: 30px;
  text-align: center;
}

.main-title {
  margin-bottom: 20px;
  font-size: 28px;
  color: #303133;
}

.summary-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.stat-item {
  text-align: center;
}

.stat-item .label {
  font-size: 14px;
  color: #909399;
}

.stat-item .value {
  margin-left: 8px;
  font-size: 24px;
  color: #409eff;
}

.chart-section {
  margin-bottom: 30px;
}

.chart-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.chart-title {
  margin-bottom: 20px;
  font-size: 16px;
  color: #303133;
}

.progress-section {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.section-title {
  margin-bottom: 20px;
  font-size: 16px;
  color: #303133;
}

.progress-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.progress-item {
  margin-bottom: 15px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.progress-name {
  font-size: 14px;
  color: #606266;
}

.progress-percentage {
  font-size: 14px;
  color: #909399;
}

@media screen and (width <= 768px) {
  .summary-stats {
    flex-direction: column;
    gap: 20px;
  }

  .chart-container {
    margin-bottom: 20px;
  }
}
</style>
