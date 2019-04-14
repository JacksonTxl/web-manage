<template>
  <a-modal class="modal-contract-code-edit" width="676px" title="会员卡合同编号设置" v-model="show">
    <p>配置合同编码生成规则，最多可以添加20位长度的合同编码，直接在表格中拖动行排序</p>
    <st-table
      :loading="loading.getCodeInfo"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
      :pagination="false"
    >
      <div slot="rule" slot-scope="record">
        <!-- 编辑 -->
        <template v-if="record._mode==='edit' || record._mode==='add'">
          <a-select size="small" v-model="editInfo.sn_rule">
            <a-select-option :value="CODE_RULE.LETTER">字母</a-select-option>
            <a-select-option :value="CODE_RULE.NUMBER">数字</a-select-option>
          </a-select>
          <a-select class="mg-l8" size="small" v-model="editInfo.sn_generate_rule">
            <a-select-option :value="CODE_GENERATE_RULE.RANDOM">随机生成</a-select-option>
            <a-select-option :value="CODE_GENERATE_RULE.FIXED">固定值</a-select-option>
          </a-select>
          <a-input
            v-if="editInfo.sn_rule===CODE_RULE.LETTER && editInfo.sn_generate_rule===CODE_GENERATE_RULE.FIXED"
            size="small"
            placeholder="请输入固定字母"
            class="mg-l8"
            style="width:140px"
            v-model="editInfo.sn_generate_value"
          ></a-input>
          <a-input-number
            v-if="editInfo.sn_rule===CODE_RULE.NUMBER && editInfo.sn_generate_rule===CODE_GENERATE_RULE.FIXED"
            :min="0"
            size="small"
            placeholder="请输入固定数字"
            class="mg-l8"
            v-model="editInfo.sn_generate_value"
            style="width:140px"
          ></a-input-number>
        </template>
        <!-- 编辑end -->

        <template v-if="!record._mode">
          <span>{{record.sn_rule | codeRuleFilter}} {{record.sn_generate_value}}</span>
          <span class="mg-l4">{{record.sn_generate_rule | codeGenerateRuleFilter }}</span>
        </template>
      </div>

      <div slot="action" slot-scope="record">
        <!-- 编辑 -->
        <template v-if="record._mode==='edit'">
          <a href="javascript:;">保存</a>
          <a-divider type="vertical"></a-divider>
          <a href="javascript:;" @click="onRowEditCancel(record)">取消</a>
        </template>
        <!-- 添加 -->
        <template v-if="record._mode==='add'">
          <a href="javascript:;">保存</a>
          <a-divider type="vertical"></a-divider>
          <a href="javascript:;" @click="onRowAddCancel(record)">取消</a>
        </template>
        <!-- 查看模式 -->
        <template v-if="!record._mode">
          <a href="javascript:;" @click="onRowEdit(record)">编辑</a>
          <a-divider type="vertical"></a-divider>
          <a href="javascript:;">删除</a>
        </template>
      </div>
    </st-table>
    <st-button
      :disabled="isAdding || isEditing"
      @click="onRowAdd"
      block
      type="dashed"
      class="mg-t16"
    >
      <a-icon type="plus"></a-icon>添加
    </st-button>
  </a-modal>
</template>
<script>
import { CodeEditService } from './code-edit.service'
import { CODE_RULE, CODE_GENERATE_RULE } from '@/constants/enums/contract.ts'
import { cloneDeep, find } from 'lodash-es'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      show: true,
      editInfo: {},
      isAdding: false,
      isEditing: false,
      CODE_RULE,
      CODE_GENERATE_RULE,
      columns: [
        { title: '位数', width: 80, dataIndex: 'sn_pos' },
        { title: '规则', scopedSlots: { customRender: 'rule' } },
        { title: '操作', width: 110, scopedSlots: { customRender: 'action' } }
      ]
    }
  },
  filters: {
    codeRuleFilter(key) {
      return {
        [CODE_RULE.LETTER]: '字母',
        [CODE_RULE.NUMBER]: '数字'
      }[key]
    },
    codeGenerateRuleFilter(key) {
      return {
        [CODE_GENERATE_RULE.RANDOM]: '随机生成',
        [CODE_GENERATE_RULE.FIXED]: '固定值'
      }[key]
    }
  },
  serviceInject() {
    return {
      codeEditService: CodeEditService
    }
  },
  subscriptions() {
    return {
      list: this.codeEditService.list$,
      loading: this.codeEditService.loading$
    }
  },
  methods: {
    onRowEdit(record) {
      this.isEditing = true
      this.editInfo = cloneDeep(record)
      if (this.isAdding) {
        this.onRowAddCancel()
      }
      this.codeEditService.editRow(record.id)
    },
    onRowEditCancel(record) {
      this.isEditing = false
      this.codeEditService.quitEditRow(record.id)
    },
    onRowAddCancel(record) {
      this.list.pop()
      this.isAdding = false
    },
    onRowAdd() {
      this.editInfo = {
        id: 0,
        _mode: 'add',
        sn_pos: 1,
        sn_rule: 1,
        sn_generate_rule: 1,
        sn_generate_value: ''
      }
      this.list.push(this.editInfo)
      this.isAdding = true
    }
  },
  created() {
    this.codeEditService.init(this.id).subscribe()
  }
}
</script>
