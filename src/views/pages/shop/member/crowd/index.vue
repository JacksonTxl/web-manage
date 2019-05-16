<template>
  <div>
    <div class="shop-member-crowd-index">
      <div class="shop-member-crowd-index-title">
        <div style=" padding: 32px 28px 0 32px;">
          <div class="shop-member-crowd-index__item">
            <img
              src="http://n.sinaimg.cn/sinacn14/39/w480h359/20181013/e040-hmivixm5109047.jpg"
              alt="ccccc"
              class="shop-member-crowd-index__img"
            >
            <div class="shop-member-crowd-index__info">
              <st-t4 class="shop-member-crowd-index__info__title">新注册用户</st-t4>
              <div>近7天内，新注册的潜在用户</div>
            </div>
          </div>
          <div class="shop-member-crowd-index__num">
            <div class="shop-member-crowd-index__num-item">
              <div style="margin-bottom: 16px;">10</div>
              <div>人群总数</div>
            </div>
            <div class="shop-member-crowd-index__num-item">
              <div style="margin-bottom: 16px;">10</div>
              <div>人群总数</div>
            </div>
            <div class="shop-member-crowd-index__num-item">
              <div style="margin-bottom: 16px;">10</div>
              <div>人群总数</div>
            </div>
          </div>
        </div>
        <div style="height: 40px;background:rgba(247,249,252,1);">
          <span
            style="height:24px;line-height: 24px;display: inline-block;width:50%;margin:8px 0;text-align: center;border-right:1px solid rgba(230,233,239,1);"
          >人群分析</span>
          <span
            style="height:24px;line-height: 24px;display: inline-block;width:50%;margin:8px 0;text-align: center;"
          >
            <a-dropdown>
              <span class="ant-dropdown-link" href="#">
                定向运营
                <a-icon type="down"/>
              </span>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">1st menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">2nd menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">3rd menu item</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </div>
      </div>
      <div class="shop-member-crowd-index-title" style="margin:0 12px;">1</div>
      <div class="shop-member-crowd-index-title">1</div>
    </div>
    <st-panel>
      <div slot="title">
        <st-button type="primary">新建人群</st-button>
        <span class="shop-member-crowd-index-new__crowb_num" style>新建人群数量最多10个</span>
      </div>content
    </st-panel>
  </div>
</template>
