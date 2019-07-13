<template>
  <st-panel app :class="add()">
    <div :class="add('content')">
      <div :class="add('item')" v-for="(i,index) in cardTypeList" :key="index"
        @click="jumpTo(i.url)"
      >
        <img :src="i.bg | imgFilter({w:328,h:182})" width="328" height="182" :alt="i.title">
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
          bg: `https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/default/bg-course-package-unlimit.png`,
          title: 'XX课程包（不限课程）',
          describe: '支持会员在有效次数内进入场馆并消耗次数',
          url: 'shop-product-course-manage-package-add-unlimit-package'
        },
        {
          bg: `https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/default/bg-course-package-range.png`,
          title: 'XX课程包（指定范围内课程）',
          describe: '支持会员在有效次数内进入场馆并消耗次数',
          url: 'shop-product-course-manage-package-add-range-package'
        },
        {
          bg: `https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/default/bg-course-package-fix.png`,
          title: 'XX课程包（固定课程）',
          describe: '支持会员在有效次数内进入场馆并消耗次数',
          url: 'shop-product-course-manage-package-add-fix-package'
        }
      ]
    }
  },
  methods: {
    jumpTo(name) {
      this.$router.push({
        name
      })
    }
  }
}
</script>
