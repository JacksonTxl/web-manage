<template>
  <div class="shop-member-info">
    <st-panel class="shop-member-info-title">
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="shop-member-info-title-pannel-left">
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
              <st-t2>孙乐乐</st-t2>
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
              <div class="label-list">
                <span class="lable-item">
                  胖子
                  <a-icon type="close"/>
                </span>
                <span class="lable-item">
                  快乐的小逗比一个
                  <a-icon type="close"/>
                </span>
                <span class="lable-item">
                  胖子
                  <a-icon type="close"/>
                </span>
              </div>
              <div class="add-lable">
                <span class="add-lable-item">
                  <a-icon type="plus"/>标签
                </span>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="shop-member-info-title-pannel-right">
            <div class="pannel-right__operation">
              <a-button type="primary" class="pannel-right__operation__margin">编辑资料</a-button>
              <a-button class="pannel-right__operation__margin">绑定实体卡</a-button>
              <a-select
                class="pannel-right__operation__margin"
                defaultValue="更多操作"
                style="width: 120px"
              >
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
            </div>
            <div class="pannel-right__operation">
              <div class="pannel-right__num__box">
                <span class="pannel-right__num">3</span>
                <span class="pannel-right__num__margin">/</span>
                <span>张</span>
                <p>有效会员卡</p>
              </div>
              <div class="pannel-right__num__box">
                <span class="pannel-right__num">3</span>
                <span class="pannel-right__num__margin">/</span>
                <span>张</span>
                <p>有效会员卡</p>
              </div>
              <div class="pannel-right__num__box">
                <span class="pannel-right__num">3</span>
                <span class="pannel-right__num__margin">/</span>
                <span>张</span>
                <p>有效会员卡</p>
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
