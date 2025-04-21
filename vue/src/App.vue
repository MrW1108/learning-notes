<template>
  <div class="app">
    <h1>Vite HMR Demo</h1>
    <Counter />
    <p class="hint">尝试修改 Counter.vue 中的代码，观察 HMR 效果</p>
  </div>
</template>

<script setup>
import Counter from './components/Counter.vue'
</script>

<style>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.hint {
  color: #666;
  font-size: 0.9em;
  margin-top: 2rem;
}
</style> 