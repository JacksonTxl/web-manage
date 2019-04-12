<template>
  <st-form :form="form" @submit="save" class="page-shop-container">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="私教课程">
          <a-input placeholder="课程名称" disabled/>
        </st-form-item>
        <st-form-item label="上课门店" required>
          <a-radio-group :defaultValue="1" @change="onChange">
            <a-radio :value="1">全店</a-radio>
            <a-radio :value="2">指定门店</a-radio>
          </a-radio-group>
          <div class="page-shop-coach-container-shop mg-t8" v-if="isShow">
            <a-table :columns="shopRule">
              <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
            </a-table>
            <st-button type="dashed" block class="mg-t8">添加</st-button>
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="上课教练">
          <div class="page-shop-coach-container-coach">
            <a-table :columns="columns">
              <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
            </a-table>
            <st-button type="dashed" block class="mg-t8">添加</st-button>
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="2">
        <st-form-item labelOffset class="mg-l24">
          <st-button type="primary" html-type="submit">保存，继续设置上课门店</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
// import StPopover from './add#/popover'
const columns = [
  {
    title: '教练',
    dataIndex: 'name'
    // sorter: true,
    // scopedSlots: { customRender: 'name' }
  },
  {
    title: '教练等级',
    dataIndex: 'gender'
  },
  {
    title: '工作性质',
    dataIndex: 'email'
  },
  {
    title: '在职状态',
    dataIndex: 'emai'
  },
  {
    title: '操作',
    dataIndex: 'em'
  }
]

const shopRule = [
  {
    title: '省',
    dataIndex: 'name'
    // sorter: true,
    // scopedSlots: { customRender: 'name' }
  },
  {
    title: '市',
    dataIndex: 'gender'
  },
  {
    title: '区',
    dataIndex: 'email'
  },
  {
    title: '门店名称',
    dataIndex: 'emai'
  },
  {
    title: '操作',
    dataIndex: 'em'
  }
]
export default {
  name: 'SetShopCoach',
  components: {
    //   StPopover,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      columns,
      shopRule,
      isShow: false
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.$emit('goNext')
    },
    onChange(e) {
      console.log(e.target.value)
      e.target.value === 2 ? this.isShow = true : this.isShow = false
    }
  }
}
</script>
