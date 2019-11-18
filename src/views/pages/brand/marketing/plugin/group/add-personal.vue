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
                <span slot="suffix" :class="basic('tip')">
                  {{ groupName.length }}
                  /30
                </span>
              </a-input>
            </st-form-item>
            <st-form-item label="选择私教课" required>
              <!-- <a-select
                showSearch
                v-model="cardId"
                placeholder="请选择私教课"
                @change="handleChange"
              >
                <a-select-option
                  v-for="item in searchPersonal"
                  :value="item.id"
                >
                  {{ item.value }}
                </a-select-option>
              </a-select> -->
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item label="拼团课时" required>
              <a-input
                v-decorator="decorators.group_hour"
                placeholder="请输入拼团课时"
                @change="changeHour"
              ></a-input>
            </st-form-item>
          </a-col>
        </a-row>
        <!-- 输入完课时 之后才可以显示优惠设置的教练信息 -->
        <a-row :gutter="8">
          <a-col :span="16">
            <st-form-item label="优惠设置" required>
              <div :class="basic('table')">
                <st-table
                  v-if="decorators.group_hour"
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
                  <!-- rowKey="key" -->
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
              <st-range-picker :value="selectTime"></st-range-picker>
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
import { ruleOptions, cardColumns } from './add-personal.config'
import SelectShop from '@/views/fragments/shop/select-shop'
import { AddPersonalService } from './add-personal.service'
import moment from 'moment'
import { values } from 'lodash-es'
export default {
  serviceInject() {
    return {
      addPersonalService: AddPersonalService
    }
  },
  rxState() {
    return {
      loading: this.addPersonalService.loading$,
      personalList: this.addPersonalService.personalList$
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
      groupHour: '',
      cardId: '',
      skuList: [{ id: 1, spec: '30次', price: 100 }],
      selectedRowKeys: [], // 优惠设置选中项
      activity_time: [],
      isLimit: true,
      shopIds: [],
      cardColumns,
      searchPersonal: [
        // 私教课
        {
          id: 1,
          value: '普通私教课'
        },
        {
          id: 2,
          value: '明星私教课'
        },
        {
          id: 3,
          value: '三体私教课'
        }
      ],
      tableData: [
        // 拼团课时
        {
          spec: '普通教练',
          price: '33',
          group_price: '55',
          id: 100
        },
        {
          spec: '明星教练 ',
          price: '43',
          group_price: '77',
          id: 102
        },
        {
          spec: '高级教练',
          price: '93',
          group_price: '888',
          id: 105
        }
      ],
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
      }
    }
  },
  props: {
    // 是否是编辑0:新建，1:已发布, 2:暂不发布, 3:定时发布
    editType: {
      type: Number,
      default: 0
    }
  },
  methods: {
    // 输入拼团课时
    changeHour(e) {
      console.log(e, '我是拼团课时')
    },
    // 设置选择私教课
    handleChange(e) {
      console.log(e, '我是选择私教课')
    },
    // 优惠设置选择变化
    onChange(value) {
      console.log(value)
      this.selectedRowKeys = value
    },
    // 是否限制库存
    limitStock(value) {
      this.isLimit = value.target.checked
    },
    // 选择门店
    onSelectShop(value) {
      console.log(value)
    },
    // 为了同步字数
    changeName(e) {
      console.log(e)
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
        console.log(this.editType, 'this.editType')
        let params = {}
        if (this.editType === 1 || this.editType === 3) {
          // 编辑
          params = {
            id: 1,
            product_type: 1,
            activity_name: values.activity_name,
            end_time: this.selectTime.endTime.value,
            stock_total: values.stock_total
          }
        } else {
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
            // start_time: moment(values.start_time).format('YYYY-MM-DD HH:MM'),
            // end_time: moment(values.end_time).format('YYYY-MM-DD HH:MM'),
            start_time: this.selectTime.startTime.value,
            end_time: this.selectTime.endTime.value,
            group_sum: values.group_sum, //成团人数
            valid_time: values.valid_time, //拼团有效期
            is_limit_stock: '', //是否限制库存0不限制 1限制
            stock_total: values.stock_total, //库存
            shop_ids: '', //门店ids [1,2,3,4]
            published_type: '', //发布状态(1-立即发布 2-暂不发布 3-定时发布)
            published_time: '' //发布时间
          }
        }
        if (this.editType) {
          // 编辑 type为2，3只能编辑名称，结束时间，库存
          this.addPersonalService.editGroup(params).subscribe(res => {
            console.log(params, res, '这是编辑返回的数据')
          })
        } else {
          this.addPersonalService.addGroup(params).subscribe(res => {
            // 新建成功 todo(路由地址未确定)
            console.log(params, res, '==============')
            // this.$router.push({
            //   path: `/brand/marketing/plugin/group/list`
            // })
          })
        }
      })
    }
  },
  components: {
    SelectShop
  }
}
</script>
