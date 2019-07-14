<template>
  <li>
    <div
      class="tree-node"
      :class="{bold: isFolder}"
      @dblclick="makeFolder">
      <div class="tree-node__content" :style="{'padding-left': paddingLeft}" @click="getTreeNodeOnclick" ref="treeNode">
        <span class="tree-switch"  @click.stop="toggle" v-if="isFolder&&level!==0">{{ isOpen ? '-' : '+' }}</span>
        <span class="tree-switch__empty" v-else-if="level!==0 && !item.isEdit"></span>
        <div class="tree-name edit-box" v-if="item.isEdit">
          <a-input placeholder="请输入部门名称" class="tree-input mg-r8" v-model="editValue"></a-input>
          <a href="javascript:;" class="button edit mg-r8" @click.stop="editDepartment">保存</a>
          <a-icon type="close-circle" @click.stop="cancelEdit"/>
        </div>
        <span class="tree-name" v-else>{{ item.name }}( {{item.count}} )</span>
        <st-more-dropdown class="tree-opreation" v-show="!item.isEdit">
          <a-menu-item v-if="auth.departmentAdd"  @click="addTreeNode">新增</a-menu-item>
          <a-menu-item  @click="editTreeNode">编辑</a-menu-item>
          <a-menu-item  @click="deleteDepartment(item)" v-if="item.id">删除</a-menu-item>
        </st-more-dropdown>
      </div>
      <div class="tree-node__content" v-if="item.isAdd">
        <a-input
          placeholder="请输入部门名称"
          class="tree-input  mg-r6"
          v-model="addValue">
        </a-input>
        <a href="javascript:;" class="mg-r8" @click.stop="addDepartment(item)">保存</a>
        <a-icon type="close-circle" @click.stop="cancelAdd"/>
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
        @edit-item="$emit('edit-item', $event)"
        @update-data="$emit('update-data', $event)"
        @node-item-detail="$emit('node-item-detail', $event)"
      ></tree-item>
    </ul>
  </li>
</template>

<script>
import { DepartmentService } from '@/views/pages/brand/staff/department.service'
import { RouteService } from '@/services/route.service'

export default {
  serviceInject() {
    return {
      departmentService: DepartmentService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      auth: this.departmentService.auth$,
      query: this.routeService.query$
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
      if (!this.level) return 20 + 'px'
      return ((this.level - 1) * 16) + 20 + 'px'
    }
  },
  methods: {
    cancelAdd() {
      this.item.isAdd = false
    },
    cancelEdit() {
      this.item.isEdit = false
    },
    editTreeNode() {
      console.log('editTreeNode', this.$refs.treeNode)
      this.editValue = this.item.name
      this.$emit('edit-item', this.item)
      this.$nextTick().then(() => {
        const doms = document.querySelectorAll('.tree-node__content')
        doms.forEach(dom => {
          dom.setAttribute('class', 'tree-node__content')
        })
        this.$refs.treeNode.setAttribute('class', 'tree-node__content active')
      })
    },
    addTreeNode() {
      console.log('addTreeNode', this.$refs.treeNode)
      this.$emit('add-item', this.item)
      this.$nextTick().then(() => {
        const doms = document.querySelectorAll('.tree-node__content')
        doms.forEach(dom => {
          dom.setAttribute('class', 'tree-node__content')
        })
        this.$refs.treeNode.setAttribute('class', 'tree-node__content active')
      })
    },
    toggle(e) {
      if (this.isFolder) {
        this.isOpen = !this.isOpen
      }
    },
    addDepartment(item) {
      console.log('addDepartment', this.$refs.treeNode, item)
      this.cancelAdd()
      this.departmentService.addDepartment({ parent_id: this.item.id, department_name: this.addValue }).subscribe(() => {
        this.$emit('update-data')
      })
    },
    editDepartment(item) {
      console.log('editDepartment', this.$refs.treeNode, item)
      this.cancelEdit()
      this.departmentService.updateDepartment({ id: this.item.id, department_name: this.editValue }).subscribe(() => {
        this.$emit('update-data')
      })
    },
    deleteDepartment(item) {
      console.log('deleteDepartment', this.$refs.treeNode, item)
      if (item.count > 0) {
        this.$error({
          title: '',
          content: '当前部门下有员工，无法删除'
        })
      } else {
        this.$confirm({
          title: '确认要删除',
          content: '删除部门后，该部门下的员工会自动归属父级部门，且无法恢复，确认删除？',
          onOk: () => {
            return new Promise((resolve, reject) => {
              return this.departmentService.delDepartment({ id: this.item.id }).subscribe(() => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
                this.$emit('update-data')
              })
            }).catch(() => console.log('Oops errors!'))
          },
          onCancel() {}
        })
      }
    },
    getTreeNodeOnclick(e) {
      console.log('getTreeNodeOnclick', this.$refs.treeNode, this.item)
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
