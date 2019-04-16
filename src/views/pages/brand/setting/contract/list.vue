<template>
  <st-panel app :class="bPage()">
    <a-row :gutter="24">
      <a-col :xl="8" :xxl="6" :xs="12" v-for="tpl in list" :key="tpl.id">
        <div :class="bItem()">
          <div :class="bItem('body')">
            <div :class="bItem('body-lt')">
              <a :class="bItem('logo-link')" href="#">
                <img :class="bItem('logo-img')" src="a.png" alt="brand-logo">
              </a>
            </div>
            <div :class="bItem('body-rt')">
              <div :class="bItem('title-box')">
                <st-t3 :class="bItem('title')">{{tpl.contract_title}}</st-t3>
                <div
                  :class="bItem('status',{success:tpl.is_initialize_status,warning:!tpl.is_initialize_status})"
                >
                  <a-badge :status="tpl.is_initialize_status?'success':'warning'"></a-badge>
                  {{tpl.is_initialize_status?'已设置':'待设置'}}
                </div>
              </div>
              <p :class="bItem('desc')">{{tpl.desc}}</p>
            </div>
          </div>
          <div :class="bItem('footer')">
            <router-link :class="bItem('action')" to="/" class="st-link-secondary">查看</router-link>
            <div :class="bItem('divider')"></div>
            <router-link
              :class="bItem('action')"
              :to="{path:'./edit',query:{id:tpl.id}}"
              class="st-link-secondary"
            >编辑</router-link>
          </div>
        </div>
      </a-col>
    </a-row>
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
  }
}
</script>
