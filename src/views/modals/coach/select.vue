<template>
  <a-modal
    title="选择教练"
    :footer="null"
    class="modal-brand-switch"
    v-model="show"
  >
    <div>
      <a-select
        mode="tags"
        style="width: 100%"
        @change="handleChange"
        placeholder="请输入教练昵称、姓名、手机号进行查询"
      >
        <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</a-select-option>
      </a-select>
      <p class="color-text-light mg-t8">已选择3个教练</p>
      <p class="ta-r">
        <st-button>取消</st-button>
        <st-button type="primary" class="mg-l8">确定</st-button>
      </p>
    </div>
  </a-modal>
</template>
<script>
import { Action } from 'rx-state'
import { switchMap, catchError, filter } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { imgFilter } from '@/filters/resource.filters'
export default {
  serviceInject() {
    return {
    }
  },
  data() {
    return {
      show: false
    }
  },
  created() {
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`)
    }
  }
}
</script>
