<template>
  <st-panel app title="共3个场地" :class="bPage()">
    <draggable tag="a-row" :component-data="{props:{gutter:24}}" v-model="list" :animation="200">
      <a-col :xl="8" :xxl="6" :xs="12" v-for="item in list" :key="item.id">
        <div :class="bItem()">
          <div :class="bItem('body')">
            <div :class="bItem('body-lt')">
              <div :class="bItem('tag')">动</div>
            </div>
            <div :class="bItem('body-rt')">
              <div :class="bItem('title-box')">
                <st-t3 :class="bItem('title')">动感单车房</st-t3>
                <img :class="bItem('level-img')" src="~@/assets/img/icon_vip.png" alt="icon_vip">
              </div>
              <div :class="bItem('content-box')">
                <div :class="bItem('content-item')">
                  <label :class="bItem('label')">容纳人数</label>
                  <p :class="bItem('text')">
                    {{item.count}}
                    <span :class="bItem('sub-text')">人</span>
                  </p>
                </div>
                <div :class="bItem('content-item')">
                  <label :class="bItem('label')">容纳人数</label>
                  <p :class="bItem('text')">
                    4
                    <span :class="bItem('sub-text')">个</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div :class="bItem('footer')">
            <router-link :class="bItem('action')" to="/" class="st-link-secondary">设置座位</router-link>
            <div :class="bItem('divider')"></div>
            <router-link
              :class="bItem('action')"
              :to="{path:'./edit',query:{id:bItem.id}}"
              class="st-link-secondary"
            >编辑</router-link>
          </div>
        </div>
      </a-col>
      <a-col :xl="8" :xxl="6" :xs="12">
        <div @click="onAddCourt" class="court-add">
          <a-icon type="plus"></a-icon>
          <span class="mg-l8">添加场地</span>
        </div>
      </a-col>
    </draggable>
  </st-panel>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  bem: {
    bPage: 'page-shop-setting-court-list',
    bItem: 'court-item',
    bAdd: 'court-add'
  },
  data() {
    return {
      list: [
        {
          id: 1,
          count: 1
        },
        {
          id: 2,
          count: 2
        },
        {
          id: 3,
          count: 3
        },
        {
          id: 4,
          count: 4
        },
        {
          id: 5,
          count: 5
        },
        {
          id: 6,
          count: 6
        }
      ]
    }
  },
  methods: {
    onAddCourt() {
      console.log('click')
      this.$modalRouter.push({
        name: 'court-add'
      })
    }
  }
}
</script>
