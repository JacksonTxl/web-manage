<template>
  <div class="staff-modal-tips" :class="canNotDelete">
    <p v-if="canNotDelete">无法删除员工，该员工有以下几个事项待处理</p>
    <ul>
      <li v-for="(tip, index) in list" :key="index" class="item">
        <span class="count">{{index + 1}}</span> {{tip.num}}{{tip.type|unitFilter}}{{tip.name}},
        <a href="">查看详情</a>
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
    list: {
      type: Array,
      default: () => []
    },
    canNotDelete: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    unitFilter(val) {
      return val === 5 ? '个' : '节'
    }
  }
}
</script>
