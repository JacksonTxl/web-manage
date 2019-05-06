<template>
  <div class="shop-member-info">
    <st-panel class="shop-member-info-title">
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="shop-member-info-title-pannel">
            <div class="shop-member-info-title-pannel__img">
              <div class="img-box">
                <img
                  class="img-url"
                  src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=234634259,4236876085&fm=27&gp=0.jpg"
                  alt
                >
                <span class="img-describe">正式会员</span>
              </div>
              <div class="input-face">
                <a href="javascript:;">
                  <a-icon type="plus"/>录入人脸
                </a>
              </div>
            </div>

            <div class="shop-member-info-title-pannel__info">
              <st-t2>积分</st-t2>
              <div class="shop-member-info-title-pannel__info__phone">
                <div>
                  手机号:
                  <span>1888888888</span>
                </div>
                <div class="line"></div>
                <div>
                  首次成为会员时间:
                  <span>1888888888</span>
                </div>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel
      :tabs="[
          { label: '用户资料', route: { name: 'shop-member-info-basic' } },
          { label: '员工跟进', route: { name: 'shop-member-info-follow-history' }},
          { label: '预约上课', route: { name: 'shop-member-info-reserve' } },
          { label: '卡课消费', route: { name: 'shop-member-info-sold' } },
          { label: '销售权益', route: { name: 'shop-member-info-sales-interests' } },
          { label: '用户体验', route: { name: 'shop-member-info-user-experience' } },
        ]"
    >
      <div slot="actions"></div>
      <router-view></router-view>
    </st-panel>
  </div>
</template>

<script>
export default {
  name: 'list',
  data() {
    return {}
  },
  methods: {}
}
</script>
