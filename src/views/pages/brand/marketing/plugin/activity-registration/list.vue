<template>
  <div :class="bPage()">
    <header :class="bPage('header')" class="mg-b16">
      <div class="header">
        <div class="header__left">
          <st-t3 class="header__title">活动报名</st-t3>
          <p class="header__content">
            提供多种优惠券发放方式。
            <br />
            包括进店有礼、支付有礼等。
          </p>
          <ul class="header__link">
            <li class="mg-r16"><a>规则说明</a></li>
            <li class="mg-r16"><a>使用教程</a></li>
            <li class="mg-r16"><a>活动案例</a></li>
          </ul>
        </div>
        <div class="header__right">
          <div
            class="st-preview-item mg-r24"
            v-for="(item, index) in plugin_image"
            :key="index"
          >
            <img
              :src="item | imgFilter({ w: 80, h: 142 })"
              :data-src="item | imgFilter({ w: 1000 })"
            />
          </div>
        </div>
      </div>
    </header>
    <st-panel :class="bPage('content')">
      <div slot="title" :class="bSearch()">
        <div :class="bSearch('button-group')">
          <st-button
            @click="onClickRouterPush({ pathName: 'addActivity' })"
            icon="add"
            type="primary"
          >
            新增活动
          </st-button>
          <st-button
            @click="onClickRouterPush({ pathName: 'checkinActivity' })"
            class="mg-l16"
          >
            签到验票
          </st-button>
        </div>
        <div :class="bSearch('input-group')">
          <a-select
            placeholder="请选择优惠券状态"
            @change="onSingleSearch('coupon_status', $event)"
            class="mg-r16"
            style="width: 160px"
          ></a-select>
          <st-input-search
            @search="onSingleSearch('coupon_name', $event)"
            placeholder="请输入优惠券名称"
            style="width: 290px;"
          />
        </div>
      </div>
      <st-table
        :page="page$"
        rowKey="id"
        :columns="columns"
        @change="onTableChange"
        :scroll="{ x: 1500 }"
        :dataSource="list$"
      >
        <template slot="action" slot-scope="text, record">
          <st-table-actions>
            <a @click="onClickEdit({ record, pathName: 'editActivity' })">
              编辑
            </a>
            <a @click="onCLickGeneralize(record)">
              推广
            </a>
            <a @click="onClickNameList({ record, pathName: 'editActivity' })">
              名单
            </a>
            <a @click="onClickCopy(record)">
              复制
            </a>
            <a @click="onClickStop(record)">
              结束
            </a>
          </st-table-actions>
        </template>
      </st-table>
    </st-panel>
  </div>
</template>

<script>
// table
import tableMixin from '@/mixins/table.mixin'
import { ListService } from './list.service'
import { columns } from './list.config'
import { RouteService } from '@/services/route.service'

// modal
export default {
  name: 'acti',
  mixins: [tableMixin],
  bem: {
    bPage: 'page-plugin-activity-registration',
    bSearch: 'search'
  },
  data() {
    return {
      plugin_image: [
        'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/img-lottery-preview-1.png',
        'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/img-lottery-preview-2.png',
        'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/img-lottery-preview-2.png',
        'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/img-lottery-preview-3.png'
      ],
      redirectPath: {
        addActivity: 'brand-marketing-plugin-activity-registration-add',
        editActivity: 'brand-marketing-plugin-activity-registration-edit',
        checkinActivity: 'brand-marketing-plugin-activity-registration-checkin'
      }
    }
  },
  serviceInject() {
    return {
      service: ListService,
      routeService: RouteService
    }
  },
  rxState() {
    const { page$, list$ } = this.service
    return {
      query: this.routeService.query$,
      page$,
      list$
    }
  },
  computed: {
    columns
  },
  methods: {
    onClickRouterPush({ record, pathName }) {
      this.$router.push({ name: this.redirectPath[pathName] })
    },
    onClickEdit({ record, pathName }) {
      this.$router.push({ name: this.redirectPath[pathName] })
    },
    onCLickGeneralize({ record, pathName }) {},
    onClickNameList({ record, pathName }) {},
    onClickStop({ record, pathName }) {},
    onClickCopy({ record, pathName }) {}
  }
}
</script>
