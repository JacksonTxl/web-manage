<template>
  <ul class="st-tree">
    <tree-item
      class="item"
      @edit="editPartment"
      @add="addPartment"
      :item="treeDataSelf"
      :funcList="funcList"
      @click-item="onClickItem"
      @make-folder="makeFolder"
      @add-item="addItem"
      @edit-item="editItem"
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
    onClickItem(item) {
      console.log(item)
    },
    editPartment(value) {
      this.$emit('edit', value)
    },
    addPartment(value) {
      this.$emit('add', value)
    },
    makeFolder(item) {
      Vue.set(item, 'children', [])
      this.addItem(item)
    },
    getNodeItemDetail(item) {
      this.$emit('node-click', item.id)
    },
    traverseTree(node, tree, opString) {
      return tree.map(item => {
        item[opString] = item.name === node.name
        const obj = { [opString]: item.name === node.name }
        return item.children ? { ...obj, name: item.name, children: this.traverseTree(node, item.children, opString), id: item.id, count: item.count } : item
      })
    },
    addItem(item) {
      this.treeDataSelf = this.traverseTree(item, [cloneDeep(this.treeData)], 'isAdd')[0]
      this.$emit('add-item', item)
    },
    editItem(item) {
      this.treeDataSelf = this.traverseTree(item, [cloneDeep(this.treeData)], 'isEdit')[0]
      this.$emit('edit-item', item)
    },
    deleteItem(item) {
      this.$emit('delete', item)
    }
  },
  watch: {
    treeData(o) {
      this.treeDataSelf = cloneDeep(this.treeData)
    }
  },
  mounted() {
    this.treeDataSelf = cloneDeep(this.treeData)
  }
}
</script>
