<template>
  <ul :class="b()">
    <li>
      <div><img src="~@/assets/img/fast-entry/1.png" alt=""></div>
      <div>帮助中心</div>
    </li>
  </ul>
</template>

<script>
import icon1 from '@/assets/img/fast-entry/1.png'
import icon2 from '@/assets/img/fast-entry/2.png'
import icon3 from '@/assets/img/fast-entry/3.png'
import icon4 from '@/assets/img/fast-entry/4.png'
import icon5 from '@/assets/img/fast-entry/5.png'
import icon6 from '@/assets/img/fast-entry/6.png'
import icon7 from '@/assets/img/fast-entry/7.png'
import icon8 from '@/assets/img/fast-entry/8.png'
import icon9 from '@/assets/img/fast-entry/9.png'
export default {
  name: 'FastEntry',
  bem: {
    b: 'layout-fast-entry'
  },
  data() {
    return {
      entries: [{
        icon: icon1,
        text: '帮助中心'
      }, {
        icon: icon2,
        text: '帮助中心'
      }, {
        icon: icon3,
        text: '帮助中心'
      }, {
        icon: icon4,
        text: '帮助中心'
      }, {
        icon: icon5,
        text: '帮助中心'
      }, {
        icon: icon6,
        text: '帮助中心'
      }, {
        icon: icon7,
        text: '帮助中心'
      }, {
        icon: icon8,
        text: '帮助中心'
      }, {
        icon: icon9,
        text: '帮助中心'
      }]
    }
  }
}
</script>
