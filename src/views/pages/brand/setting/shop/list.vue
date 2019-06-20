<template>
  <st-panel>
    <a-row>
      <a-col :span="8">
        <router-link to="./add">
          <st-button v-if="auth.add" type="primary" icon="add">新增门店</st-button>
          <span class="st-des mg-l8">（已开店{{count.count_opened}}家门店/可开店{{count.count_can_opened}}家门店）</span>
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
          <th style="width: 120px">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(shop, index) in shopList" :key="index">
          <td>{{shop.shop_name}}</td>
          <td>{{shop.shop_phones}}</td>
          <td>{{shop.address}}</td>
          <td>
            {{shop.shop_status | enumFilter('shop.shop_status')}}
            <st-help-popover v-if="shop.auth['brand_shop:shop:shop_holiday|get']" title="放假时间">
              <div slot="content">
                {{shop.holiday_start_time | dateFilter(appConfig.DATE_FORMAT.datetime)}}<br/>
                {{shop.holiday_end_time | dateFilter(appConfig.DATE_FORMAT.datetime)}}
              </div>
            </st-help-popover>
          </td>
          <td>{{shop.is_valid | enumFilter('shop.is_valid')}}</td>
          <td>{{shop.expire_time}}</td>
          <td>
            <router-link v-if="shop.auth['brand_shop:shop:shop|get']" :to="`./info?id=${shop.shop_id}`">详情</router-link>
            <router-link v-if="shop.auth['brand_shop:shop:shop|edit']" :to="`./edit?id=${shop.shop_id}`" class="mg-l8">编辑</router-link>
            <st-more-dropdown>
              <!-- 关店状态下不可以在saas中更改运营状态 -->
              <a-menu-item
                v-if="shop.auth['brand:shop:shop_type|edit']"
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
              <a-menu-item
                v-if="shop.auth['brand_shop:shop:shop_holiday|edit']"
                v-modal-link="{
                  name: 'brand-setting-shop-holiday',
                  props: {
                    shopId: shop.shop_id,
                    shopName: shop.shop_name,
                    shopStatus: shop.shop_status,
                    isHoliday: shop.has_holiday_setting,
                    holidayTime: {
                      start: shop.holiday_start_time,
                      end: shop.holiday_end_time
                    }
                  },
                  on: {
                    change: onListChange
                  }
                }"
              >
                {{shop.has_holiday_setting ? '管理' : ''}}门店放假
              </a-menu-item>
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
import { dateFilter } from '@/filters/date.filters'
import { AppConfig } from '@/constants/config'
export default {
  serviceInject() {
    return {
      userService: UserService,
      routeService: RouteService,
      listService: ListService,
      appConfig: AppConfig
    }
  },
  rxState() {
    return {
      shopEnums: this.userService.shopEnums$,
      query: this.routeService.query$,
      resData: this.listService.resData$,
      auth: this.listService.auth$
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
    },
    count() {
      return this.resData.brand_shop_count
    }
  },
  filters: {
    dateFilter
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
        query: Object.assign(this.query, query),
        force
      })
    },
    onListChange() {
      this.onQueryChange({}, true)
    }
  }
}
</script>
