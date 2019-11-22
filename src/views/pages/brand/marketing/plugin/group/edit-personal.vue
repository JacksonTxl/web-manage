<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :isEdit="true"
    :info="info"
    :shopIds="shopIds"
    @onsubmit="onSubmit"
  >
    <template slot="choose-product">
      <a-row :gutter="8">
        <a-col :span="10">
          <st-form-item label="选择私教课">
            <a-input type="hidden" />
            <a-select
              showSearch
              v-model="cardId"
              placeholder="请选择私教课"
              @change="handleChange"
            >
              <a-select-option
                v-for="item in personalList"
                :value="item.brand_id"
                :key="item.id"
              >
                {{ item.brand_id }}
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
import { ruleOptions, cardColumns } from './add-personal.config'
import { EditPersonalService } from './edit-personal.service'
export default {
  serviceInject() {
    return {
      editPersonalService: EditPersonalService
    }
  },
  rxState() {
    return {
      coach: this.editPersonalService.coach$,
      info: this.editPersonalService.info$,
      personalList: this.editPersonalService.personalList$
    }
  },
  bem: {
    basic: 'brand-marketing-group-personal'
  },
  mounted() {
    console.log(this.info)
    this.setFieldsValue()
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      cardId: '', // 活动商品
      selectedRowKeys: [], // 优惠设置选中项
      // isLimit: true, // 限制库存
      cardColumns,
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
      newCoach: [],
      groupHour: '',
      published_type: 3,
      id: ''
    }
  },
  computed: {
    // 教练增加默认课时
    // newCoach() {
    //   return this.coach.map(item => {
    //     return { level: item.level, id: item.id, hour: '--' }
    //   })
    // }
  },
  methods: {
    // 输入拼团课时
    changeHour(e) {
      this.groupHour = e.target.value
      let list = []
      this.newCoach.forEach((item, index) => {
        item.hour = e.target.value
      })
      this.setFieldsValue()
    },
    // 设置选择私教课并返回教练
    handleChange(e) {
      this.id = e
      this.editPersonalService.getCoachList({ id: e }).subscribe(res => {
        this.setFieldsValue()
      })
    },
    // 优惠设置选择变化
    onChange(value) {
      this.selectedRowKeys = value
      this.selectedRowKeys.forEach((id, index) => {
        // this.newCoach.forEach(item => {
        //   if (item.id === id) {
        //     if (!item.group_price) {
        //       this.tableText = '请输入拼团价'
        //       this.tableErr = true
        //     }
        //     this.sku.push({ sku_id: id, group_price: item.group_price })
        //   }
        // })
      })
      console.log(this.sku, '卡规格')
    },
    // 新建拼团活动
    onSubmit(data) {
      console.log(data)
      console.log(this.selectedRowKeys.length)
      if (!this.selectedRowKeys.length) {
        this.tableText = '请选择私教课规格'
        this.tableErr = true
      }

      let params = {}
      let isReturn = false
      if (isReturn) {
        return
      }

      // 275404963775803 门店id
      params = {
        product_type: 3, // 会籍卡
        activity_name: data.activity_name, // 活动名称
        product_id: this.cardId, //商品id
        sku: this.sku, //卡、课规格[{“sku_id”:1,”group_price”:20},]
        start_time: data.start_time,
        end_time: data.end_time,
        group_sum: data.group_sum, //成团人数
        valid_time: data.valid_time, //拼团有效期
        is_limit_stock: data.is_limit_stock, //是否限制库存0不限制 1限制
        stock_total: data.stock_total, //库存
        shop_ids: data.shop_ids, //门店ids [1,2,3,4]
        published_type: data.published_type, //发布状态(1-立即发布 2-暂不发布 3-定时发布)
        published_time: data.published_time //发布时间
      }
      console.log(params)
      params.id = this.$route.query.id
      this.editMemberService.editGroup(params).subscribe(res => {
        console.log(res)
        this.$router.push({
          path: `/brand/marketing/plugin/group/list`
        })
      })
    },
    // 详情回显
    setFieldsValue() {
      this.cardId = this.info.product.id
      this.info.sku.forEach(item => {
        this.selectedRowKeys.push(item.id)
      })
      this.newCoach = this.coach.map(item => {
        return { level: item.level, id: item.id, hour: '--' }
      })
      this.info.sku.filter(item => {
        this.newCoach.filter(it => {
          if (item.id === it.id) {
            console.log(item.group_price)
            it.group_price = item.group_price
          }
          it.hour = this.info.init_course_num
        })
      })
      this.form.setFieldsValue({
        group_hour: this.info.init_course_num
      })
      this.published_type = this.info.published_type
    }
  },
  components: {
    GroupForm
  }
}
</script>
