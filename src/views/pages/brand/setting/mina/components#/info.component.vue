<template>
  <div :class="info()">
    <div class="left">
      <st-t2>
        微信小程序（基础版）
        <span class="bg-gray color-text-light">发布时间：2019-02-02</span>
      </st-t2>
      <a-row :gutter="24" class="mg-t16">
        <a-col :lg="8">
          <st-info>
            <st-info-item label="小程序名称">{{data.name}}</st-info-item>
            <st-info-item label="系统版本">{{data.version}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :lg="8">
          <st-info>
            <st-info-item label="微信认证">已认证</st-info-item>
            <st-info-item label="发布状态">审核中<a :class="info('a')">重新提交</a></st-info-item>
          </st-info>
        </a-col>
        <a-col :lg="8">
          <st-info>
            <st-info-item label="微信支付">已配置<a :class="info('a')">重新配置</a></st-info-item>
            <st-info-item label="微信授权">{{data.is_auth | statusFilter}}<a :class="info('a')"
                :href="data.auth_url">重新授权</a>
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </div>
    <div class="right">
      <img :src="data.qrcode_url" />
      <p>三体微信小程序示例 扫码查看</p>
    </div>
  </div>
</template>

<script>
export default {
  bem: {
    info: 'info-component'
  },
  props: {
    data: Object
  },
  filters: {
    statusFilter(v) {
      let authMap = {
        0: '未授权',
        1: '已授权'
      }
      return authMap[v]
    }
  }
}

</script>
