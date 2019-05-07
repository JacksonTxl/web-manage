<template>
  <st-panel app>
    <a-button type="primary" @click="team">选择团体课</a-button>
    <a-button type="dashed" @click="personal">选择私教课</a-button>
  </st-panel>
  <!-- <div class="mg-y24">
    <img
      width="150"
      src="https://static-s.styd.cn/201811161629/no-data.png"
    />
    <p class="mg-t16">暂无数据</p>
  </div> -->
</template>
<script>
export default {
  methods: {
    team() {
      this.$modalRouter.push({
        name: 'course-select-course'
      })
    },
    personal() {
      this.$modalRouter.push({
        name: 'course-select-course'
      })
    }
  }
}
</script>
