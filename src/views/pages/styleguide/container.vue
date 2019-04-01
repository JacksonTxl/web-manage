<template>
  <div>
    <h2 class="mg-t16">容器类组件</h2>

    <h3>st-panel</h3>

    <section class="mg-t16 sg-app-content">
      <st-panel title="只有一个标题"
        >这是内容 请将内容放到st-panel__body中</st-panel
      >
      <st-panel
        class="mg-t16"
        title="带有操作区域带有操作区域带有操作区域带有操作区域"
      >
        <div slot="actions">
          <st-button type="primary">操作</st-button>
        </div>
        这是内容
      </st-panel>
    </section>

    <section class="mg-t16 sg-app-content" style="height:400px">
      <st-panel app title="标题">这是一个全高的面板</st-panel>
    </section>

    <p>包含tabs的panel面板</p>
    <section class="sg-app-content mg-t16">
      <st-panel
        :tabs="[
          { label: 'container/a', route: { name: 'styleguide-container-a' } },
          { label: 'container/b', route: { name: 'styleguide-container-b' } }
        ]"
      >
        <div slot="actions">
          <a-input-search placeholder="私教课名称"></a-input-search>
        </div>
        <router-view></router-view>
      </st-panel>
    </section>
    <h3 class="mg-t16">默认st-panel</h3>
    <section class="sg-app-content">
      <st-panel>hello world 我有24px padding</st-panel>
    </section>
    <h3 class="mg-t16">如果不需要padding 添加initial属性</h3>
    <section class="sg-app-content">
      <st-panel initial>hello world</st-panel>
    </section>

    <h3 class="mg-t16">title区域放置操作类按钮</h3>
    <section class="sg-app-content">
      <st-panel>
        <div slot="title" style="width:280px">
          <a-input-search placeholder="请输入"></a-input-search>
        </div>
        <div slot="actions">
          <st-button type="primary">操作</st-button>
        </div>
        这是一个内容
      </st-panel>
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
