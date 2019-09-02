<template>
  <st-modal title="新增业绩模板" v-model="show" @ok="handleSubmit">
    <st-form
      :form="form"
      labelWidth="100px"
      @submit="handleSubmit"
      class="modal-add-perfromance-contaner"
    >
      <a-row :gutter="8">
        <a-col :lg="24">
          <st-form-item label="模板名称" required>
            <a-input
              placeholder="请输模板名称"
              v-decorator="decorators.template_name"
            />
          </st-form-item>
        </a-col>
        <a-col :lg="24">
          <st-form-item label="业绩类型" required>
            <a-select
              v-decorator="decorators.performance_type"
              placeholder="请选择"
              @change="selectType"
            >
              <template v-for="(item, key) in performanceTypes">
                <a-select-option :key="key" :value="+item.value">
                  {{ item.label }}
                </a-select-option>
              </template>
            </a-select>
          </st-form-item>
        </a-col>
        <a-col :lg="24" v-if="isChooseks">
          <st-form-item label="提成模式" required>
            <a-radio-group
              @change="onChooseRadio"
              v-decorator="decorators.performance_mode"
            >
              <template v-for="(item, key) in performanceModes">
                <a-radio :key="key" :value="+item.value">
                  {{ item.label }}
                </a-radio>
              </template>
            </a-radio-group>
          </st-form-item>
        </a-col>
        <a-col :lg="24">
          <st-form-item required>
            <template
              slot="label"
              v-if="
                performance_type == PERFORMANCE.PERFORMANCE_TYPE_1 ||
                  performance_type == PERFORMANCE.PERFORMANCE_TYPE_2
              "
            >
              默认提成
              <st-help-tooltip id="TBPT001" />
            </template>
            <template
              slot="label"
              v-if="performance_type == PERFORMANCE.PERFORMANCE_TYPE_3"
            >
              默认课时费
              <st-help-tooltip id="TBPT001" />
            </template>
            <st-input-number
              :float="true"
              :min="0"
              :max="
                performance_mode === PERFORMANCE.PERFORMANCE_MODE_1
                  ? 100
                  : 999999
              "
              placeholder="请输入默认提成"
              v-decorator="decorators.performance_num"
            >
              <template
                v-if="
                  performance_type == PERFORMANCE.PERFORMANCE_TYPE_1 ||
                    performance_type == PERFORMANCE.PERFORMANCE_TYPE_2
                "
              >
                <template
                  v-if="performance_mode == PERFORMANCE.PERFORMANCE_MODE_1"
                >
                  <template slot="addonAfter">
                    %
                  </template>
                </template>
                <template
                  v-if="performance_mode == PERFORMANCE.PERFORMANCE_MODE_2"
                >
                  <template slot="addonAfter">
                    元
                  </template>
                </template>
              </template>
              <template
                v-if="performance_type == PERFORMANCE.PERFORMANCE_TYPE_3"
              >
                <template slot="addonAfter">
                  元/节
                </template>
              </template>
            </st-input-number>
          </st-form-item>
        </a-col>
        <a-col :lg="24">
          <st-form-item label="梯度提成">
            <div
              style="padding:12px; box-size: border-box; border-radius:4px;border:1px solid rgba(205,212,223,1); "
            >
              <st-form-table hoverable>
                <thead>
                  <tr>
                    <template
                      v-if="performance_type == PERFORMANCE.PERFORMANCE_TYPE_1"
                    >
                      <template
                        v-if="
                          performance_mode == PERFORMANCE.PERFORMANCE_MODE_1
                        "
                      >
                        <th>月销售额（万及以上）</th>
                        <th>提成（%）</th>
                      </template>
                      <template
                        v-if="
                          performance_mode == PERFORMANCE.PERFORMANCE_MODE_2
                        "
                      >
                        <th>月销售额（万及以上）</th>
                        <th>提成（元）</th>
                      </template>
                    </template>
                    <template
                      v-if="performance_type == PERFORMANCE.PERFORMANCE_TYPE_2"
                    >
                      <template
                        v-if="
                          performance_mode == PERFORMANCE.PERFORMANCE_MODE_1
                        "
                      >
                        <th>月课时价值（万及以上）</th>
                        <th>提成（%）</th>
                      </template>
                      <template
                        v-if="
                          performance_mode == PERFORMANCE.PERFORMANCE_MODE_2
                        "
                      >
                        <th>月课时价值（万及以上）</th>
                        <th>提成（元）</th>
                      </template>
                    </template>
                    <template
                      v-if="performance_type == PERFORMANCE.PERFORMANCE_TYPE_3"
                    >
                      <th>月课时数（节及以上）</th>
                      <th>课时费（元/节）</th>
                    </template>
                    <th style="width:125px">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="data.length < 5">
                    <td>
                      <st-input-number
                        :float="true"
                        :min="0"
                        :max="999.9"
                        placeholder="请输入月销售额"
                        v-model="gradients.range_min"
                      />
                    </td>
                    <td>
                      <st-input-number
                        :float="true"
                        :min="0"
                        :max="
                          performance_mode == PERFORMANCE.PERFORMANCE_MODE_1
                            ? 100
                            : 999999
                        "
                        placeholder="请输入提成"
                        v-model="gradients.royalty_num"
                      />
                    </td>
                    <td>
                      <a @click="addGradients">添加梯度({{ data.length }}/5)</a>
                    </td>
                  </tr>

                  <template v-for="(item, index) in data">
                    <tr :key="index">
                      <template v-if="item.isEdit">
                        <td>
                          <a-input v-model="item.range_min" />
                        </td>
                        <td>
                          <a-input v-model="item.royalty_num" />
                        </td>
                      </template>
                      <template v-else>
                        <td>{{ item.range_min }}</td>
                        <td>{{ item.royalty_num }}</td>
                      </template>
                      <td>
                        <template v-if="item.isEdit">
                          <a @click="submitEdit(index)">
                            提交
                          </a>
                          <a-divider type="vertical"></a-divider>
                          <a @click="cancelEdit(index)">
                            取消
                          </a>
                        </template>
                        <template v-else>
                          <a @click="editPerformanceNum(index)">
                            编辑
                          </a>
                          <a-divider type="vertical"></a-divider>
                          <a @click="deletePerformanceNum(index)">
                            删除
                          </a>
                        </template>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </st-form-table>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { AddTemplateService } from './add-performance-template.service'
import { UserService } from '@/services/user.service'
import { ruleOptions } from './performance-template.config'
import { PERFORMANCE } from '@/constants/finance/performance'
export default {
  serviceInject() {
    return {
      service: AddTemplateService,
      message: MessageService
    }
  },
  rxState() {
    return {
      performanceModes: this.service.performanceModes$,
      performanceTypes: this.service.performanceTypes$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      PERFORMANCE,
      form,
      decorators,
      data: [],
      gradients: {
        range_min: '',
        royalty_num: ''
      },
      show: false,
      choose: 1, // 1 百分比 0 金额
      isChooseks: true, // 是否选中课时
      performance_type: 1,
      performance_mode: 1
    }
  },
  methods: {
    selectType(e) {
      this.performance_type = e
      if (
        e === this.PERFORMANCE.PERFORMANCE_TYPE_1 ||
        e === this.PERFORMANCE.PERFORMANCE_TYPE_2
      ) {
        this.isChooseks = true
      } else if (e === this.PERFORMANCE.PERFORMANCE_TYPE_3) {
        this.isChooseks = false
      }
    },
    submitEdit(e) {
      if (!this.data[e].range_min || !this.data[e].royalty_num) {
        this.message.warning({ content: '请填写完整' })
        return
      }
      this.data[e].isEdit = false
    },
    cancelEdit(e) {
      this.data[e].isEdit = false
    },
    editPerformanceNum(e) {
      this.data[e].isEdit = true
    },
    deletePerformanceNum(e) {
      this.data.splice(e, 1)
    },
    addGradients(e) {
      // 加校验
      let { range_min, royalty_num } = this.gradients
      if (!range_min || !royalty_num) {
        this.message.warning({ content: '请填写完整' })
        return
      }
      this.data.push({
        id: 0,
        range_min,
        royalty_num,
        isEdit: false
      })
      this.gradients.range_min = ''
      this.gradients.royalty_num = ''
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        values.gradients = this.data
        if (values.performance_type === this.PERFORMANCE.PERFORMANCE_TYPE_3) {
          values.performance_mode = 0
        }
        this.service.addTemplate(values).subscribe(() => {
          this.$emit('change')
          this.message.success({ content: '添加成功' })
          this.show = false
        })
      })
    },
    onChooseRadio(e) {
      this.performance_mode = e.target.value
      this.data = []
    }
  }
}
</script>
