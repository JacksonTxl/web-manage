<template>
  <st-panel :class="bPage()">
    <div slot="title">
      <st-input-search
        placeholder="输入用户姓名、手机号"
        v-model="query.keyword"
        @search="onKeywordsSearch('keyword', $event)"
        style="width: 290px;"
      />
    </div>
    <div slot="prepend">
      <st-search-panel :class="bSearch()">
        <div :class="bSearch('radio')" class="mg-t24 search-item">
          <span class="label">预约类型:</span>
          <st-search-radio
            class="value"
            v-model="query.reserve_type"
            @change="onSingleSearch('reserve_type', $event)"
            :list="reserveType$"
          />
        </div>
        <div :class="bSearch('range-picker')" class="mg-t24 search-item">
          <span class="label">预约时间：</span>
          <st-range-picker class="value"></st-range-picker>
        </div>
        <!-- <div :class="basic('select')">
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
        到访预约
      </st-button>
    </div>
    <st-table
      :columns="columns"
      :scroll="{ x: 1400 }"
      rowKey="id"
      :page="page$"
      @change="onTableChange"
      :dataSource="list$"
    >
      <span slot="reserve_type" slot-scope="text">{{ text.name }}</span>
      <span slot="reserve_status" slot-scope="text">{{ text.name }}</span>
      <div slot="action" slot-scope="text, record">
        <st-table-actions v-if="record.reserve_type.id === 1">
          <a>取消</a>
          <a>签到</a>
        </st-table-actions>
        <st-table-actions v-if="record.reserve_type.id === 2">
          <a>取消</a>
          <a>预约到访</a>
        </st-table-actions>
      </div>
    </st-table>
  </st-panel>
</template>
<script>
// import moment from 'moment'
// import { cloneDeep, filter } from 'lodash-es'
// import { UserService } from '@/services/user.service'
// import { ListService } from './list.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { ReserveService } from './reserve.service'
import { columns } from './reserve.config.ts'
// import { columns } from './list.config'
// import ShopAddLable from '@/views/biz-modals/shop/add-lable'
// import ShopBindingEntityCard from '@/views/biz-modals/shop/binding-entity-card'
// import ShopDistributionCoach from '@/views/biz-modals/shop/distribution-coach'
// import ShopDistributionSale from '@/views/biz-modals/shop/distribution-sale'
// import ShopFrozen from '@/views/biz-modals/shop/frozen'
// import ShopMissingCard from '@/views/biz-modals/shop/missing-card'
export default {
  name: 'ReceptionReserve',
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-reception-reserve',
    bSearch: 'search'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      service: ReserveService
    }
  },
  rxState() {
    const { loading$, page$, list$, reserveType$ } = this.service
    return {
      query: this.routeService.query$,
      loading$,
      page$,
      list$,
      reserveType$
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
