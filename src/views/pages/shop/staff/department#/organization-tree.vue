<template>
<div  class="organization-tree">
  <a-tree
    showLine
    :defaultExpandedKeys="['0-0-0']"
    @select="onSelect"
  >
    <a-tree-node key="0-0">
      <span slot="title" style="color: #1890ff">上海总部(300)</span>
      <a-tree-node title="上海一部" key="0-0-0">
        <a-tree-node title="市场部" key="0-0-0-0" />
        <a-tree-node title="财务部" key="0-0-0-1" />
        <a-tree-node title="人力资源部" key="0-0-0-2" />
      </a-tree-node>
      <a-tree-node title="上海二部" key="0-0-1">
        <a-tree-node title="技术中心" key="0-0-1-0" />
      </a-tree-node>
      <a-tree-node title="上海三部" key="0-0-2">
        <a-tree-node title="leaf" key="0-0-2-0" />
        <a-tree-node title="leaf" key="0-0-2-1" />
      </a-tree-node>
    </a-tree-node>
  </a-tree>
</div>

</template>

<script>
export default {
  name: 'OrganizationTree',
  methods: {
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    }
  }
}
</script>
