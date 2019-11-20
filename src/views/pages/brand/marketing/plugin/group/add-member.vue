<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :loading="loading"
    :isEdit="isEdit"
    :info="info"
    :shopIds="shopIds"
    @onsubmit="onSubmit"
  >
    <template slot="choose-product">
      <a-row :gutter="8">
        <a-col :span="10">
          <st-form-item label="选择会籍卡" required>
            <a-input type="hidden" v-decorator="decorators.cardId" />
            <a-select
              showSearch
              v-model="cardId"
              placeholder="请输入"
              @change="chooseMember"
            >
              <a-select-option
                :value="item.id"
                v-for="(item, index) in memberList"
                :key="index"
              >
                {{ item.product_name }}
              </a-select-option>
            </a-select>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :span="16">
          <st-form-item
            label="优惠设置"
            required
            :help="tableText"
            :validateStatus="tableErr ? 'error' : ''"
          >
            <div :class="basic('table')">
              <st-table
                :columns="cardColumns"
                :dataSource="tableData"
                :pagination="false"
                :scroll="{ y: 230 }"
                :rowSelection="
                  tableData.length > 1
                    ? {
                        onChange: onChange,
                        selectedRowKeys: selectedRowKeys
                      }
                    : null
                "
                rowKey="id"
              >
                <template slot="group_price" slot-scope="customRender, record">
                  <st-input-number v-model="record.group_price">
                    <template slot="addonAfter">
                      元
                    </template>
                  </st-input-number>
                </template>
              </st-table>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
    </template>
  </group-form>
</template>
<script>
import GroupForm from './components#/group-form'
import { ruleOptions, cardColumns } from './add-member.config'
import { AddMemberService } from './add-member.service'
import { values } from 'lodash-es'
export default {
  serviceInject() {
    return {
      addMemberService: AddMemberService
    }
  },
  rxState() {
    return {
      loading: this.addMemberService.loading$,
      memberList: this.addMemberService.memberList$
    }
  },
  bem: {
    basic: 'brand-marketing-group-member'
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      cardId: '',
      skuList: [{ id: 1, spec: '30次', price: 100 }],
      selectedRowKeys: [], // 优惠设置选中项
      cardColumns,
      tableText: '',
      tableErr: false,
      tableData: [],
      shopIds: []
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    info(n, o) {
      if (this.isEdit) {
        this.setFieldsValue()
        this.addMemberService.init().subscribe(res => {
          this.chooseMember(this.cardId)
        })
      }
    }
  },
  methods: {
    chooseMember(value) {
      this.form.setFieldsValue({
        cardId: value
      })
      this.groupParams.id = value
      this.memberList.filter(item => {
        if (item.id === value) {
          this.tableData = item.product_spec
          if (this.selectedRowKeys && this.isEdit) {
            this.info.sku.forEach(item => {
              this.tableData.forEach(card => {
                if (item.id === card.id) {
                  card.group_price = item.group_price
                }
              })
            })
          }
        }
      })
    },
    // 优惠设置选择变化
    onChange(value) {
      this.selectedRowKeys = value
    },
    // 新建拼团活动
    onSubmit(data) {
      console.log(data)
      return
      let isReturn = false
      let list = []

      if (!this.selectedRowKeys.length) {
        this.tableText = '请选择会籍卡规格'
        this.tableErr = true
        isReturn = true
      }
      this.selectedRowKeys.forEach((id, index) => {
        this.tableData.forEach(item => {
          if (item.id === id) {
            if (!item.group_price) {
              this.tableText = '请输入拼团价'
              this.tableErr = true
              isReturn = true
            }
            list.push({ sku_id: id, group_price: item.group_price })
          }
        })
      })
      this.form.validate().then(values => {
        let params = {}
        if (isReturn) {
          return
        }
        params = {
          product_type: 1, // 会籍卡
          activity_name: values.activity_name, // 活动名称
          product_id: this.cardId, //商品id
          sku: list, //卡、课规格[{“sku_id”:1,”group_price”:20},]
          start_time: this.selectTime.startTime.value,
          end_time: this.selectTime.endTime.value,
          group_sum: values.group_sum, //成团人数
          valid_time: values.valid_time, //拼团有效期
          is_limit_stock: this.isLimit ? 1 : 0, //是否限制库存0不限制 1限制
          stock_total: values.stock_total, //库存
          shop_ids: this.shopIds, //门店ids [1,2,3,4]
          published_type: this.releaseStatus, //发布状态(1-立即发布 2-暂不发布 3-定时发布)
          published_time: moment(this.publishTime).format('YYYY-MM-DD HH:mm') //发布时间
        }
        if (this.isEdit) {
          params.id = this.$route.query.id
          this.addMemberService.editGroup(params).subscribe(res => {
            this.$router.push({
              path: `/brand/marketing/plugin/group/list`
            })
          })
        } else {
          this.addMemberService.addGroup(params).subscribe(res => {
            this.$router.push({
              path: `/brand/marketing/plugin/group/list`
            })
          })
        }
      })
    },
    // 详情回显
    setFieldsValue() {
      this.groupName = this.info.activity_name
      this.releaseStatus = this.info.published_type
      this.selectTime.startTime.value = moment(this.info.start_time)
      this.selectTime.endTime.value = moment(this.info.end_time)
      this.activityState = this.info.activity_state[0].id
      this.cardId = this.info.product.id
      this.isLimit = this.info.is_limit_stock === 1
      this.selectTime.startTime.disabled =
        this.activityState > this.ACTIVITY_STATUS.PUBLISHER
      this.form.setFieldsValue({
        activity_name: this.info.activity_name,
        group_sum: this.info.group_sum,
        valid_time: this.info.valid_time,
        stock_total: this.info.stock_total
      })
      this.info.sku.forEach(item => {
        this.selectedRowKeys.push(item.id)
      })
      this.shopIds = this.info.support_shop
    }
  },
  components: {
    GroupForm
  }
}
</script>
