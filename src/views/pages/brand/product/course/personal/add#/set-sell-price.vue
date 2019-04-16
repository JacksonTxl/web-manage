<template>
  <st-form :form="form" class="page-set-sell-price" labelWidth="100px">
    <a-row :gutter="8">
      <a-col :lg="10" :offset="1">
        <st-form-item v-show="false">
          <input type="hidden" v-decorator="formRules.course_id">
        </st-form-item>
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
              <a-table :columns="tableColumns" :dataSource="tableData" :pagination="false">
                <!-- 教练等级 -->
                <template slot="level_id" slot-scope="text, record, index">
                  <div v-if="record.editable">
                    <a-select @change="(val) => onLevelChange(val, index)"  placeholder="选择教练等级"
                      class="page-set-sell-price__select">
                      <a-select-option value="1">等级A</a-select-option>
                      <a-select-option value="2">等级B</a-select-option>
                    </a-select>
                  </div>
                  <template v-else>{{({'1': '等级A', '2': '等级B'})[tableData[index].level_id]}}</template>
                </template>
                <!-- 售卖梯度 -->
                <template slot="saleGrad" slot-scope="text, record, index">
                  <div v-if="record.editable">
                    <a-input class="page-set-sell-price__input" v-model="tableData[index].min_sale" />
                    <span class="page-set-sell-price__label">节～</span>
                    <a-input class="page-set-sell-price__input" v-model="tableData[index].max_sale" />
                    <span class="page-set-sell-price__label">节</span>
                  </div>
                  <template v-else>{{tableData[index].min_sale}}~{{tableData[index].max_sale}}</template>
                </template>
                <!-- 售卖价格 -->
                <template slot="price" slot-scope="text, record, index">
                  <div key="price">
                    <div v-if="record.editable">
                      <a-input class="page-set-sell-price__input" v-model="tableData[index].price"/>
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
                    <a-input class="page-set-sell-price__input mg-l8" v-model="tableData[index].transfer_num" />
                    <span class="page-set-sell-price__label">
                      {{tableData[index].transfer_unit === '1' ? '%' : '元'}}
                    </span>
                  </div>
                  <template v-else>{{tableData[index].transfer_num}}{{tableData[index].transfer_unit === '1' ? '%' : '元'}}</template>
                </template>
                <!-- 是否支持在线购买 -->
                <template slot="online" slot-scope="text, record, index">
                  <div v-if="record.editable">
                    <a-radio-group v-model="tableData[index].buy_type" >
                      <a-radio v-for="(item, index) in personalCourseEnums.is_online_sale.value"
                        :key="index" :value="index">{{item}}
                      </a-radio>
                    </a-radio-group>
                  </div>
                  <template v-else>{{tableData[index].buy_type | enumFilter(personalCourseEnums.is_online_sale)}}</template>
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
          <st-button type="primary" @click="save">完成</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { AddService } from '../add.service'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { enumFilter } from '@/filters/other.filters'
import { remove } from 'lodash-es'
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
  title: '是否在线购买',
  dataIndex: 'online',
  scopedSlots: { customRender: 'online' }
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
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
      addService: AddService,
      messageService: MessageService,
      userService: UserService
    }
  },
  filters: {
    enumFilter
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formRules,
      isShowUnitSet: false,
      tableColumns,
      tableData: [],
      price_gradient: []
    }
  },
  subscriptions() {
    const user = this.userService
    return {
      personalCourseEnums: user.personalCourseEnums$
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      console.log(this.tableData)
      const price_gradient = this.getPriceGradient()
      console.log('price_gradient', price_gradient)
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        console.log('step 3 data', data)
        if (!this.inputCheck()) {
          return
        }
        this.addService.setPrice(data).subscribe(() => {
          this.messageService.success({
            content: '提交成功'
          })
        })
      })
    },
    onChange(e) {
      e.target.value === 2 ? this.isShowUnitSet = true : this.isShowUnitSet = false
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
        online: '',
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
          transfer_unit: item.transfer_unit,
          buy_type: item.buy_type
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
    inputCheck() {
      let ret = true
      const price_gradient = this.getPriceGradient()
      for (let i = 0; i < price_gradient.length; i++) {
        let ret_in = false
        for (let j in price_gradient[i]) {
          if (price_gradient[i][j] === undefined || price_gradient[i][j] === '') {
            ret_in = true
          }
        }
        if (ret_in) {
          ret = false
          alert(i)
          console.log('hi', price_gradient, price_gradient[i])
          break
        }
      }
      return ret
    }
  }
}
</script>
