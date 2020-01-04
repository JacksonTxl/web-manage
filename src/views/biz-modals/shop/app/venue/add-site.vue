<template>
  <st-modal
    title="批量添加场地"
    @ok="save"
    okText="提交"
    :okButtonProps="{ props: { disabled: !sites.length } }"
    v-model="show"
    width="668px"
    wrapClassName="st-modal-shop-app-venue-add-site"
  >
    <div class="border-box">
      <st-form-table hoverable :isEmpty="false">
        <thead>
          <tr>
            <th>请批量设置场地名称</th>
            <th style="width:120px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2" class="st-form-table__add">
              <st-button type="dashed" icon="add" block @click="addRow">
                添加
              </st-button>
            </td>
          </tr>

          <template v-for="(item, index) in sites">
            <tr :key="index">
              <td>
                <a-input v-model="item.name" style="width: 278px;"></a-input>
              </td>
              <td>
                <template>
                  <a @click="delRow(index)">
                    删除
                  </a>
                </template>
              </td>
            </tr>
          </template>
        </tbody>
      </st-form-table>
    </div>
  </st-modal>
</template>
<script>
import { AddSiteService } from './add-site.service'
import { MessageService } from '@/services/message.service'
import { PatternService } from '@/services/pattern.service'
export default {
  serviceInject() {
    return {
      Service: AddSiteService,
      messageService: MessageService,
      pattern: PatternService
    }
  },
  name: 'newLable',
  props: {
    venuesId: {
      type: Number,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      sites: [],
      show: false
    }
  },
  created() {},
  methods: {
    addRow() {
      this.sites.push({ name: '' })
    },
    delRow(index) {
      this.sites.splice(index, 1)
    },
    save(e) {
      let self = this
      let verify = true
      e.preventDefault()
      const sites = this.sites.map(item => {
        !self.pattern.CN_EN_NUM_SPACE('1-6').test(item.name) && (verify = false)
        return item.name
      })
      if (!verify) {
        this.messageService.warning({
          content: '输入的场馆名称格式错误，请重新输入'
        })
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
