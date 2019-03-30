<template>
  <div>
    <div>
      按钮复选checkbox
      <st-checkbox-button-group v-model='checkBoxModel'>
        <st-checkbox-button-item value='1'>你好</st-checkbox-button-item>
        <st-checkbox-button-item value='2'>你好2</st-checkbox-button-item>
      </st-checkbox-button-group>
    </div>
    <section class='mg-t16'>

      <a-form class="st-form">
        <a-row :gutter='8'>
          <a-col :span='10'
            :offset='1'>
            <a-form-item label='员工头像'>
              <a-upload style='width:164px;display:inline-block;height:164px;'
                type='drag'>
                <st-icon type='anticon:plus'></st-icon>
              </a-upload>
            </a-form-item>
            <a-form-item label='姓名'
              required>
              <a-input placeholder='姓名'></a-input>
            </a-form-item>
            <a-form-item label='手机号'
              required>
              <a-input-group compact>
                <a-select style="width: 20%"
                  defaultValue="+86">
                  <a-select-option value="86">+86</a-select-option>
                </a-select>
                <a-input style='width:80%'
                  placeholder='手机号'></a-input>
              </a-input-group>
            </a-form-item>
            <a-form-item label='性别'
              required>
              <a-input placeholder='性别'></a-input>
            </a-form-item>
          </a-col>
          <a-col :span='10'
            :offset='1'>
            <a-form-item label='员工头像'>
              <a-upload style='width:164px;display:inline-block;height:164px;'
                type='drag'>
                <st-icon type='anticon:plus'></st-icon>
              </a-upload>
            </a-form-item>
            <a-form-item label='姓名'
              required>
              <a-input placeholder='姓名'></a-input>
            </a-form-item>
            <a-form-item label='手机号'
              required>
              <a-input-group compact>
                <a-select style="width: 20%"
                  defaultValue="+86">
                  <a-select-option value="86">+86</a-select-option>
                </a-select>
                <a-input style='width:80%'
                  placeholder='手机号'></a-input>
              </a-input-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :offset="1"
            :span="22">
            <st-hr></st-hr>
          </a-col>
        </a-row>
        <a-row :gutter='8' class="mg-t24">
          <a-col :offset='1'>
            <st-button class="st-form__submit"
              type='primary'
              ghost>保存</st-button>
            <st-button class="mg-l16"
              type='primary'>继续 填写</st-button>
          </a-col>
        </a-row>

      </a-form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkBoxModel: []
    }
  }
}
</script>
