<template>
  <st-panel>
    签到验票
    <a-steps direction="vertical" size="small">
      <a-step
        title="搜索票号"
        status="process"
        description="输入参与用户提供的票号"
      />
      <a-step
        title="校验"
        description="检查票号信息是否对应及有效"
        status="process"
      />
      <a-step
        title="签到验票"
        description="点击签到，签到后状态更新为已签到"
        status="process"
      />
    </a-steps>
    <st-steps-line>
      <st-steps-line-item
        v-for="item in steps"
        :step="item.index"
        :key="item.index"
        :title="item.title"
        :description="item.description"
      ></st-steps-line-item>
    </st-steps-line>
  </st-panel>
</template>

<script>
export default {
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
