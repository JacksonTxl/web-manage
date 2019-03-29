<template>
  <div>
    <h4>容器类组件</h4>

    <div class='mg-t16'
      style="background:#f0f2f5;height:400px;padding:24px;">
      <div class="st-box">
        <div class="st-box__hd">
          hello
        </div>
        <div class="st-box__bd">
          这是内容
        </div>
      </div>
      <div class="st-box mg-t16">
        <div class="st-box__hd">
          <div class="st-box__title">
            <st-t1>这是标题</st-t1>
          </div>
          <div class="st-box__actions">
            <st-button type='primary'>操作</st-button>
          </div>
        </div>
        <div class="st-box__bd">
          这是内容
        </div>
      </div>
    </div>

    <div class='mg-t16'
      style="background:#f0f2f5;height:400px;padding:24px;">
      <div class="st-box st-box--app">
        <div class="st-box__hd">
          <div class="st-box__title">
            <st-t1>这是标题</st-t1>
          </div>
        </div>
        <div class="st-box__bd">
          这是一个全高的面板
        </div>
      </div>
    </div>

    <div class='mg-t16'
      style="background:#f0f2f5;height:600px;padding:24px;">
      <div class="st-box st-box--app">
        <a-form>
          <div class="st-box__hd">
            <st-t1>基础信息</st-t1>

          </div>
          <div class="st-box__bd">
            <a-form-item label='储值卡金额'
              :labelCol="{span:2,offset:2}"
              :wrapperCol="{span:10}"
              required>
              <a-input placeholder='请输入储值卡名称'></a-input>
            </a-form-item>
            <a-form-item label='储值金额'
              :labelCol="{span:2,offset:2}"
              :wrapperCol="{span:10}"
              required>
              <a-input placeholder='测试'></a-input>
            </a-form-item>
          </div>
          <div class="st-box__hd">
            <st-t1>售卖设置</st-t1>
          </div>
          <div class="st-box__bd">
          </div>
          <div class="st-box__hd">
            <st-t1>更多设置</st-t1>
          </div>
          <div class="st-box__bd">
            <a-form-item :wrapperCol="{span:10,offset:4}">
              <st-button type='primary'>提交</st-button>
            </a-form-item>
          </div>
        </a-form>
      </div>
    </div>

    <h3>无hd</h3>
    <div class='mg-t16'
      style="background:#f0f2f5;height:400px;padding:24px;">
      <div class="st-box st-box--app">
        <div class="st-box__bd">
          <a-row :gutter='8'>
            <a-col :span='13'
              :offset="5">
              <a-input placeholder='test'></a-input>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>

  </div>
</template>
