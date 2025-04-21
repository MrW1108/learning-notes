<template>
  <div class="counter">
    <h2>Counter Component</h2>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}


// 添加 HMR 处理
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    console.log('Counter component updated!', newModule)
  })
}
</script>

<style scoped>
.counter {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style> 