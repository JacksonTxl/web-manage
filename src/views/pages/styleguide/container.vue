<template>
  <div>
    <h4>容器类组件</h4>

    <div class="mg-t16" style="background:#f0f2f5;height:400px;padding:24px;">
      <div class="st-panel">
        <div class="st-panel__header">hello</div>
        <div class="st-panel__body">这是内容</div>
      </div>
      <div class="st-panel mg-t16">
        <div class="st-panel__header">
          <div class="st-panel__title">
            <st-t1>这是标题</st-t1>
          </div>
          <div class="st-panel__actions">
            <st-button type="primary">操作</st-button>
          </div>
        </div>
        <div class="st-panel__body">这是内容</div>
      </div>
    </div>

    <div class="mg-t16" style="background:#f0f2f5;height:400px;padding:24px;">
      <div class="st-panel st-panel--app">
        <div class="st-panel__header">
          <div class="st-panel__title">
            <st-t1>这是标题</st-t1>
          </div>
        </div>
        <div class="st-panel__body">这是一个全高的面板</div>
      </div>
    </div>
  </div>
</template>
