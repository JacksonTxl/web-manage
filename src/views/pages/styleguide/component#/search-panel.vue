<template>
  <div>
    <st-search-panel>
      <div>
        <span>通知对象:</span>
        <st-search-radio v-model="query.m1" :list="list1" />
      </div>
      <div>
        <span>发送状态：</span>
        <st-search-radio v-model="query.m2" :list="list2" />
      </div>
      <div>
        <span>发送时间：</span>
        <st-range-picker
          :disabledDays="180"
          :value="selectTime"
        ></st-range-picker>
      </div>
      <div slot="more">
        <div>
          <span>发送状态：</span>
          <st-search-radio v-model="query.m3" :list="list3" />
        </div>
      </div>
      <div slot="button">
        <st-button type="primary">查询</st-button>
        <st-button class="mg-l8">重置</st-button>
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
      list1: [{ label: '普通券', value: 1 }, { label: '优惠券', value: 2 }],
      list2: [{ label: '普通券', value: 1 }, { label: '优惠券', value: 2 }],
      list3: [{ label: '普通券', value: 1 }, { label: '优惠券', value: 2 }]
    }
  }
}
</script>
