<template>
  <section class="sg-section">
    <h3>st-info</h3>
    <p>信息展示 默认使用两栏宽度 40 *2 +8 =88px作为label宽度</p>
    <section class="sg-app-content">
      <st-panel>
        <st-t4>基础信息</st-t4>
        <a-row :gutter="24" class="mg-t16">
          <a-col :lg="8">
            <st-info>
              <st-info-item label="员工邮箱">ST0000001@styd.cn</st-info-item>
              <st-info-item label="专业">体育</st-info-item>
            </st-info>
          </a-col>
          <a-col :lg="8">
            <st-info>
              <st-info-item label="毕业时间">2018/01/01</st-info-item>
            </st-info>
          </a-col>
          <a-col :lg="8">
            <st-info>
              <st-info-item label="学历">本科</st-info-item>
            </st-info>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :lg="16">
            <st-info>
              <st-info-item label="文案比较长">
                这里文案如果比较长的话，占16/24栅格，后面8个栅格空着。这里文案如果比较长的话，占16/24栅格，后面8个栅格空着。这里文案如果比较长的话，占16/24栅格，后面8个栅格空着。这里文案如果比较长的话，占16/24栅格，后面8个栅格空着
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
              <st-info-item label="允许转让" label-gutter="80px">
                允许
              </st-info-item>
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
        <st-t2>品牌信息</st-t2>
        <a-row :gutter="24" class="mg-t16">
          <a-col :lg="12">
            <st-info :isWeakenLabel="true">
              <st-info-item label="当前系统版本">俱乐部（单店版）</st-info-item>
              <st-info-item label="首次开通时间">
                2019-04-11 17:39:25
              </st-info-item>
            </st-info>
          </a-col>
          <a-col :lg="12">
            <st-info :isWeakenLabel="true">
              <st-info-item label="有效门店数">共3家门店</st-info-item>
              <st-info-item label="有效插件数">共7个插件</st-info-item>
            </st-info>
          </a-col>
        </a-row>
      </st-panel>
    </section>
  </section>
</template>
