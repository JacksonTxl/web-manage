<template>
  <div>
    <h3>Title类型</h3>
    <section class="sg-app-content">
      <st-panel>
        <st-t2>st-t2 .fz(18px) .lh(22px) 适用于门店名称</st-t2>
        <st-t3>st-t3 .fz(16px) .lh(24px) 适用于表单标题</st-t3>
      </st-panel>
    </section>
    <h3>color类型</h3>
    <section class="sg-app-content">
      <st-panel>
        <p>
          <span class="color-title">.color-title</span>
          <span class="color-text mg-l16">.color-text</span>
          <span class="color-text mg-l16">.color-text-light</span>
        </p>
      </st-panel>
    </section>
    <h3 class="mg-t24">bem辅助类名函数</h3>
    <p>使用辅助函数帮忙生成类名 方便书写bem规范的class名称 查看类名以观察效果</p>
    <section class="sg-app-content">
      <st-panel>
        <ul>
          <li :class="b()">b() -> {{b()}}</li>
          <li :class="b('title')">b('title') -> {{b('title')}}</li>
          <li
            :class="b('title',{active:true})"
          >b('title',{active:true}) -> {{b('title',{active:true})}}</li>
          <li :class="bSider()">bSider() -> {{bSider()}}</li>
          <li :class="bHeader()">bHeader() -> {{bHeader()}}</li>
        </ul>
      </st-panel>
    </section>

    <h3 class="mg-t24">全局辅助类样式</h3>
    <p>用于简单的样式修正，切勿滥用</p>
    <section class="sg-app-content">
      <st-panel>
        <p>
          <span>.ta-l (text-align: left)</span>
          <span class="mg-l16">.ta-c (text-align: center)</span>
          <span class="mg-l16">.ta-r (text-align: right)</span>
          <span class="mg-l16">.fl-r (float: right)</span>
        </p>
        <p>
          <span class="cursor-pointer">cursor-pointer</span>
        </p>
        <p>
          <span class="full-width" style="background: #ccc">full-width(this is a inline element)</span>
        </p>
        <p>
          <span class="tablefix" href="#">.tablefix 修复ant-design表格组件的样式问题，放置于a-table父级容器即可</span>
        </p>
        <p class="pd-md bordered">pd-md bordered</p>
      </st-panel>
    </section>
    <h3 class="mg-t24">全局组件类样式</h3>
    <p>一些纯样式的组件 用class类实现更能复用</p>
    <section class="sg-app-content">
      <st-panel>
        <p>
          <a class="st-link-secondary" href="#">.st-link-secondary 次级链接效果</a>
        </p>
        <p>
          .st-preview-item 悬浮放大效果
          <span class="st-preview-item" v-viewer>
            <img
              :src="'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/IUt_vXTl8zaWGwlO.jpg' | imgFilter({ w: 100, h: 56 })"
              :data-src="'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/IUt_vXTl8zaWGwlO.jpg' | imgFilter({ w: 1000 })"
            >
          </span>
        </p>
      </st-panel>
    </section>
    <h3>st-button 按钮</h3>
    <div class="mg-t16">
      <!-- button -->
      <st-button pill size="small">默认24px</st-button>
      <st-button pill size="medium">28px size=medium</st-button>
      <st-button pill loading>32px</st-button>
      <st-button pill size="large">40px</st-button>
      <st-button pill type="primary" size="small">pill 24px</st-button>
      <st-button pill type="primary" size="medium" loading>28px</st-button>
      <st-button pill type="primary">32px</st-button>
      <st-button pill type="primary" size="large">40px</st-button>

      <st-button pill ghost type="primary" size="small">幽灵按钮24px</st-button>
      <st-button pill ghost type="primary" size="medium">28px</st-button>
      <st-button pill ghost type="primary">32px</st-button>
      <st-button pill ghost type="primary" size="large" loading>40px</st-button>
    </div>
    <div class="mg-t16">
      <st-button size="small" loading>默认24px</st-button>
      <st-button size="medium">28px</st-button>
      <st-button>32px</st-button>
      <st-button size="large">40px</st-button>
      <st-button type="primary" size="small">primary 24px</st-button>
      <st-button type="primary" size="medium">28px</st-button>
      <st-button type="primary" loading>32px</st-button>
      <st-button type="primary" size="large" disabled>40px</st-button>

      <st-button ghost type="primary" size="small">幽灵按钮24px</st-button>
      <st-button ghost type="primary" size="medium">28px</st-button>
      <st-button ghost type="primary" disabled>32px</st-button>
      <st-button ghost type="primary" size="large" loading>40px</st-button>
    </div>
    <div class="mg-t16">
      <a-row :gutter="8">
        <a-col :span="4">
          <!-- start -->
          <st-button pill type="primary">进入门店</st-button>
          <!-- end -->
        </a-col>
        <a-col :span="6">
          <!-- start -->
          <div style="width:172px;" class="mg-t16">
            <st-button block pill type="primary" icon="wechat" size="large">添加门店</st-button>
          </div>
          <!-- end -->
        </a-col>
        <a-col :span="8">
          <!-- start -->
          <div style="width:336px;" class="mg-t16">
            <st-button disabled block pill type="primary" size="large">下一步</st-button>
          </div>
          <!-- end -->
        </a-col>
        <a-col :span="4">
          <st-button style="width:84px" size="medium" pill ghost type="primary">绑定</st-button>
        </a-col>
      </a-row>
      <div>
        <st-button block type="dashed">表单添加 type=dashed</st-button>
      </div>
    </div>
    <!-- icon -->
    <h3 class="mg-t24">st-icon 图标</h3>
    <a
      target="blank"
      href="https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.11&manage_type=myprojects&projectId=1106512&keyword="
    >iconfont saas2.0链接</a>
    <section>
      <li>
        <st-icon type="wechat"></st-icon>默认为父级容器字号
      </li>
      <li>
        <st-icon type="wechat" size="28px"></st-icon>使用[size]变更大小
      </li>
      <li>
        <st-icon type="wechat" color="red"></st-icon>使用[color]变更颜色
      </li>
      <li>
        <st-icon type="anticon:setting" color="red"></st-icon>使用[anticon:__] ant design自带的图标
      </li>
      <li>
        <st-button icon="wechat" type="primary">按钮中使用[icon]图标</st-button>
      </li>
    </section>

    <h3 class="mg-t24">st-more-dropdown st-help-popover</h3>
    <p>显示更多的菜单dropdown组件</p>
    <p>表格中使用的帮助文本popover组件 可使用[max-width]控制最大popover宽度</p>
    <section class="sg-app-content">
      <st-panel>
        <st-more-dropdown>
          <a-menu-item>转让</a-menu-item>
          <a-menu-item>出售</a-menu-item>
          <a-menu-item>你好</a-menu-item>
        </st-more-dropdown>
        <st-help-popover class="mg-l64">
          <span slot='title'>操作人：AAA 操作时间：2018/10/10 23:59:59</span>
          <span slot='content'>停售原因是不想停售原因是不想停售原因是不想停售原因是不想</span>
        </st-help-popover>
      </st-panel>
    </section>
    <h3 class="mg-t24">st-info</h3>
    <p>信息展示 默认使用两栏宽度 40 *2 +8 =88px作为label宽度</p>
    <section class="sg-app-content">
      <st-panel>
        <a-row :gutter="8">
          <a-col :offset="1" :lg="7">
            <st-info>
              <st-info-item label="会员卡名称">万晋健身房年卡</st-info-item>
              <st-info-item label="所属会员">会员名称</st-info-item>
              <st-info-item label="允许转让">允许</st-info-item>
              <st-info-item label="类型">会员期限卡</st-info-item>
              <st-info-item label="手机号">13345667788</st-info-item>
              <st-info-item label="转让手续费">5%</st-info-item>
            </st-info>
          </a-col>
          <a-col :offset="1" :lg="9">
            <st-info>
              <st-info-item label="剩余额度">180天</st-info-item>
              <st-info-item label="物理ID">34453464355</st-info-item>
              <st-info-item label="约课范围">
                团体课 团体课 团体课 团体课 团体课 团体课 团体课 团体课 团体课
                团体课 团体课 团体课 团体课 团体课 团体课 团体课 团体课 团体课
                团体课 团体课 团体课
              </st-info-item>
            </st-info>
          </a-col>
        </a-row>
      </st-panel>
    </section>

    <p class="mg-t24">st-info ，可定制 labelWidth 和 labelGutter,</p>
    <section class="sg-app-content">
      <st-panel>
        <a-row :gutter="8">
          <a-col :offset="1" :lg="10">
            <st-info labelWidth="136px" labelGutter="16px">
              <st-info-item label="会员卡名称">万晋健身房年卡</st-info-item>
              <st-info-item label="所属会员">会员名称</st-info-item>
              <st-info-item label="允许转让" label-gutter="80px">允许</st-info-item>
              <st-info-item label="类型">会员期限卡</st-info-item>
              <st-info-item label="手机号">13345667788</st-info-item>
              <st-info-item label="转让手续费">5%</st-info-item>
            </st-info>
          </a-col>
          <a-col :offset="1" :lg="10">
            <st-info labelWidth="136px" labelGutter="16px">
              <st-info-item label="会员卡名称">万晋健身房年卡</st-info-item>
              <st-info-item label="所属会员">会员名称</st-info-item>
              <st-info-item label="允许转让">允许</st-info-item>
              <st-info-item label="类型">会员期限卡</st-info-item>
              <st-info-item label="手机号">13345667788</st-info-item>
              <st-info-item label="转让手续费">5%</st-info-item>
            </st-info>
          </a-col>
        </a-row>
      </st-panel>
    </section>
  </div>
</template>

<script>
import { imgFilter } from '@/filters/resource.filters'
export default {
  filters: {
    imgFilter
  },
  bem: {
    b: 'sg-layout-default',
    bSider: 'sg-layout-default-sider',
    bHeader: 'sg-layout-default-header'
  }
}
</script>
