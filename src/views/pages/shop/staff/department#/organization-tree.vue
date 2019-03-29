<template>
<div  class="organization-tree">
  <st-tree :treeData="treeData"></st-tree>
</div>

</template>

<script>
export default {
  name: 'OrganizationTree',
  data() {
    return {
      treeData: {
        name: '组织架构树',
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
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    }
  }
}
</script>
