<template>
  <div class="shop-member-crowd-index">
    <index
      v-model="crowdIndexInfo.important_crowd"
      v-if="crowdIndexInfo.important_crowd.length > 0"
    ></index>
    <st-panel>
      <div slot="title">
        <router-link
          tag="a"
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
        :dataSource="crowdIndexList"
        :columns="columns"
        :pagination="false"
      >
        <div slot="action" slot-scope="text, record">
          <st-table-actions>
            <a-dropdown placement="bottomRight">
              <a class="ant-dropdown-link" href="#">定向运营</a>
              <a-menu slot="overlay">
                <!-- NOTE: 导出 -->
                <!-- <a-menu-item style="width:130px">
                <a href="javascript:;">导出</a>
              </a-menu-item> -->
                <a-menu-item style="width:130px">
                  <a
                    href="javascript:;"
                    @click="newCrowd('功能正在开发中，敬请期待')"
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
              </a-menu>
            </a-dropdown>
            <!-- NOTE: 导出 -->
            <!-- <a v-if="record.auth['shop:member:crowd|export']" @click="addTreeNode(record)">导出</a> -->
            <router-link
              v-if="record.auth['shop:member:crowd|edit']"
              tag="a"
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
              <a href="javascript:;">
                删除
              </a>
            </st-popconfirm>
          </st-table-actions>
          <!-- <st-more-dropdown class="tree-opreation">
            <a-menu-item v-if="record.auth['shop:member:crowd|export']" @click="addTreeNode(record)">导出</a-menu-item>
            <a-menu-item>
              <router-link v-if="record.auth['shop:member:crowd|edit']" tag="a" :to=" { name: 'brand-markting-plugin-crowd-add',query:{id:record.id}}">编辑</router-link>
            </a-menu-item>
            <a-menu-item v-if="record.auth['shop:member:crowd|del']" @click="deleteTreeNode(record)">删除</a-menu-item>
          </st-more-dropdown> -->
        </div>
        <div
          slot="description"
          slot-scope="text"
          style="width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
        >
          <a-tooltip
            placement="topLeft"
            overlayClassName="shop-member-crowd-index-tooltip"
          >
            <template slot="title">
              <span>{{ text }}</span>
            </template>
            {{ text }}
          </a-tooltip>
        </div>
      </st-table>
    </st-panel>
  </div>
</template>
<script>
import index from './components#/index'
import { IndexService } from './index.service'
import { MessageService } from '@/services/message.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './index.config'
export default {
  mixins: [tableMixin],
  serviceProviders() {
    return [IndexService]
  },
  serviceInject() {
    return {
      indexService: IndexService,
      messageService: MessageService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      crowdIndexInfo: this.indexService.crowdIndexInfo$,
      crowdIndexList: this.indexService.crowdIndexList$,
      auth: this.indexService.auth$,
      query: this.routeService.query$
    }
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
      this.$router.push({ force: true })
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
