<template>
  <st-panel>
    <a-row>
      <a-col :span="8">
        <router-link to="./add">
          <st-button type="primary" icon="add">新增门店</st-button>
          <span class="st-des mg-l8">（已开店4家门店/可开店6家门店）</span>
        </router-link>
      </a-col>
      <a-col :span="16" class="ta-r">
        <a-select :defaultValue="-1" @change="onShopStatusChange" style="width: 140px" >
          <a-select-option :value="-1">全部运营状态</a-select-option>
          <a-select-option
            v-for="(item, index) in shopStatusList"
            :key="index"
            :value="index"
          >
            {{item}}
          </a-select-option>
        </a-select>
        <a-select :defaultValue="-1" @change="onIsValidChange" style="width: 140px" class="mg-l8">
          <a-select-option :value="-1">全部系统状态</a-select-option>
          <a-select-option
            v-for="(item, index) in isValidList"
            :key="index"
            :value="index"
          >
            {{item}}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <st-form-table :page="page" @change="onPageChange" class="mg-t16">
      <thead>
        <tr>
          <th>门店名称</th>
          <th>联系电话</th>
          <th>详细地址</th>
          <th>运营状态</th>
          <th>系统状态</th>
          <th>系统使用到期时间</th>
          <th style="width: 180px">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(shop, index) in shopList" :key="index">
          <td>{{shop.shop_name}}</td>
          <td>{{shop.shop_phones}}</td>
          <td>{{shop.address}}</td>
          <td>
            {{shop.shop_status | enumFilter('shop.shop_status')}}
            <st-help-popover v-if="shop.is_holiday" title="放假时间">
              <div slot="content">
                {{shop.holiday_start_time}}<br/>
                {{shop.holiday_end_time}}
              </div>
            </st-help-popover>
          </td>
          <td>{{shop.is_valid | enumFilter('shop.is_valid')}}</td>
          <td>{{shop.expire_time}}</td>
          <td>
            <router-link :to="`./info?id=${shop.shop_id}`">详情</router-link>
            <router-link :to="`./edit?id=${shop.shop_id}`" class="mg-l8">编辑</router-link>
            <st-more-dropdown class="mg-l64">
              <a-menu-item
                v-modal-link="{
                  name: 'brand-setting-shop-status',
                  props: {
                    shopId: shop.shop_id,
                    shopName: shop.shop_name,
                    shopStatus: shop.shop_status
                  },
                  on: {
                    change: onListChange
                  }
                }"
              >
                更改运营状态
              </a-menu-item>
              <a-menu-item>管理门店放假</a-menu-item>
            </st-more-dropdown>
          </td>
        </tr>
      </tbody>
    </st-form-table>
  </st-panel>
</template>
<script>
import { UserService } from '@/services/user.service'
import { RouteService } from '@/services/route.service'
import { ListService } from './list.service'
export default {
  serviceInject() {
    return {
      userService: UserService,
      routeService: RouteService,
      listService: ListService
    }
  },
  rxState() {
    return {
      shopEnums: this.userService.shopEnums$,
      query: this.routeService.query$,
      resData: this.listService.resData$
    }
  },
  computed: {
    shopStatusList() {
      return this.shopEnums.shop_status.value || {}
    },
    isValidList() {
      return this.shopEnums.is_valid.value || {}
    },
    shopList() {
      return this.resData.list
    },
    page() {
      return this.resData.page
    }
  },
  methods: {
    onPageChange(pagination) {
      const page = pagination.current
      const size = pagination.pageSize
      this.onQueryChange({
        page,
        size
      })
    },
    onShopStatusChange(shopStatus) {
      this.onQueryChange({
        shop_status: shopStatus
      })
    },
    onIsValidChange(isValid) {
      this.onQueryChange({
        is_valid: isValid
      })
    },
    onQueryChange(query = {}, force = false) {
      this.$router.push({
        query: Object.assign(this.query, query)
      }, force)
    },
    onListChange() {
      this.onQueryChange({}, true)
    }
  }
}
</script>
