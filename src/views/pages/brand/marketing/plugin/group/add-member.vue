<template>
  <st-mina-panel app>
    <div slot="actions">
      <st-button :loading="loading.addGroup" type="primary" @click="onSubmit">
        保 存
      </st-button>
    </div>
    <div>
      <st-form :form="form" labelWidth="118px">
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item label="活动名称" required>
              <a-input
                v-decorator="decorators.activity_name"
                placeholder="请输入活动名称"
                @change="changeName"
              >
                <span slot="suffix">
                  {{ groupName.length }}
                  /30
                </span>
              </a-input>
            </st-form-item>
            <st-form-item label="选择会籍卡" required>
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
            <st-form-item label="优惠设置" required>
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
                  <template
                    slot="group_price"
                    slot-scope="customRender, record"
                  >
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
        <a-row :gutter="8">
          <a-col :span="16">
            <st-form-item label="活动时间" required>
              <!-- <a-date-picker
                style="width:181px;"
                :disabledDate="disabledDate"
                :showTime="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
                v-model="start_time"
              />
              ~
              <a-date-picker
                style="width:181px;"
                :disabledDate="disabledDate"
                :showTime="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
                v-model="end_time"
              /> -->
              <st-range-picker
                :disabledDays="180"
                :value="selectTime"
              ></st-range-picker>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item required>
              <span slot="label">
                参团人数
                <st-help-tooltip id="TBPTXJ001" />
              </span>
              <st-input-number v-decorator="decorators.group_sum">
                <template slot="addonAfter">
                  人
                </template>
              </st-input-number>
            </st-form-item>
            <st-form-item required>
              <span slot="label">
                拼团有效期
                <st-help-tooltip id="TBPTXJ002" />
              </span>
              <st-input-number v-decorator="decorators.valid_time">
                <template slot="addonAfter">
                  小时
                </template>
              </st-input-number>
            </st-form-item>
            <st-form-item required>
              <span slot="label">
                活动库存
                <st-help-tooltip id="TBPTXJ003" />
              </span>
              <a-checkbox @change="limitStock" :checked="isLimit">
                限制库存&nbsp;&nbsp;
              </a-checkbox>
              <st-input-number
                v-if="isLimit"
                :class="basic('stock')"
                v-decorator="decorators.stock_total"
              ></st-input-number>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="16">
            <st-form-item required>
              <span slot="label">
                选择门店
                <st-help-tooltip id="TBPTXJ004" />
              </span>
              <select-shop
                :class="basic('table')"
                @change="onSelectShop"
                :shopIds="shopIds"
              ></select-shop>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item required>
              <span slot="label">
                发布状态
                <st-help-tooltip id="TBPTXJ005" />
              </span>
              <a-radio-group v-model="releaseStatus">
                <a-radio :value="1" :key="1">
                  立即发布
                </a-radio>
                <a-radio :value="2" :key="2">
                  暂不发布
                </a-radio>
                <a-radio :value="3" :key="3">
                  定时发布
                </a-radio>
              </a-radio-group>
            </st-form-item>
            <st-form-item label="发布时间" required v-if="releaseStatus === 3">
              <a-date-picker
                :disabledDate="disabledDate"
                :showTime="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
                v-model="publishTime"
              />
            </st-form-item>
          </a-col>
        </a-row>
      </st-form>
    </div>
  </st-mina-panel>
</template>
<script>
import { ruleOptions, cardColumns } from './add-member.config'
import SelectShop from '@/views/fragments/shop/select-shop'
import { AddMemberService } from './add-member.service'
import moment from 'moment'
import { values } from 'lodash-es'
import { ACTIVITY_STATUS } from '@/constants/marketing/group-buy'
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
      groupName: '',
      cardId: '',
      skuList: [{ id: 1, spec: '30次', price: 100 }],
      selectedRowKeys: [], // 优惠设置选中项
      activity_time: [],
      isLimit: true,
      shopIds: [],
      cardColumns,
      tableData: [],
      // 发布状态
      releaseStatus: 1,
      publishTime: null,
      selectTime: {
        startTime: {
          showTime: false,
          disabledBegin: moment(),
          placeholder: '开始日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD HH:mm',
          change: $event => {}
        },
        endTime: {
          showTime: false,
          placeholder: '结束日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD HH:mm',
          change: $event => {},
          disabledDate: this.disabledDate
        }
      },
      activityState: Number, // 当前活动活动状态
      ACTIVITY_STATUS
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
      this.memberList.filter(item => {
        if (item.id === value) {
          this.tableData = item.product_spec
          if (this.selectedRowKeys && this.isEdit) {
            this.info.sku.forEach(item => {
              this.tableData.forEach(card => {
                console.log(item, card, '-------------zheli')
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
    // 是否限制库存
    limitStock(value) {
      this.isLimit = value.target.checked
    },
    // 选择门店
    onSelectShop(shopIds) {
      this.shopIds = shopIds
    },
    // 为了同步字数
    changeName(e) {
      this.groupName = e.target.value
    },
    // select选择设置开始时间不能小于现在
    disabledDate(current) {
      return (
        current &&
        current.format('YYYY-MM-DD HH:mm') < moment().format('YYYY-MM-DD HH:mm')
      )
    },
    // 新建拼团活动
    onSubmit() {
      this.form.validate().then(values => {
        let params = {}
        let list = []
        this.selectedRowKeys.forEach((id, index) => {
          this.tableData.forEach(item => {
            if (item.id === id) {
              list.push({ sku_id: id, group_price: item.group_price })
            }
          })
        })
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
          this.addMemberService.editGroup(params).subscribe(res => {
            console.log(params, res, '这是编辑返回的数据')
          })
        } else {
          this.addMemberService.addGroup(params).subscribe(res => {
            // 新建成功 todo(路由地址未确定)
            console.log(params, res, '==============')
            // this.$router.push({
            //   path: `/brand/marketing/plugin/group/list`
            // })
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
    }
  },
  components: {
    SelectShop
  }
}
</script>
