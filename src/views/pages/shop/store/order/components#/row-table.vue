<template>
  <div :class="basic()">
    <st-table
      :page="page"
      :class="basic('table')"
      rowKey="id"
      :columns="columns"
      :dataSource="listData"
    >
      <ul
        slot="childrens"
        slot-scope="customRender, record"
        :class="basic('sku')"
      >
        <li v-for="(item, index) in record.childrens" :key="index">
          <span>{{ item.name }}</span>
          <span>x{{ item.num }}</span>
          <span>￥{{ item.price }}</span>
        </li>
      </ul>
      <div slot="action" slot-scope="customRender, record">
        <st-table-actions>
          <a @click="clickFn(record)">
            {{ actionText }}
          </a>
        </st-table-actions>
      </div>
    </st-table>
  </div>
</template>
<script>
import tableMixin from '@/mixins/table.mixin'
export default {
  name: 'rowtable',
  mixins: [tableMixin],
  bem: {
    basic: 'page-order-row-table'
  },
  props: {
    listData: {
      type: Array
    },
    columns: {
      type: Array
    },
    actionText: {
      type: String
    },
    page: {
      default: 1
    }
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    clickFn(val) {
      this.$emit('clicks', val)
    }
  }
}
</script>
