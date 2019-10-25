<template>
  <div :class="bComponent()">
    <img
      src="~@/assets/img/mina-activity-view.png"
      alt=""
      :class="bComponent('left')"
    />
    <div :class="bComponent('right')">
      <st-steps-line>
        <st-steps-line-item
          v-for="item in steps"
          :step="item.index"
          :key="item.index"
          :title="item.title"
          :description="item.description"
        ></st-steps-line-item>
      </st-steps-line>
    </div>
  </div>
</template>

<script>
export default {
  bem: {
    bComponent: 'component-checkin-guide'
  },
  data() {
    return {
      steps: [
        {
          index: 1,
          title: '签到验票',
          description: '点击签到，签到后状态更新为已签到'
        },
        {
          index: 2,
          title: '签到验票',
          description: '点击签到，签到后状态更新为已签到'
        },
        {
          index: 3,
          title: '签到验票',
          description: '点击签到，签到后状态更新为已签到'
        }
      ]
    }
  }
}
</script>
