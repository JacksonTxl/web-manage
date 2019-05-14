<template>
  <st-modal title="添加用户体测" @ok="save" v-model="show" size="small" class="add-lateral-recording">
    <st-form :form="form" labelWidth="90px">
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="体测时间">
            <a-date-picker
              format="YYYY-MM-DD"
              @change="onChange"
              style="width:100%"
              placeholder="请选择时间"
              v-decorator="basicInfoRuleList.test_time"
            />
          </st-form-item>
        </a-col>
      </a-row>
      <st-form-item label="身高">
        <a-input type="number" :min="0" v-decorator="basicInfoRuleList.height">
          <div slot="addonAfter" class="st-form-item-unit">cm</div>
        </a-input>
      </st-form-item>
      <st-form-item label="体重">
        <a-input type="number" :min="0" v-decorator="basicInfoRuleList.weight">
          <div slot="addonAfter" class="st-form-item-unit">kg</div>
        </a-input>
      </st-form-item>
      <st-form-item label="体脂率">
        <a-input type="number" :min="0" v-decorator="basicInfoRuleList.body_fat_rate">
          <div slot="addonAfter" class="st-form-item-unit">%</div>
        </a-input>
      </st-form-item>
      <st-form-item label="基础代谢">
        <a-input type="number" :min="0" v-decorator="basicInfoRuleList.basal_metabolism">
          <div slot="addonAfter" class="st-form-item-unit">kcal</div>
        </a-input>
      </st-form-item>
      <st-form-item label="脂肪含量">
        <a-input type="number" :min="0" v-decorator="basicInfoRuleList.fat_content">
          <div slot="addonAfter" class="st-form-item-unit">kg</div>
        </a-input>
      </st-form-item>
      <st-form-item label="骨骼肌含量">
        <a-input type="number" :min="0" v-decorator="basicInfoRuleList.skeletal_muscle_content">
          <div slot="addonAfter" class="st-form-item-unit">kg</div>
        </a-input>
      </st-form-item>
      <st-form-item label="胸围">
        <a-input type="number" :min="0" v-decorator="basicInfoRuleList.bust">
          <div slot="addonAfter" class="st-form-item-unit">cm</div>
        </a-input>
      </st-form-item>
      <st-form-item label="腰围">
        <a-input type="number" :min="0" v-decorator="basicInfoRuleList.namwaistlinee">
          <div slot="addonAfter" class="st-form-item-unit">cm</div>
        </a-input>
      </st-form-item>
      <st-form-item label="臀围">
        <a-input type="number" :min="0" v-decorator="basicInfoRuleList.hipline">
          <div slot="addonAfter" class="st-form-item-unit">cm</div>
        </a-input>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { AddLateralRecordingService } from './add-lateral-recording.service'

export default {
  serviceInject() {
    return {
      Service: AddLateralRecordingService
    }
  },
  name: 'addFollowRecords',
  props: {
    // record: {
    //   type: Object,
    //   default: {}
    // }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      show: false,
      basicInfoRuleList: {
        height: ['height'],
        weight: ['weight'],
        body_fat_rate: ['body_fat_rate'],
        basal_metabolism: ['basal_metabolism'],
        fat_content: ['fat_content'],
        skeletal_muscle_content: ['skeletal_muscle_content'],
        bust: ['bust'],
        namwaistlinee: ['namwaistlinee'],
        hipline: ['hipline'],
        id: ['id'],
        test_time: [
          'test_time',
          {
            rules: [
              {
                required: true,
                message: '请填写时间'
              }
            ]
          }
        ]
      },
      test_time: undefined
    }
  },
  created() {
    // this.getMemberBuy()
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString)
      this.test_time = dateString
    },
    getMemberFollowHistory(data) {
      let self = this
      self.Service.getAddMemberPhysical(data).subscribe(
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
        values.test_time = this.test_time
        values.id = self.$route.query.id
        console.log(err, values)

        if (!err) {
          self.getMemberFollowHistory(values)
        }
      })
    }
  },

  watch: {}
}
</script>
