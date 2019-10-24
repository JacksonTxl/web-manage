<template>
  <div>
    <p>
      多个按钮级别操作项和权限相关时，多余三个直接展示按钮组
      多余三个展示dropdown里面是操作项
    </p>
    <st-btn-actions
      :options="[
        { text: '查看合同', click: onAction1 },
        { text: '冻结', click: onAction2 },
        { text: '修改剩余课时', click: onAction3 },
        { text: '转让', click: onAction4 },
        { text: '退款', click: onAction5 }
      ]"
    ></st-btn-actions>
    <p class="mg-t24">
      小于三个的时候
    </p>
    <st-btn-actions
      :options="[
        { text: '查看合同', click: onAction1 },
        { text: '冻结', click: onAction2 }
      ]"
    ></st-btn-actions>
    <p class="mg-t24">与权限结合</p>
    <st-btn-actions
      :options="[
        { if: 1, text: '查看合同', click: onAction1 },
        { if: 0, text: '冻结', click: onAction2 },
        { if: 1, text: '修改剩余课时', click: onAction3 },
        { if: 0, text: '转让', click: onAction4 },
        { if: 1, text: '退款', click: onAction5 }
      ]"
    ></st-btn-actions>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    onAction1() {
      console.log('1')
    },
    onAction2() {
      console.log('2')
    },
    onAction3() {
      console.log('3')
    },
    onAction4() {
      console.log('4')
    },
    onAction5() {
      console.log('5')
    }
  }
}
</script>
