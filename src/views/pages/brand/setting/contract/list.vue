<template>
  <st-panel app :class="bPage()">
    <a-row :gutter="24">
      <a-col :xl="8" :xxl="6" :xs="12" v-for="n in 13" :key="n">
        <div :class="bItem()">
          <div :class="bItem('body')">
            <div :class="bItem('body-lt')">
              <a :class="bItem('logo-link')" href="#">
                <img :class="bItem('logo-img')" src="a.png" alt="brand-logo">
              </a>
            </div>
            <div :class="bItem('body-rt')">
              <div :class="bItem('title-box')">
                <st-t3 :class="bItem('title')">会员卡合同模版</st-t3>
                <div :class="bItem('status',{success:true,warning:true})">
                  <a-badge status="warning"></a-badge>待设置
                </div>
              </div>
              <p :class="bItem('desc')">用户购买会员卡，即可查看或打印的会员卡合同,用户购买会员卡，即可查看或打印的会员卡合同</p>
            </div>
          </div>
          <div :class="bItem('footer')">
            <a :class="bItem('action')" href="javascript:;" class="st-link-secondary">查看</a>
            <div :class="bItem('divider')"></div>
            <a :class="bItem('action')" href="javascript:;" class="st-link-secondary">编辑</a>
          </div>
        </div>
      </a-col>
    </a-row>
  </st-panel>
</template>
<script>
export default {
  bem: {
    bPage: 'page-brand-setting-contract-list',
    bItem: 'contract-item'
  }
}
</script>
