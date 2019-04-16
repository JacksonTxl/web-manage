<template>
  <ul class="st-tree">
    <tree-item
      class="item"
      :item="treeDataSelf"
      @make-folder="makeFolder"
      @add-item="addItem"
      @node-item-detail="getNodeItemDetail"
      @delete-item="deleteItem"
    ></tree-item>
  </ul>

</template>

<script>
import { TreeToMap } from '@/utils/tree-to-map.js'
import TreeItem from './tree-item.vue'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'StTree',
  data() {
    return {
      isEdit: false,
      treeDataSelf: {}
    }
  },
  props: {
    treeData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    TreeItem
  },
  methods: {
    makeFolder(item) {
      Vue.set(item, 'children', [])
      this.addItem(item)
    },
    getNodeItemDetail(item) {
      this.$emit('node-click', item)
    },
    traverseTree(node, tree, opString) {
      return tree.map(item => {
        item[opString] = item.name === node.name
        return item.children ? this.traverseTree(node, item.children) : item
      })[0]
    },
    addItem(item) {
      this.treeDataSelf = this.traverseTree(item, [cloneDeep(this.treeData)], 'isAdd')
    },
    editItem(item) {
      this.treeDataSelf = this.traverseTree(item, [cloneDeep(this.treeData)], 'isEdit')
    },
    deleteItem(item) {
      this.$emit('delete-item', item)
    }
  },
  mounted() {
    this.treeDataSelf = cloneDeep(this.treeData)
  }
}
</script>
