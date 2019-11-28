<template>
  <st-panel-layout class="shop-member-crowd-index">
    <index
      v-model="crowdIndexInfo.important_crowd"
      v-if="crowdIndexInfo.important_crowd.length > 0"
    ></index>
    <st-panel app>
      <div slot="title">
        <router-link
          :to="{ name: 'brand-marketing-plugin-crowd-add' }"
          v-if="crowdIndexList.length <= 10"
        >
          <st-button type="primary" v-if="auth.add">
            <a-icon type="plus" />
            新建人群
          </st-button>
        </router-link>
        <st-button
          v-else
          type="primary"
          @click="newCrowd('人群数量已达到上限！')"
        >
          新建人群
        </st-button>

        <span class="shop-member-crowd-index-new__crowb_num">
          新建人群数量最多10个
        </span>
      </div>
      <st-table
        rowKey="id"
        :loading="loading.getListInfo"
        :dataSource="crowdIndexList"
        :columns="columns"
        :pagination="false"
      >
        <template slot="description" slot-scope="text">
          <div>
            <st-overflow-text
              max-width="300px"
              :value="text"
            ></st-overflow-text>
          </div>
        </template>
        <div slot="action" slot-scope="text, record">
          <st-table-actions>
            <st-more-dropdown>
              <span slot="title">定向运营</span>
              <a-menu-item style="width:130px">
                <a
                  v-if="record.auth['shop:member:crowd|export']"
                  v-export-excel="{
                    type: 'crowd/' + record.id,
                    query: record
                  }"
                >
                  导出
                </a>
              </a-menu-item>
              <a-menu-item style="width:130px">
                <a
                  v-modal-link="{
                    name: 'brand-setting-sms-group',
                    props: {
                      crowd: { user_type: 2, send_value: record.id }
                    }
                  }"
                >
                  群发短信
                </a>
              </a-menu-item>
              <a-menu-item style="width:130px">
                <a
                  href="javascript:;"
                  @click="newCrowd('功能正在开发中，敬请期待')"
                >
                  群发优惠
                </a>
              </a-menu-item>
            </st-more-dropdown>
            <router-link
              v-if="record.auth['shop:member:crowd|edit']"
              :to="{
                name: 'brand-marketing-plugin-crowd-add',
                query: { id: record.id }
              }"
            >
              编辑
            </router-link>
            <st-popconfirm
              v-if="record.auth['shop:member:crowd|del']"
              @confirm="deleteTreeNode(record)"
            >
              <a>删除</a>
            </st-popconfirm>
          </st-table-actions>
        </div>
      </st-table>
    </st-panel>
  </st-panel-layout>
</template>
<script>
import index from './components#/index'
import { IndexService } from './index.service'
import { MessageService } from '@/services/message.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './index.config'
import BrandSettingSmsGroup from '@/views/biz-modals/brand/setting/sms/group'

export default {
  mixins: [tableMixin],
  serviceInject() {
    return {
      indexService: IndexService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      loading: this.indexService.loading$,
      crowdIndexInfo: this.indexService.crowdIndexInfo$,
      crowdIndexList: this.indexService.crowdIndexList$,
      auth: this.indexService.auth$
    }
  },
  modals: {
    BrandSettingSmsGroup
  },
  data() {
    return {}
  },
  components: {
    index
  },
  computed: {
    columns
  },
  methods: {
    newCrowd(data) {
      this.messageService.warning({ content: data })
    },
    groupSMS(value) {
      console.log(value)
    },
    addTreeNode(value) {
      console.log(value)
    },
    refresh() {
      this.$router.reload()
    },
    deleteTreeNode(value) {
      this.indexService.delCrowdBrandCrowd(value.id).subscribe(res => {
        this.refresh()
      })
    }
  },
  mounted() {}
}
</script>
