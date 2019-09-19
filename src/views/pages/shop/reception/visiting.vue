<template>
  <div class="shop-member-list">
    <st-panel>
      <div slot="title">
        <st-input-search
          placeholder="输入用户姓名、手机号"
          v-model="query.keyword"
          @search="onKeywordsSearch('keyword', $event)"
          style="width: 290px;"
        />
      </div>
      <div slot="prepend">
        <st-search-panel>
          <!-- <div :class="basic('select')">
            <span style="width:90px;">用户级别：</span>
            <st-search-radio v-model="query.member_level" :list="memberLevel" />
          </div>
          <div :class="basic('select')">
            <span style="width:90px;">来源方式：</span>
            <st-search-radio
              :class="basic('select-radio')"
              v-model="query.register_way"
              :list="sourceList"
            />
          </div>
          <div :class="basic('select')">
            <span style="width:90px;">注册时间：</span>
            <st-range-picker
              :disabledDays="180"
              :value="selectTime"
            ></st-range-picker>
          </div>
          <div slot="more">
            <div :class="basic('select')">
              <span style="width:90px;">入会时间：</span>
              <st-range-picker
                :disabledDays="180"
                :value="selectMemberTime"
              ></st-range-picker>
            </div>
            <div :class="basic('select')">
              <span style="width:90px;">员工跟进：</span>
              <st-search-radio v-model="query.is_follow" :list="isFollow" />
            </div>
          </div>
          <div slot="button">
            <st-button
              type="primary"
              @click="onSearchNative"
              :loading="loading.getListInfo"
            >
              查询
            </st-button>
            <st-button class="mg-l8" @click="onSearhReset">重置</st-button>
          </div> -->
        </st-search-panel>
      </div>
      <div class="mg-t24 mg-b16">
        <st-button type="primary" class="shop-member-list-button" icon="add">
          添加用户
        </st-button>
      </div>
      <st-table
        :columns="columns"
        :scroll="{ x: 1400 }"
        rowKey="member_id"
        :page="page$"
        @change="onTableChange"
        :dataSource="list$"
      ></st-table>
    </st-panel>
  </div>
</template>
<script>
// import moment from 'moment'
// import { cloneDeep, filter } from 'lodash-es'
// import { UserService } from '@/services/user.service'
// import { ListService } from './list.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { VisitingService } from './visiting.service'
import { columns } from './visiting.config.ts'
// import { columns } from './list.config'
// import ShopAddLable from '@/views/biz-modals/shop/add-lable'
// import ShopBindingEntityCard from '@/views/biz-modals/shop/binding-entity-card'
// import ShopDistributionCoach from '@/views/biz-modals/shop/distribution-coach'
// import ShopDistributionSale from '@/views/biz-modals/shop/distribution-sale'
// import ShopFrozen from '@/views/biz-modals/shop/frozen'
// import ShopMissingCard from '@/views/biz-modals/shop/missing-card'
export default {
  name: 'Visiting',
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-reception-visiting',
    basic: 'psg'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      service: VisitingService
    }
  },
  rxState() {
    const { loading$, page$, list$ } = this.service
    return {
      query: this.routeService.query$,
      loading$,
      page$,
      list$
    }
  },
  data() {
    return {}
  },
  computed: {
    columns
  }
}
</script>
