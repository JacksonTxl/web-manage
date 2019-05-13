<template>
  <st-modal title="添加跟进记录" @ok="save" v-model="show" size="small">
    <st-form :form="form" labelWidth="90px">
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="跟进记录">
            <a-textarea
              placeholder="填写跟进方式"
              :autosize="{ minRows:3, maxRows: 6 }"
              v-decorator="basicInfoRuleList.follow_content"
            />
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="跟进方式">
            <a-select placeholder="请选择跟进方式" v-decorator="basicInfoRuleList.follow_way">
              <a-select-option :value="1">电话</a-select-option>
              <a-select-option :value="2">微信</a-select-option>
              <a-select-option :value="3">客户到访</a-select-option>
              <a-select-option :value="4">上门拜访</a-select-option>
            </a-select>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="跟进状态">
            <a-select placeholder="请选择跟进状态" v-decorator="basicInfoRuleList.follow_status">
              <a-select-option :value="1">已电话</a-select-option>
              <a-select-option :value="2">已邀约</a-select-option>
              <a-select-option :value="3">邀约成功</a-select-option>
              <a-select-option :value="4">实际到访</a-select-option>
              <a-select-option :value="5">已签约</a-select-option>
              <a-select-option :value="6">已购卡</a-select-option>
            </a-select>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="下次跟进时间">
            <a-date-picker
              @change="onChange"
              style="width:100%"
              placeholder="请选择下次跟进时间"
              v-decorator="basicInfoRuleList.follow_next_time"
            />
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>
<script>
import { AddFollowRecordsService } from './add-follow-records.service'

export default {
  serviceInject() {
    return {
      Service: AddFollowRecordsService
    }
  },
  name: 'addFollowRecords',
  props: {
    // record: {
    //   type: Object,
    //   default:{}
    // }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      show: false,
      basicInfoRuleList: {
        follow_way: ['follow_way'],
        follow_status: ['follow_status'],
        follow_next_time: ['follow_next_time'],
        follow_content: [
          'follow_content',
          {
            rules: [
              {
                required: true,
                message: '请填写跟进内容'
              }
            ]
          }
        ]
      },
      follow_next_time: undefined
    }
  },
  created() {
    // this.getMemberBuy()
  },
  methods: {
    onChange(date, dateString) {
      this.follow_next_time = dateString
    },
    getMemberFollowHistory(data) {
      let self = this
      self.Service.getMemberFollowHistory(self.$route.query.id, data).subscribe(
        state => {
          console.log(state.info)
          self.getData = state.info
          self.show = false
          self.$emit('done', true)
        }
      )
    },

    save(e) {
      e.preventDefault()
      let self = this
      this.form.validateFields((err, values) => {
        values.follow_next_time = this.follow_next_time
        console.log(err, values)
        if (!err) {
          self.getMemberFollowHistory(values)
        }
      })
    },
    onccccChange(date, dateString) {
      console.log(date, dateString)
    }
  },

  watch: {}
}
</script>
