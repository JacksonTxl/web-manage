<template>
  <st-panel :class="b()" app>
    <st-form :form="form" :class="b('form')" labelWidth="120px">
      <st-form-item label="场地">
        <span :class="b('name')">
          {{ sites.map(item => item.site_name).join('、') }}
        </span>
      </st-form-item>
      <st-form-item label="日期" required>
        <a-radio-group v-decorator="decorators.time_limit_type">
          <a-radio
            v-for="item in timeEnums"
            :key="item.value"
            :value="item.value"
            @change="timeLimitChange"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </st-form-item>
      <st-form-item v-if="timeLimit === 2" :labelFix="true" labelWidth="120px">
        <div class="page-a-form">
          <a-date-picker
            :disabledDate="disabledStartDate"
            v-decorator="decorators.time_limit_start"
            format="YYYY-MM-DD"
            placeholder="开始时间"
            :showToday="false"
            @openChange="handleStartOpenChange"
            @change="start_time_change"
          />
        </div>
        &nbsp;~&nbsp;
        <div class="page-a-form">
          <a-date-picker
            :disabledDate="disabledEndDate"
            v-decorator="decorators.time_limit_end"
            format="YYYY-MM-DD"
            placeholder="结束时间"
            :showToday="false"
            :open="endOpen"
            @openChange="handleEndOpenChange"
            @change="end_time_change"
          />
        </div>
      </st-form-item>
      <st-form-item label="循环设置" required>
        <a-radio-group
          v-decorator="decorators.cyclic_type"
          @change="cyclicTypeChange"
        >
          <a-radio
            v-for="item in cyclicEnums"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </st-form-item>
      <st-form-item v-if="cyclicType === 2" :labelFix="true" labelWidth="120px">
        <a-checkbox-group v-decorator="decorators.week_day">
          <a-checkbox
            v-for="item in weeks"
            :key="item.value"
            :value="item.value"
            class="mg-r8"
          >
            {{ item.label }}
          </a-checkbox>
        </a-checkbox-group>
      </st-form-item>
      <st-form-item :class="b('time')" label="可预约时间" required>
        <st-form-item :class="b('inline-item')">
          <a-select
            v-decorator="decorators.open_time_start"
            placeholder="开始时间"
            class="page-content-card-input"
          >
            <a-select-option
              v-for="(item, index) in harfEnums"
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
              v-for="(item, index) in harfEnums"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </st-form-item>
      </st-form-item>
      <st-form-item label="预约状态" required>
        <st-checkbox v-model="can_reserve">
          不可预约
        </st-checkbox>
      </st-form-item>
      <st-form-item label="预约价格" required>
        <st-input-number
          v-decorator="decorators.price"
          :float="true"
          placeholder="请输入价格"
        >
          <template slot="addonAfter">
            元
          </template>
        </st-input-number>
      </st-form-item>
      <st-form-item label="优先级" required>
        <a-radio-group v-decorator="decorators.weight">
          <a-radio
            v-for="item in priorityEnums"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </st-form-item>
    </st-form>
    <div class="page-role-info__btn">
      <st-button type="primary" @click="onClickSubmit" class="mg-r16">
        保存
      </st-button>
      <st-button @click="onCancel">取消</st-button>
    </div>
  </st-panel>
</template>

<script>
import { cloneDeep } from 'lodash-es'
import moment from 'moment'
import { EditService } from './edit.service'
import { ruleOptions } from './add.config'
import { MessageService } from '@/services/message.service'
import { PatternService } from '@/services/pattern.service'
import { CAN_RESERVE } from '@/constants/venue'
export default {
  name: 'AddRole',
  bem: {
    b: 'page-shop-app-venue-setting-add'
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
      sites: this.editService.sites$,
      info: this.editService.info$,
      harfEnums: this.editService.harfEnums$,
      timeEnums: this.editService.timeEnums$,
      cyclicEnums: this.editService.cyclicEnums$,
      priorityEnums: this.editService.priorityEnums$,
      weeks: this.editService.weeks$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      timeLimit: 1,
      start_time: null,
      end_time: null,
      endOpen: false,
      cyclicType: 1,
      can_reserve: 0
    }
  },
  mounted() {
    this.form.setFieldsValue({ ...this.info })
    this.can_reserve = this.info.can_reserve === CAN_RESERVE.YES ? 0 : 1
  },
  methods: {
    timeLimitChange(e) {
      this.timeLimit = e.target.value
    },
    onCancel() {
      this.$router.go(-1)
    },
    onClickSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.can_reserve = this.can_reserve
            ? CAN_RESERVE.NO
            : CAN_RESERVE.YES
          const data = {
            settings_id: this.$searchQuery.settings_id,
            site_id: this.sites[0].id,
            ...values
          }
          this.editService.edit(data).subscribe(() => {
            this.messageService.success({ content: '编辑成功' })
            this.$router.push({ name: 'shop-app-venue-manage' })
          })
        }
      })
    },
    disabledStartDate(startValue) {
      const endValue = this.end_time
      if (!endValue) {
        // 结束时间未选择
        return (
          startValue.valueOf() <
          moment()
            .startOf('day')
            .valueOf()
        )
      }
      let start =
        endValue.valueOf() >
        moment()
          .add(30, 'y')
          .valueOf()
          ? moment(endValue)
              .subtract(30, 'y')
              .valueOf()
          : moment()
              .startOf('day')
              .valueOf()
      return (
        startValue.valueOf() < start ||
        startValue.valueOf() > moment(endValue).valueOf()
      )
    },
    disabledEndDate(endValue) {
      const startValue = this.start_time
      if (!startValue) {
        // 开始时间未选择
        return (
          endValue.valueOf() <
          moment()
            .startOf('day')
            .valueOf()
        )
      }
      return (
        endValue.valueOf() >=
          moment(startValue)
            .add(30, 'y')
            .valueOf() ||
        endValue.valueOf() < moment(startValue).valueOf() ||
        endValue.valueOf() <
          moment()
            .startOf('day')
            .valueOf()
      )
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    start_time_change(data) {
      this.start_time = cloneDeep(data)
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    },
    end_time_change(data) {
      this.end_time = cloneDeep(data)
    },
    cyclicTypeChange(e) {
      this.cyclicType = e.target.value
    }
  }
}
</script>
