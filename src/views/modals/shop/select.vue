<template>
  <a-modal
    title="选择场馆"
    :footer="null"
    class="modal-brand-switch"
    v-model="show"
  >
    <div>
      <st-container>
        <a-tree
          checkable
          v-model="checkedKeys"
          :selectedKeys="selectedKeys"
          :treeData="treeData"
          @check="onCheck"
        />

      </st-container>
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
import { SelectService } from './select.service'
import { json2AntDesignTreeData } from '@/utils/json-2-tree-data'

export default {
  serviceInject() {
    return {
      selectService: SelectService
    }
  },
  data() {
    return {
      show: false,
      checkedKeys: [],
      selectedKeys: [],
      treeData: []
    }
  },
  created() {
    this.selectService.getShopListTree().subscribe(res => {
      this.treeData = json2AntDesignTreeData(res.shop_list.province_list)
      console.log(this.treeData)
    })
  },
  methods: {
    onCheck(checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    }
  }
}
</script>
