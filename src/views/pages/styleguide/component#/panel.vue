<template>
  <section class="sg-section">
    <h4>st-panel</h4>
    <!-- st-panel start -->
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
          <st-input-search
            placeholder="可输入姓名、手机号、卡号"
            style="width: 290px;"
          />
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
        </div>
        这是一个内容
      </st-panel>
    </section>
    <p class="mg-t16">st-search-panel</p>
    <p>
      展开收起的的部分通过slot='more'传入。右下角按钮通过slot='button'传入，如果不传则默认是'查询（event=search）'和'重置(event=reset)'
    </p>
    <section>
      <st-search-panel>
        <div style="display: flex;align-items: center;margin:16px 0;">
          <span style="width:70px;">条件1：</span>
          <st-search-radio
            v-model="searchRadio"
            @change="onSearchRadioChange"
            :list="searchRadioList"
          />
        </div>
        <div style="display: flex;align-items: center;margin:16px 0;">
          <span style="width:70px;">条件2：</span>
          <a-radio-group defaultValue="a" buttonStyle="solid">
            <a-radio-button value="a">Hangzhou</a-radio-button>
            <a-radio-button value="b">Shanghai</a-radio-button>
            <a-radio-button value="c">Beijing</a-radio-button>
            <a-radio-button value="d">Chengdu</a-radio-button>
          </a-radio-group>
        </div>
        <div slot="more">
          <div style="display: flex;align-items: center;margin:16px 0;">
            <span style="width:70px;">条件3：</span>
            <a-select defaultValue="lucy" style="width: 120px">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
            </a-select>
          </div>
          <div style="display: flex;align-items: center;margin:16px 0;">
            <a-radio-group defaultValue="a" buttonStyle="solid">
              <a-radio-button value="a">今天</a-radio-button>
              <a-radio-button value="b">昨天</a-radio-button>
              <a-radio-button value="c">近30天</a-radio-button>
              <a-radio-button value="d">近90天</a-radio-button>
              <a-radio-button value="d">自定义</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <div slot="button">
          <st-button type="primary">查询1</st-button>
          <st-button class="mg-l8">重置1</st-button>
        </div>
      </st-search-panel>
    </section>
    <!-- st-panel end -->
  </section>
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
