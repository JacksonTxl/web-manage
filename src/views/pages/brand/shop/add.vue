<template>
  <st-panel app class="pages-brandshop-add">
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
      <a-row :gutter="8">
        <a-col :lg="23" :xs="22" :offset="1">
          <st-form-item label="服务设施">
            <st-checkbox-facility-group v-model="facilityArr">
              <st-checkbox-facility-item
                style="margin-right:24px;"
                value="1"
                label="wifi"
                icon="home"
              ></st-checkbox-facility-item>
              <st-checkbox-facility-item
                style="margin-right:24px;"
                value="2"
                label="wifi"
                icon="home"
              ></st-checkbox-facility-item>
              <st-checkbox-facility-item
                style="margin-right:24px;"
                value="3"
                label="wifi"
                icon="home"
              ></st-checkbox-facility-item>
              <st-checkbox-facility-item
                style="margin-right:24px;"
                value="1"
                label="wifi"
                icon="home"
              ></st-checkbox-facility-item>
              <st-checkbox-facility-item
                style="margin-right:24px;"
                value="2"
                label="wifi"
                icon="home"
              ></st-checkbox-facility-item>
              <st-checkbox-facility-item
                style="margin-right:24px;"
                value="3"
                label="wifi"
                icon="home"
              ></st-checkbox-facility-item>
            </st-checkbox-facility-group>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="23" :xs="22" :offset="1">
          <st-form-item label="店招">
            <a-upload
              name="avatar"
              style="width: 240px"
              listType="picture-card"
              :showUploadList="false"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <div>
                <a-icon :type="false ? 'loading' : 'plus'"/>
                <div class="ant-upload-text">上传店招</div>
                <div class="ant-upload-text">大小不超过5M，建议尺寸16:9</div>
              </div>
            </a-upload>
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
    handleChange(info) {

    },
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
  }
}
</script>
