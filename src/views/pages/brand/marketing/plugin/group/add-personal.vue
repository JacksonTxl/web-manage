<template>
  <group-form
    :form="form"
    :decorators="decorators"
    :loading="loading.addGroup"
    :confirmLoading="confirmLoading"
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
      cardColumns,
      tableText: '', // 优惠设置错误提示
      tableErr: false,
      newCoach: [],
      confirmLoading: false
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
    selectCourseChange(id) {
      this.form.setFieldsValue({
        courseId: id
      })
      this.addPersonalService.getCoachList(id).subscribe(res => {
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
      data.init_course_num = +this.groupHour
      data.product_type = 3 // 私教课
      data.product_id = this.courseId
      data.sku = selectedCoach.map(item => {
        return {
          sku_id: item.id,
          group_price: item.group_price
        }
      })
      if (this.confirmLoading) return
      this.confirmLoading = true
      this.addPersonalService.createGroupbuy(data).subscribe(res => {
        this.confirmLoading = false
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
