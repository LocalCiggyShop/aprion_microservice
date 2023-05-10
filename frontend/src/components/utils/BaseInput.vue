<template>
  <div class="form_item">
    <label v-if="label">{{ label }}</label>
    <br>
    <input 
      type="text" 
      :placeholder="label"
      class="bg-gray-50 outline-none border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  }
});
</script>
<!-- block mb-2 text-sm font-medium text-gray-900 dark:text-white -->
  
<!-- <style scoped>
@import "../assets/base.css";

.inputField {
  width: 100%;
  display: block;
  margin-bottom: 2;
  font-size: medium;
  color: rgba(128, 128, 128, 0.666);
  display: inline-block;
  height: 30px;
  color: var(--vt-c-black);
  font-size: medium;
  padding: 3px;
  outline: none;
  border: 1.5px solid var(--vt-c-divider-dark-3);
  box-sizing: border-box;
  border-radius: 2px;
} 

</style> -->
