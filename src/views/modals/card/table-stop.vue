<template>
  <a-modal class="modal-card-table-stop" title="支持入场门店" @ok="save" v-model="show" :footer="null">
    <st-table
      rowKey="id"
      :dataSource="table.list"
      :columns="table.columns1"
      @change="onChange"
      :pagination="pagination"
      @showSizeChange="onShowSizeChange"
    ></st-table>
  </a-modal>
</template>
<script>
import { SaleStopService } from './sale-stop.service'
export default {
  serviceInject() {
    return {
      aService: SaleStopService
    }
  },
  // rxState() {
  //   return {
  //     cardsListInfo: this.aService.cardsListInfo$
  //   }
  // },
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
            dataIndex: 'district_name'
          },
          {
            title: '门店名称',
            dataIndex: 'shop_name'
          }
        ],
        list: []
      }
    }
  },
  created() {
    let self = this
    this.getListInfo({ card_id: self.a })
  },
  methods: {
    getListInfo(data) {
      let self = this
      this.aService.getListInfo(data).subscribe(state => {
        self.table.list = state.list
        self.pagination.current = state.page.current_page
        self.pagination.pageSize = state.page.size
        self.pagination.total = state.page.total_counts
      })
    },
    save(e) {
      e.preventDefault()
    },
    // 点击分页获取数据
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize)
    },
    onChange(pagination, filters, sorter) {
      let self = this
      self.pagination = pagination
      let data = {
        card_id: self.a,
        size: self.pagination.pageSize,
        current_page: self.pagination.current
      }

      this.getListInfo(data)
      console.log('params', pagination, filters, sorter)
    }
  }
}
</script>
