<template>
  <st-modal title="转店" @ok="save" :footer="null" v-model="show" size="small">
    <st-form :form="form" labelWidth="80px">
      <a-row :gutter="8">
        <a-col :lg="24">
          <st-info>
            <st-info-item label="姓名">{{ record.member_name }}</st-info-item>
            <st-info-item label="手机号">{{ record.mobile }}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-t4 class="mg-b8">选择需要转店的卡/课</st-t4>
      <a-row :gutter="8">
        <a-col
          :lg="24"
          class="distribution-container"
          style="padding-left:12px;padding-right:12px;"
        >
          <st-form-item required :help="selectedRowsHelp">
            <a-table
              :rowSelection="rowSelection"
              :pagination="false"
              size="middle"
              :columns="columns"
              :dataSource="list"
              rowKey="id"
            >
              <span slot="remain_amount" slot-scope="text, record">
                {{ record.remain_amount }} {{ record.unit }}
              </span>
              <span slot="start_end" slot-scope="text, record">
                {{ record.start_time }} ~ {{ record.end_time }}
              </span>
            </a-table>
          </st-form-item>
        </a-col>
      </a-row>
      <st-form-item label="转店至" style="margin-top:20px">
        <a-select
          placeholder="请选择门店"
          v-decorator="basicInfoRuleList.to_shop"
          @change="shopId"
        >
          <a-select-option
            v-for="item in getDataList.list"
            :key="item.id"
            :value="item.id"
          >
            {{ item.shop_name }}
          </a-select-option>
        </a-select>
      </st-form-item>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="转让手续费">
            <st-input-number
              :float="true"
              placeholder="请输入转让手续费"
              v-decorator="basicInfoRuleList.poundage"
            >
              <template slot="addonAfter">
                元
              </template>
            </st-input-number>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="手续费归属">
            <a-select
              placeholder="请选择手续费归属"
              v-decorator="basicInfoRuleList.attribution"
            >
              <a-select-option
                v-for="item in getTransferShop.list"
                :key="item.id"
                :value="item.id"
              >
                {{ item.shop_name }}
              </a-select-option>
            </a-select>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item class="mg-l24" style="text-align:right;" labelOffset>
            <st-button
              type="primary"
              html-type="submit"
              @click="save"
              :loading="loading.getMemberTransfer"
            >
              确认提交
            </st-button>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>
<script>
import { TransferShopService } from './transfer-shop.service'
export default {
  serviceInject() {
    return {
      transferShopService: TransferShopService
    }
  },
  rxState() {
    return {
      loading: this.transferShopService.loading$,
      info: this.transferShopService.info$,
      list: this.transferShopService.list$
    }
  },
  name: 'transferShop',
  props: {
    record: {
      type: Object
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      columns: [
        {
          title: '卡课',
          dataIndex: 'name'
        },
        {
          title: '剩余',
          dataIndex: 'remain_amount',
          scopedSlots: { customRender: 'remain_amount' }
        },
        {
          title: '有效期',
          dataIndex: 'start_end',
          scopedSlots: { customRender: 'start_end' }
        }
      ],
      getDataList: [],
      getData: [],
      getTransferShop: [],
      show: false,
      basicInfoRuleList: {
        poundage: ['poundage'],
        attribution: ['attribution'],
        course_id: ['course_id'],
        to_shop: [
          'to_shop',
          {
            rules: [
              {
                required: true,
                message: '请填写收款方式'
              }
            ]
          }
        ]
      },
      selectedRows: [],
      selectedRowsHelp: ''
    }
  },
  created() {
    this.getMemberBuy()
  },
  methods: {
    shopId(value) {
      let self = this
      self.transferShopService.getMemberTransferShop(value).subscribe(state => {
        self.getTransferShop = state
      })
    },
    getMemberBuy() {
      this.transferShopService.getMemberBuy(this.record.member_id).subscribe()
      this.transferShopService.getMemberShop().subscribe(state => {
        this.getDataList = state
      })
    },
    getMemberTransfer(data) {
      this.transferShopService.getMemberTransfer(data).subscribe(state => {
        this.show = false
        this.$emit('success')
      })
    },
    save(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.selectedRows.length <= 0) {
            this.selectedRowsHelp = '请选择冻结的卡课'
            return
          } else {
            this.selectedRowsHelp = ''
          }
          values.course_id = this.selectedRows.map(item => {
            return item.id
          })
          values.id = this.record.member_id
          this.getMemberTransfer(values)
        }
      })
    }
  },
  computed: {
    rowSelection() {
      let self = this
      const { selectedRowKeys } = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          self.selectedRows = selectedRows
          if (selectedRows.length > 0) {
            self.selectedRowsHelp = ''
          }
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name
          }
        })
      }
    }
  },
  watch: {}
}
</script>
