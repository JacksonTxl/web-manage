<template>
  <st-panel app :class="add()">
    <div :class="add('content')">
      <div :class="add('item')" v-for="(i,index) in cardTypeList" :key="index">
        <img :src="i.bg" width="328" height="182" :alt="i.title">
        <div :class="add('text')">
          <h2 :class="add('title')">{{i.title}}</h2>
          <p :class="add('describe')">{{i.describe}}</p>
        </div>
      </div>
    </div>
  </st-panel>
</template>
<script>
export default {
  bem: {
    add: 'page-shop-add-select-package'
  },
  data() {
    return {
      cardTypeList: [
        {
          bg: require('@/assets/img/bg_add_unlimit_package.png'),
          title: 'XX课程包（不限课程）',
          describe: '支持会员在有效次数内进入场馆并消耗次数'
        },
        {
          bg: require('@/assets/img/bg_add_range_package.png'),
          title: 'XX课程包（指定范围内课程）',
          describe: '支持会员在有效次数内进入场馆并消耗次数'
        },
        {
          bg: require('@/assets/img/bg_add_fix_package.png'),
          title: 'XX课程包（固定课程）',
          describe: '支持会员在有效次数内进入场馆并消耗次数'
        }
      ]
    }
  }
}
</script>
