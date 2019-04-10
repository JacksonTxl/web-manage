<template>
  <a-modal
    title="选择场馆"
    :footer="null"
    class="modal-brand-switch"
    v-model="show"
  >
    <div>
      <div class="pd-md bordered">
        <a-tree
          checkable
          v-model="checkedKeys"
          :selectedKeys="selectedKeys"
          :treeData="treeData"
          @check="onCheck"
        />
      </div>
      <p class="color-text-light mg-t8">共5家场馆，已选择3家场馆</p>
      <p class="ta-r">
        <st-button type="primary">确定</st-button>
      </p>
    </div>
  </a-modal>
</template>
<script>
import { Action } from 'rx-state'
import { switchMap, catchError, filter } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { imgFilter } from '@/filters/resource.filters'
const treeData = [{
  title: '上海市',
  key: '0-0',
  children: [{
    title: '徐汇区',
    key: '0-0-0',
    children: [
      { title: '三体云动上海店', key: '0-0-0-0' },
      { title: '三体云动上海2店', key: '0-0-0-1' }
    ]
  }, {
    title: '黄浦区',
    key: '0-0-1',
    children: [
      { title: '黄浦区1店', key: '0-0-1-0' },
      { title: '黄浦区2店', key: '0-0-1-1' }
    ]
  }]
}, {
  title: '北京市',
  key: '0-1',
  children: [
    { title: '北京1店', key: '0-1-0-0' },
    { title: '北京2店', key: '0-1-0-1' },
    { title: '北京3店', key: '0-1-0-2' }
  ]
}]

export default {
  serviceInject() {
    return {
    }
  },
  data() {
    return {
      show: false,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
      treeData
    }
  },
  created() {
  },
  methods: {
    onCheck(checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    }
  }
}
</script>
