<template>
  <div>
    <!-- st-panel start -->
    <section class="mg-t16 sg-app-content" style="height:400px">
      <st-panel app title="标题">[app] 这是一个全高的面板</st-panel>
    </section>
    <section class="mg-t16 sg-app-content">
      <st-panel initial title="标题">
        [initial]这是一个没有body padding的panel
      </st-panel>
    </section>
    <section class="mg-t16 sg-app-content">
      <st-panel title="只有一个标题">
        这是内容 请将内容放到st-panel__body中
      </st-panel>
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
    <section class="mg-t16 sg-app-content">
      <st-panel>
        这是内容
      </st-panel>
    </section>
    <section class="mg-t16 sg-app-content">
      <st-panel>
        <div slot="title">
          <st-input-search placeholder="可输入姓名、手机号、卡号" />
        </div>
        <div slot="actions">
          <st-button type="primary">操作</st-button>
        </div>
        <div slot="prepend">
          <div style="background: #F7F9FC; padding: 24px">
            <div>prepend</div>
            <div>
              这里可以通过 slot name="prepend" 的方式，传入筛选项等内容，统称为
              prepend
            </div>
          </div>
        </div>
        content
      </st-panel>
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
          <st-input-search placeholder="私教课名称"></st-input-search>
        </div>
        <router-view></router-view>
      </st-panel>
    </section>
    <p class="mg-t16">带有加载状态的panel</p>
    <section class="sg-app-content">
      <st-panel title="hello" loading>
        <div slot="actions">
          <st-button type="primary">操作</st-button>
        </div>
        这是一个内容
      </st-panel>
    </section>
    <p class="mg-t16">
      flex结合st-panel-layout使用
      <a>案例</a>
      （营销插件：活动报名）
    </p>
    <section class="sg-app-content">
      <st-panel-layout>
        <div
          style="width:100%;height:140px;background: #fff;"
          class="mg-b8 pd-16"
        >
          这里放页面的头部
        </div>
        <st-panel flex title="hello" loading>
          <div slot="actions">
            <st-button type="primary">操作</st-button>
          </div>
          这是一个内容
        </st-panel>
      </st-panel-layout>
    </section>

    <!-- st-panel end -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchRadio: 1,
      searchRadioList: [
        {
          value: 1,
          label: '在呢'
        },
        {
          value: 2,
          label: '好吧'
        },
        {
          value: 3,
          label: '睡觉'
        }
      ]
    }
  },
  methods: {
    onSearchRadioChange(data) {
      console.log(`searchRadio选择的值${data}`)
    }
  }
}
</script>
