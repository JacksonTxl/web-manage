<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :loading="loading.addGroup"
    :shopIds="shopIds"
    @onsubmit="onSubmit"
  >
    <template slot="choose-product">
      <a-row :gutter="8">
        <a-col :span="10">
          <st-form-item label="选择私教课">
            <a-input type="hidden" v-decorator="decorators.courseId" />
            <a-select
              showSearch
              v-model="courseId"
              placeholder="请选择私教课"
              @change="selectCourseChange"
            >
              <a-select-option
                :value="item.id"
                v-for="item in personalList"
                :key="item.id"
              >
                {{ item.product_name }}
              </a-select-option>
            </a-select>
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
      <a-row :gutter="8">
        <a-col :span="16">
          <st-form-item
            v-decorator="decorators.group_hour"
            label="优惠设置"
            required
            :help="tableText"
            :validateStatus="tableErr ? 'error' : ''"
          >
            <div :class="basic('table')">
              <st-table
                :columns="cardColumns"
                :dataSource="newCoach"
                :pagination="false"
                :scroll="{ y: 230 }"
                :rowSelection="
                  newCoach.length > 1
                    ? {
                        onChange: onChange,
                        selectedRowKeys: selectedRowKeys
                      }
                    : null
                "
                rowKey="id"
              >
                <template slot="group_price" slot-scope="customRender, record">
                  <st-input-number
                    v-model="record.group_price"
                    @change="setPriceChange"
                  >
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
import { ruleOptions, cardColumns } from './add-personal.config'
import { AddPersonalService } from './add-personal.service'
import { values } from 'lodash-es'
import { PatternService } from '@/services/pattern.service'
export default {
  serviceInject() {
    return {
      addPersonalService: AddPersonalService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.addPersonalService.loading$,
      personalList: this.addPersonalService.personalList$,
      coach: this.addPersonalService.coachList$
    }
  },
  mounted() {
    console.log(this.personalList)
  },
  bem: {
    basic: 'brand-marketing-group-personal'
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      courseId: '', // 活动商品
      selectedRowKeys: [], // 优惠设置选中项
      isLimit: true, // 限制库存
      cardColumns,
      groupParams: {
        type: 3,
        id: null
      },
      // 发布状态
      releaseStatus: 1,
      publishTime: null, // 发布时间
      activityState: Number, // 当前活动活动状态
      tableText: '', // 优惠设置错误提示
      helpShow: false,
      showHelp: false,
      tableErr: false,
      sku: [], // 卡、课规格[{“sku_id”:1,”group_price”:20},]
      shopIds: [],
      newCoach: []
    }
  },
  methods: {
    // 输入拼团课时
    changeHour(e) {
      this.groupHour = e.target.value
      this.newCoach.forEach((item, index) => {
        item.hour = e.target.value
      })
    },
    // 设置选择私教课并返回教练
    selectCourseChange(e) {
      this.form.setFieldsValue({
        courseId: e
      })
      this.groupParams.id = e
      this.addPersonalService.addCoach({ id: e }).subscribe(res => {
        this.newCoach = this.coach.map(item => {
          return {
            is_select: false,
            level: item.spec,
            id: item.id,
            hour: '--',
            group_price: ''
          }
        })
        if (this.newCoach.length === 1) {
          this.selectedRowKeys = this.newCoach
          this.newCoach[0].is_select = true
        }
      })
    },
    // 优惠设置选择变化
    onChange(value) {
      this.selectedRowKeys = value
      this.newCoach.forEach(coach => {
        coach.is_select = this.selectedRowKeys.indexOf(coach.id) !== -1
      })
    },
    setPriceChange() {
      let selectedCoach = this.newCoach.filter(item => item.is_select)
      let hasEmpty = selectedCoach.filter(item => !item.group_price)
      if (hasEmpty.length > 0) {
        this.tableText = '请输入拼团价格'
        this.tableErr = true
      } else {
        this.tableText = ''
        this.tableErr = false
      }
    },
    // 新建拼团活动
    onSubmit(data) {
      console.log(data)
      if (this.tableErr) return

      // let {
      //   activity_name, // 活动名称
      //   start_time,
      //   end_time,
      //   group_sum, //成团人数
      //   valid_time, //拼团有效期
      //   is_limit_stock, //是否限制库存0不限制 1限制
      //   stock_total, //库存
      //   shop_ids, //门店ids [1,2,3,4]
      //   published_type,
      //   published_time
      // } = data

      let isReturn = false
      if (isReturn) {
        return
      }
      data.product_type = 3 // 私教课
      data.product_id = this.courseId
      data.sku = this.newCoach.map(item => {
        if (item.is_select) {
          return {
            sku_id: item.id,
            group_price: item.group_price
          }
        }
      })
      // 275404963775803 门店id
      // let params = {
      //   product_type: 3, // 会籍卡
      //   activity_name: activity_name, // 活动名称
      //   product_id: this.courseId, //商品id
      //   sku: this.sku, //卡、课规格[{“sku_id”:1,”group_price”:20},]
      //   start_time: start_time,
      //   end_time: end_time,
      //   group_sum: group_sum, //成团人数
      //   valid_time: valid_time, //拼团有效期
      //   is_limit_stock: is_limit_stock, //是否限制库存0不限制 1限制
      //   stock_total: stock_total, //库存
      //   shop_ids: shop_ids, //门店ids [1,2,3,4]
      //   published_type: published_type, //发布状态(1-立即发布 2-暂不发布 3-定时发布)
      //   published_time: published_time //发布时间
      // }
      this.addPersonalService.addGroup(data).subscribe(res => {
        this.$router.push({
          path: `/brand/marketing/plugin/group/list`
        })
      })
    }
  },
  components: {
    GroupForm
  }
}
</script>
