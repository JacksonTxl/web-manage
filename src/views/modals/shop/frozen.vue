<template>
  <st-modal title="冻结" @ok="save" :footer="null" v-model="show" size="small">
    <st-form :form="form" @submit="save" labelWidth="75px">
      <a-row :gutter="8">
        <a-col :lg="24">
          <st-info>
            <st-info-item label="姓名">孙乐乐</st-info-item>
            <st-info-item label="手机号">12345678901</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-t4 class="mg-b8">选择需要冻结的卡或课</st-t4>
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
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="冻结日期">
            <a-range-picker
              format="YYYY-MM-DD"
              @change="onccccChange"
              v-decorator="basicInfoRuleList.to_shop"
            />
            <br>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="手续费">
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
          <st-form-item label="支付方式">
            <a-input v-decorator="basicInfoRuleList.pay_method"/>
            <br>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="收款人员">
            <a-input v-decorator="basicInfoRuleList.payee"/>
            <br>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item class="mg-l24" style="text-align:right;" labelOffset>
            <st-button type="primary" ghost html-type="submit">确认提交</st-button>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>
<script>
import { FrozenService } from './frozen.service'
export default {
  serviceInject() {
    return {
      Service: FrozenService
    }
  },
  // rxState() {
  //   return {
  //     cardsListInfo: this.Service.cardsListInfo$
  //   }
  // },
  name: 'frozen',
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
      show: false,
      getData: [],
      basicInfoRuleList: {
        id: ['id'],
        course_id: ['course_id'],
        frozen_start_time: ['frozen_start_time'],
        frozen_end_time: ['frozen_end_time'],
        poundage: ['poundage'],
        pay_method: ['pay_method'],
        payee: ['payee'],
        to_shop: [
          'to_shop',
          {
            rules: [
              {
                required: true,
                message: '请填写冻结日期!'
              }
            ]
          }
        ]
      },
      selectedRows: [],
      dateString: []
    }
  },
  created() {
    this.getMemberBuy()
  },
  methods: {
    getMemberBuy() {
      let self = this
      self.Service.getMemberBuy(self.record.id).subscribe(state => {
        self.getData = state
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
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (!err) {
            values.course_id = self.selectedRows.map(item => {
              return item.id
            })
            values.id = self.record.id
            values.frozen_start_time = self.dateString[0]
            values.frozen_end_time = self.dateString[1]
            delete values.to_shop

            self.getMemberTransfer(values)
          }
        }
      })
    },
    onccccChange(date, dateString) {
      this.dateString = dateString
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
