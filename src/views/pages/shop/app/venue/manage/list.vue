<template>
  <div :class="site()">
    <portal-target slot="actions" name="SHOP_APP_VENUE_MANAGE"></portal-target>
    <a-row :class="site('header')">
      <a-col :span="12">
        <st-popconfirm
          :title="'一旦删除则无法恢复，确认删除？'"
          @confirm="delAll"
          v-if="auth.delAll"
        >
          <st-button class="mg-r8" :disabled="!selectedRowKeys.length">
            批量删除
          </st-button>
        </st-popconfirm>
        <st-button
          v-if="auth.addAll"
          class="mg-r8"
          @click="addAll"
          :disabled="!selectedRowKeys.length"
        >
          批量高级设置
        </st-button>
      </a-col>
      <a-col :span="12" class="ta-r">
        <st-button
          class="mg-r8"
          @click="addSites"
          v-if="auth.addSite"
          icon="add"
          type="primary"
        >
          新建场地
        </st-button>
      </a-col>
    </a-row>
    <st-table
      :page="page"
      @change="onTableChange"
      :alertSelection="{ onReset: onSelectionReset }"
      :rowSelection="{ selectedRowKeys, onChange: onSelectionChange }"
      :loading="loading.getList"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
    >
      <template slot="site_status" slot-scope="text">
        <st-text
          :status="{
            success: text === 1,
            error: text === 2
          }"
        >
          {{ text | enumFilter('venues_reserve.venues_site_status') }}
        </st-text>
      </template>
      <div slot="action" slot-scope="text, record">
        <st-table-actions>
          <a
            @click="onEdit(record)"
            v-if="record.auth['shop:product:venues_site|edit']"
          >
            编辑
          </a>
          <!-- TODO: -->
          <a
            href="javascript:;"
            v-if="record.auth['shop:product:venues_site|del']"
          >
            <st-popconfirm
              :title="'一旦删除则无法恢复，确认删除？'"
              @confirm="onDelete(record)"
            >
              删除
            </st-popconfirm>
          </a>
          <a
            @click="onSwitch(record)"
            v-if="record.auth['shop:product:venues_site|switch']"
          >
            // TODO:
            {{ record.site_status === SITE_STATUS.OFF ? '启用' : '停用' }}
          </a>
          <a
            @click="onSetting(record)"
            v-if="record.auth['shop:product:venues_site|setting']"
          >
            高级设置
          </a>
        </st-table-actions>
      </div>
    </st-table>
  </div>
</template>

<script>
import { ListService } from './list.service'
import { listToTree } from '@/utils/list-to-tree.js'
import tableMixin from '@/mixins/table.mixin'
import ShopAppVenueAddSite from '@/views/biz-modals/shop/app/venue/add-site'
import ShopAppVenueEditSite from '@/views/biz-modals/shop/app/venue/edit-site'
import ShopAppVenueSetting from '@/views/biz-modals/shop/app/venue/setting'
import { MessageService } from '@/services/message.service'
import { SITE_STATUS } from '@/constants/venue'
import { columns } from './list.config'
export default {
  name: 'RoleInfo',
  bem: {
    site: 'page-shop-app-venue-manage-list'
  },
  serviceInject() {
    return {
      listService: ListService,
      messageService: MessageService
    }
  },
  modals: {
    ShopAppVenueAddSite,
    ShopAppVenueEditSite,
    ShopAppVenueSetting
  },
  mixins: [tableMixin],
  rxState() {
    return {
      loading: this.listService.loading$,
      list: this.listService.list$,
      page: this.listService.page$,
      auth: this.listService.auth$
    }
  },
  data() {
    return {
      columns,
      SITE_STATUS
    }
  },
  computed: {
    venuesId() {
      return +this.$searchQuery.id
    }
  },
  methods: {
    addSites() {
      this.$modalRouter.push({
        name: 'shop-app-venue-add-site',
        props: {
          venuesId: this.venuesId
        },
        on: {
          success: () => {
            const venues_id = this.venuesId
            this.listService.getList({ venues_id }).subscribe()
          }
        }
      })
    },
    delAll() {
      const venues_id = this.venuesId
      const data = {
        venues_id,
        site_ids: this.selectedRowKeys
      }
      this.listService.delSites(data).subscribe(() => {
        this.onSelectionReset()
        this.listService.getList({ venues_id }).subscribe()
      })
    },
    onEdit(site) {
      this.$modalRouter.push({
        name: 'shop-app-venue-edit-site',
        props: {
          siteId: site.id,
          siteName: site.site_name
        },
        on: {
          success: () => {
            const venues_id = this.venuesId
            this.listService.getList({ venues_id }).subscribe()
          }
        }
      })
    },
    onDelete(site) {
      const venues_id = this.venuesId
      const data = {
        venues_id,
        site_ids: [site.id]
      }
      this.listService.delSites(data).subscribe(() => {
        this.listService.getList({ venues_id }).subscribe()
      })
    },
    onSwitch(site) {
      const venues_id = this.venuesId
      const data = {
        site_status:
          // TODO: 改成0，1
          site.site_status === SITE_STATUS.ON
            ? SITE_STATUS.OFF
            : SITE_STATUS.ON,
        site_id: site.id
      }
      this.listService.switchSite(data).subscribe(() => {
        // TODO: 调用次数太多
        this.listService.getList({ venues_id }).subscribe()
      })
    },
    onSetting(site) {
      this.listService.setSites([site])
      this.$modalRouter.push({
        name: 'shop-app-venue-setting',
        props: {
          siteId: site.id,
          siteName: site.site_name,
          venuesId: this.venuesId
        },
        on: {
          success: () => {
            const venues_id = this.venuesId
            this.listService.getList({ venues_id }).subscribe()
          }
        }
      })
    },
    addAll(sites) {
      this.listService.setSites(this.selectedRows)
      this.$router.push({
        name: 'shop-app-venue-setting-add',
        query: { venues_id: this.venuesId }
      })
    }
  }
}
</script>
