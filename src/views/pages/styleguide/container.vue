<template>
  <div>
    <h2 class="mg-t16">容器类组件</h2>

    <h3>st-panel</h3>
    <p>面板分为header和body区域 请别忘了将内容放置于st-panel__body中</p>
    <section class="mg-t16 sg-app-content">
      <div class="st-panel">
        <div class="st-panel__header">
          <st-t1>只有一个标题</st-t1>
        </div>
        <div class="st-panel__body">这是内容 请将内容放到st-panel__body中</div>
      </div>
      <div class="st-panel mg-t16">
        <div class="st-panel__header">
          <div class="st-panel__title">
            <st-t1>带有操作区域带有操作区域带有操作区域带有操作区域</st-t1>
          </div>
          <div class="st-panel__actions">
            <st-button type="primary">操作</st-button>
          </div>
        </div>
        <div class="st-panel__body">这是内容</div>
      </div>
    </section>

    <section class="mg-t16 sg-app-content" style="height:400px">
      <div class="st-panel st-panel--app">
        <div class="st-panel__header">
          <st-t1>这是标题</st-t1>
        </div>
        <div class="st-panel__body">这是一个全高的面板</div>
      </div>
    </section>

    <h3 class="mg-t16">st-panel--tabs</h3>
    <p>包含tabs的panel面板</p>
    <section class="sg-app-content mg-t16">
      <div class="st-panel st-panel--tabs">
        <div class="st-panel__header">
          <st-route-tabs :options="tabsOptions">
            <div slot="actions">
              <a-input-search placeholder="私教课名称"></a-input-search>
            </div>
          </st-route-tabs>
        </div>
        <div class="st-panel__body">
          <router-view></router-view>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabsOptions: [
        {
          label: 'container/a',
          route: { name: 'styleguide-container-a', query: { a: 1, b: 2 } }
        },
        {
          label: 'container/b',
          route: { name: 'styleguide-container-b', query: { a: 1, b: 2 } }
        }
      ]
    }
  }
}
</script>
