<template>
  <div>
    <st-more-dropdown class="mg-l64">
      <a-menu-item>转让</a-menu-item>
      <a-menu-item>出售</a-menu-item>
      <a-menu-item>你好</a-menu-item>
    </st-more-dropdown>
    <st-more-dropdown class="mg-l64" :value="true">
      <a-menu-item>1</a-menu-item>
      <a-menu-item>2</a-menu-item>
      <a-menu-item>3</a-menu-item>
    </st-more-dropdown>

    <st-more-dropdown class="mg-l64">
      <span slot="title">
        这是操作
      </span>
      <a-menu-item>1</a-menu-item>
      <a-menu-item>2</a-menu-item>
      <a-menu-item>3</a-menu-item>
    </st-more-dropdown>
  </div>
</template>
