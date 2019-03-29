<template>
  <ul class="st-tree">
    <tree-item
      class="item"
      :item="treeData"
      @make-folder="makeFolder"
      @add-item="addItem"
    ></tree-item>
  </ul>

</template>

<script>
import TreeItem from './tree-item.vue'
export default {
  name: 'StTree',
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
    makeFolder: function(item) {
      Vue.set(item, 'children', [])
      this.addItem(item)
    },
    addItem: function(item) {
      item.children.push({
        name: 'new stuff'
      })
    }
  }
}
</script>

<style scoped>

</style>
