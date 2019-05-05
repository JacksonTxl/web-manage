<template>
  <st-panel app>
    <st-form :form="form" @submit="save" class="page-add-container">
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="姓名" required>
            <a-input placeholder="支持中英文、数字,不超过10个字"/>
          </st-form-item>
          <st-form-item label="性别" required>
            <a-select placeholder="请选择">
              <a-select-option :value="0">未选择</a-select-option>
              <a-select-option :value="2">男</a-select-option>
              <a-select-option :value="1">女</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="生日">
            <a-date-picker style="width:100%"/>
          </st-form-item>
          <st-form-item label="证件" required>
            <a-input-group compact>
              <a-select style="width:20%" :defaultValue="1" change="chooseType">
                <a-select-option :value="1">身份证</a-select-option>
                <a-select-option :value="2">护照</a-select-option>
              </a-select>
              <a-input style="width: 80%" :placeholder="dateinit ? dateinit : '请输入身份证号码'"/>
            </a-input-group>
          </st-form-item>
          <st-form-item label="婚姻状况">
            <a-select placeholder="请选择">
              <a-select-option value="0">未填写</a-select-option>
              <a-select-option value="1">已婚</a-select-option>
              <a-select-option value="2">未婚</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="子女状态">
            <a-select placeholder="请选择">
              <a-select-option value="0">未填写</a-select-option>
              <a-select-option value="1">有</a-select-option>
              <a-select-option value="2">没有</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="健身等级" required>
             <a-rate :defaultValue="2.5" allowHalf />
          </st-form-item>
        </a-col>
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="国籍">
            <a-select placeholder="请选择">
              <a-select-option :value="0">未选择</a-select-option>
              <a-select-option :value="2">男</a-select-option>
              <a-select-option :value="1">女</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="民族">
            <a-select placeholder="请选择">
              <a-select-option :value="0">未选择</a-select-option>
              <a-select-option :value="2">男</a-select-option>
              <a-select-option :value="1">女</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="学历">
            <a-select placeholder="请选择学历">
              <a-select-option
                v-for="(item, index) in educationList"
                :value="item.value"
                :key="index"
              >{{item.cont}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="职业">
            <a-input placeholder="支持中英文、数字,不超过10个字"/>
          </st-form-item>
          <st-form-item label="收入水平">
            <a-input placeholder="支持中英文、数字,不超过10个字"/>
          </st-form-item>
          <st-form-item label="健身目标">
            <a-input placeholder="支持中英文、数字,不超过10个字"/>
          </st-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="8">
        <a-col :offset="1" :lg="22">
          <st-hr></st-hr>
        </a-col>
      </a-row>

      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="手机号" required>
            <a-input placeholder="支持中英文、数字,不超过10个字"/>
          </st-form-item>
          <st-form-item label="微信号" required>
            <a-input placeholder="支持中英文、数字,不超过10个字"/>
          </st-form-item>
        </a-col>
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="邮箱">
            <a-input placeholder="支持中英文、数字,不超过10个字"/>
          </st-form-item>
          <st-form-item label="家庭住址">
            <a-cascader :options="options" @change="onChange" placeholder="请选择省/市/区/县"/>
          </st-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="8">
        <a-col :offset="2">
          <st-form-item class="mg-l24" labelOffset>
            <st-button type="primary" ghost html-type="submit">保存</st-button>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-panel>
</template>
<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      dateinit: '',
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
      ],
      educationList: [
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
    }
  },
  methods: {
    onChange(e) {},
    chooseType(e) {
      let { tip1, tip2 } = {
        tip1: '请输入身份证号码',
        tip2: '请输入护照号码'
      }
      e === 1 ? (this.dateinit = tip1) : (this.dateinit = tip2)
    },
    save(e) {}
  }
}
</script>
