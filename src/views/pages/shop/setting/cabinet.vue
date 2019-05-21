<template>
  <div :class="b()">
    <div :class="b('nav')">
      <st-t4 class="mg-l16">中山公园旗舰店</st-t4>
      <ul class="mg-t8">
        <li :class="b('nav-item')">
          <span>男更衣室(40)</span>
          <st-more-dropdown>
            <a-menu-item>编辑</a-menu-item>
            <a-menu-item>删除</a-menu-item>
          </st-more-dropdown>
        </li>
        <li :class="b('nav-item')">
          <span>男更衣室(40)</span>
          <st-more-dropdown>
            <a-menu-item>编辑</a-menu-item>
            <a-menu-item>删除</a-menu-item>
          </st-more-dropdown>
        </li>
      </ul>
    </div>
    <st-panel
        :class="b('content')"
        :tabs="[
          { label: '临时储物柜', route: { name: 'shop-setting-cabinet-temporary' } },
          { label: '长期储物柜', route: { name: 'shop-setting-cabinet-long-term' } }
        ]"
      >
        <div slot="actions">
          <st-button icon="edit">编辑</st-button>
          <st-button icon="recycle-bin" class="mg-l8 color-warning">删除</st-button>
          <st-button type="primary" class="mg-l8">批量添加储物柜</st-button>
        </div>
      <router-view></router-view>
    </st-panel>
  </div>
</template>
<script>
export default {
  bem: {
    b: 'page-setting-cabinet'
  }
}
</script>
