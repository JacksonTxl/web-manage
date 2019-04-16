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
          :treeData="treeData"
          @check="onCheck"
        />

      </st-container>
      <p class="color-text-light mg-t8">共{{totalNum}}家场馆，已选择{{checedNum}}家场馆</p>
      <p class="ta-r">
        <st-button type="primary" @click="confirm">确定</st-button>
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
      treeData: [],
      checkedKeys: [],
      shopIds: []
    }
  },
  props: {
    checked: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    totalNum() {
      return 'xxx'
    },
    checedNum() {
      return this.shopIds.length
    }
  },
  created() {
    this.selectService.getShopListTree().subscribe(res => {
      this.treeData = json2AntDesignTreeData(res.shop_list.province_list)
      this.initCheckedKeys()
    })
  },
  methods: {
    initCheckedKeys() {
      const shopIds = this.checked
      this.shopIds = shopIds
      this.checkedKeys = shopIds.map(item => JSON.stringify({
        isLeaf: true,
        key: item
      }))
    },
    onCheck(checkedKeys) {
      this.checkedKeys = checkedKeys
      const shopIds = this.filterShopIds(checkedKeys)
    },
    filterShopIds(checkedKeys) {
      const shopIds = []
      checkedKeys.forEach(item => {
        item = JSON.parse(item)
        if (item.isLeaf) {
          shopIds.push(item.key)
        }
      })
      this.shopIds = shopIds
      return shopIds
    },
    confirm() {
      this.show = false
      this.$emit('change', this.shopIds)
    }
  }
}
</script>
