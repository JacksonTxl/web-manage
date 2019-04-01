<template>
  <st-form>
    <a-row :gutter="8">
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="毕业学校">
          <a-input placeholder="支持中英文、数字,不超过10个字" v-decorator="detailedInfoRule.graduated_schoolRule"></a-input>
        </st-form-item>
        <st-form-item label="学历">

           <a-select v-decorator="detailedInfoRule.educationRule" placeholder="请选择学历">
            <a-select-option v-for="(item, index) in educationList" :value="item.value" :key="index">{{item.cont}}</a-select-option >

          </a-select>
        </st-form-item>
        <st-form-item label="生日">
           <a-select v-decorator="detailedInfoRule.birthdayRule" placeholder="请选择">
            <a-select-option value="male">男</a-select-option>
            <a-select-option value="female">女</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="婚姻状况">
           <a-select v-decorator="genderRule" placeholder="请选择" @change="handleSelectChange">
            <a-select-option value="male">男</a-select-option>
            <a-select-option value="female">女</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="毕业时间">
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="专业">
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="籍贯" >
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="子女状态" >
           <a-select :v-decorator="genderRule" placeholder="请选择" @change="handleSelectChange">
            <a-select-option value="male">男</a-select-option>
            <a-select-option value="female">女</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8" class="mg-t48">
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="家庭住址">
          <a-input placeholder="省市联动记者换"></a-input>
        </st-form-item>
        <st-form-item label="详细住址">
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="备注">
          <a-input type="textarea"  :autosize="{ minRows: 10, maxRows: 16 }" placeholder="填写点什么吧"></a-input>
        </st-form-item>
      </a-col>
      <a-col :lg="10"
        :xs="22"
        :offset="2">
      </a-col>
    </a-row>

    <a-row :gutter="8" class="mg-t32">
      <a-col :offset="1">
        <st-form-item labelOffset>
          <st-button type="primary"
            ghost>保存</st-button>
          <st-button class="mg-l16"
            @click="goNext"
            type="primary">继续 填写</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
export default {
  name: 'StaffDetailDetailedInfo',
  data() {
    return {
      detailedInfoRule: {
        graduated_schoolRule: ['graduated_school'], // 毕业院校
        educationRule: ['education'], // 学历
        birthdayRule: ['birthday'] // 生日
      },

      educationList: [{
        value: 0,
        cont: '未填写'
      }, {
        value: 1,
        cont: '小学'
      }, {
        value: 2,
        cont: '初中'
      }, {
        value: 3,
        cont: '高中'
      }, {
        value: 4,
        cont: '中专'
      }, {
        value: 5,
        cont: '大专'
      }, {
        value: 6,
        cont: '本科'
      }, {
        value: 7,
        cont: '硕士'
      }, {
        value: 8,
        cont: '博士'
      }]
    }
  },
  methods: {
    goNext() {
      this.$emit('goNext')
    },
    save() {}
  }
}
</script>
