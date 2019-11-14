<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.href">
        <a :href="item.href" target="_blank">{{ item.text }}</a>
        <a class="mg-l16" @click="onOpenCode(item)">打开代码</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { href: '/tpl/plugin', text: 'plugin 插件模版' },
        { href: '/tpl/list', text: 'list 列表模版' }
      ]
    }
  },
  methods: {
    onOpenCode(item) {
      fetch(`/_editor?file=src/views/pages/${item.href}.vue`)
    }
  }
}
</script>
