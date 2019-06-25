<template>
  <a-modal
    class="modal-card-table-stop"
    :title="title?title :'支持入场门店'"
    @ok="save"
    v-model="show"
    :footer="null"
  >
    <st-table
      rowKey="id"
      :dataSource="table.list"
      :columns="table.columns1"
      :scroll="{ y: 230 }"
      @change="onChange"
      :pagination="pagination"
      @showSizeChange="onShowSizeChange"
    ></st-table>
  </a-modal>
</template>
<script>
import { TableStopService } from './table-stop.service'
export default {
  serviceInject() {
    return {
      aService: TableStopService
    }
  },
  // rxState() {
  //   return {
  //     cardsListInfo: this.aService.cardsListInfo$
  //   }
  // },
  name: 'tableStop',
  props: {
    id: {
      type: Number
    },
    title: {
      type: String
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
            width: '22%',
            scopedSlots: { customRender: 'province_name' }
          },
          {
            title: '市',
            width: '22%',
            dataIndex: 'city_name'
          },
          {
            title: '区',
            width: '22%',
            dataIndex: 'district_name'
          },
          {
            title: '门店名称',
            width: '34%',
            dataIndex: 'shop_name'
          }
        ],
        list: []
      }
    }
  },
  created() {
    this.getListInfo({ card_id: this.id })
  },
  methods: {
    getListInfo(data) {
      console.log('data', data)
      let self = this
      if (self.title) {
        this.aService.getCardsDepositSaleShop(data).subscribe(state => {
          self.table.list = state.list
          self.pagination.current = state.page.current_page
          self.pagination.pageSize = state.page.size
          self.pagination.total = state.page.total_counts
        })
      } else {
        this.aService.getListInfo(data).subscribe(state => {
          self.table.list = state.list
          self.pagination.current = state.page.current_page
          self.pagination.pageSize = state.page.size
          self.pagination.total = state.page.total_counts
        })
      }
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
        card_id: self.id,
        size: self.pagination.pageSize,
        current_page: self.pagination.current
      }

      this.getListInfo(data)
      console.log('params', pagination, filters, sorter)
    }
  }
}
</script>
