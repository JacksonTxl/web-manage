<template>
  <div class="staff-modal-tips" :class="canNotDelete">
    <p v-if="canNotDelete">该员工有以下任务项未完成,无法{{suffix}}</p>
    <ul>
      <li v-for="(tip, index) in list" :key="index" class="item">
        <span class="count">{{index + 1}}</span> {{tip.num}}{{tip.type|unitFilter}}{{tip.name}},
        <!-- <a href="">查看详情</a> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StaffModalTips',
  bem: {
    tip: 'staff-modal-tips'
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    list: {
      type: Array,
      default: () => []
    },
    canNotDelete: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    suffix() {
      let obj = {
        1: '删除此职能',
        2: '离职',
        3: '删除此员工'
      }
      return obj[this.type]
    }
  },
  filters: {
    unitFilter(val) {
      return val === 5 ? '个' : '节'
    }
  }
}
</script>
