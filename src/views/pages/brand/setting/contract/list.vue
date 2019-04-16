<template>
  <st-panel app :class="bPage()">
    <a-row :gutter="24">
      <a-col :xl="8" :xxl="6" :xs="12" v-for="item in list" :key="item.id">
        <div :class="bItem()">
          <div :class="bItem('body')">
            <div :class="bItem('body-lt')">
              <a :class="bItem('logo-link')" href="#">
                <img :class="bItem('logo-img')" src="a.png" alt="brand-logo">
              </a>
            </div>
            <div :class="bItem('body-rt')">
              <div :class="bItem('title-box')">
                <st-t3 :class="bItem('title')">{{item.contract_title}}</st-t3>
                <div
                  :class="bItem('status',{success:isInitial(item),warning:!isInitial(item)})"
                >
                  <a-badge :status="isInitial(item)?'success':'warning'"></a-badge>
                  {{item.is_initialize_status.name}}
                </div>
              </div>
              <p :class="bItem('desc')">{{item.contract_describe}}</p>
            </div>
          </div>
          <div :class="bItem('footer')">
            <template v-if="item.is_initialize_status.id">
              <router-link :class="bItem('action')" to="/" class="st-link-secondary">查看</router-link>
              <div :class="bItem('divider')"></div>
              <router-link
                :class="bItem('action')"
                :to="{path:'./edit',query:{id:bItem.id}}"
                class="st-link-secondary"
              >编辑</router-link>
            </template>
            <template v-else>
              <router-link
                :class="bItem('action')"
                :to="{path:'./edit',query:{id:bItem.id}}"
                class="st-link-secondary"
              >去设置</router-link>
            </template>
          </div>
        </div>
      </a-col>
    </a-row>
    <h3 v-if="!list.length">无任何合同模版</h3>
  </st-panel>
</template>
<script>
import { ListService } from './list.service'
export default {
  bem: {
    bPage: 'page-brand-setting-contract-list',
    bItem: 'contract-item'
  },
  serviceInject() {
    return {
      listService: ListService
    }
  },
  subscriptions() {
    return {
      list: this.listService.list$
    }
  },
  computed: {
    isInitial(item) {
      return !!item.is_initialize_status.id
    }
  }
}
</script>
