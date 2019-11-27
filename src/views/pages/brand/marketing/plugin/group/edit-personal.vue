<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :isEdit="true"
    :info="info"
    :loading="loading.getPersonalDetail"
    :confirmLoading="loading.editGroupbuy"
    :shopIds="shopIds"
    @onsubmit="onSubmit"
    :isEditMode="activityState >= ACTIVITY_STATUS.NO_START"
  >
    <template slot="choose-product">
      <a-row :gutter="8">
        <a-col :span="10">
          <st-form-item label="选择私教课">
            <a-select
              showSearch
              :disabled="disabledEdit"
              v-decorator="decorators.course_id"
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
              :disabled="disabledEdit"
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
                        selectedRowKeys: selectedRowKeys,
                        getCheckboxProps: getCheckboxProps
                      }
                    : null
                "
                rowKey="id"
              >
                <template slot="group_price" slot-scope="customRender, record">
                  <st-input-number
                    v-model="record.group_price"
                    :disabled="disabledEdit"
                    @input="setPriceChange"
                    style="width:110px;"
                    :float="true"
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
import {
  ACTIVITY_STATUS,
  RELEASE_STATUS
} from '@/constants/marketing/group-buy'
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
      // this.courseId = this.info.product.id
      // this.groupHour = this.info.init_course_num
      this.selectCourseChange(this.info.product.id)
    })
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      courseId: '', // 活动商品
      ACTIVITY_STATUS,
      RELEASE_STATUS,
      selectedRowKeys: [], // 优惠设置选中项
      cardColumns,
      tableText: '', // 优惠设置错误提示
      tableErr: false,
      shopIds: [],
      newCoach: [],
      // 禁用优惠设置的选择
      getCheckboxProps: () => ({
        props: {
          disabled: true
        }
      }),
      disabledEdit: false
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
        course_id: id,
        group_hour: this.info.init_course_num
      })
      this.editPersonalService.getCoachList(id).subscribe(res => {
        this.newCoach = this.coach.map(item => {
          return {
            is_select: false,
            level: item.spec,
            id: item.id,
            hour: this.info.init_course_num,
            group_price: ''
          }
        })
        if (this.newCoach.length === 1) {
          this.selectedRowKeys = this.newCoach
          this.newCoach[0].is_select = true
        }
        this.setFieldsValue()
        this.setCoachPrice()
      })
    },
    setCoachPrice() {
      this.newCoach.forEach(item => {
        let selectCoach = this.info.sku.filter(sku => sku.sku_id === item.id)
        console.log(selectCoach)
        item.is_select = selectCoach.length > 0
        item.group_price =
          selectCoach.length > 0 ? selectCoach[0].group_price : ''
      })
      this.selectedRowKeys = this.info.sku.map(sku => sku.sku_id)
      console.log(this.newCoach)
    },
    // 优惠设置选择变化
    onChange(value) {
      this.selectedRowKeys = value
      this.newCoach.forEach(coach => {
        coach.is_select = this.selectedRowKeys.indexOf(coach.id) !== -1
      })
      // this.setPriceChange()
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
      const selectedCoach = this.newCoach.filter(item => item.is_select)
      if (selectedCoach.length === 0) {
        this.tableText = '请选择至少一个教练'
        this.tableErr = true
        return
      }
      data.sku = selectedCoach.map(item => {
        return {
          sku_id: item.id,
          group_price: item.group_price
        }
      })
      data.init_course_num = +this.form.getFieldValue('group_hour')
      data.product_type = 3
      data.product_id = +this.form.getFieldValue('course_id')
      data.id = +this.$route.query.id
      this.editPersonalService.editGroupbuy(data).subscribe(res => {
        this.$router.push({
          path: `/brand/marketing/plugin/group/list`
        })
      })
    },
    // 详情回显
    setFieldsValue() {
      this.newCoach.forEach(item => {
        item.is_select =
          this.info.sku.filter(skuItem => skuItem.sku_id === item.id).length > 0
      })
      // 是否能够编辑, 当活动未开始时可以编辑
      this.disabledEdit =
        this.info.activity_state.id >= ACTIVITY_STATUS.NO_START
      this.getCheckboxProps = () => ({
        props: {
          disabled: this.disabledEdit
        }
      })
      console.log(this.disabledEdit)
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
