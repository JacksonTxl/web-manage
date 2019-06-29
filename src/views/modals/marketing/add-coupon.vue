<template>
  <st-modal
  title="选择优惠券"
  size="small"
  v-model="show"
  width="668px"
  wrapClassName="modal-marketing-add-coupon">
    <div :class="add('content')">
      <div :class="add('content-search')" class="mg-b24">
        <st-input-search
        style="width: 291px"
        @search="onSearch"
        placeholder="输入优惠券名称" />
        <st-button type="primary">优惠券列表</st-button>
      </div>
      <div :class="add('table')" v-scrollBar='{stopPropagation:true}'>
        <st-table
        size="middle"
        :rowSelection="{selectedRowKeys: selectedRowKeys,type:'radio',columnTitle:' ', onChange: onSelectChange}"
        :columns="columns"
        :dataSource="list"
        :pagination="false"
        rowKey="id">
           <!-- 可用门店 -->
          <template slot="is_shop_range" slot-scope="text,record">
            {{text===1?'全门店':`${record.shop_num}家`}}
          </template>
           <!-- 面额 -->
          <template slot="price" slot-scope="text">
            {{text}}元
          </template>
           <!-- 门槛 -->
          <template slot="use_type" slot-scope="text,record">
            {{text===1?`无门槛`:`满${record.full_price}元使用`}}
          </template>
        </st-table>
      </div>
    </div>
    <template slot="footer">
      <st-button @click="show=false">取消</st-button>
      <st-button @click="onSubmit" :disabled="!selectedRows.length" type="primary">确定</st-button>
    </template>
  </st-modal>
</template>
<script>
import { AddCouponService } from './add-coupon.service'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'ModalMarketingAddCoupon',
  bem: {
    add: 'modal-marketing-add-coupon'
  },
  serviceInject() {
    return {
      addCouponService: AddCouponService
    }
  },
  rxState() {
    return {
      loading: this.addCouponService.loading$,
      list: this.addCouponService.list$
    }
  },
  props: {
    id: {
      type: Number
    }
  },
  data() {
    return {
      show: false,
      columns: [
        {
          title: '优惠券名称',
          dataIndex: 'coupon_name',
          scopedSlots: { customRender: 'coupon_name' }
        },
        {
          title: '可用门店',
          dataIndex: 'is_shop_range',
          scopedSlots: { customRender: 'is_shop_range' }
        },
        {
          title: '面额',
          dataIndex: 'price',
          scopedSlots: { customRender: 'price' }
        },
        {
          title: '门槛',
          dataIndex: 'use_type',
          scopedSlots: { customRender: 'use_type' }
        },
        {
          title: '剩余数量',
          dataIndex: 'margin',
          scopedSlots: { customRender: 'margin' }
        }
      ],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  mounted() { this.getList({ coupon_name: '' }) },
  methods: {
    getList(query) {
      this.addCouponService.getList(query).subscribe(res => {
        if (this.list.some(i => i.id === this.id)) {
          this.selectedRowKeys = [this.id]
          this.selectedRows = cloneDeep(this.list.filter(i => i.id === this.id))
        } else {
          this.selectedRowKeys = []
          this.selectedRows = []
        }
      })
    },
    onSearch(data) {
      this.getList({ coupon_name: data })
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    onSubmit() {
      this.show = false
      this.$emit('success', { coupon: this.selectedRows[0] })
    }
  }
}
</script>
