<template>
  <div>
    <st-panel app>
      <p>
        <a v-modal-link="{ name: 'brand-switch' }">切换品牌</a>
      </p>
      <p>
        <a href="javascript: void(0);" @click="switchShop">切换门店</a>
      </p>
      <select-shop @change="onSelectShop"></select-shop>
      <select-shop @change="onSelectShop2" disabled></select-shop>
      <p class="mg-t32">
        <router-link to="/brand/product/course/personal/add">
          添加品牌私教课
        </router-link>
        <router-link
          class="mg-l8"
          to="/shop/product/course/manage/personal/add"
        >
          添加门店私教课
        </router-link>
      </p>
      <p class="mg-t8">
        <router-link to="/brand/product/course/team/add">
          添加品牌团体课
        </router-link>
        <router-link class="mg-l8" to="/shop/product/course/manage/team/add">
          添加门店团体课
        </router-link>
      </p>
      <p class="mg-t8">
        <router-link to="/brand/setting/general/course-category">
          课程类型设置
        </router-link>
        <router-link class="mg-l8" to="/brand/setting/general/coach-level">
          教练等级
        </router-link>
        <router-link class="mg-l8" to="/brand/setting/general/skillful">
          擅长项目
        </router-link>
        <router-link class="mg-l8" to="/brand/setting/general/training-aim">
          训练目的
        </router-link>
      </p>
      <p class="mg-t8">
        <router-link to="/brand/setting/app">应用设置</router-link>
        <router-link class="mg-l8" to="/brand/setting/general">
          通用设置
        </router-link>
      </p>
      <p class="mg-t8">
        <a v-modal-link="{ name: 'brand-setting-team-reserve' }">
          团体课程预约设置
        </a>
        <a
          class="mg-l8"
          v-modal-link="{ name: 'brand-setting-personal-reserve' }"
        >
          私教课课程预约设置
        </a>
        <a
          class="mg-l8"
          v-modal-link="{ name: 'brand-setting-personal-price-model' }"
        >
          私教课程定价设置
        </a>
        <router-link class="mg-l8" to="/brand/setting/app/pay-type">
          支付方式设置
        </router-link>
      </p>
      <p>
        <st-input-search v-model="query.keyword" @search="onSearch" />
        <st-button class="mg-t16" @click="onSearch">search</st-button>
      </p>
      <st-form-table :page="page" @change="onPageChange" hoverable>
        <thead>
          <tr>
            <th>
              标题1
              <st-help-tooltip :id="1" />
            </th>
            <th>
              标题2
              <st-help-tooltip :id="2" />
            </th>
            <th>标题3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3" style="padding: 8px 0">
              <st-button type="dashed" icon="add" block>添加梯度</st-button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </tbody>
      </st-form-table>

      <st-form-table
        :page="{ current_page: 1, size: 20, total_counts: 0, total_pages: 0 }"
        class="mg-t24"
      >
        <thead>
          <tr>
            <th>A</th>
            <th>B</th>
          </tr>
        </thead>
      </st-form-table>

      <p class="mg-t24">
        <a
          href="javascript: void(0)"
          v-modal-link="{ name: 'test-tl', props: { name: 'lucy', age: 18 } }"
        >
          modal test
        </a>
      </p>
      <p class="mg-t24 st-des">
        文字
      </p>
      <st-pagination :page="page" @change="onPageChange"></st-pagination>
      <a-select
        mode="multiple"
        placeholder="please select"
        style="width: 200px;"
        class="mg-t24"
        @change="onMultiChange"
      >
        <a-select-option key="这个">这个</a-select-option>
        <a-select-option key="abc">abc</a-select-option>
        <a-select-option :key="2">2</a-select-option>
        <a-select-option :key="12">12</a-select-option>
      </a-select>

      <div>
        <st-icon type="department"></st-icon>
      </div>
      <p>
        <img :src="pic1" alt="" />
      </p>
      <p>
        {{ des }}
        <st-textarea
          :autosize="{ minRow: 2, maxRow: 5 }"
          v-model="des"
          maxlength="5"
        ></st-textarea>
      </p>
      <p>shop: {{ shop }}</p>
      <p>brand: {{ brand }}</p>
      <button @click="setA">1</button>
    </st-panel>
    <st-panel
      :tabs="[
        {
          label: '私教设置',
          route: { name: 'brand-setting-general-course-personal' }
        },
        {
          label: '团课设置',
          route: { name: 'brand-setting-general-course-team' }
        }
      ]"
    >
      <router-view></router-view>
    </st-panel>
    <switch-shop v-model="isShowSwitchShop"></switch-shop>
  </div>
</template>

<script>
import { TlService } from '@/views/pages/test/tl.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
import { Action } from 'rx-state'
import { switchMap, catchError, filter } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import SwitchShop from '@/views/fragments/shop/switch'
import SelectShop from '@/views/fragments/shop/select-shop'
import pic1 from '@/assets/img/avatar_default.png'
import { UserService } from '@/services/user.service'
import BrandSettingPersonalPriceModel from '@/views/biz-modals/brand/setting/personal/price-model'
import BrandSettingPersonalReserve from '@/views/biz-modals/brand/setting/personal/reserve'
import BrandSettingTeamReserve from '@/views/biz-modals/brand/setting/team/reserve'
import BrandSwitch from '@/views/biz-modals/brand/switch'
export default {
  serviceInject() {
    return {
      messageService: MessageService,
      tlService: TlService,
      routeService: RouteService,
      userService: UserService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      shop: this.userService.shop$,
      brand: this.userService.brand$
    }
  },
  modals: {
    BrandSettingPersonalPriceModel,
    BrandSettingPersonalReserve,
    BrandSettingTeamReserve,
    BrandSettingWechatPayment,
    BrandSwitch
  },
  components: {
    SwitchShop,
    SelectShop
  },
  data() {
    return {
      isShowSwitchShop: false,
      shopIds: [1],
      page: {
        current_page: 1,
        size: 20,
        total_counts: 6,
        total_pages: 1
      },
      pic1,
      des: 'qq'
    }
  },
  methods: {
    switchShop() {
      this.isShowSwitchShop = true
    },
    onSelectShop(shopIds) {
      console.log('your selected', shopIds)
    },
    onSelectShop2(shopIds) {
      console.log('your selected2', shopIds)
    },
    onSearch() {
      console.log('query', this.query)
      this.$router.push({
        query: this.query
      })
    },
    onPageChange(page, pageSize) {
      console.log(page, pageSize)
    },
    onMultiChange(val) {
      console.log('mul select changed', val)
    },
    setA() {
      this.des = '1111'
    }
  }
}
</script>
