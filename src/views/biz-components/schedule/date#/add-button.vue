<template>
  <div @click="onClick" class="add-schedule-button">
    <div class="icon mg-b8">
      <st-icon type="add"></st-icon>
    </div>
    <slot>{{title}}</slot>
  </div>
</template>

<script>
export default {
  name: 'AddButton',
  props: {
    title: {
      type: String,
      defalut: '添加课程排期'
    },
    date: {
      type: Object,
      default: () => {
        return {}
      }
    },
    time: {
      type: Number,
      default: 0
    }
  },
  computed: {
    cDate() {
      let tempTime = ''
      let weekOfday = moment(this.date.date).format('E')
      let tempDate = moment(this.date.date)
        .subtract(weekOfday - this.date.week, 'days')
        .format('YYYY-MM-DD')
      if (this.time < 9) {
        tempTime = `0${this.time}:00`
      } else {
        tempTime = `${this.time}:00`
      }
      return moment(`${tempDate} ${tempTime}`)
    }
  },
  methods: {
    onClick() {
      console.log('onClick')
      this.$emit('change', this.cDate)
    }
  }
}
</script>

<style lang="less" scoped>
.add-schedule-button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(247, 249, 252, 1);
  border-radius: 4px;
  height: 100%;
  border: 1px dotted rgba(136, 154, 181, 1);
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    width: 24px;
    height: 24px;
    background: rgba(205, 212, 223, 1);
    border-radius: 100%;
  }
  .text {
    font-size: 14px;
    font-weight: 400;
    color: rgba(62, 77, 92, 1);
    line-height: 22px;
  }
}
</style>
