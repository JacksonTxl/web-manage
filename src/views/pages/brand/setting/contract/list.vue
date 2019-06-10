<template>
  <st-panel app :class="bPage()">
    <a-row :gutter="24">
      <a-col :xl="8" :xxl="6" :xs="12" v-for="item in list" :key="item.id">
        <div :class="bItem()">
          <div :class="bItem('body')">
            <div :class="bItem('body-lt')">
              <st-initials-tag
                :value="item.contract_title.indexOf('储物柜') > -1 ? '柜' : item.contract_title"
              />
            </div>
            <div :class="bItem('body-rt')">
              <div :class="bItem('title-box')">
                <st-t3 :class="bItem('title')">{{item.contract_title}}</st-t3>
                <div :class="bItem('status',{success:isInitial(item),warning:!isInitial(item)})">
                  <a-badge :status="isInitial(item)?'success':'warning'"></a-badge>
                  {{item.is_initialize_status | enumFilter('setting.is_initialize_status')}}
                </div>
              </div>
              <p :class="bItem('desc')">{{item.contract_describe}}</p>
            </div>
          </div>
          <div :class="bItem('footer')">
            <template v-if="isInitial(item)">
              <!-- <router-link :class="bItem('action')" to="/" class="st-link-secondary">查看</router-link>
              <div :class="bItem('divider')"></div> -->
              <router-link
                :class="bItem('action')"
                :to="{path:'./edit',query:{id:item.id}}"
                class="st-link-secondary"
              >编辑</router-link>
            </template>
            <template v-else>
            <router-link
              :class="bItem('action')"
              :to="{path:'./edit',query:{id:item.id}}"
              class="st-link-secondary"
            >去设置</router-link>
            </template>
          </div>
        </div>
      </a-col>
    </a-row>
    <h3 v-if="!list.length">无任何合同模版123</h3>
  </st-panel>
</template>
<script>
import { ListService } from './list.service'
import { UserService } from '@/services/user.service'
export default {
  bem: {
    bPage: 'page-brand-setting-contract-list',
    bItem: 'contract-item'
  },
  serviceInject() {
    return {
      listService: ListService,
      userService: UserService
    }
  },
  rxState() {
    /**
     * @type {UserService}
     */
    const user = this.userService
    return {
      list: this.listService.list$
    }
  },
  methods: {
    isInitial(item) {
      return !!item.is_initialize_status
    }
  }
}
</script>
