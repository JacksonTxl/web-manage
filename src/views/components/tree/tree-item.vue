<template>
  <li>
    <div
      class="tree-node"
      :class="{bold: isFolder}"
      @click="toggle"
      @dblclick="makeFolder">
      <div v-if="level === 0" class="tree-node__content" :style="{'padding-left': paddingLeft}">
        <span class="tree-switch" v-if="isFolder">{{ isOpen ? '-' : '+' }}</span>
        <span class="tree-switch__empty" v-else></span>
        <span class="tree-name">{{ item.name }}</span>
      </div>
    </div>
    <ul class="st-tree-item" v-show="isOpen" v-if="isFolder">
      <tree-item
        :level='level+1'
        class="item"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        @make-folder="$emit('make-folder', $event)"
        @add-item="$emit('add-item', $event)"
      ></tree-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeItem',
  props: {
    item: Object,
    level: {
      type: Number,
      default: () => 0
    }
  },
  data: function() {
    return {
      isOpen: false
    }
  },
  computed: {
    isFolder: function() {
      return this.item.children &&
          this.item.children.length
    },
    paddingLeft() {
      return (this.level * 16) + 'px'
    }
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen
      }
    },
    makeFolder: function() {
      if (!this.isFolder) {
        this.$emit('make-folder', this.item)
        this.isOpen = true
      }
    }
  }
}
</script>

<style scoped>

</style>
