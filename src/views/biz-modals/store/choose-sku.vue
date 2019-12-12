<template>
  <st-modal title="规格选择" @ok="onSubmit" v-model="show" width="540px">
    <div :class="basic()">
      <div class="good-message">
        <img
          src="https://img.cdn.xinchanedu.com/uploadImg/aix/2019/Aug/1565149862022.jpg"
          alt=""
        />
        <div>
          <span>￥200</span>
          <span>库存293件</span>
          <span>已选：</span>
        </div>
      </div>
      <div class="good-item">
        <span class="item-label">颜色</span>
        <a-radio-group :options="plainOptions" :defaultValue="value1" />
      </div>
    </div>
  </st-modal>
</template>
<script>
export default {
  name: 'modalStoreChooseSku',
  data() {
    return {
      show: false,
      value1: 'Apple',
      plainOptions: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' }
      ]
    }
  },
  bem: {
    basic: 'modals-choose-sku'
  },
  methods: {
    onSubmit() {
      this.$emit('success', {
        type: 'pay'
      })
      this.show = false
      console.log('点击了确定')
    }
  }
}
</script>
