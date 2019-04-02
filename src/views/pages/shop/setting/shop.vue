<template>
  <st-panel app class="page-brand-shop-add">
    <st-form>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="门店名称" required>
            <a-input placeholder="支持中英文、数字,不超过20个字"></a-input>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="门店电话" required>
            <a-input placeholder="请输入门店电话">
              <div slot="addonAfter" style="width:50px">添加</div>
            </a-input>
            <span v-for="i in 3" :key="i">
              021-968-9899
              <br>
            </span>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="门店地址" required>
            <a-cascader :options="options" @change="onChange" placeholder="请选择省/市/区"/>
            <a-input placeholder="请输入详细地址" style="margin-top:12px;"></a-input>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="邮箱">
            <a-input placeholder="请输入门店邮箱"></a-input>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col offset="1" :lg="23">
          <st-form-item label="服务设施">
            <st-checkbox-facility-group v-model="facilityArr">
              <st-checkbox-facility-item
                style="margin-right:24px"
                label="wifi"
                icon="WIFI"
                value="1"
              ></st-checkbox-facility-item>
              <st-checkbox-facility-item
                style="margin-right:24px"
                label="wifi"
                icon="shower"
                value="2"
              ></st-checkbox-facility-item>
              <st-checkbox-facility-item
                style="margin-right:24px"
                label="wifi"
                icon="snow"
                value="3"
              ></st-checkbox-facility-item>
              <st-checkbox-facility-item
                style="margin-right:24px"
                label="wifi"
                icon="nosmoking"
                value="4"
              ></st-checkbox-facility-item>
              <st-checkbox-facility-item
                style="margin-right:24px"
                label="wifi"
                icon="heating"
                value="5"
              ></st-checkbox-facility-item>
              <st-checkbox-facility-item
                style="margin-right:24px"
                label="wifi"
                icon="medical"
                value="6"
              ></st-checkbox-facility-item>
              <st-checkbox-facility-item
                style="margin-right:24px"
                label="wifi"
                icon="park"
                value="7"
              ></st-checkbox-facility-item>
              <st-checkbox-facility-item
                style="margin-right:24px"
                label="wifi"
                icon="energy"
                value="8"
              ></st-checkbox-facility-item>
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
                <a-icon :type="false ? 'loading' : 'plus'"/>
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
            <st-checkbox-button-group v-model="weekData">
              <st-checkbox-button-item value="0">周一</st-checkbox-button-item>
              <st-checkbox-button-item value="1">周二</st-checkbox-button-item>
              <st-checkbox-button-item value="2">周三</st-checkbox-button-item>
              <st-checkbox-button-item value="3">周四</st-checkbox-button-item>
              <st-checkbox-button-item value="4">周五</st-checkbox-button-item>
              <st-checkbox-button-item value="5">周六</st-checkbox-button-item>
              <st-checkbox-button-item value="6">周日</st-checkbox-button-item>
            </st-checkbox-button-group>
            <div class="brand-shop-add__slider">
              <st-slider class="pages-test-store__slider" :getSlider="getSlider"></st-slider>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center" align="middle">
        <a-col>
          <st-button type="primary">提交</st-button>
        </a-col>
      </a-row>
    </st-form>
  </st-panel>
</template>
<script>
export default {
  data() {
    return {
      weekData: [],
      getSlider: {
        disabled: false,
        className: 'st-slider-box',
        infoList: []
      },
      facilityArr: [],
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
    handleChange(info) {},
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  watch: {
    weekData: {
      handler() {
        let filter = []
        // this.weekData.sort()
        this.weekData.forEach(item => {
          if (parseInt(item) === 0) {
            filter.push({
              title: '周一',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: true
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf('1') >= 0)
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf('2') >= 0)
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf('3') >= 0)
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf('4') >= 0)
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf('5') >= 0)
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf('6') >= 0)
                }
              ]
            })
          }
          if (parseInt(item) === 1) {
            filter.push({
              title: '周二',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf('0') >= 0)
                },
                {
                  key: '周二',
                  disabled: true
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf('2') >= 0)
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf('3') >= 0)
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf('4') >= 0)
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf('5') >= 0)
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf('6') >= 0)
                }
              ]
            })
          }
          if (parseInt(item) === 2) {
            filter.push({
              title: '周三',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf('0') >= 0)
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf('1') >= 0)
                },
                {
                  key: '周三',
                  disabled: true
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf('3') >= 0)
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf('4') >= 0)
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf('5') >= 0)
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf('6') >= 0)
                }
              ]
            })
          }
          if (parseInt(item) === 3) {
            filter.push({
              title: '周四',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf('0') >= 0)
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf('1') >= 0)
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf('2') >= 0)
                },
                {
                  key: '周四',
                  disabled: true
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf('4') >= 0)
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf('5') >= 0)
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf('6') >= 0)
                }
              ]
            })
          }
          if (parseInt(item) === 4) {
            filter.push({
              title: '周五',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf('0') >= 0)
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf('1') >= 0)
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf('2') >= 0)
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf('3') >= 0)
                },
                {
                  key: '周五',
                  disabled: true
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf('5') >= 0)
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf('6') >= 0)
                }
              ]
            })
          }
          if (parseInt(item) === 5) {
            filter.push({
              title: '周六',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf('0') >= 0)
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf('1') >= 0)
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf('2') >= 0)
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf('3') >= 0)
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf('4') >= 0)
                },
                {
                  key: '周六',
                  disabled: true
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf('6') >= 0)
                }
              ]
            })
          }
          if (parseInt(item) === 6) {
            filter.push({
              title: '周日',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf('0') >= 0)
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf('1') >= 0)
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf('2') >= 0)
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf('3') >= 0)
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf('4') >= 0)
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf('5') >= 0)
                },
                {
                  key: '周日',
                  disabled: true
                }
              ]
            })
          }
        })
        console.log('weekData', this.weekData, filter)
        this.getSlider.infoList = filter
        this.getSlider = JSON.parse(JSON.stringify(this.getSlider))
      },
      deep: true
    }
  }
}
</script>
