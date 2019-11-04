<template>
  <div class="shop-member-crowd-index">
    <index
      v-model="crowdIndexInfo.info.important_crowd"
      v-if="crowdIndexInfo.info.important_crowd.length > 0"
    ></index>
    <st-panel>
      <div slot="title">
        <router-link
          :to="{ name: 'shop-member-crowd-add' }"
          v-if="crowdIndexInfo.info.list.length <= 10"
        >
          <st-button type="primary" v-if="auth.add" icon="add">
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
        :dataSource="crowdIndexInfo.info.list"
        :columns="columns"
        @change="onChange"
        :page="false"
      >
        <st-overflow-text
          slot="description"
          slot-scope="text"
          max-width="300px"
        >
          {{ text }}
        </st-overflow-text>
        <div slot="actions" slot-scope="text, record">
          <st-table-actions>
            <a
              v-if="record.auth['shop:member:crowd|export']"
              v-export-excel="{ type: 'crowd/' + record.id, query: record }"
            >
              导出
            </a>
            <router-link
              v-if="record.auth['shop:member:crowd|edit']"
              :to="{
                name: 'shop-member-crowd-add',
                query: { id: record.id }
              }"
            >
              编辑
            </router-link>
            <a
              v-if="record.auth['shop:member:crowd|del']"
              @click="deleteTreeNode(record)"
            >
              删除
            </a>
          </st-table-actions>
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
  serviceInject() {
    return {
      aService: IndexService,
      messageService: MessageService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      crowdIndexInfo: this.aService.crowdIndexInfo$,
      query: this.routeService.query$,
      auth: this.aService.auth$
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
    onChange(pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter, data)
    },
    groupSMS(value) {
      console.log(value)
    },
    addTreeNode(value) {
      console.log(value)
    },
    refresh() {
      this.$router.push({ query: {} })
    },
    deleteTreeNode(value) {
      this.aService.delCrowdBrandCrowd(value.id).subscribe(res => {
        this.refresh()
      })
    }
  },
  mounted() {}
}
</script>
