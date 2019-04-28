<template>
  <st-form :form="form" class="page-set-sell-price" labelWidth="100px">
    <a-row :gutter="8">
      <a-col :lg="10" :offset="1">
        {{personalCourseEnums}}
        <!-- 课程名称 -->
        <st-form-item label="私教课程">
          <a-input placeholder="课程名称" disabled v-decorator="ruleConfig.courseName"/>
        </st-form-item>
        <!-- 售卖渠道 -->
        <st-form-item label="售卖渠道" v-decorator="ruleConfig.saleType">
          <a-checkbox-group :options="saleTypeOptions" @change="onSaleTypeChange">
            <a-checkbox v-for="(item, index) in personalCourseEnums.sell_type.value" :key="index" :value="index">
              {{item}}
            </a-checkbox>
          </a-checkbox-group>
        </st-form-item>
        <!-- 课程有效期 -->
        <st-form-item label="课有效期">
          <a-input-number :min="0" v-decorator="ruleConfig.effectiveUnit">
            <div slot="addonAfter" class="st-form-item-unit">天/节</div>
          </a-input-number>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <!-- 售价设置 -->
        <st-form-item label="定价权限" required>
          <a-radio-group @change="onChange" v-decorator="ruleConfig.priceSetting">
            <a-radio :value="1">售卖场馆自主定价</a-radio>
            <a-radio :value="2">品牌统一定价</a-radio>
          </a-radio-group>
        </st-form-item>
      </a-col>
    </a-row>
    <section v-if="isShowUnitSet">
      <a-row :gutter="8">
        <a-col :lg="22" :xs="22" :offset="1">
          <st-form-item label="课程定价" required>
            <st-container>
              <a-table :columns="tableColumns" :dataSource="tableData" :pagination="false">
                <!-- 教练等级 -->
                <template slot="level_id" slot-scope="text, record, index">
                  <div v-if="record.editable">
                    <select-coach-level @change="(val) => onLevelChange(val, index)"></select-coach-level>
                    <!-- <a-select @change="(val) => onLevelChange(val, index)"  placeholder="选择教练等级"
                      class="page-set-sell-price__select">
                      <a-select-option value="1">等级A</a-select-option>
                      <a-select-option value="2">等级B</a-select-option>
                    </a-select> -->
                  </div>
                  <template v-else>{{({'1': '等级A', '2': '等级B'})[tableData[index].level_id]}}</template>
                </template>
                <!-- 售卖梯度 -->
                <template slot="saleGrad" slot-scope="text, record, index">
                  <div v-if="record.editable">
                    <a-input-number :min="0" class="page-set-sell-price__input" v-model="tableData[index].min_sale" />
                    <span class="page-set-sell-price__label">节～</span>
                    <a-input-number :min="0"  class="page-set-sell-price__input" v-model="tableData[index].max_sale" />
                    <span class="page-set-sell-price__label">节</span>
                  </div>
                  <template v-else>{{tableData[index].min_sale}}~{{tableData[index].max_sale}}</template>
                </template>
                <!-- 售卖价格 -->
                <template slot="price" slot-scope="text, record, index">
                  <div key="price">
                    <div v-if="record.editable">
                      <a-input-number :min="0"  class="page-set-sell-price__input" v-model="tableData[index].price"/>
                      <span class="page-set-sell-price__label">元/节</span>
                    </div>
                    <template v-else>{{tableData[index].price}}</template>
                  </div>
                </template>
                <!-- 转让手续费 -->
                <template slot="serviceFee" slot-scope="text, record, index">
                  <div v-if="record.editable">
                    <a-select placeholder="请选择" @change="(val) => onTransferUnitChange(val, index)"
                      class="page-set-sell-price__select">
                      <a-select-option v-for="(item, index) in personalCourseEnums.transfer_type.value"
                        :key="index" :value="index">{{item}}
                      </a-select-option>
                    </a-select>
                    <a-input-number :min="0"  class="page-set-sell-price__input mg-l8" v-model="tableData[index].transfer_num" />
                    <span class="page-set-sell-price__label">
                      {{tableData[index].transfer_unit === '1' ? '%' : '元'}}
                    </span>
                  </div>
                  <template v-else>{{tableData[index].transfer_num}}{{tableData[index].transfer_unit === '1' ? '%' : '元'}}</template>
                </template>
                <!-- 操作 -->
                <template slot="action" slot-scope="text, record">
                  <div>
                    <span v-if="record.editable">
                      <a @click="() => saveEdit(record.key)">保存</a>
                      <a-popconfirm title='确定取消保存?' @confirm="() => cancelEdit(record.key)">
                        <a class="mg-l8">取消</a>
                      </a-popconfirm>
                    </span>
                    <span v-else>
                      <a @click="edit(record.key)">编辑</a>
                      <a @click="del(record.key)" class="mg-l8">删除</a>
                    </span>
                  </div>
                </template>
              </a-table>
              <st-button type="dashed" block class="mg-t8" @click="addPriceRecord">添加</st-button>
            </st-container>
          </st-form-item>
        </a-col>
      </a-row>
    </section>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" @click="save" :loading="loading.setPrice">完成</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { AddService } from '../add.service'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { remove } from 'lodash-es'
import SelectCoachLevel from '@/views/fragments/coach/select-coach-level'
import { RuleConfig } from '@/constants/course/rule'

const tableColumns = [{
  title: '价格等级',
  dataIndex: 'level_id',
  scopedSlots: { customRender: 'level_id' }
}, {
  title: '售卖梯度（节）',
  dataIndex: 'saleGrad',
  scopedSlots: { customRender: 'saleGrad' }
}, {
  title: '售卖价格（元/节）',
  dataIndex: 'price',
  scopedSlots: { customRender: 'price' }
}, {
  title: '转让手续费',
  dataIndex: 'serviceFee',
  scopedSlots: { customRender: 'serviceFee' }
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]

export default {
  name: 'SetSellPrice',
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService,
      userService: UserService,
      ruleConfig: RuleConfig
    }
  },
  rxState() {
    const user = this.userService
    return {
      loading: this.addService.loading$,
      personalCourseEnums: user.personalCourseEnums$
    }
  },
  components: {
    SelectCoachLevel
  },
  props: {
    courseName: {
      type: String,
      default: ''
    },
    courseId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      priceSetting: 1,
      saleTypeOptions: [{
        label: '线下售卖',
        value: 1
      }, {
        label: '用户端售卖',
        value: 2
      }],
      tableColumns,
      tableData: [],
      priceGradient: []
    }
  },
  computed: {
    isShowUnitSet() {
      return this.priceSetting === 2
    }
  },
  watch: {
    courseName(val) {
      this.form.setFieldsValue({
        course_name: val
      })
    },
    courseId(val) {
      this.form.setFieldsValue({
        course_id: val
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.form.setFieldsValue({
        course_name: this.course_name
      })
    })
  },
  methods: {
    save(e) {
      e.preventDefault()
      console.log(this.tableData)
      const priceGradient = this.getPriceGradient()
      console.log('priceGradient', priceGradient)
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        data.course_id = this.courseId
        console.log('step 3 data', data)
        if (!this.inputCheck(priceGradient)) {
          return
        }
        data.price_gradient = priceGradient
        this.addService.setPrice(data).subscribe(() => {
          this.messageService.success({
            content: '提交成功'
          })
        })
      })
    },
    onChange() {

    },
    onSaleTypeChange(checkedValue) {
      console.log('sale channel changed', checkedValue)
    },
    operation(type, key, record) {
      const newTableData = [...this.tableData]
      const target = newTableData.filter(item => key === item.key)[0]
      if (target) {
        switch (type) {
          case 'edit':
            target.editable = true
            break
          case 'saveEdit':
            delete target.editable
            break
          case 'cancelEdit':
            delete target.editable
            break
          case 'del':
            remove(newTableData, target)
            break
          default:
            break
        }
        this.tableData = newTableData
      }
    },
    edit(key) {
      this.operation('edit', key)
    },
    saveEdit(key) {
      this.operation('saveEdit', key)
    },
    cancelEdit(key) {
      this.operation('cancelEdit', key)
    },
    del(key) {
      this.operation('del', key)
    },
    addPriceRecord() {
      const newRecord = {
        key: +new Date(),
        level_id: '',
        saleGrad: '',
        price: '',
        serviceFee: '',
        editable: true
      }
      this.tableData.push(newRecord)
    },
    getPriceGradient() {
      const ret = []
      const { tableData } = this
      tableData.forEach(item => {
        ret.push({
          level_id: item.level_id,
          min_sale: item.min_sale,
          max_sale: item.max_sale,
          price: item.price,
          transfer_num: item.transfer_num,
          transfer_unit: item.transfer_unit
        })
      })
      return ret
    },
    onLevelChange(val, index) {
      this.tableData[index].level_id = val
    },
    onTransferUnitChange(val, index) {
      this.tableData[index].transfer_unit = val
    },
    inputCheck(priceGradient) {
      let ret = true
      for (let i = 0; i < priceGradient.length; i++) {
        let retIn = false
        for (let j in priceGradient[i]) {
          if (priceGradient[i][j] === undefined || priceGradient[i][j] === '') {
            retIn = true
          }
        }
        if (retIn) {
          ret = false
          this.messageService.error({
            content: `第${i + 1}行课程定价输入有误`
          })
          break
        }
      }
      return ret
    }
  }
}
</script>
