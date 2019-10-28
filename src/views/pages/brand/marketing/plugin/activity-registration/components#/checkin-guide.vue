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
          title: '搜索票号',
          description: '输入参与用户提供的票号'
        },
        {
          index: 2,
          title: '校验',
          description: '检查票号信息是否对应及有效'
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
