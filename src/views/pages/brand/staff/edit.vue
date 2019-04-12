<template>
  <st-panel app>
    <a-row class="mg-b48 mg-t48" :gutter="8">
      <a-col offset="1" :span="22" >
        <a-steps :current="currentIndex">
          <a-step v-for="item in stepArr" :key="item.key" :title="item.title"
            @click="changeStep(item.key)" class="cursor-pointer"/>
        </a-steps>
      </a-col>
    </a-row>
    <edit-detail-basics-info v-show="currentIndex === 0" @goNext="goNext"/>
    <!--
    <set-shop-coach v-show="currentIndex === 1" @goNext="goNext"/>
    <set-sell-price v-show="currentIndex === 2" @goNext="goNext"/> -->
  </st-panel>
</template>
<script>
import EditDetailBasicsInfo from './edit#/edit-detail-basicsInfo'
// import SetShopCoach from './add#/set-shop-coach'
// import SetSellPrice from './add#/set-sell-price'
export default {
  components: {
    EditDetailBasicsInfo // 编辑基础信息
    // SetShopCoach, // 设置上课门店及教练
    // SetSellPrice // 设置售卖价格
  },
  data() {
    return {
      currentIndex: 0,
      stepArr: [
        {
          title: '基础信息',
          key: 0
        },
        {
          title: '详细信息',
          key: 1
        },
        {
          title: '教练信息',
          key: 2
        }
      ]
    }
  },
  methods: {
    goNext() {
      if (this.currentIndex < 2) {
        this.currentIndex = this.currentIndex + 1
      }
    },
    changeStep(step) {
      this.currentIndex = step
    }
  }
}
</script>
