<template>
  <section class="sg-section">
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
</template>
