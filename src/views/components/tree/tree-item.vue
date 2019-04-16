<template>
  <li>
    <div
      class="tree-node"
      :class="{bold: isFolder}"
      @dblclick="makeFolder">
      <div class="tree-node__content" :style="{'padding-left': paddingLeft}" @click="getTreeNodeOnclick">
        <span class="tree-switch"  @click.stop="toggle" v-if="isFolder&&level!==0">{{ isOpen ? '-' : '+' }}</span>
        <span class="tree-switch__empty" v-else-if="level!==0"></span>
        <div class="tree-name" v-if="item.isEdit" stay><a-input :value="item.name"></a-input><a href="">保存</a><span @click="cancelEdit">x</span></div>
        <span class="tree-name" v-else>{{ item.name }}</span>

        <st-more-dropdown class="tree-opreation">
          <a-menu-item v-for="(op, index) in opreations" :key="index" @click="op.clickName">{{op.name}}</a-menu-item>
        </st-more-dropdown>
      </div>
      <div v-if="item.isAdd" stay><a-input></a-input><a href="">保存</a><span @click="cancelEdit">x</span></div>
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
        @delete-item="$emit('delete-item', $event)"
        @node-item-detail="$emit('node-item-detail', $event)"
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
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      opreations: [{ clickName: this.addTreeNade, name: '编辑' }, { clickName: this.editTreeNade, name: '新增' }, { clickName: this.deleteTreeNade, name: '删除' }],
      placements: ['bottomLeft'],
      isEditSelf: false,
      visible: false,
      isOpen: false
    }
  },
  computed: {
    isFolder: function() {
      return this.item.children &&
          this.item.children.length
    },
    paddingLeft() {
      return ((this.level - 1) * 16) + 'px'
    }
  },
  methods: {
    editTreeNode() {
      this.$emit('edit-item', this.item)
    },
    addTreeNode() {
      this.$emit('add-item', this.item)
    },
    cancelEdit() {
    },
    deleteTreeNode() {
      this.$emit('delete-item', this.item)
    },
    toggle(e) {
      if (this.isFolder) {
        this.isOpen = !this.isOpen
      }
    },
    getTreeNodeOnclick(e) {
      this.$emit('node-item-detail', this.item)
      this.$nextTick().then(() => {
        const doms = document.querySelectorAll('.tree-node__content')
        doms.forEach(dom => {
          dom.setAttribute('class', 'tree-node__content')
        })
        e.currentTarget.setAttribute('class', 'tree-node__content active')
      })
    },
    hide() {
      this.visible = false
    },
    makeFolder: function() {
      if (!this.isFolder) {
        this.$emit('make-folder', this.item)
        this.isOpen = true
      }
    }
  },
  mounted() {
    if (this.level === 0) {
      this.isOpen = true
    } else {
      this.$set(this.item, 'isEdit', false)
      this.$set(this.item, 'isAdd', false)
    }
  }
}
</script>
