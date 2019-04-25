<template>
  <section  class="sg-section">
    <h4>st-panel</h4>
    <!-- st-panel start -->
    <section class="mg-t16 sg-app-content">
      <st-panel title="只有一个标题">这是内容 请将内容放到st-panel__body中</st-panel>
      <st-panel class="mg-t16" title="带有操作区域带有操作区域带有操作区域带有操作区域">
        <div slot="actions">
          <st-button type="primary">操作</st-button>
        </div>这是内容
      </st-panel>
    </section>
    <section class="mg-t16 sg-app-content">
      <st-panel class="mg-t16">
        <div slot="title">
          <st-input-search placeholder="可输入姓名、手机号、卡号" style="width: 290px;"/>
        </div>
        <div slot="actions">
          <st-button type="primary">操作</st-button>
        </div>
        <div slot="prepend">
          <div style="background: #F7F9FC; padding: 24px">
            <div>repend</div>
            <div>这里可以通过 slot name="prepend" 的方式，传入筛选项等内容，统称为 prepend</div>
          </div>
        </div>
        content
      </st-panel>
    </section>
    <section class="mg-t16 sg-app-content" style="height:400px">
      <st-panel app title="标题">这是一个全高的面板</st-panel>
    </section>
    <p class="mg-t16">包含tabs的panel面板</p>
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
    <p class="mg-t16">带有加载状态的panel</p>
    <section class="sg-app-content">
      <st-panel title="hello" loading>
        <div slot="actions">
          <st-button type="primary">操作</st-button>
        </div>这是一个内容
      </st-panel>
    </section>
    <!-- st-panel end -->
  </section>
</template>
