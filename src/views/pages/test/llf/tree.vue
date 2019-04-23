<template>
  <st-panel app>
    <h3>tree</h3>
    <tree-ul>
      <tree-li></tree-li>
    </tree-ul>
  </st-panel>
</template>

<script>
import TreeUl from './tree#/tree-ul.vue'
import TreeLi from './tree#/tree-li.vue'
export default {
  components: {
    TreeUl,
    TreeLi
  },
  data() {
    return {
      dataSource: [
        {
          id: 'zhejiang',
          name: 'Zhejiang',
          children: [
            {
              id: 'hangzhou',
              name: 'Hangzhou',
              children: [
                {
                  id: 'xihu',
                  name: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          id: 'jiangsu',
          name: 'Jiangsu',
          children: [
            {
              id: 'nanjing',
              name: 'Nanjing',
              children: [
                {
                  id: 'zhonghuamen',
                  name: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
li {
  padding-left: 20px;
}
</style>
