<template>
  <li>
    <div
      class="tree-node"
      :class="{bold: isFolder}"
      @dblclick="makeFolder">
      <div class="tree-node__content" :style="{'padding-left': paddingLeft}" @click="getTreeNodeOnclick">
        <span class="tree-switch"  @click.stop="toggle" v-if="isFolder&&level!==0">{{ isOpen ? '-' : '+' }}</span>
        <span class="tree-switch__empty" v-else-if="level!==0"></span>
        <span class="tree-name">{{ item.name }}</span>
        <a-dropdown class="tree-opreation" placement="bottomLeft">
          <a-button>:</a-button>
          <a-menu slot="overlay">
            <a-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">编辑</a>
            </a-menu-item>
            <a-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">新增字部门</a>
            </a-menu-item>
            <a-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
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
    }
  },
  data: function() {
    return {
      placements: ['bottomLeft'],
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
    }
  }
}
</script>
