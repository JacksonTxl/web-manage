<template>
  <st-panel app>
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
        <a-col offset="1" :lg="10">
          <st-form-item label="服务设施">
            <st-checkbox-facility-group v-model="facilityArr">
              <st-checkbox-facility-item label="wifi" icon="home" value="1"></st-checkbox-facility-item>
              <st-checkbox-facility-item label="wifi" icon="home" value="2"></st-checkbox-facility-item>
              <st-checkbox-facility-item label="wifi" icon="home" value="3"></st-checkbox-facility-item>
            </st-checkbox-facility-group>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col offset="1" :lg="10">
          <st-form-item label="门店名称" required>
            <a-input placeholder="支持中英文、数字,不超过20个字"></a-input>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col offset="1" :lg="10">
          <st-form-item label="门店名称" required>
            <a-input placeholder="支持中英文、数字,不超过20个字"></a-input>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col offset="1" :lg="10">
          <st-form-item label="门店名称" required>
            <a-input placeholder="支持中英文、数字,不超过20个字"></a-input>
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
