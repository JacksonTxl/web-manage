<template>
  <st-form :form="form" class="page-set-sell-price" labelWidth="100px">
    <a-row :gutter="8">
      <a-col :lg="10" :offset="1">
        <input type="hidden" v-decorator="formRules.course_id">
        <st-form-item label="私教课程">
          <a-input placeholder="课程名称" disabled v-decorator="formRules.course_name"/>
        </st-form-item>
        <st-form-item label="售价设置" required>
          <a-radio-group @change="onChange" v-decorator="formRules.price_setting">
            <a-radio :value="1">售卖场馆自主定价</a-radio>
            <a-radio :value="2">品牌统一定价</a-radio>
          </a-radio-group>
        </st-form-item>
      </a-col>
    </a-row>
    <section v-if="isShowUnitSet">
      <a-row :gutter="8">
        <a-col :lg="22" :xs="22" :offset="1">
          <st-form-item label="课程定价">
            <st-container>
              <a-table :columns="priceTableColumns" :dataSource="priceTableData" :pagination="false">
                <!-- 教练等级 -->
                <template slot="priceGrade" slot-scope="text, record">
                  <div v-if="record.editable">
                    <a-select placeholder="选择教练等级" class="page-set-sell-price__select">
                      <a-select-option value="a">等级A</a-select-option>
                      <a-select-option value="b">等级B</a-select-option>
                    </a-select>
                  </div>
                  <template v-else>{{text}}</template>
                </template>
                <!-- 售卖梯度 -->
                <template slot="saleGrad" slot-scope="text, record">
                  <div v-if="record.editable">
                    <a-input class="page-set-sell-price__input"/>
                    <span class="page-set-sell-price__label">节～</span>
                    <a-input class="page-set-sell-price__input"/>
                    <span class="page-set-sell-price__label">节</span>
                  </div>
                  <template v-else>{{text}}</template>
                </template>
                <!-- 售卖价格 -->
                <template slot="price" slot-scope="text, record">
                  <div v-if="record.editable">
                    <a-input class="page-set-sell-price__input"/>
                    <span class="page-set-sell-price__label">元/节</span>
                  </div>
                  <template v-else>{{text}}</template>
                </template>
                <!-- 转让手续费 -->
                <template slot="serviceFee" slot-scope="text, record">
                  <div v-if="record.editable">
                    <a-select defaultValue="a" class="page-set-sell-price__select">
                      <a-select-option value="a">百分比</a-select-option>
                      <a-select-option value="b">xxx</a-select-option>
                    </a-select>
                    <a-input class="page-set-sell-price__input mg-l8"/>
                    <span class="page-set-sell-price__label">%</span>
                  </div>
                  <template v-else>{{text}}</template>
                </template>
                <!-- 是否支持在线购买 -->
                <template slot="online" slot-scope="text, record">
                  <div v-if="record.editable">
                    <a-radio-group>
                      <a-radio :value="1">支持</a-radio>
                      <a-radio :value="0">不支持</a-radio>
                    </a-radio-group>
                  </div>
                  <template v-else>{{text}}</template>
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
                      <a @click="edit(record.key)" class="mg-l8">编辑</a>
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
          <st-button type="primary" html-type="submit">完成</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { AddService } from '../add.service'
const priceTableColumns = [{
  title: '价格等级',
  dataIndex: 'priceGrade',
  scopedSlots: { customRender: 'priceGrade' }
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
  title: '是否在线购买',
  dataIndex: 'online',
  scopedSlots: { customRender: 'online' }
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]
const priceTableData = [{
  key: 1,
  priceGrade: '等级名称A',
  saleGrad: '1-10',
  price: '200',
  serviceFee: '1%',
  online: '支持'
}]

const formRules = {
  course_name: [
    'course_name', {
      rules: [{
        required: true,
        message: '请输入课程名称'
      }, {
        min: 4,
        message: '支持输入4~30个字的课程名称'
      }],
      initialValue: 'XXXX'
    }
  ],
  course_id: [
    'course_id'
  ],
  price_setting: [
    'price_setting', {
      initialValue: 1
    }
  ],
  price_gradient: [
    'price_gradient', {
      rules: []
    }
  ]
}

export default {
  name: 'SetSellPrice',
  serviceInject() {
    return {
      addService: AddService
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formRules,
      isShowUnitSet: false,
      priceTableColumns,
      priceTableData
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        console.log('step 3 data', data)
        this.addService.setPrice(data).subscribe(() => {

        })
      })
    },
    onChange(e) {
      e.target.value === 2 ? this.isShowUnitSet = true : this.isShowUnitSet = false
    },
    edit(key, record) {
      console.log(key)
      const newPriceTableData = [...this.priceTableData]
      const target = newPriceTableData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.priceTableData = newPriceTableData
      }
    },
    saveEdit(key) {

    },
    cancelEdit(key) {
      const newPriceTableData = [...this.priceTableData]
      const target = newPriceTableData.filter(item => key === item.key)[0]
      if (target) {
        delete target.editable
        this.priceTableData = newPriceTableData
      }
    },
    addPriceRecord() {
      const newRecord = {
        key: +new Date(),
        priceGrade: '',
        saleGrad: '',
        price: '',
        serviceFee: '',
        online: '',
        editable: true
      }
      this.priceTableData.push(newRecord)
    }
  }
}
</script>
