<template>
  <st-modal
    title="高级设置"
    v-model="show"
    width="928px"
    :footer="null"
    wrapClassName="st-modal-shop-app-venue-setting"
  >
    <div class="border-box">
      <st-form-table hoverable :isEmpty="false">
        <thead>
          <tr>
            <th>优先级</th>
            <th>生效日期</th>
            <th>循环日期</th>
            <th>时间段</th>
            <th>状态</th>
            <th class="ta-r">价格(元)</th>
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
                <span v-if="item.cyclic_type === CYCLIC_TYPE.EVERYDAY">
                  每天
                </span>
                <span v-if="item.cyclic_type === CYCLIC_TYPE.CUSTOM">
                  {{ item.week_day | cycleFilter }}
                </span>
              </td>
              <td>
                {{ item.open_time }}
              </td>
              <td>
                {{
                  item.can_reserve | enumFilter('venues_reserve.can_reserve')
                }}
              </td>
              <td class="ta-r">
                {{ item.price }}
              </td>
              <td>
                <template>
                  <a @click="editRow(item)" v-if="auth.edit">
                    编辑
                  </a>
                  <a-divider type="vertical"></a-divider>
                  <a v-if="auth.del">
                    <st-popconfirm
                      :title="'一旦删除则无法恢复，确认删除？'"
                      @confirm="delSetting(item)"
                    >
                      删除
                    </st-popconfirm>
                  </a>
                  <a-divider type="vertical"></a-divider>
                  <a v-if="item.weight !== 3 && auth.top" @click="order(item)">
                    置顶
                  </a>
                </template>
              </td>
            </tr>
          </template>
        </tbody>
      </st-form-table>
    </div>
    <p class="tips">
      当多条高级设置时间有冲突，执行优先级高的设置内容。数字越大，优先级越高。
    </p>
  </st-modal>
</template>
<script>
import { SettingService } from './setting.service'
import { MessageService } from '@/services/message.service'
import { CYCLIC_TYPE, WEEK_MAP } from '@/constants/venue'

export default {
  serviceInject() {
    return {
      settingService: SettingService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      list: this.settingService.list$,
      auth: this.settingService.auth$
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
      show: false,
      CYCLIC_TYPE
    }
  },
  filters: {
    cycleFilter(val) {
      return '每' + val.map(item => WEEK_MAP[item]).join('、')
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.settingService.getList({ site_id: this.siteId }).subscribe()
    },
    delSetting(item) {
      const data = {
        settings_id: item.settings_id
      }
      this.settingService.deleteSetting(data).subscribe(() => {
        this.getList()
      })
    },
    order(item) {
      const data = {
        site_id: this.siteId,
        settings_id: item.settings_id
      }
      this.settingService.orderSetting(data).subscribe(() => {
        this.getList()
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
      let verify = true
      e.preventDefault()
      const sites = this.sites.map(item => {
        item.name === '' && (verify = false)
        return item.name
      })
      if (!verify) {
        this.messageService.warn({ content: '场地名称不能为空' })
        return
      }
      let data = {
        venues_id: this.venuesId,
        sites: this.sites.map(item => item.name)
      }
      this.settingService.addSites(data).subscribe(state => {
        this.messageService.success({ content: '添加成功' })
        this.show = false
        this.$emit('success', true)
      })
    }
  }
}
</script>
