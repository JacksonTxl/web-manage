<template>
  <st-form :form="form" @submit="save" class="page-edit-container">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="毕业院校" >
          <a-input placeholder="支持中英文、数字,不超过1   0个字"/>
        </st-form-item>
        <st-form-item label="学历">
          <a-select placeholder="请选择">
            <a-select-option
              v-for="(item, index) in xl"
              :value="item.value"
              :key="index"
            >{{item.cont}}</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="生日">
          <a-date-picker style="width:100%"/>
        </st-form-item>
        <st-form-item label="婚姻状况">
          <a-select placeholder="请选择">
            <a-select-option value="0">未填写</a-select-option>
            <a-select-option value="1">已婚</a-select-option>
            <a-select-option value="2">未婚</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="毕业时间">
          <a-date-picker style="width:100%"/>
        </st-form-item>
        <st-form-item label="专业">
          <a-input placeholder="请输入专业名称"/>
        </st-form-item>
        <st-form-item label="籍贯">
          <a-input placeholder="请输入籍贯"/>
        </st-form-item>
        <st-form-item label="子女状态">
          <a-select placeholder="请选择">
            <a-select-option value="0">未填写</a-select-option>
            <a-select-option value="1">有</a-select-option>
            <a-select-option value="2">没有</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8" class="mg-t48">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="家庭住址">
          <a-cascader :options="options" @change="onChange" changeOnSelect placeholder="请选择"/>
        </st-form-item>
        <st-form-item label="详细住址">
          <a-input placeholder="填写点什么吧"/>
        </st-form-item>
        <st-form-item label="备注">
          <a-input type="textarea" :autosize="{ minRows: 10, maxRows: 16 }" placeholder="填写点什么吧"/>
        </st-form-item>
      </a-col>
      <a-col :lg="10" :xs="22" :offset="2"></a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :offset="2">
        <st-form-item class="mg-l24" labelOffset>
          <st-button type="primary" ghost html-type="submit">保存</st-button>
          <st-button class="mg-l16" @click="goNext" type="primary">继续 填写</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>

<script>
const xl = [
  {
    value: 0,
    cont: '未填写'
  },
  {
    value: 1,
    cont: '小学'
  },
  {
    value: 2,
    cont: '初中'
  },
  {
    value: 3,
    cont: '高中'
  },
  {
    value: 4,
    cont: '中专'
  },
  {
    value: 5,
    cont: '大专'
  },
  {
    value: 6,
    cont: '本科'
  },
  {
    value: 7,
    cont: '硕士'
  },
  {
    value: 8,
    cont: '博士'
  }
]
export default {
  name: 'EditDetailDetailedInfo',
  data() {
    return {
      form: this.$form.createForm(this),
      xl,
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    onChange(value) {
      console.log(value)
    },
    goNext() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('goNext', {
            formData: this.form.getFieldsValue()
          })
        }
      })
    },
    save(e) {
      // form submit
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('save', {
            data: values
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
