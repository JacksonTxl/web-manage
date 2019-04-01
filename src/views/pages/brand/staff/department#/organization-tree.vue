<template>
<div  class="organization-tree">
  <st-tree :treeData="treeData" @delete-item="deleteDepartment" @node-click="getDepartment"></st-tree>
</div>

</template>

<script>
export default {
  name: 'OrganizationTree',
  data() {
    return {
      treeData: {
        name: '三体云动健身（600）',
        children: [
          { name: '上海总部' },
          { name: '上海一部' },
          { name: '上海二部' },
          {
            name: '上海三部',
            children: [
              {
                name: 'child folder',
                children: [
                  { name: 'hello' },
                  { name: 'wat' }
                ]
              },
              { name: 'hello' },
              { name: 'wat' },
              {
                name: 'child folder',
                children: [
                  { name: 'hello' },
                  { name: 'wat' }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    getDepartment(item) {
      console.log(item)
    },
    deleteDepartment(item) {
      this.$confirm({
        title: '确认要删除',
        content: '删除部门后，该部门下的员工会自动归属父级部门，且无法恢复，确认删除？',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {}
      })
    },
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    }
  }
}
</script>
