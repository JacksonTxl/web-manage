<template>
  <st-modal title="转店" @ok="save" :footer="null" v-model="show" size="small">
    <st-form :form="form" labelWidth="80px">
      <a-row :gutter="8">
        <a-col :lg="24">
          <st-info>
            <st-info-item label="姓名">{{record.member_name}}</st-info-item>
            <st-info-item label="手机号">{{record.mobile}}</st-info-item>
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
          <a-table
            :rowSelection="rowSelection"
            :pagination="false"
            size="middle"
            :columns="columns"
            :dataSource="getData"
            rowKey="id"
          >
            <span
              slot="start_end"
              slot-scope="text,record"
              href="javascript:;"
            >{{record.start_time}}~{{record.end_time}}</span>
          </a-table>
        </a-col>
      </a-row>
      <st-form-item label="转店至" style="margin-top:20px">
        <a-select placeholder="请选择门店" v-decorator="basicInfoRuleList.to_shop" @change="shopId">
          <a-select-option
            v-for="item in getDataList.list"
            :key="item.id"
            :value="item.id"
          >{{item.shop_name}}</a-select-option>
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
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="手续费归属">
            <a-select placeholder="请选择手续费归属" v-decorator="basicInfoRuleList.attribution">
              <a-select-option
                v-for="item in getTransferShop.list"
                :key="item.id"
                :value="item.id"
              >{{item.shop_name}}</a-select-option>
            </a-select>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item class="mg-l24" style="text-align:right;" labelOffset>
            <st-button type="primary" ghost html-type="submit" @click="save">确认提交</st-button>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
    {{getTransferShop}}
  </st-modal>
</template>
<script>
import { TransferShopService } from './transfer-shop.service'
export default {
  serviceInject() {
    return {
      Service: TransferShopService
    }
  },
  rxState() {
    return {
      cardsListInfo: this.Service.cardsListInfo$
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
          dataIndex: 'card_name',
          scopedSlots: { customRender: 'card_name' }
        },
        {
          title: '剩余',
          dataIndex: 'remain_amount'
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
      selectedRows: []
    }
  },
  created() {
    this.getMemberBuy()
  },
  methods: {
    shopId(value) {
      let self = this
      self.Service.getMemberTransferShop(value).subscribe(state => {
        self.getTransferShop = state
      })
    },
    getMemberBuy() {
      let self = this
      self.Service.getMemberBuy(self.record.id).subscribe(state => {
        self.getData = state
      })
      self.Service.getMemberShop().subscribe(state => {
        self.getDataList = state
      })
    },
    getMemberTransfer(data) {
      let self = this
      self.Service.getMemberTransfer(data).subscribe(state => {
        self.show = false
      })
    },
    save(e) {
      let self = this
      this.form.validateFields((err, values) => {
        if (!err) {
          values.course_id = self.selectedRows.map(item => {
            return item.id
          })
          values.id = self.record.id
          self.getMemberTransfer(values)
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
