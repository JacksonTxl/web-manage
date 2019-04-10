<template>
  <a-modal
    title="选择教练"
    width="50%"
    :footer="null"
    class="modal-brand-switch"
    v-model="show"
  >

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
  }
}
</script>
