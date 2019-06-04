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
          {
            'id': 1,
            'name': '测试测试部门2e12',
            'children': [
              {
                'id': 1108,
                'name': '测试测试部门1',
                'children': [],
                'count': 0
              },
              {
                'id': 1109,
                'name': '测试测试部门1',
                'children': [],
                'count': 0
              },
              {
                'id': 1110,
                'name': '测试测试部门2',
                'children': [],
                'count': 0
              },
              {
                'id': 1111,
                'name': '测试测试部门2e1',
                'children': [],
                'count': 0
              },
              {
                'id': 1112,
                'name': 'newhello',
                'children': [],
                'count': 0
              },
              {
                'id': 3,
                'name': '测试部门3',
                'children': [
                  {
                    'id': 5,
                    'name': '测试部门5',
                    'children': [],
                    'count': 0
                  }
                ],
                'count': 0
              },
              {
                'id': 6,
                'name': '测试部门6',
                'children': [],
                'count': 0
              }
            ],
            'count': 80
          },
          {
            'id': 2,
            'name': '测试部门2',
            'children': [
              {
                'id': 4,
                'name': '测试部门4',
                'children': [],
                'count': 0
              }
            ],
            'count': 0
          },
          {
            'id': 10,
            'name': 'cupidatat non proident, sunt i',
            'children': [],
            'count': 0
          },
          {
            'id': 7,
            'name': 'cillum dolore eu fugiat nul',
            'children': [],
            'count': 0
          },
          {
            'id': 8,
            'name': 'tempo',
            'children': [],
            'count': 0
          },
          {
            'id': 9,
            'name': 'elit, sed do eiusmod tempor inc',
            'children': [],
            'count': 0
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
