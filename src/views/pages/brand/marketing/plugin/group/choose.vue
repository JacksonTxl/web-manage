<template>
  <st-panel app>
    <div :class="basic()">
      <router-link :to="i.url" v-for="(i, index) in typeList" :key="index">
        <div :class="basic('card')">
          <img :src="i.bg" :alt="i.name" />
          <div :class="basic('card--name')">{{ i.name }}</div>
        </div>
      </router-link>
    </div>
  </st-panel>
</template>
<script>
export default {
  bem: {
    basic: 'brand-marketing-plugin-choose'
  },
  data() {
    return {
      typeList: [
        {
          name: '会籍卡',
          bg: require('@/assets/img/brand/marketing/group/mod_member.png'),
          url: './add-member'
        },
        {
          name: '储值卡',
          bg: require('@/assets/img/brand/marketing/group/mod_stored.png'),
          url: './add-stored'
        },
        {
          name: '私教课',
          bg: require('@/assets/img/brand/marketing/group/mod_sijiaoke.png'),
          url: './add-course'
        },
        {
          name: '课程包',
          bg: require('@/assets/img/brand/marketing/group/mod_course.png'),
          url: './add-course'
        }
      ]
    }
  }
}
</script>
