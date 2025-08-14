<template>
  <div class="e-textfield">
    <label v-if="label" :for="inputId" class="e-textfield__label">{{ label }}</label>
    <input
      class="e-textfield__input"
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :value="value"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
let seed = 0
const genId = () => { try { return crypto.randomUUID() } catch { return `etf-${++seed}` } }

interface Props {
  id?: string
  label?: string
  /** 用 v-model:value 綁定 */
  value?: string | number
  type?: 'text' | 'number' | 'email' | 'password'
  placeholder?: string
  disabled?: boolean
  maxlength?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:value', v: string | number | undefined): void
}>()

const inputId = computed(() => props.id || genId())

function onInput(e: Event) {
  const el = e.target as HTMLInputElement
  const v = props.type === 'number'
    ? (el.value === '' ? undefined : Number(el.value))
    : el.value
  emit('update:value', v)
}
</script>

<style scoped lang="scss">
.e-textfield {
  display: grid;
  gap: 6px;

  &__label {
    font-weight: 600;
    font-size: 14px;
  }

  &__input {
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    color: #fff;
    background: transparent;
    border-radius: 8px;
    outline: none;
    transition: border-color .15s ease, box-shadow .15s ease;

    &:focus {
      border-color: #60fad9;
      box-shadow: 0 0 0 2px rgba(96,165,250,.2);
    }
  }
}
</style>