<template>
  <st-panel app class="page-brand-shop-add">
    <st-form>
      <a-row :gutter="8">
        <a-col offset="1" :lg="10">
          <st-form-item label="门店名称" required>
            <a-input placeholder="支持中英文、数字,不超过20个字"></a-input>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col offset="1" :lg="10">
          <st-form-item label="门店电话" required>
            <a-input defaultValue="" placeholder="请输入门店电话">
              <div slot="addonAfter" style="width:50px">
                添加
              </div>
            </a-input>
            <span>021-968-9899</span>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col offset="1" :lg="10">
          <st-form-item label="门店地址" required>
            <a-cascader :options="options" @change="onChange" placeholder="请选择省/市/区" />
            <a-input placeholder="请输入详细地址" style="margin-top:12px"></a-input>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col offset="1" :lg="10">
          <st-form-item label="邮箱">
            <a-input placeholder="请输入门店邮箱"></a-input>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col offset="1" :lg="23">
          <st-form-item label="服务设施">
            <st-checkbox-facility-group v-model="facilityArr">
              <st-checkbox-facility-item style="margin-right:24px" label="wifi" icon="home" value="1"></st-checkbox-facility-item>
              <st-checkbox-facility-item style="margin-right:24px" label="wifi" icon="home" value="2"></st-checkbox-facility-item>
              <st-checkbox-facility-item style="margin-right:24px" label="wifi" icon="home" value="3"></st-checkbox-facility-item>
              <st-checkbox-facility-item style="margin-right:24px" label="wifi" icon="home" value="4"></st-checkbox-facility-item>
              <st-checkbox-facility-item style="margin-right:24px" label="wifi" icon="home" value="5"></st-checkbox-facility-item>
              <st-checkbox-facility-item style="margin-right:24px" label="wifi" icon="home" value="6"></st-checkbox-facility-item>
              <st-checkbox-facility-item style="margin-right:24px" label="wifi" icon="home" value="7"></st-checkbox-facility-item>
              <st-checkbox-facility-item style="margin-right:24px" label="wifi" icon="home" value="8"></st-checkbox-facility-item>
            </st-checkbox-facility-group>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col offset="1" :lg="10">
          <st-form-item label="店招">
            <a-upload
              name="avatar"
              listType="picture-card"
              :showUploadList="false"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <div>
                  <a-icon :type="false ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">上传店招</div>
                  <div class="ant-upload-text">大小不超过5M</div>
              </div>
            </a-upload>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col offset="1" :lg="12">
          <st-form-item label="营业状态">
            <a-radio-group>
              <a-radio :value="1">预售</a-radio>
              <a-radio :value="2">试运营</a-radio>
              <a-radio :value="3">正式营业</a-radio>
              <a-radio :value="4">已关店</a-radio>
            </a-radio-group>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col offset="1" :lg="23">
          <st-form-item label="营业时间">
            <st-checkbox-button-group>
              <st-checkbox-button-item value="1">周一</st-checkbox-button-item>
              <st-checkbox-button-item value="2">周二</st-checkbox-button-item>
              <st-checkbox-button-item value="3">周三</st-checkbox-button-item>
              <st-checkbox-button-item value="4">周四</st-checkbox-button-item>
              <st-checkbox-button-item value="5">周五</st-checkbox-button-item>
              <st-checkbox-button-item value="6">周六</st-checkbox-button-item>
              <st-checkbox-button-item value="7">周日</st-checkbox-button-item>
            </st-checkbox-button-group>
            <div class="brand-shop-add__slider">
              <slider class="pages-test-store__slider" :getSlider="getSlider"></slider>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center" align="middle">
        <a-col>
          <st-button type="primary">32px</st-button>
        </a-col>
      </a-row>
    </st-form>
  </st-panel>
</template>
<script>
import slider from '../../../components/slider/slider.vue'
export default {
  components: {
    slider
  },
  data() {
    return {
      getSlider: {
        disabled: false,
        infoList: [
          {
            title: '周一',
            value: [0.5, 13],
            week: [
              {
                key: '周一',
                disabled: true
              },
              {
                key: '周二',
                disabled: false
              },
              {
                key: '周三',
                disabled: false
              },
              {
                key: '周四',
                disabled: false
              },
              {
                key: '周五',
                disabled: true
              },
              {
                key: '周六',
                disabled: true
              },
              {
                key: '周日',
                disabled: true
              }
            ]
          },
          {
            title: '周二',
            value: [6, 13],
            week: [
              {
                key: '周一',
                disabled: true
              },
              {
                key: '周二',
                disabled: false
              },
              {
                key: '周三',
                disabled: false
              },
              {
                key: '周四',
                disabled: false
              },
              {
                key: '周五',
                disabled: true
              },
              {
                key: '周六',
                disabled: true
              },
              {
                key: '周日',
                disabled: true
              }
            ]
          },
          {
            title: '周三',
            value: [12, 13.5]
          },
          {
            title: '周四',
            value: [18, 24]
          }
          // {
          //   title: '周五',
          //   value: [9, 13]
          // },
          // {
          //   title: '周六',
          //   value: [5, 13]
          //   // week: [
          //   //   {
          //   //     key: '周一',
          //   //     disabled: false
          //   //   },
          //   //   {
          //   //     key: '周二',
          //   //     disabled: false
          //   //   },
          //   //   {
          //   //     key: '周三',
          //   //     disabled: true
          //   //   },
          //   //   {
          //   //     key: '周四',
          //   //     disabled: true
          //   //   },
          //   //   {
          //   //     key: '周五',
          //   //     disabled: false
          //   //   },
          //   //   {
          //   //     key: '周六',
          //   //     disabled: true
          //   //   },
          //   //   {
          //   //     key: '周日',
          //   //     disabled: true
          //   //   }
          //   // ]
          // },
          // {
          //   title: '周日',
          //   value: [6, 24]
          // }
        ]
      },
      facilityArr: [],
      options: [{
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [{
            value: 'xihu',
            label: 'West Lake'
          }]
        }]
      }, {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{
          value: 'nanjing',
          label: 'Nanjing',
          children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }]
        }]
      }]
    }
  },
  methods: {
    onChange(value) {
      console.log(value)
    }
  }
}
</script>
