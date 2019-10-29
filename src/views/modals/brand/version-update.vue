<template>
  <div :class="b()" v-if="show">
    <div :class="b('content')">
      <p :class="b('title')">俱乐部版本专属功能</p>
      <p :class="b('desc')">
        升级到俱乐部版本，解锁更多功能
        <br />
        请咨询三体云动工作人员
      </p>
      <p :class="b('phone')">400-962-8988</p>
      <p :class="b('time')">服务时间：09:00 - 18:00 (工作日)</p>
    </div>
  </div>
</template>

<script>
export default {
  bem: {
    b: 'modal-brand-version-update'
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
