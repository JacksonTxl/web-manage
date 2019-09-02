<template>
  <div :class="bPage()">
    <MarkteingPluginTitle :type="3" />
    <st-panel app>
      <a-row :gutter="24" class="mg-b16">
        <a-col :span="2">
          <router-link to="./add">
            <a-button type="primary">新建活动</a-button>
          </router-link>
        </a-col>
        <a-col :span="2">
          <router-link to="./checkin">
            <a-button>核销兑换码</a-button>
          </router-link>
        </a-col>
        <a-col :span="4" :offset="10">
          <a-select placeholder="活动状态" style="width:100%">
            <a-select-option
              v-for="(item, index) of status"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="6">
          <a-input-search placeholder="请输入活动名称"></a-input-search>
        </a-col>
      </a-row>
      <st-table
        :page="page"
        @change="onTableChange"
        :loading="loading.getActivityList"
        :columns="columns"
        :dataSource="list"
        rowKey="id"
      >
        <span slot="join_num" slot-scope="record">
          <router-link to="./info/user">
            {{ record.activity_join_num }}
          </router-link>
        </span>
        <span slot="prize_num" slot-scope="record">
          <router-link to="./info/user">
            {{ record.activity_prize_num }}
          </router-link>
        </span>
        <div slot="action" slot-scope="">
          <st-table-actions>
            <a>
              数据
            </a>
            <a>
              推广
            </a>
            <a>
              编辑
            </a>
            <a>
              结束
            </a>
          </st-table-actions>
        </div>
      </st-table>
    </st-panel>
  </div>
</template>
<script>
import { IndexService } from './index.service'
import MarkteingPluginTitle from '../../components#/marketing-title'
import { columns } from './index.config.ts'
import tableMixin from '@/mixins/table.mixin'

export default {
  name: 'PluginLotteryIndex',
  mixins: [tableMixin],
  data() {
    return {}
  },
  bem: {
    bPage: 'brand-marketing-plugin-lottery-index'
  },
  serviceInject() {
    return {
      indexService: IndexService
    }
  },
  rxState() {
    return {
      list: this.indexService.list$,
      page: this.indexService.page$,
      loading: this.indexService.loading$,
      status: this.indexService.status$
    }
  },
  components: {
    MarkteingPluginTitle
  },
  computed: {
    columns
  }
}
</script>
