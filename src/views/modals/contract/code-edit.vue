<template>
  <a-modal class="modal-contract-code-edit" width="676px" title="会员卡合同编号设置" v-model="show">
    {{editMode}}
    <p>配置合同编码生成规则，最多可以添加20位长度的合同编码，直接在表格中拖动行排序</p>
    <st-table
      :loading="loading.getCodeInfo"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
      :pagination="false"
    >
      <div slot="rule" slot-scope="record">
        <template v-if="editMode[record.id]">
          <a-select size="small" v-model="editMode[record.id].sn_rule">
            <a-select-option :value="1">字母</a-select-option>
            <a-select-option :value="2">数字</a-select-option>
          </a-select>
          <a-select class="mg-l8" size="small" v-model="editMode[record.id].sn_generate_rule">
            <a-select-option :value="1">随机生成</a-select-option>
            <a-select-option :value="2">固定值</a-select-option>
          </a-select>
          <a-input
            size="small"
            placeholder="请输入固定字母"
            class="mg-l8"
            style="width:140px"
            v-show="editMode[record.id].sn_rule===1 && editMode[record.id].sn_generate_rule===2"
          ></a-input>
          <a-input-number
            :min="0"
            size="small"
            placeholder="请输入固定数字"
            class="mg-l8"
            :maxlength="20"
            style="width:140px"
            v-show="editMode[record.id].sn_rule===2 && editMode[record.id].sn_generate_rule===2"
          ></a-input-number>
        </template>
        <!-- 添加 -->
        <template v-if="!record.id">
          <a-form layout="inline">
            <a-form-item>
              <a-select
                @change="addInfo.sn_generate_value = ''"
                size="small"
                v-model="addInfo.sn_rule"
              >
                <a-select-option :value="1">字母</a-select-option>
                <a-select-option :value="2">数字</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-select
                @change="addInfo.sn_generate_value = ''"
                class="mg-l8"
                size="small"
                v-model="addInfo.sn_generate_rule"
              >
                <a-select-option :value="1">随机生成</a-select-option>
                <a-select-option :value="2">固定值</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              :validateStatus="addInfo.sn_generate_value>addInfo.sn_pos?'error':''"
              v-show="addInfo.sn_rule===1 && addInfo.sn_generate_rule===2"
            >
              <a-input
                v-model="addInfo.sn_generate_value"
                size="small"
                placeholder="请输入固定字母"
                style="width:140px"
              ></a-input>
            </a-form-item>
            <a-form-item
              :validateStatus="addInfo.sn_generate_value>addInfo.sn_pos?'error':''"
              v-show="addInfo.sn_rule===2 && addInfo.sn_generate_rule===2"
            >
              <a-input-number
                v-model="addInfo.sn_generate_value"
                :min="0"
                size="small"
                placeholder="请输入固定数字"
                :maxlength="20"
                style="width:140px"
              ></a-input-number>
            </a-form-item>
          </a-form>
        </template>

        <template v-if="record.id && !editMode[record.id]">
          <span>{{record.sn_rule | codeRuleFilter}} {{record.sn_generate_value}}</span>
          <span class="mg-l4">{{record.sn_generate_rule | codeGenerateRuleFilter }}</span>
        </template>
      </div>
      <div slot="action" slot-scope="record">
        <!-- 编辑 -->
        <template v-if="editMode[record.id]">
          <a href="javascript:;">保存</a>
          <a-divider type="vertical"></a-divider>
          <a href="javascript:;" @click="onRowEditCancel(record)">取消</a>
        </template>
        <!-- 添加编号规则 -->
        <template v-if="!record.id">
          <a href="javascript:;">保存</a>
          <a-divider type="vertical"></a-divider>
          <a href="javascript:;" @click="onRowAddCancel(record)">取消</a>
        </template>
        <!-- 查看模式 -->
        <template v-if="record.id && !editMode[record.id]">
          <a href="javascript:;" @click="onRowEdit(record)">编辑</a>
          <a-divider type="vertical"></a-divider>
          <a href="javascript:;">删除</a>
        </template>
      </div>
    </st-table>
    <st-button v-if="!isAddMode" @click="onRowAdd" block type="dashed" class="mg-t16">
      <a-icon type="plus"></a-icon>添加
    </st-button>
    {{list}}
  </a-modal>
</template>
<script>
import { CodeEditService } from './code-edit.service'

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
      isAddMode: false,
      addInfo: {},
      editMode: {
        1: {}
      },
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
        1: '字母',
        2: '数字'
      }[key]
    },
    codeGenerateRuleFilter(key) {
      return {
        1: '随机生成',
        2: '固定值'
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
      const { sn_rule, sn_generate_rule, sn_generate_value } = record
      this.$set(this.editMode, record.id, {
        sn_rule,
        sn_generate_rule,
        sn_generate_value
      })
    },
    onRowAddCancel(record) {
      this.list.pop()
      this.isAddMode = false
    },
    onRowEditCancel(record) {
      this.$set(this.editMode, record.id, null)
    },
    onRowAdd() {
      this.isAddMode = true
      this.addInfo = {
        id: 0,
        sn_pos: 1,
        sn_rule: 1,
        sn_generate_rule: 1,
        sn_generate_value: ''
      }
      this.list.push(this.addInfo)
    }
  },
  created() {
    this.codeEditService.init(this.id).subscribe()
  }
}
</script>
