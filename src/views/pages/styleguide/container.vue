<template>
  <div>
    <h4>容器类组件</h4>

    <div class='mg-t16'
      style="background:#f0f2f5;height:400px;padding:24px;">
      <div class="st-panel">
        <div class="st-panel__header">
          hello
        </div>
        <div class="st-panel__body">
          这是内容
        </div>
      </div>
      <div class="st-panel mg-t16">
        <div class="st-panel__header">
          <div class="st-panel__title">
            <st-t1>这是标题</st-t1>
          </div>
          <div class="st-panel__actions">
            <st-button type='primary'>操作</st-button>
          </div>
        </div>
        <div class="st-panel__body">
          这是内容
        </div>
      </div>
    </div>

    <div class='mg-t16'
      style="background:#f0f2f5;height:400px;padding:24px;">
      <div class="st-panel st-panel--app">
        <div class="st-panel__header">
          <div class="st-panel__title">
            <st-t1>这是标题</st-t1>
          </div>
        </div>
        <div class="st-panel__body">
          这是一个全高的面板
        </div>
      </div>
    </div>
    <div class='mg-t8'
      style="background:#f0f2f5;padding:24px;">
      <div class="st-panel">
        <a-form class="st-form st-form--is-label-3">
          <div class="st-panel__header">
            <st-t1>基础信息</st-t1>
          </div>
          <div class="st-panel__body">
            <p>
              默认表单项目fabel与input项的间距已调整,使用a-row 和
              务必添加st-form类以使gutter样式和label样式生效
              label默认定宽为88px两个格子宽度
            </p>
            <div class="sg-box">block 拉到本块到1144px看对齐效果</div>
            <a-row :gutter='8'>
              <a-col :span='1'
                v-for='n in 24'
                :key="n">
                <div class="sg-box">{{n}}</div>
              </a-col>
            </a-row>
            <a-row :gutter='8'>
              <a-col :span='10'
                :offset='1'>
                <a-form-item label='从业时间'
                  validate-status="error"
                  has-feedback
                  help="Should be combination of numbers & alphabets"
                  required>
                  <a-input placeholder='请选择日期'></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :span='21'
                :offset="1">
                <a-form-item required>
                  <span slot="label">
                    Nickname&nbsp;
                    <a-tooltip placement='right'
                      title="What do you want others to call you?">
                      <st-icon type="anticon:question-circle-o" />
                    </a-tooltip>
                  </span>
                  <a-checkbox>单车</a-checkbox>
                  <a-checkbox>瑜伽</a-checkbox>
                  <a-checkbox>舞蹈</a-checkbox>
                  <a-checkbox>拳击/舞蹈</a-checkbox>
                  <a-checkbox>杠铃</a-checkbox>
                  <a-checkbox>踏板</a-checkbox>
                  <a-checkbox>高强度间歇训练</a-checkbox>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :span='10'
                :offset="1">
                <a-form-item label='专业认证'
                  required>
                  <a-select>
                    <a-select-option value='.com'>.com</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :span='10'
                :offset="1">
                <a-form-item label='个人经历'
                  required>
                  <a-textarea rows='5'
                    placeholder='请输入员工简洁'></a-textarea>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="8"
              class="mg-b0">
              <a-col :offset="1"
                :span="10">
                <st-button class="st-form__submit"
                  type='primary'>提交</st-button>
              </a-col>
            </a-row>
          </div>
          <div class="st-panel__header">
            <st-t1>售卖设置</st-t1>
          </div>
          <div class="st-panel__body">
          </div>
          <div class="st-panel__header">
            <st-t1>更多设置</st-t1>
          </div>
          <div class="st-panel__body">

          </div>
        </a-form>
      </div>
    </div>

    <h3 class="mg-t16">两栏删格布局</h3>
    <div class='mg-t8'
      style="background:#f0f2f5;padding:24px;">
      <div class="st-panel">
        <div class="st-panel__body">

        </div>
      </div>
    </div>

  </div>
</template>
