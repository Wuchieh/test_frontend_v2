<template>
  <div class="page">
    <!-- 操作 -->
    <section class="card card--op">
      <h2 class="title">{{ t('op') }}</h2>
      <div class="form">
        <ETextField :label="t('name')" v-model:value="form.name" placeholder="abc123" />
        <ETextField :label="t('age')" type="number" v-model:value="form.age" placeholder="18" />
        <div class="btns">
          <EBtn :text="t('edit')" color="success" :disabled="!selectedId" @click="open('edit')" />
          <EBtn :text="t('create')" color="warn" @click="open('add')" />
        </div>
      </div>
    </section>

    <!-- 清單 -->
    <section class="card">
      <h2 class="title">{{ t('list') }}</h2>
      <table class="table">
        <colgroup>
          <col style="width:64px"/><col/><col style="width:120px"/><col style="width:200px"/>
        </colgroup>
        <thead>
          <tr><th>#</th><th>{{ t('name') }}</th><th>{{ t('age') }}</th><th>{{ t('op') }}</th></tr>
        </thead>
        <tbody>
          <tr v-for="(u,i) in store.list" :key="u.id">
            <td>{{ i+1 }}</td>
            <td>{{ u.name }}</td>
            <td>{{ u.age }}</td>
            <td class="ops">
              <EBtn :text="t('edit')" color="success" @click="pick(u); open('edit')" />
              <EBtn :text="t('delete')" color="error" @click="selectedId=u.id; open('delete')" />
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- dialog 確認 -->
    <dialog ref="dlg">
      <form method="dialog" class="dialog">
        <h3 class="dialog__title">{{ dialogTitle }}</h3>
        <p class="dialog__msg">{{ dialogMsg }}</p>
        <div class="dialog__btns">
          <EBtn :text="t('cancel')" type="button" @click="dlg?.close()" />
          <EBtn :text="t('ok')"     type="button" :color="confirmAction==='delete'?'error':'success'" @click="onConfirm" />
        </div>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import EBtn from '@/components/EBtn.vue'
import ETextField from '@/components/ETextField.vue'
import { useAppStore, type UserItem } from '@/store/app'

const store = useAppStore()
await callOnce(() => store.fetchAll())
const { t } = useI18n()

// 表單
const form = reactive<{ name: string; age: number | undefined }>({ name: '', age: undefined })
const selectedId = ref<number | null>(null)

// dialog 控制
type Action = 'add' | 'edit' | 'delete'
const confirmAction = ref<Action>('add')
const dlg = ref<HTMLDialogElement | null>(null)

onMounted(() => { store.fetchAll() })

// 行為
function pick(u: UserItem){ selectedId.value = u.id; form.name = u.name; form.age = u.age }
function open(act: Action){
  confirmAction.value = act
  if (act !== 'delete' && !validate()) return
  dlg.value?.showModal()
}
async function onConfirm(){
  try{
    if (confirmAction.value === 'add'){
      await store.create({
        name: form.name.trim(),
        age: Number(form.age)
      })
      reset()
    }else if (confirmAction.value === 'edit' && selectedId.value != null){
      await store.update({
          id: selectedId.value!,
          name: form.name.trim(),
          age: Number(form.age)
      })
    }else if (confirmAction.value === 'delete' && selectedId.value != null){
      await store.remove(selectedId.value)
      reset()
    }
  } finally { dlg.value?.close() }
}


function validate(){
  if (!form.name?.trim()) return false
  const a = form.age
  if (a === undefined || !Number.isInteger(a) || a < 1 || a > 120) return false
  return true
}
function reset(){ form.name=''; form.age=undefined; selectedId.value=null }

// dialog 文字
const dialogTitle = computed(() => {
  return confirmAction.value === 'add'
    ? '確認新增'
    : confirmAction.value === 'edit'
      ? '確認修改'
      : '確認刪除'
})
const dialogMsg = computed(() => {
  if (confirmAction.value === 'add') {
    return `要新增「${form.name} / ${form.age ?? ''}」嗎？`
  } else if (confirmAction.value === 'edit') {
    return `要把 #${selectedId.value} 修改為「${form.name} / ${form.age ?? ''}」嗎？`
  }
  return `刪除 #${selectedId.value} 這筆資料？`
})
</script>

<style scoped lang="scss">

.page{
  min-height: 100vh;
  padding: 10px 8px 40px;
  background: #232425;
  color: #fff;
  display: grid;
  gap: 24px;
  justify-items: center;
  align-content: start;
}

.card{
  width: min(560px, 96vw);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.35);
  border-radius: 16px;
  padding: 28px 28px;
}

.title{
  text-align: center;
  font-size: 22px;
  font-weight: 800;
  margin: 6px 0 18px;
}

.card--op {
  padding-bottom: 24px;
  
  .form {
    max-width: 440px;
    margin: 0 auto;
    display: grid;
    gap: 14px;
  }

  .btns {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 40px;
    margin-top: 14px;
  }
}


.table{
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;

  thead tr{ border-bottom: 1px solid rgba(255,255,255,.25); }
  thead th{
    padding: 10px 12px;
    color: rgba(255,255,255,.8);
    font-weight: 700;
    text-align: center;
  }

  tbody tr{ border-bottom: 1px solid rgba(255,255,255,.18); }
  tbody td{
    padding: 12px;
    text-align: center;
  }


  tbody td.ops{
    text-align: center;
  }
  tbody td.ops > *{
    display: inline-flex;
    gap: 8px;
  }
}

</style>