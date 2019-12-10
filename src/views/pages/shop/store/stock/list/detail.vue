<template>
  <div :class="detail()">
    <!-- @change="onSingleSearch('shelves_status', $event)" -->
    <div :class="detail('search')">
      <a-select
        :class="detail('search-select')"
        v-model="chooseGood"
        placeholder="请选择商品"
      >
        <a-select-option :value="-1">商品111</a-select-option>
        <a-select-option :value="2">商品222</a-select-option>
        <a-select-option :value="3">商品333</a-select-option>
        <a-select-option :value="4">商品444</a-select-option>
      </a-select>
      <a-select
        :class="detail('search-select')"
        v-model="stockType"
        placeholder="出入库类型"
      >
        <a-select-option :value="-1">类型11</a-select-option>
        <a-select-option :value="2">类型22</a-select-option>
        <a-select-option :value="3">类型33</a-select-option>
      </a-select>
      <a-range-picker @change="onChange" :class="detail('search-time')" />
    </div>

    <div>
      <st-table
        :columns="detailColumns"
        :dataSource="tableData"
        :scroll="{ x: 1800 }"
      ></st-table>
    </div>
  </div>
</template>
<script>
import { detailColumns } from './detail.config.ts'
export default {
  bem: {
    detail: 'page-shop-store-stock-list-detail'
  },
  data() {
    return { detailColumns, tableData: [], chooseGood: -1, stockType: -1 }
  },
  methods: {
    onChange(e) {}
  }
}
</script>
