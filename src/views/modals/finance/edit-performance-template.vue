<template>
  <st-modal title="编辑业绩模板" v-model="show" @ok="handleSubmit">
    <st-form
      :form="form"
      labelWidth="66px"
      @submit="handleSubmit"
      class="modal-add-perfromance-contaner"
    >
      <a-row :gutter="8">
        <a-col :lg="24">
          <st-form-item label="模板名称" required>
            <a-input
              placeholder="请输模板名称"
              v-decorator="['template_name',{initialValue: this.infodata.template_name,rules: [{ required: true, message: '请输入模板名称' ,max:15}]}]"
            />
          </st-form-item>
        </a-col>
        <a-col :lg="24">
          <st-form-item label="业绩类型" required>
            <a-select
              v-decorator="['performance_type',{initialValue: this.infodata.performance_type, rules: [{ required: true, message: '请选择业绩类型' }]}]"
              placeholder="请选择"
              @change="selectType"
              disabled
            >
              <template v-for="(item,key) in finance.performance_type.value">
                <a-select-option :key="key" :value="+key">{{ item }}</a-select-option>
              </template>
            </a-select>
          </st-form-item>
        </a-col>
        <a-col :lg="24" v-if="isChooseks">
          <st-form-item label="提成模式" required>
            <a-radio-group
              @change="onChooseRadio"
              v-decorator="['performance_mode',{initialValue: this.infodata.performance_mode,rules: [{ required: true, message: '请选择提成模式' }]}]"
            >
              <template v-for="(item,key) in finance.performance_mode.value">
                <a-radio :key="item" :value="+key">{{ item }}</a-radio>
              </template>
            </a-radio-group>
          </st-form-item>
        </a-col>
        <a-col :lg="24">
          <st-form-item label="默认提成" required>
            <st-input-number
              :float="true"
              placeholder="请输入默认提成"
              v-decorator="['performance_num',{initialValue: this.infodata.performance_num,rules: [{ required: true, message: '请输入默认提成' }]}]"
            >
              <template v-if="performance_type == 1 || performance_type == 2">
                <template v-if="performance_mode == 1">
                  <template slot="addonAfter">%</template>
                </template>
                <template v-if="performance_mode == 2">
                  <template slot="addonAfter">元</template>
                </template>
              </template>
              <template v-if="performance_type == 3">
                <template slot="addonAfter">元/节</template>
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
                    <template v-if="performance_type == 1">
                      <template v-if="performance_mode == 1">
                        <th>月销售额（万及以上）</th>
                        <th>提成（%）</th>
                      </template>
                      <template v-if="performance_mode == 2">
                        <th>月销售额（万及以上）</th>
                        <th>提成（元）</th>
                      </template>
                    </template>
                    <template v-if="performance_type == 2">
                      <template v-if="performance_mode == 1">
                        <th>月课时价值（万及以上）</th>
                        <th>提成（%）</th>
                      </template>
                      <template v-if="performance_mode == 2">
                        <th>月课时价值（万及以上）</th>
                        <th>提成（元）</th>
                      </template>
                    </template>
                    <template v-if="performance_type == 3">
                      <th>月课时数（节及以上）</th>
                      <th>课时费（元/节）</th>
                    </template>
                    <th style="width:125px">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="data.length < 5">
                    <td>
                      <a-input placeholder="请输入月销售额" v-model="gradients.range_min"/>
                    </td>
                    <td>
                      <a-input placeholder="请输入提成" v-model="gradients.royalty_num"/>
                    </td>
                    <td>
                      <a href="javascript:;" @click="addGradients">添加梯度({{ data.length }}/5)</a>
                    </td>
                  </tr>

                  <template v-for="(item,index) in data">
                    <tr :key="index">
                      <template v-if="item.isEdit">
                        <td>
                          <a-input v-model="item.range_min"/>
                        </td>
                        <td>
                          <a-input v-model="item.royalty_num"/>
                        </td>
                      </template>
                      <template v-else>
                        <td>{{ item.range_min }}</td>
                        <td>{{ item.royalty_num }}</td>
                      </template>
                      <td>
                        <template v-if="item.isEdit">
                          <a href="javascript:;" @click="submitEdit(index)">提交</a>
                          <a-divider type="vertical"></a-divider>
                          <a href="javascript:;" @click="cancelEdit(index)">取消</a>
                        </template>
                        <template v-else>
                          <a href="javascript:;" @click="editPerformanceNum(index)">编辑</a>
                          <a-divider type="vertical"></a-divider>
                          <a href="javascript:;" @click="deletePerformanceNum(index)">删除</a>
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
import { EditTemplateService } from './edit-performance-template.service'
import { UserService } from '@/services/user.service'
import { forEach } from 'lodash-es'
export default {
  serviceInject() {
    return {
      service: EditTemplateService,
      message: MessageService,
      userservice: UserService
    }
  },
  rxState() {
    return {
      finance: this.userservice.finance$
    }
  },
  data() {
    return {
      data: [],
      gradients: {
        range_min: '',
        royalty_num: ''
      },
      form: this.$form.createForm(this),
      show: false,
      choose: 1, // 1 百分比 0 金额
      isChooseks: true, // 是否选中课时
      performance_type: 1,
      performance_mode: 1,
      infodata: {}
    }
  },
  watch: {
    performance_type: function(newValue, oldValue) {
      console.log('新', newValue)
      console.log('旧', oldValue)
      if (newValue === 1 || newValue === 2) {
        this.isChooseks = true
      } else if (newValue === 3) {
        this.isChooseks = false
      }
    }
  },
  props: {
    id: Number
  },
  created() {
    this.service.getInfo(this.id).subscribe(res => {
      this.infodata = res.info
      res.info.gradients.forEach(item => {
        this.$set(item, 'isEdit', false)
        this.data.push(item)
      })
      this.performance_type = res.info.performance_type
      this.performance_mode = res.info.performance_mode
    })
  },
  methods: {
    selectType(e) {
      console.log(e)
      this.performance_type = e
      if (e === 1 || e === 2) {
        this.isChooseks = true
      } else if (e === 3) {
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
      //   console.log('编辑', e)
      console.log(this.data[e])
      this.data[e].isEdit = true
    },
    deletePerformanceNum(e) {
      //   console.log('删除提成', e)
      this.data.splice(e, 1)
    },
    addGradients(e) {
      // 加校验
      //   console.log('添加提成', this.gradients)
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
      this.form.validateFields((err, values) => {
        if (!err) {
          values.gradients = this.data
          this.service.editTemplate(this.id, values).subscribe(() => {
            console.log('ok')
            this.$emit('change')
            this.message.success({ content: '编辑成功' })
            this.show = false
          })
        }
      })
    },
    onChooseRadio(e) {
      console.log(e)
      this.performance_mode = e.target.value
      this.data = []
    }
  }
}
</script>
