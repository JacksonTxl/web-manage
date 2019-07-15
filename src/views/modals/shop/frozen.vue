<template>
  <st-modal title="冻结" :footer="null" v-model="show" size="small">
    <st-form :form="form" labelWidth="80px">
      <a-row :gutter="8">
        <a-col :lg="24">
          <st-info>
            <st-info-item label="姓名">{{record.member_name}}</st-info-item>
            <st-info-item label="手机号">{{record.mobile}}</st-info-item>
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
        <st-form-item :help="selectedRowsHelp" required>
          <a-table
            :rowSelection="rowSelection"
            :pagination="false"
            size="middle"
            :columns="columns"
            :dataSource="list"
            rowKey="id"
          >
            <span
              slot="remain_amount"
              slot-scope="text,record"
            >{{record.remain_amount}} {{record.unit}}</span>
            <span
              slot="start_end"
              slot-scope="text,record"
            >{{record.start_time}} ~ {{record.end_time}}</span>
          </a-table>
        </st-form-item>

        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="冻结日期">
            <!-- <a-range-picker
              format="YYYY-MM-DD"
              @change="onChangeDatepicker"
              v-decorator="basicInfoRuleList.to_shop"
            /> -->
            <a-date-picker
              format="YYYY-MM-DD"
              placeholder="冻结日期"
              v-decorator="basicInfoRuleList.end_time"
            />
            <br>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
           <st-form-item label="有无手续费" required>
            <a-radio-group v-decorator="basicInfoRuleList.moneyFlag" @change="changeTransfer">
              <a-radio :value="item.value" v-for="(item, index) in hasTransferFeeList" :key="index" >{{item.label}}</a-radio>
            </a-radio-group>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8" v-if="isTransferFlag">
        <a-col :lg="24">
          <st-form-item label="手续费" required>
            <st-input-number
              :float="true"
              placeholder="请输入转让手续费"
              v-decorator="basicInfoRuleList.payee"
            >
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="8" class="mg-t8" v-if="isTransferFlag">
        <a-col :lg="24">
          <st-form-item label="支付方式" required>
            <a-select :class="basic('select')" v-decorator="basicInfoRuleList.pay_method"  placeholder="请选择支付方式">
              <a-select-option
              v-for="(item,index) in payMethodList"
              :key="index"
              :value="item.value">{{item.label}}</a-select-option>
            </a-select>
          </st-form-item>
        </a-col>
      </a-row>
      <!-- <a-row :gutter="8" class="mg-t8" v-if="isTransferFlag">
        <a-col :lg="24">
          <st-form-item label="收款人员" required>
            <a-select
              showSearch
              allowClear
              placeholder="输入手机号或员工名称搜索"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              :filterOption="false"
              v-decorator="basicInfoRuleList.sale_id"
              @search="onSearch"
              notFoundContent="无搜索结果"
            >
              <a-select-option
              v-for="(item,index) in staffList"
              :value="item.id"
              :key="index">
                <span v-html="`${item.staff_name} ${item.mobile}`.replace(new RegExp(memberSearchText,'g'),`\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`)">
                  {{item.staff_name}} {{item.mobile}}
                </span>
              </a-select-option>
            </a-select>
          </st-form-item>
        </a-col>
      </a-row> -->
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item class="mg-l24" style="text-align:right;" labelOffset>
            <st-button type="primary" @click="save" :loading="loading.getMemberTransfer">确认</st-button>
          </st-form-item>

        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>
<script>
import { FrozenService } from './frozen.service'
import { UserService } from '@/services/user.service'
import moment from 'moment'
export default {
  serviceInject() {
    return {
      frozenService: FrozenService,
      userService: UserService
    }
  },
  rxState() {
    return {
      list: this.frozenService.list$,
      staffList: this.frozenService.staffList$,
      memberEnums: this.userService.memberEnums$,
      loading: this.frozenService.loading$
    }
  },
  name: 'frozen',
  bem: {
    basic: 'shop-frozen'
  },
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
      show: false,
      basicInfoRuleList: {
        id: ['id'],
        course_id: ['course_id'],
        poundage: ['poundage'],
        pay_method: ['pay_method', {
          rules: [
            {
              required: true,
              message: '请选择支付方式'
            }
          ]
        }],
        payee: ['payee', {
          rules: [
            {
              required: true,
              message: '请输入手续费!'
            }
          ]
        }],
        end_time: [
          'end_time',
          {
            rules: [
              {
                required: true,
                message: '请填写冻结日期!'
              }
            ]
          }
        ],
        moneyFlag: [
          'is_handling_fee',
          {
            rules: [
              {
                required: true,
                message: '请选择有无手续费'
              }
            ]
          }
        ],
        sale_id: [
          'sale_id',
          {
            rules: [
              {
                required: true,
                message: '请选择收款人员'
              }
            ]
          }
        ]
      },
      isTransferFlag: false,
      selectedRows: [],
      dateString: [],
      selectedRowsHelp: ''
    }
  },
  created() {
    this.getMemberBuy()
  },
  methods: {
    moment,
    // 搜索员工
    onSearch(data) {
      this.memberSearchText = data
      if (data === '') {
        this.frozenService.memberList$.commit(() => [])
        this.form.resetFields(['payee'])
      } else {
        this.frozenService.getMemberList(data).subscribe(res => {
          if (!res.list.length) {
            this.form.resetFields(['payee'])
          }
        })
      }
    },
    getMemberBuy() {
      this.frozenService.getMemberBuy(this.record.member_id).subscribe()
    },
    getMemberTransfer(data) {
      this.frozenService.getMemberTransfer(data).subscribe(state => {
        this.show = false
        this.$$emit('success')
      })
    },
    save(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (!err) {
            if (this.selectedRows.length <= 0) {
              this.selectedRowsHelp = '请选择冻结的卡课'
              return
            } else {
              this.selectedRowsHelp = ''
            }
            values.product = this.selectedRows.map(item => {
              return {
                product_type: item.type,
                product_id: item.id
              }
            })
            values.id = this.record.member_id
            values.end_time = moment(values.end_time).format('YYYY-MM-DD HH:mm')
            this.getMemberTransfer(values)
          }
        }
      })
    },
    onChangeDatepicker(date, dateString) {
      this.dateString = dateString
    },
    changeTransfer(event) {
      if (event.target.value === 0) {
        this.isTransferFlag = false
      } else {
        this.isTransferFlag = true
      }
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
    },
    // has_transferFee
    payMethodList() {
      let list = []
      if (!this.memberEnums.pay_method) return list
      Object.entries(this.memberEnums.pay_method.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    hasTransferFeeList() {
      let list = []
      if (!this.memberEnums.has_transferFee) return list
      Object.entries(this.memberEnums.has_transferFee.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
  },
  watch: {}
}
</script>
