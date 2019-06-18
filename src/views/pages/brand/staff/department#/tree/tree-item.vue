<template>
  <li>
    <div
      class="tree-node"
      :class="{bold: isFolder}"
      @dblclick="makeFolder">
      <div class="tree-node__content" :style="{'padding-left': paddingLeft}" @click="getTreeNodeOnclick">
        <span class="tree-switch"  @click.stop="toggle" v-if="isFolder&&level!==0">{{ isOpen ? '-' : '+' }}</span>
        <span class="tree-switch__empty" v-else-if="level!==0"></span>
        <div class="tree-name edit-box" v-if="item.isEdit" ><a-input placeholder="请输入部门名称" class="tree-input mg-r8" v-model="editValue"></a-input><a href="javascript:;" class="button edit mg-r8" @click="editDepartment">保存</a><span class="button edit mg-r8" @click="cancelEdit">x</span></div>
        <span class="tree-name" v-else>{{ item.name }}( {{item.count}} )</span>

        <st-more-dropdown class="tree-opreation" v-show="!item.isEdit">
          <a-menu-item  @click="addTreeNode">新增</a-menu-item>
          <a-menu-item  @click="editTreeNode">编辑</a-menu-item>
          <a-menu-item  @click="deleteDepartment">删除</a-menu-item>
        </st-more-dropdown>
      </div>
      <div v-if="item.isAdd" class="edit-box"><a-input  placeholder="请输入部门名称" class="tree-input  mg-r8" v-model="addValue"></a-input><a href="javascript:;" class="mg-r8" @click="addDepartment">保存</a><span class="mg-r8" @click="cancelEdit">x</span></div>
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
        @edit-item="$emit('edit-item', $event)"
        @node-item-detail="$emit('node-item-detail', $event)"
      ></tree-item>
    </ul>
  </li>
</template>

<script>
import { DepartmentService } from '@/views/pages/brand/staff/department.service#/department.service'
export default {
  serviceInject() {
    return {
      departmentService: DepartmentService
    }
  },
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
      editValue: '',
      addValue: '',
      opreations: [{ clickName: this.addTreeNade, name: '新增' }, { clickName: this.editTreeNade, name: '编辑' }, { clickName: this.deleteTreeNade, name: '删除' }],
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
    editTreeNode() {
      this.editValue = this.item.name
      this.$emit('edit-item', this.item)
    },
    addTreeNode() {
      this.$emit('add-item', this.item)
    },
    toggle(e) {
      if (this.isFolder) {
        this.isOpen = !this.isOpen
      }
    },
    addDepartment(item) {
      this.departmentService.addDepartment(item).subscribe(() => {
        console.log(this.departmentList)
      })
    },
    editDepartment(item) {
      this.departmentService.updateDepartment(item).subscribe(() => {
        console.log(this.departmentList)
      })
    },
    deleteDepartment(item) {
      this.$confirm({
        title: '确认要删除',
        content: '删除部门后，该部门下的员工会自动归属父级部门，且无法恢复，确认删除？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            return this.departmentService.delDepartment({ id: item.id }).subscribe(() => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
            })
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {}
      })
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
