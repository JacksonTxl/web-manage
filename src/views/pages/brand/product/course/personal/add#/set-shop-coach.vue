<template>
  <st-form :form="form" @submit="save" class="page-shop-container">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <input type="hidden" v-decorator="formRules.course_id">
        <st-form-item label="私教课程">
          <a-input placeholder="课程名称" disabled v-decorator="formRules.course_name"/>
        </st-form-item>
        <st-form-item label="上课门店" required>
          <a-radio-group @change="onChange" v-decorator="formRules.shop_setting">
            <a-radio :value="1">全店</a-radio>
            <a-radio :value="2">指定门店</a-radio>
          </a-radio-group>
          <div class="page-shop-coach-container-shop mg-t8" v-if="isShow">
           <a-table :columns="shopTableColumns" :dataSource="shopTableData" :pagination="false">
             <template slot="operation" slot-scope="text, record">
              <div>
                <a @click="delShopTableRecord(record.key)">删除</a>
              </div>
            </template>
           </a-table>
            <modal-link tag="a" :to="{ name: 'shop-select', props: { checked: checkedShopIds }, on: {
              complete: onSelectShopComplete } }">
              <st-button type="dashed" block class="mg-t8">添加</st-button>
            </modal-link>
            <input type="hidden" v-decorator="formRules.shop_id">
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="上课教练">
          <div class="page-shop-coach-container-coach">
            <input type="hidden" v-decorator="formRules.coach_id">
            <a-table></a-table>
            <modal-link tag="a" :to="{ name: 'coach-select' }">
              <st-button type="dashed" block class="mg-t8">添加</st-button>
            </modal-link>
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" html-type="submit">保存，继续设置上课门店</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { AddService } from '../add.service'
const shopTableColumns = [{
  title: '省',
  dataIndex: 'province_name'
}, {
  title: '市',
  dataIndex: 'city_name'
}, {
  title: '区',
  dataIndex: 'district_name'
}, {
  title: '门店名称',
  dataIndex: 'shop_name'
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
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
  shop_setting: [
    'shop_setting', {
      initialValue: 1
    }
  ],
  shop_id: [
    'shop_id', {
      rules: [{
        required: true,
        message: '请选择上课门店'
      }]
    }
  ],
  coach_id: [
    'coach_id', {
      rules: []
    }
  ]
}

export default {
  name: 'SetShopCoach',
  serviceInject() {
    return {
      addService: AddService
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      shopTableColumns,
      shopTableData: [],
      formRules,
      isShow: false,
      checkedShopIds: [1, 7],
      shop_selected: []
    }
  },
  created() {
    const shopTableData = this.getShops(this.checkedShopIds)
    this.shopTableData = shopTableData
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        console.log('step 2 data', data)
        this.addService.setShop(data).subscribe(() => {
          this.$emit('goNext')
        })
      })
    },
    onChange(e) {
      console.log(e.target.value)
      e.target.value === 2 ? this.isShow = true : this.isShow = false
    },
    onSelectShopComplete(shopIds) {
      console.log('ok', shopIds)
      const shopTableData = this.getShops(shopIds)
      this.shopTableData = shopTableData
      this.checkedShopIds = shopIds
    },
    getShops(shopIds = []) {
      const data = {
        '1': {
          'key': '1',
          'province_name': '江苏省',
          'city_name': '苏州市',
          'district_name': '姑苏区',
          'shop_name': '场馆A'
        },
        '2': {
          'key': '2',
          'province_name': '江苏省',
          'city_name': '苏州市',
          'district_name': '姑苏区',
          'shop_name': '场馆B'
        },
        '7': {
          'key': '7',
          'province_name': '上海市',
          'city_name': '上海市',
          'district_name': '徐汇区',
          'shop_name': '测试店铺'
        }
      }
      const ret = []
      shopIds.forEach(item => {
        if (data[item]) {
          ret.push(data[item])
        }
      })
      return ret
    },
    delShopTableRecord(key) {
      const { shopTableData, checkedShopIds } = this
      shopTableData.forEach((item, index) => {
        if (item.key === key) {
          shopTableData.splice(index, 1)
        }
      })
      checkedShopIds.forEach((item, index) => {
        if (item === +key) {
          checkedShopIds.splice(index, 1)
        }
      })
      this.shopTableData = shopTableData
      this.checkedShopIds = checkedShopIds
    }
  }
}
</script>
