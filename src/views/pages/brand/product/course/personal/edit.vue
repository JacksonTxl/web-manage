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
    {{info}}
    <create-personal-course v-show="currentIndex === 0" :info="info" @goNext="goNext"/>
    <set-shop-coach v-show="currentIndex === 1" :info="info" @goNext="goNext"/>
    <set-sell-price v-show="currentIndex === 2" :info="info" @goNext="goNext"/>
  </st-panel>
</template>
<script>
import CreatePersonalCourse from './edit#/create-personal-course'
import SetShopCoach from './edit#/set-shop-coach'
import SetSellPrice from './edit#/set-sell-price'
import { EditService } from './edit.service'
export default {
  components: {
    CreatePersonalCourse, // 创建私教课程
    SetShopCoach, // 设置上课门店及教练
    SetSellPrice // 设置售卖价格
  },
  serviceInject() {
    return {
      editService: EditService
    }
  },
  rxState() {
    return {
      info: this.editService.info$
    }
  },
  data() {
    return {
      currentIndex: 0,
      stepArr: [{
        title: '编辑私教课',
        key: 0
      }, {
        title: '设置上课门店',
        key: 1
      }, {
        title: '设置售卖价格',
        key: 2
      }]
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
