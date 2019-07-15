<template>
  <st-panel app :class="add()">
    <div :class="add('content')">
      <div :class="add('item')" v-for="(i,index) in cardTypeList" :key="index"
        @click="jumpTo(i.url)"
      >
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
          bg: require('@/assets/img/bg-course-package-unlimit.png'),
          title: '课程包（全部课程）',
          describe: '支持用户预约门店全部课程',
          url: 'shop-product-course-manage-package-add-unlimit-package'
        },
        {
          bg: require('@/assets/img/bg-course-package-range.png'),
          title: '课程包（限定课程）',
          describe: '支持用户预约限定范围内的课程',
          url: 'shop-product-course-manage-package-add-range-package'
        },
        {
          bg: require('@/assets/img/bg-course-package-fix.png'),
          title: '课程包（固定课程）',
          describe: '仅支持用户预约固定的课程',
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
