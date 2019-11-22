<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :isEdit="true"
    :info="info"
    :loading="loading.addGroup"
    :confirmLoading="confirmLoading"
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
              v-model="courseId"
              placeholder="请选择私教课"
              @change="selectCourseChange"
            >
              <a-select-option
                v-for="item in personalList"
                :value="item.id"
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
                rowKey="sku_id"
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
import { EditPersonalService } from './edit-personal.service'
import { PatternService } from '@/services/pattern.service'
export default {
  serviceInject() {
    return {
      editPersonalService: EditPersonalService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.editPersonalService.loading$,
      coach: this.editPersonalService.coach$,
      info: this.editPersonalService.info$,
      personalList: this.editPersonalService.personalList$
    }
  },
  bem: {
    basic: 'brand-marketing-group-personal'
  },
  mounted() {
    this.editPersonalService.getPersonalList().subscribe(() => {
      this.courseId = this.info.product.id
      this.selectCourseChange(this.courseId)
    })
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      courseId: '', // 活动商品
      selectedRowKeys: [], // 优惠设置选中项
      cardColumns,
      tableText: '', // 优惠设置错误提示
      tableErr: false,
      shopIds: [],
      newCoach: [],
      groupHour: '',
      confirmLoading: false
    }
  },
  methods: {
    // 输入拼团课时
    changeHour(e) {
      console.log(e)
      this.groupHour = e.target.value
      this.newCoach.forEach((item, index) => {
        item.hour = e.target.value
      })
      // this.setFieldsValue()
    },
    // 设置选择私教课并返回教练
    selectCourseChange(id) {
      this.form.setFieldsValue({
        courseId: id
      })
      this.editPersonalService.getCoachList(id).subscribe(res => {
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
        this.setCoachPrice()
      })
    },
    setCoachPrice() {
      let selectIds = this.info.sku.map(item => item.sku_id)
      this.newCoach.forEach(item => {
        let selectCoach = this.info.sku.filter(sku => sku.sku_id === item.id)
        console.log(selectCoach)
        item.is_select = selectCoach.length > 0
        item.group_price =
          selectCoach.length > 0 ? selectCoach[0].group_price : ''
      })
      console.log(this.newCoach)
    },
    // 优惠设置选择变化
    onChange(value) {
      this.selectedRowKeys = value
      this.newCoach.forEach(coach => {
        coach.is_select = this.selectedRowKeys.indexOf(coach.id) !== -1
      })
    },
    // 处理输入拼团价格的逻辑
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
      data.sku = this.newCoach.map(item => {
        if (item.is_select) {
          return {
            sku_id: item.id,
            group_price: item.group_price
          }
        }
      })
      data.init_course_num = +this.groupHour
      data.product_type = 3
      data.product_id = this.courseId
      data.id = +this.$route.query.id
      if (this.confirmLoading) return
      this.confirmLoading = true
      console.log(data)
      this.editPersonalService.editGroupbuy(data).subscribe(res => {
        this.confirmLoading = false
        this.$router.push({
          path: `/brand/marketing/plugin/group/list`
        })
      })
    },
    // 详情回显
    setFieldsValue() {
      this.newCoach = this.coach.map(item => {
        return { level: item.spec, id: item.id, hour: '--' }
      })
      this.newCoach.forEach(item => {
        item.is_select =
          this.info.sku.filter(skuItem => skuItem.sku_id === item.id).length > 0
      })
      this.selectedRowKeys = this.newCoach.map(item => {
        if (item.is_select) {
          return item.id
        }
      })
      this.form.setFieldsValue({
        group_hour: this.info.init_course_num
      })
    }
  },
  components: {
    GroupForm
  }
}
</script>
