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
    traverseTree(node, tree) {
      const isChildren = true
      console.log(tree)
      tree.children.map(item => {
        if (item.name === node.name) {
          item.isEdit = true
        }
        if (item.children) {
          this.traverseTree(node, item.children)
        } else {
          return item
        }
      })
      console.log(this.treeData)
    },
    addItem(item) {
      this.traverseTree(item, cloneDeep(this.treeData))
      this.treeDataSelf = cloneDeep(this.treeData)
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
