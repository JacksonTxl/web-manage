<template>
  <div>
    <st-search-panel @search="onSearch" @reset="onReset">
      <st-search-panel-item label="通知对象：">
        <st-search-radio v-model="query.m1" :options="list1" />
      </st-search-panel-item>
      <st-search-panel-item label="发送状态：">
        <st-search-radio v-model="query.m2" :options="list2" />
      </st-search-panel-item>
      <st-search-panel-item label="发送时间：">
        <st-range-picker
          :disabledDays="180"
          :value="selectTime"
        ></st-range-picker>
      </st-search-panel-item>

      <st-search-panel-item label="复选框">
        <a-checkbox-group :options="list1"></a-checkbox-group>
      </st-search-panel-item>

      <div slot="more">
        <st-search-panel-item label="发送状态：">
          <st-search-radio v-model="query.m3" :options="list3" />
        </st-search-panel-item>
      </div>
    </st-search-panel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        m1: 1,
        m2: 2,
        m3: 2
      },
      list1: [
        { label: '普通券', value: 1 },
        { label: '优惠券', value: 2 },
        { label: '优惠券3', value: 3 },
        { label: '优惠券4', value: 4 },
        { label: '优惠券5', value: 5 },
        { label: '优惠券6', value: 6 },
        { label: '优惠券7', value: 7 },
        { label: '优惠券', value: 8 },
        { label: '优惠券', value: 8 },
        { label: '优惠券9', value: 9 }
      ],
      list2: [{ label: '普通券', value: 1 }, { label: '优惠券', value: 2 }],
      list3: [{ label: '普通券', value: 1 }, { label: '优惠券', value: 2 }]
    }
  },
  methods: {
    onSearch() {
      console.log('search')
    },
    onReset() {
      console.log('reset')
    }
  }
}
</script>
