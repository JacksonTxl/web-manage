<template>
  <div class="layout-skeleton--brand">
    <aside class="aside">
      <div class="h-1"></div>
      <div class="h-2"></div>
      <div class="h-3"></div>
    </aside>
    <main class="main">
      <header class="header">
        <div class="header__lt">
          <div class="header__h-1"></div>
        </div>
        <div class="header__rt">
          <div class="header__h-2"></div>
          <div class="header__h-3"></div>
        </div>
      </header>
      <article class="body">
        <div class="body__content">
          <a-row :gutter="12">
            <a-col :span="6">
              <tile-header></tile-header>
            </a-col>
            <a-col :span="6">
              <tile-header></tile-header>
            </a-col>
            <a-col :span="6">
              <tile-header></tile-header>
            </a-col>
            <a-col :span="6">
              <tile-header></tile-header>
            </a-col>
          </a-row>
          <a-row class="mg-t16">
            <tile-main></tile-main>
          </a-row>
          <a-row class="mg-t16" :gutter="12">
            <a-col :span="12">
              <tile-footer></tile-footer>
            </a-col>
            <a-col :span="12">
              <tile-footer></tile-footer>
            </a-col>
          </a-row>
        </div>
        <div class="body__sider">
          <tile-sider-1></tile-sider-1>
          <tile-sider-2 class='mg-t16'></tile-sider-2>
          <tile-sider-3 class='mg-t16'></tile-sider-3>
          <tile-sider-4 class='mg-t16'></tile-sider-4>
          <tile-sider-5 class='mg-t16'></tile-sider-5>
        </div>
      </article>
    </main>
  </div>
</template>

<script>
import TileHeader from './brand#/tile-header.vue'
import TileMain from './brand#/tile-main.vue'
import TileFooter from './brand#/tile-footer.vue'
import TileSider1 from './brand#/tile-sider-1.vue'
import TileSider2 from './brand#/tile-sider-2.vue'
import TileSider3 from './brand#/tile-sider-3.vue'
import TileSider4 from './brand#/tile-sider-4.vue'
import TileSider5 from './brand#/tile-sider-5.vue'
export default {
  bem: {
    b: 'layout-skeleton'
  },
  components: {
    TileHeader,
    TileMain,
    TileFooter,
    TileSider1,
    TileSider2,
    TileSider3,
    TileSider4,
    TileSider5
  }
}
</script>
