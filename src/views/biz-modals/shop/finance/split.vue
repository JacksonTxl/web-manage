<template>
  <st-modal
    title="业务拆分"
    size="small"
    width="800px"
    v-model="show"
    wrapClassName="modal-shop-finance-split"
  >
    <div :class="basic('content')">
      <a-row :class="basic('info')">
        <a-col :span="12" class="mgb-36">
          <st-info>
            <st-info-item label="订单号">{{ info.order_id }}</st-info-item>
            <st-info-item label="下单人">{{ info.operator_name }}</st-info-item>
            <st-info-item label="销售">{{ info.staff_name }}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="12" class="mgb-36">
          <st-info>
            <st-info-item label="下单时间">
              {{ info.created_time }}
            </st-info-item>
            <st-info-item label="订单总额">
              {{ info.total_price }}元
            </st-info-item>
            <st-info-item label="实收金额">
              {{ info.actual_price }}元
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-table
        rowKey="staff_id"
        :pagination="false"
        :columns="columns"
        :scroll="{ x: 752 }"
        :dataSource="info.split_items"
      >
        <template slot="staff_name" slot-scope="text, record, index">
          <a-select
            v-if="record.edit && record.staff_type !== SPLIT.STAFF_TYPE_1"
            v-model="record.staff_id"
            @change="changeSaleMan($event, record, index)"
            style="width: 150px"
            placeholder="选择销售人员"
          >
            <a-select-option
              v-for="(item, index) in saleList"
              :key="index"
              :value="item.id"
            >
              {{ item.staff_name }}
            </a-select-option>
          </a-select>
          <template v-else>
            {{ text }}
          </template>
        </template>
        <template slot="split_ratio" slot-scope="text, record">
          <st-input-number
            v-if="record.edit"
            :min="0"
            :max="100"
            v-model="record.split_ratio"
            :float="true"
            placeholder="请输入占比"
            style="width:150px"
          >
            <span slot="addonAfter">%</span>
          </st-input-number>
          <template v-else>
            {{ text }}
          </template>
        </template>
        <div slot="action" slot-scope="text, record, index">
          <st-table-actions>
            <a
              v-if="record.edit === SPLIT.EDIT_TYPE_3"
              @click="addSaleMan(record)"
            >
              协助售卖人
            </a>
            <a
              v-if="record.edit && record.edit !== SPLIT.EDIT_TYPE_3"
              @click="onSave(record, index)"
            >
              确定
            </a>
            <a v-if="!record.edit" @click="onEidt(record, index)">编辑</a>
            <a
              v-if="
                record.edit === SPLIT.EDIT_TYPE_1 ||
                  record.edit === SPLIT.EDIT_TYPE_2
              "
              @click="onCanel(record, index)"
            >
              取消
            </a>
            <a
              v-if="!record.edit && record.staff_type !== SPLIT.STAFF_TYPE_1"
              @click="onDelete(index)"
            >
              删除
            </a>
          </st-table-actions>
        </div>
      </st-table>
      <div :class="basic('descrip')">
        <label>备注</label>
        <a-textarea
          v-model="description"
          :autosize="{ minRows: 4, maxRows: 6 }"
        />
      </div>
    </div>
    <template slot="footer">
      <st-button @click="onSubmit" :loading="loading.split" type="primary">
        确认拆分
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import moment from 'moment'
import { SplitService } from './split.service'
import { cloneDeep } from 'lodash-es'
import { columns } from './split.config'
import { SPLIT } from '@/constants/finance/split'
export default {
  name: 'ModalShopFinanceOrderSplit',
  bem: {
    basic: 'modal-shop-finance-split'
  },
  serviceInject() {
    return {
      splitService: SplitService
    }
  },
  rxState() {
    return {
      info: this.splitService.info$,
      loading: this.splitService.loading$,
      saleList: this.splitService.saleList$
    }
  },
  props: ['id'],
  data() {
    return {
      SPLIT,
      form: this.$form.createForm(this),
      show: false,
      description: '',
      rate: 0,
      saleMan: ''
    }
  },
  computed: {
    columns
  },
  created() {
    this.splitService.serviceInit(this.id).subscribe(result => {
      const item = {
        edit: this.SPLIT.EDIT_TYPE_3, // 1 主销售编辑 2 协助销售编辑 3协助销售新增
        staff_id: '',
        staff_name: '',
        staff_type: this.SPLIT.STAFF_TYPE_2,
        staff_type_name: '协助销售',
        split_ratio: '',
        split_money: ''
      }
      return this.info.split_items.unshift(item)
    })
  },
  methods: {
    getSaleManById(id) {
      return this.saleList.filter(element => {
        return element.id === id
      })[0]
    },
    changeSaleMan(event, record, index) {
      const arr = this.info.split_items.filter(element => {
        return element.staff_id === event
      })
      if (arr.length > 0) {
        return
      }
      this.info.split_items[index].staff_id = event
      this.info.split_items[index].staff_name = this.getSaleManById(
        event
      ).staff_name
    },
    validSaleMan(record) {
      if (!this.info.split_items || this.info.split_items.length >= 7) {
        return false
      }
      let percent = 0
      this.info.split_items.forEach(element => {
        percent = percent + parseInt(element.split_ratio || 0, 10)
        if (element.staff_id === record.staff_id) {
          return false
        }
      })
      percent += parseInt(record.split_ratio, 10)
      if (percent > 100) {
        return false
      }
      return true
    },
    addSaleMan(record) {
      if (
        !record.staff_id ||
        !record.split_ratio ||
        !this.validSaleMan(record)
      ) {
        return
      }
      delete record.edit
      record.split_money = (
        (+record.split_ratio / 100) *
        +this.info.actual_price
      ).toFixed(1)
      this.info.split_items.splice(0, 1, record)
      this.info.split_items.unshift({
        edit: this.SPLIT.EDIT_TYPE_3,
        staff_id: '',
        staff_name: '',
        staff_type: this.SPLIT.STAFF_TYPE_2,
        staff_type_name: '协助销售',
        split_ratio: '',
        split_money: ''
      })
    },
    onSave(record, index) {
      delete record.edit
      record.split_money = (
        (+record.split_ratio / 100) *
        +this.info.actual_price
      ).toFixed(1)
      this.info.split_items.splice(index, 1, record)
    },
    onEidt(record, index) {
      record.meta = cloneDeep(record)
      record.edit = record.staff_type
      this.info.split_items.splice(index, 1, record)
    },
    onCanel(record, index) {
      record = record.meta
      this.info.split_items.splice(index, 1, record)
    },
    onDelete(index) {
      this.info.split_items.splice(index, 1)
    },
    moment,
    onSubmit() {
      const list = this.info.split_items.map(item => {
        const params = {}
        if (item.staff_id !== -1) {
          params.staff_id = item.staff_id
          params.staff_rate = item.split_ratio
        }
        return params
      })
      list.shift()
      const params = {
        order_id: this.id,
        description: this.description,
        split_data: list
      }
      this.splitService.split(params).subscribe(result => {
        this.show = false
        this.$emit('success')
      })
    }
  }
}
</script>
