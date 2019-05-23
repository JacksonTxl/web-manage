<template>
  <div class="date-container">
    <a-button
        class="mg-r8"
      style="width: 32px; display:inline-flex;align-items: center; justify-content: center;"
    >
      <a-icon type="left"/>
    </a-button>

    <span class="text-cont">2019/01/27~2019/02/02</span>

    <a-button
    class="mg-r8  mg-l8"
      style="width: 32px; display:inline-flex;align-items: center; justify-content: center;"
    >
      <a-icon type="right"/>
    </a-button>
    <a-button

      style="width: 32px; display:inline-flex;align-items: center; justify-content: center;"
    >今</a-button>
  </div>
</template>
<script>
export default {
  name: 'date'
}
</script>
