<template>
  <st-form :form="form" @submit="save" class="page-shop-container" labelWidth="100px">
    <a-row :gutter="8">
      <a-col :lg="10" :offset="1">
        <st-form-item label="私教课程">
          <a-input placeholder="课程名称" disabled/>
        </st-form-item>
        <st-form-item label="售价设置" required>
          <a-radio-group :defaultValue="1" @change="onChange">
            <a-radio :value="1">售卖场馆自主定价</a-radio>
            <a-radio :value="2">品牌统一定价</a-radio>
          </a-radio-group>
        </st-form-item>
      </a-col>
    </a-row>
    <section v-if="isShowUnitSet">
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="单节课有效期">
            <a-input v-decorator="formRules.unit_valid_days">
              <div slot="addonAfter" class="st-form-item-unit">天</div>
            </a-input>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="22" :xs="22" :offset="1">
          <st-form-item label="课程定价">
            <div class="page-shop-coach-container-coach">
              <a-table :columns="priceTableColumns" :dataSource="priceTableData" :pagination="false">
                <span slot="action">
                  <a href="javascript:;">编辑</a>
                  <a href="javascript:;" class="mg-l8">删除</a>
                </span>
              </a-table>
              <st-button type="dashed" block class="mg-t8">添加</st-button>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
    </section>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item style="margin-left: 100px;">
          <st-button type="primary" html-type="submit">完成</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
const priceTableColumns = [{
  title: '价格等级',
  dataIndex: 'priceGrade'
}, {
  title: '售卖梯度（节）',
  dataIndex: 'saleGrad'
}, {
  title: '售卖价格（元/节）',
  dataIndex: 'price'
}, {
  title: '转让手续费',
  dataIndex: 'serviceFee'
}, {
  title: '是否在线购买',
  dataIndex: 'online'
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]
const priceTableData = [{
  key: '1',
  priceGrade: '等级名称A',
  saleGrad: '1-10',
  price: '200',
  serviceFee: '1%',
  online: '支持'
}]

const formRules = {
  unit_valid_days: [
    'unit_valid_days', {
      rules: [],
      initialValue: 7
    }
  ]
}

export default {
  name: 'SetSellPrice',
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
      this.$emit('goNext')
    },
    onChange(e) {
      console.log(e.target.value)
      e.target.value === 2 ? this.isShowUnitSet = true : this.isShowUnitSet = false
    }
  }
}
</script>
