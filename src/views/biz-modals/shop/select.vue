<template>
  <st-modal
    title="选择场馆"
    :footer="null"
    class="modal-brand-switch"
    v-model="show"
    :loading="loading.getShopListTree"
  >
    <st-container>
      <a-tree
        checkable
        v-model="checkedKeys"
        :treeData="treeData"
        @check="onCheck"
      />
    </st-container>
    <p class="color-text-light mg-t8">已选择{{ checedNum }}家场馆</p>
    <p class="ta-r">
      <st-button type="primary" @click="confirm">确定</st-button>
    </p>
  </st-modal>
</template>
<script>
import { Action } from 'rx-state'
import { switchMap, catchError, filter } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { SelectService } from './select.service'
import { json2AntDesignTreeData } from '@/utils/json-2-tree-data'

export default {
  serviceInject() {
    return {
      selectService: SelectService
    }
  },
  rxState() {
    return {
      loading: this.selectService.loading$
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
    },
    groupParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    checedNum() {
      return this.shopIds.length
    }
  },
  mounted() {
    this.selectService
      .getShopListTree(this.groupParams, this.type)
      .subscribe(res => {
        this.treeData = json2AntDesignTreeData(res.list)
        this.initCheckedKeys()
      })
  },
  methods: {
    initCheckedKeys() {
      const shopIds = this.checked
      this.shopIds = shopIds
      this.checkedKeys = shopIds.map(item =>
        JSON.stringify({
          isLeaf: true,
          key: item
        })
      )
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
