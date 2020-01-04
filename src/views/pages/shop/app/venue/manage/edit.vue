<template>
  <div :class="b()">
    <st-form :form="form" class="page-role-info__add" labelWidth="120px">
      <st-form-item label="场馆名称" required>
        <a-input
          placeholder="请输入场馆名称"
          v-decorator="decorators.venues_name"
        ></a-input>
      </st-form-item>
      <st-form-item label="每场时长" required>
        <a-radio-group
          v-decorator="decorators.per_time"
          @change="pertimeChange"
        >
          <a-radio
            v-for="item in timeEnums"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </st-form-item>
      <st-form-item :class="b('time')" label="可预约时间" required>
        <st-form-item :class="b('inline-item')">
          <a-select
            v-decorator="decorators.open_time_start"
            placeholder="开始时间"
            class="page-content-card-input"
          >
            <a-select-option
              v-for="(item, index) in pertimeEnums[perTime]"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </st-form-item>
        &nbsp;~&nbsp;
        <st-form-item :class="b('inline-item')">
          <a-select
            v-decorator="decorators.open_time_end"
            placeholder="结束时间"
            class="page-content-card-input"
          >
            <a-select-option
              v-for="(item, index) in pertimeEnums[perTime]"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </st-form-item>
      </st-form-item>
      <st-form-item label="最少预约场次">
        每次最少连续预约
        <st-input-number
          :class="b('inline')"
          v-decorator="decorators.min_reserve_num"
          placeholder="请输入数量"
        >
          <template slot="addonAfter">
            场
          </template>
        </st-input-number>
      </st-form-item>
      <st-form-item label="最多预约场次">
        每个人一天最多可预约
        <st-input-number
          :class="b('inline')"
          v-decorator="decorators.max_reserve_num"
          placeholder="请输入数量"
        >
          <template slot="addonAfter">
            场
          </template>
        </st-input-number>
      </st-form-item>
      <st-form-item label="默认价格" required>
        <st-input-number
          v-decorator="decorators.price"
          :float="true"
          placeholder="请输入价格"
        >
          <template slot="addonAfter">
            元/场
          </template>
        </st-input-number>
      </st-form-item>
    </st-form>
    <div :class="b('btn')">
      <st-button type="primary" @click="onClickSubmit" class="mg-r16">
        保存
      </st-button>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es'
import { EditService } from './edit.service'
import { ruleOptions } from './add.config'
import { MessageService } from '@/services/message.service'
import { PatternService } from '@/services/pattern.service'
export default {
  name: 'AddRole',
  bem: {
    b: 'page-shop-app-venue-manage-edit'
  },
  serviceInject() {
    return {
      editService: EditService,
      messageService: MessageService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      timeEnums: this.editService.timeEnums$,
      harfEnums: this.editService.harfEnums$,
      oneEnums: this.editService.oneEnums$,
      info: this.editService.info$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      perTime: 1,
      pertimeEnums: {
        1: this.harfEnums,
        2: this.oneEnums
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    pertimeChange(e) {
      this.perTime = e.target.value
      this.form.setFieldsValue({
        open_time_start: undefined,
        open_time_end: undefined
      })
    },
    init() {
      this.form.setFieldsValue({
        venues_name: this.info.venues_name,
        open_time_start: this.info.open_time_start,
        open_time_end: this.info.open_time_end,
        per_time: this.info.per_time,
        min_reserve_num: this.info.min_reserve_num,
        max_reserve_num: this.info.max_reserve_num,
        price: this.info.price
      })
      this.perTime = this.info.per_time
    },
    onClickSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const postData = {
            ...values,
            id: this.info.id
          }
          this.editService.edit(postData).subscribe(() => {
            this.messageService.success({ content: '编辑成功' })
            this.$router.push({
              name: 'shop-app-venue-manage-list',
              query: {
                id: this.info.venues_id
              }
            })
          })
        }
      })
    }
  }
}
</script>
