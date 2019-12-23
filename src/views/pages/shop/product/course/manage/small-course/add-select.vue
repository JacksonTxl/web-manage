<template>
  <st-panel app :class="add()">
    <div :class="add('content')">
      <div
        :class="add('item')"
        v-for="(i, index) in cardTypeList"
        :key="index"
        @click="jumpTo(i.url, i.type)"
      >
        <img :src="i.bg" width="328" height="182" :alt="i.title" />
        <div :class="add('text')">
          <h2 :class="add('title')">{{ i.title }}</h2>
          <p :class="add('describe')">{{ i.describe }}</p>
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
          bg: require('@/assets/img/bg-course-group-limit.png'),
          title: '固定小班课',
          describe: '上课时间已固定，需按照时间上课。',
          url: 'shop-product-course-manage-group-add',
          type: '1'
        },
        {
          bg: require('@/assets/img/bg-course-group-unlimit.png'),
          title: '自主约课小班课',
          describe: '上课时间未固定，需会员自行选课。',
          url: 'shop-product-course-manage-group-add',
          type: '2'
        }
      ]
    }
  },
  methods: {
    jumpTo(name, type) {
      this.$router.push({
        name: name,
        query: {
          type: type
        }
      })
    }
  }
}
</script>
