<script setup lang="ts">
import { ref } from 'vue'
import { ElCard, ElButton, ElInput, ElRow, ElCol } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

// Calculator state
const display = ref('')
const previousValue = ref<number | null>(null)
const currentOperation = ref<string | null>(null)
const newNumber = ref(true)

// Calculator operations
const operations = {
  add: (a: number, b: number) => a + b,
  subtract: (a: number, b: number) => a - b,
  multiply: (a: number, b: number) => a * b,
  divide: (a: number, b: number) => (b !== 0 ? a / b : null)
}

// Handle number input
const appendNumber = (num: string) => {
  if (newNumber.value) {
    display.value = num
    newNumber.value = false
  } else {
    display.value += num
  }
}

// Handle decimal point
const appendDecimal = () => {
  if (!display.value.includes('.')) {
    display.value += '.'
  }
}

// Handle operations
const handleOperation = (operation: string) => {
  if (display.value === '') return

  if (previousValue.value !== null && !newNumber.value) {
    calculate()
  }

  previousValue.value = parseFloat(display.value)
  currentOperation.value = operation
  newNumber.value = true
}

// Calculate result
const calculate = () => {
  if (previousValue.value === null || currentOperation.value === null || newNumber.value) {
    return
  }

  const current = parseFloat(display.value)
  let result: number | null = null

  switch (currentOperation.value) {
    case '+':
      result = operations.add(previousValue.value, current)
      break
    case '-':
      result = operations.subtract(previousValue.value, current)
      break
    case '*':
      result = operations.multiply(previousValue.value, current)
      break
    case '/':
      result = operations.divide(previousValue.value, current)
      break
  }

  if (result !== null) {
    display.value = result.toString()
  } else {
    display.value = 'Error'
  }

  previousValue.value = null
  currentOperation.value = null
  newNumber.value = true
}

// Clear calculator
const clear = () => {
  display.value = ''
  previousValue.value = null
  currentOperation.value = null
  newNumber.value = true
}
</script>

<template>
  <ElCard shadow="hover" class="calculator">
    <template #header>
      <div class="card-header">
        <span>{{ t('calculator.title', 'Calculator') }}</span>
      </div>
    </template>

    <div class="calculator-body">
      <ElInput v-model="display" readonly placeholder="0" class="calculator-display" />

      <div class="calculator-buttons">
        <ElRow :gutter="8" class="mb-2">
          <ElCol :span="18">
            <ElButton type="danger" @click="clear">C</ElButton>
          </ElCol>
          <ElCol :span="6">
            <ElButton type="primary" @click="() => handleOperation('/')">/</ElButton>
          </ElCol>
        </ElRow>

        <ElRow :gutter="8" class="mb-2">
          <ElCol :span="6">
            <ElButton @click="() => appendNumber('7')">7</ElButton>
          </ElCol>
          <ElCol :span="6">
            <ElButton @click="() => appendNumber('8')">8</ElButton>
          </ElCol>
          <ElCol :span="6">
            <ElButton @click="() => appendNumber('9')">9</ElButton>
          </ElCol>
          <ElCol :span="6">
            <ElButton type="primary" @click="() => handleOperation('*')">×</ElButton>
          </ElCol>
        </ElRow>

        <ElRow :gutter="8" class="mb-2">
          <ElCol :span="6">
            <ElButton @click="() => appendNumber('4')">4</ElButton>
          </ElCol>
          <ElCol :span="6">
            <ElButton @click="() => appendNumber('5')">5</ElButton>
          </ElCol>
          <ElCol :span="6">
            <ElButton @click="() => appendNumber('6')">6</ElButton>
          </ElCol>
          <ElCol :span="6">
            <ElButton type="primary" @click="() => handleOperation('-')">-</ElButton>
          </ElCol>
        </ElRow>

        <ElRow :gutter="8" class="mb-2">
          <ElCol :span="6">
            <ElButton @click="() => appendNumber('1')">1</ElButton>
          </ElCol>
          <ElCol :span="6">
            <ElButton @click="() => appendNumber('2')">2</ElButton>
          </ElCol>
          <ElCol :span="6">
            <ElButton @click="() => appendNumber('3')">3</ElButton>
          </ElCol>
          <ElCol :span="6">
            <ElButton type="primary" @click="() => handleOperation('+')">+</ElButton>
          </ElCol>
        </ElRow>

        <ElRow :gutter="8">
          <ElCol :span="12">
            <ElButton @click="() => appendNumber('0')">0</ElButton>
          </ElCol>
          <ElCol :span="6">
            <ElButton @click="appendDecimal">.</ElButton>
          </ElCol>
          <ElCol :span="6">
            <ElButton type="success" @click="calculate">=</ElButton>
          </ElCol>
        </ElRow>
      </div>
    </div>
  </ElCard>
</template>

<style scoped>
.calculator {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.calculator-body {
  padding: 10px;
}

.calculator-display {
  margin-bottom: 15px;
  text-align: right;
}

.calculator-buttons {
  .mb-2 {
    margin-bottom: 8px;
  }

  :deep(.el-button) {
    width: 100%;
    justify-content: center;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
