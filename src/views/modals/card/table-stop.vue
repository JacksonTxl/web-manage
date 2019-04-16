<template>
  <a-modal class="modal-card-table-stop" title="会员卡停售" @ok="save" v-model="show" :footer="null">
    <!-- <st-table
      bordered
      :dataSource="table.use_shop_list"
      :columns="table.columns1"
      rowKey="shop_id"
      :pagination="pagination"
      @showSizeChange="onShowSizeChange"
    ></st-table>-->
    <st-table
      rowKey="shop_id"
      :dataSource="table.use_shop_list"
      :columns="table.columns1"
      @change="onChange"
      :pagination="pagination"
      @showSizeChange="onShowSizeChange"
    ></st-table>
    <!-- {{a}} -->
  </a-modal>
</template>
<script>
export default {
  name: 'tableStop',
  props: {
    a: {
      type: Number
    }
  },
  data() {
    return {
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 10,
        total: 50
      },
      show: false,
      table: {
        columns1: [
          {
            title: '省',
            dataIndex: 'province_name',
            scopedSlots: { customRender: 'province_name' }
          },
          {
            title: '市',
            dataIndex: 'city_name'
          },
          {
            title: '区',
            dataIndex: 'district'
          },
          {
            title: '门店名称',
            dataIndex: 'shop_name'
          }
        ],
        use_shop_list: [
          {
            shop_id: 1,
            shop_name: 22222,
            province_name: '省份名称',
            city_name: '城市名称',
            district: '地区名称'
          },
          {
            shop_id: 2,
            shop_name: 22222,
            province_name: '省份名称',
            city_name: '城市名称',
            district: '地区名称'
          }
        ]
      }
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
    },
    // 点击分页获取数据
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize)
    },
    onChange(pagination, filters, sorter) {
      this.pagination = pagination
      console.log('params', pagination, filters, sorter)
    }
  }
}
</script>
