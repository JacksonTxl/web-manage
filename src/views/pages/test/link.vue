<template>
  <st-panel>
    <st-t3>品牌人群</st-t3>
    <div class="mg-t8">
      <router-link to="/brand/plugin/crowd/index">品牌人群首页</router-link>
      <router-link class="mg-l8" to="/brand/plugin/crowd/add">新增品牌人群</router-link>
      <router-link class="mg-l8" to="/brand/plugin/crowd/edit">编辑品牌人群</router-link>
    </div>
    <st-t3 class="mg-t24">门店人群</st-t3>
    <div class="mg-t8">
      <router-link to="/shop/member/crowd/index">门店人群首页</router-link>
      <router-link class="mg-l8" to="/shop/member/crowd/add">新增门店人群</router-link>
      <router-link class="mg-l8" to="/shop/member/crowd/edit">编辑门店人群</router-link>
    </div>
    <st-t3 class="mg-t24">场地</st-t3>
    <div class="mg-t8">
      <router-link to="/shop/setting/court/list">场地列表</router-link>
    </div>
    <st-t3 class="mg-t24">合同设置</st-t3>
    <div class="mg-t8">
      <router-link to="/brand/setting/contract/list">合同列表</router-link>
    </div>
    <st-t3 class="mg-t24">薪资</st-t3>
    <div class="mg-t8">
      <router-link to="/brand/finance/salary/list">薪资列表</router-link>
      <router-link to="/brand/finance/salary/template/basic" class="mg-l8">底薪模板</router-link>
      <router-link to="/brand/finance/salary/template/performance" class="mg-l8">业绩模板</router-link>
    </div>
  </st-panel>
</template>
