<template>
  <section :class="basic()">
    <st-panel title="会员卡详情">
      <div slot="actions">
        <st-button class="mgr-8" type="primary">查看合同</st-button>
        <st-button class="mgr-8" type="primary">冻结</st-button>
        <st-button class="mgr-8" type="primary">更多</st-button>
      </div>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="卡名">万晋健身房年卡</st-info-item>
            <st-info-item label="类型">会员期限卡</st-info-item>
            <st-info-item label="初始额度">365天</st-info-item>
            <st-info-item label="剩余额度">180天</st-info-item>
            <st-info-item label="有效期">2019-03-07 14:33 至  2019-09-06 14:33</st-info-item>
            <st-info-item label="当前状态" class="mg-b0">有效</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="所属会员">会员名称</st-info-item>
            <st-info-item label="手机号">13345667788</st-info-item>
            <st-info-item label="实体卡号">34389247984374</st-info-item>
            <st-info-item label="物理ID">34453464355</st-info-item>
            <st-info-item label="订单号">89849784787</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="6">
          <st-info>
            <st-info-item label="允许转让">允许</st-info-item>
            <st-info-item label="转让手续费">5%</st-info-item>
            <st-info-item label="入场场馆">万晋健身房</st-info-item>
            <st-info-item label="约课范围">团体课</st-info-item>
            <st-info-item label="备注">首次办卡</st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel initial class="mgt-12"
      :tabs="[
        { label: '消费记录', route: { name: 'shop-sold-card-info-member-info-consumption-record' } },
        { label: '操作日志', route: { name: 'shop-sold-card-info-member-info-operation-record' } },
      ]"
    >
    <router-view></router-view>
  </st-panel>
  </section>
</template>
<script>
export default {
  name: 'PageShopSoldCardMemberInfo',
  bem: {
    basic: 'page-shop-sold-info'
  }
}
</script>
