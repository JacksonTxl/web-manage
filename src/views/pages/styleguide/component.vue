<template>
  <div>
    <h2>组件类</h2>
    <section id="title" class="sg-section">
      <h4>st-title</h4>
      <st-container type="1">
        <st-t3>st-t3 .fz(16px) .lh(24px) 适用于表单标题</st-t3>
        <st-t2>st-t2 .fz(18px) .lh(22px) 适用于门店名称</st-t2>
      </st-container>
    </section>
    <section id="button" class="sg-section">
      <h4>st-button</h4>
      <st-container type="1">
        <div>
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
      </st-container>
    </section>
    <section id="st-title" class="sg-section">
      <h4 id="st-btn">st-title</h4>
      <st-container type="1">
        <st-t3>st-t3 .fz(16px) .lh(24px) 适用于表单标题</st-t3>
        <st-t2>st-t2 .fz(18px) .lh(22px) 适用于门店名称</st-t2>
      </st-container>
    </section>

    <section id="icon" class="sg-section">
      <h4>
        st-icon
        <a
          target="blank"
          href="https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.11&manage_type=myprojects&projectId=1106512&keyword="
        >iconfont 链接</a>
      </h4>
      <st-container type="1">
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
      </st-container>
    </section>

    <section id="panel" class="sg-section">
      <h4>st-panel</h4>
      <st-container type="1">
        <!-- st-panel start -->
        <section class="mg-t16 sg-app-content">
          <st-panel title="只有一个标题">这是内容 请将内容放到st-panel__body中</st-panel>
          <st-panel class="mg-t16" title="带有操作区域带有操作区域带有操作区域带有操作区域">
            <div slot="actions">
              <st-button type="primary">操作</st-button>
            </div>这是内容
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
      </st-container>
    </section>

    <section id="more-dropdown" class="sg-section">
      <h3>st-more-dropdown</h3>
      <st-more-dropdown>
        <a-menu-item>转让</a-menu-item>
        <a-menu-item>出售</a-menu-item>
        <a-menu-item>你好</a-menu-item>
      </st-more-dropdown>
    </section>

    <section id="help-popover" class="sg-section">
      <h3>st-help-popover</h3>
      <st-help-popover>
        <span slot="title">操作人：AAA 操作时间：2018/10/10 23:59:59</span>
        <span slot="content">停售原因是不想停售原因是不想停售原因是不想停售原因是不想</span>
      </st-help-popover>
    </section>

    <section id="info" class="sg-section">
      <h3>st-info</h3>
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

    </section>

    <section id="info" class="sg-section">
      <h3>st-info</h3>
      <st-container type="1"></st-container>
    </section>
  </div>
</template>
