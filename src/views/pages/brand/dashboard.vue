<template>
  <st-panel app
    initial>
    <st-form labelWidth='88px'>
      <st-form-section title='基础设置'>
        <a-row :gutter="8">
          <a-col :lg='10'
            :offset='1'>
            <st-form-item  label='性别'>
              <a-input placeholder='你好'></a-input>
            </st-form-item>
            <st-form-item label='性别'>
              <a-input placeholder='你好'></a-input>
            </st-form-item>
            <st-form-item label='性别'>
              <a-input placeholder='你好'></a-input>
            </st-form-item>
            <st-form-item label='性别'>
              <a-input placeholder='你好'></a-input>
            </st-form-item>
          </a-col>
          <a-col :lg='10'
            :offset='1'>
            <st-form-item label='性别'>
              <a-input placeholder='你好'></a-input>
            </st-form-item>
            <st-form-item label='性别'>
              <a-input placeholder='你好'></a-input>
            </st-form-item>
            <st-form-item label='性别'>
              <a-input placeholder='你好'></a-input>
            </st-form-item>
            <st-form-item label='性别'>
              <a-input placeholder='你好'></a-input>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :offset="1"
            :lg='20'>
            <st-form-item label='场馆'>
              <a-checkbox-group>
                <a-checkbox value='1'>1</a-checkbox>
                <a-checkbox value='2'>2</a-checkbox>
                <a-checkbox value='2'>2</a-checkbox>
                <a-checkbox value='2'>2</a-checkbox>
                <a-checkbox value='2'>2</a-checkbox>
                <a-checkbox value='2'>2</a-checkbox>
                <a-checkbox value='2'>2</a-checkbox>
                <a-checkbox value='2'>2</a-checkbox>
                <a-checkbox value='2'>2</a-checkbox>
              </a-checkbox-group>
            </st-form-item>
          </a-col>
        </a-row>
      </st-form-section>
      <st-form-section title='第二个设置'>
        <st-form-item>
          <a-input placeholder='你好'></a-input>
        </st-form-item>
      </st-form-section>

    </st-form>

  </st-panel>
</template>
