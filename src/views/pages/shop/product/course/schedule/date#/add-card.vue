<template>
  <div class="add-schedule-button">
    <div class="icon mg-b8"><st-icon type="add"></st-icon></div>
    <div class="text">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'AddCard',
  props: {
    title: {
      type: String,
      defalut: '添加课程排期'
    }
  }
}
</script>

<style lang="less" scoped>
  .add-schedule-button{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width:100%;
    height:100%;
    background:rgba(247,249,252,1);
    border-radius:4px;
    border:1px dotted rgba(136,154,181,1);
    .icon{
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      width:32px;
      height:32px;
      background:rgba(205,212,223,1);
      border-radius: 100%;
    }
    .text{
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(62,77,92,1);
      line-height:22px;
    }
  }
</style>
