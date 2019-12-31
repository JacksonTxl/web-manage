<template>
  <st-modal title="高级设置" v-model="show" width="928px" :footer="null">
    <st-form-table hoverable :isEmpty="false">
      <thead>
        <tr>
          <th>优先级</th>
          <th>生效日期</th>
          <th>循环日期</th>
          <th>时间段</th>
          <th>状态</th>
          <th>价格(元)</th>
          <th style="width:160px">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="list.length < 3 && auth.add">
          <td colspan="7" class="st-form-table__add">
            <st-button type="dashed" icon="add" block @click="addRow">
              添加
            </st-button>
          </td>
        </tr>

        <template v-for="(item, index) in list">
          <tr :key="index">
            <td>
              {{ item.weight }}
            </td>
            <td>
              {{ item.time_limit }}
            </td>
            <td>
              <span v-if="item.cyclic_type === 1">每天</span>
              <span v-if="item.cyclic_type === 2">
                {{ item.week_day | cycleFilter }}
              </span>
            </td>
            <td>
              {{ item.open_time }}
            </td>
            <td>
              {{ item.can_reserve }}
            </td>
            <td>
              {{ item.price }}
            </td>
            <td>
              <template>
                <a @click="editRow(item)" v-if="auth.edit">
                  编辑
                </a>
                <a-divider type="vertical"></a-divider>
                <a href="javascript:;" v-if="auth.del">
                  <st-popconfirm
                    :title="'一旦删除则无法恢复，确认删除？'"
                    @confirm="delSetting(item)"
                  >
                    删除
                  </st-popconfirm>
                </a>
                <a-divider type="vertical"></a-divider>
                <a v-if="item.weight !== 1 && auth.top" @click="order(item)">
                  置顶
                </a>
              </template>
            </td>
          </tr>
        </template>
      </tbody>
    </st-form-table>
  </st-modal>
</template>
<script>
import { SettingService } from './setting.service'
import { MessageService } from '@/services/message.service'
const weekMap = {
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
  7: '周日'
}
export default {
  serviceInject() {
    return {
      Service: SettingService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      list: this.Service.list$,
      auth: this.Service.auth$
    }
  },
  name: 'newLable',
  props: {
    siteId: {
      type: Number,
      default() {
        return ''
      }
    },
    venuesId: {
      type: Number,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      show: false
    }
  },
  filters: {
    cycleFilter(val) {
      return '每' + val.map(item => weekMap[item]).join('、')
    }
  },
  mounted() {
    this.Service.getList({ site_id: this.siteId }).subscribe()
  },
  methods: {
    delSetting(item) {
      const data = {
        settings_id: item.settings_id
      }
      this.Service.deleteSetting(data).subscribe(() => {
        this.Service.getList({ site_id: this.siteId }).subscribe()
      })
    },
    order(item) {
      const data = {
        site_id: this.siteId,
        settings_id: item.settings_id
      }
      this.Service.orderSetting(data).subscribe(() => {
        this.Service.getList({ site_id: this.siteId }).subscribe()
      })
    },
    addRow() {
      this.show = false
      this.$router.push({
        name: 'shop-app-venue-setting-add',
        query: { venues_id: this.venuesId }
      })
    },
    editRow(item) {
      this.show = false
      this.$router.push({
        name: 'shop-app-venue-setting-edit',
        query: { settings_id: item.settings_id }
      })
    },
    save(e) {
      let self = this
      let verify = true
      e.preventDefault()
      const sites = this.sites.map(item => {
        item.name === '' && (verify = false)
        return item.name
      })
      if (!verify) {
        this.messageService.warning({ content: '场地名称不能为空' })
        return
      }
      let data = {
        venues_id: this.venuesId,
        sites: self.sites.map(item => item.name)
      }
      self.Service.addSites(data).subscribe(state => {
        this.messageService.success({ content: '添加成功' })
        self.show = false
        self.$emit('success', true)
      })
    }
  }
}
</script>
