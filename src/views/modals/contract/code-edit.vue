<template>
  <a-modal
    class="modal-contract-code-edit"
    width="676px"
    title="会员卡合同编号设置"
    v-model="show"
    :confirmLoading="loading.updateCode"
    @ok="onOk"
  >
    <p>配置合同编码生成规则，最多可以添加20位长度的合同编码，直接在表格中拖动行排序</p>
    <st-form-table>
      <thead>
        <tr>
          <th width="60px">位数</th>
          <th>规则</th>
          <th width="140px">操作</th>
        </tr>
      </thead>
      <draggable tag='tbody' v-model='rules' :animation="200">
        <tr v-for="(rule,index) in rules" :key="rule.sn_rule + rule._value + index">
          <td>{{index+1}}</td>
          <td>
            <a-radio-group @change="rule._value = 'RANDOM'" v-model="rule.sn_rule">
              <a-radio :value="SN_RULE.LETTER">{{SN_RULE.LETTER | enumFilter('setting.sn_rule')}}</a-radio>
              <a-radio :value="SN_RULE.NUMBER">{{SN_RULE.NUMBER | enumFilter('setting.sn_rule')}}</a-radio>
              <a-select
                v-if="rule.sn_rule === SN_RULE.LETTER"
                style="width:140px"
                v-model="rule._value"
              >
                <a-select-option value="RANDOM">随机生成字母</a-select-option>
                <a-select-option v-for="letter in letters" :key="letter" :value="letter">{{letter}}</a-select-option>
              </a-select>
              <a-select
                v-if="rule.sn_rule === SN_RULE.NUMBER"
                style="width:140px"
                v-model="rule._value"
              >
                <a-select-option value="RANDOM">随机生成数字</a-select-option>
                <a-select-option v-for="n in numbers" :key="n" :value="n">{{n}}</a-select-option>
              </a-select>
            </a-radio-group>
          </td>
          <td>
            <a @click="onDelete(index)">删除</a>
          </td>
        </tr>
      </draggable>
    </st-form-table>
    <st-button :disabled="rules.length>=20" @click="onAdd" block type="dashed" class="mg-t16">
      <a-icon type="plus"></a-icon>添加
    </st-button>
  </a-modal>
</template>
<script>
import draggable from 'vuedraggable'
import { CodeEditService } from './code-edit.service'
import { MessageService } from '@/services/message.service'
import { cloneDeep } from 'lodash-es'
import { UserService } from '@/services/user.service'
import { SN_RULE } from '@/constants/enums/contract'

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    codeRules: {
      type: Array,
      required: true
    }
  },
  components: {
    draggable
  },
  serviceInject() {
    return {
      user: UserService,
      codeEditService: CodeEditService,
      message: MessageService
    }
  },
  rxState() {
    return {
      settingEnums: this.user.settingEnums$,
      loading: this.codeEditService.loading$
    }
  },
  data() {
    return {
      SN_RULE,
      letters: 'ABCDEFGHIJKLMOPQRSTUVWXYZ'.split(''),
      numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      show: true,
      rules: []
    }
  },
  created() {
    this.rules = this.codeRules
  },
  methods: {
    onAdd() {
      this.rules.push({
        sn_rule: 1,
        _value: 'RANDOM'
      })
    },
    onOk() {
      this.codeEditService.updateCode(this.rules).subscribe(() => {
        this.message.success({
          content: '更新合同编码成功！'
        })
        this.show = false
        this.$emit('done')
      })
    },
    onDelete(index) {
      this.rules.splice(index, 1)
    }
  }
}
</script>
