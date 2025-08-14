<template>
  <button
    class="e-btn"
    :class="`e-btn-${color}`"
    :type="type"
    @click="$emit('click')"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
type BtnColor = 'success' | 'error' | 'warn'
type BtnType  = 'button' | 'submit' | 'reset'
interface Props {
  /** 若有輸入時以此為主，若沒有就顯示 slot */
  text?: string
  type?: BtnType
  /** 預設為 success */
  color?: BtnColor
}
withDefaults(defineProps<Props>(), { 
  color: 'success',
  type: 'button',
  disabled: false,
})
</script>

<style scoped lang="scss">
.e-btn {
  display: inline-block;
  margin-left: 5px;
  padding: 10px 12px;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: background .15s ease, transform .05s ease;
  &:active { transform: translateY(1px); }

  // success 綠
  &-success {
    background: #22c55e;
    &:hover  { background: #16a34a; }
    &:active { background: #15803d; }
  }

  // error 紅
  &-error {
    background: #ef4444;
    &:hover  { background: #dc2626; }
    &:active { background: #b91c1c; }
  }

  // warn 黃
  &-warn {
    background: #f59e0b;
    &:hover  { background: #d97706; }
    &:active { background: #b45309; }
  }
}
</style>
