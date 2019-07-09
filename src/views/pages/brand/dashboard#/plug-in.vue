<template>
  <div class="page-dashboard-plugin mg-t24">
    <a :href="href" target="_blank">
    <div class="image">
      <img :src="img" alt="">
    </div>

    <div class="text">
      <st-t3>{{title}}</st-t3>
      <p class="detail">{{sub}}</p>
    </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'PlugIn',
  props: {
    title: {
      type: String,
      default: '优惠券'
    },
    sub: {
      type: String,
      default: '优惠抵扣购课费用'
    },
    img: {
      type: String,
      default: 'https://file.digitaling.com/eImg/uimages/20170814/1502707757253062.jpg'
    },
    href: {
      type: String,
      default: 'javascript:void(0)'
    }
  }
}
</script>
