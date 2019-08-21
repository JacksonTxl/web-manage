<template>
  <st-modal
    title="添加用户体测"
    @ok="save"
    v-model="show"
    size="small"
    class="add-lateral-recording"
  >
    <st-form :form="form" labelWidth="90px">
      <a-row :gutter="8" class="mg-t8">
        <a-col :lg="24">
          <st-form-item label="体测时间">
            <a-date-picker
              format="YYYY-MM-DD"
              style="width:100%"
              placeholder="请选择时间"
              v-decorator="decorators.test_time"
            />
          </st-form-item>
        </a-col>
      </a-row>
      <st-form-item label="身高">
        <a-input type="number" :min="0" v-decorator="decorators.height">
          <div slot="addonAfter" class="st-form-item-unit">cm</div>
        </a-input>
      </st-form-item>
      <st-form-item label="体重">
        <a-input type="number" :min="0" v-decorator="decorators.weight">
          <div slot="addonAfter" class="st-form-item-unit">kg</div>
        </a-input>
      </st-form-item>
      <st-form-item label="体脂率">
        <a-input type="number" :min="0" v-decorator="decorators.body_fat_rate">
          <div slot="addonAfter" class="st-form-item-unit">%</div>
        </a-input>
      </st-form-item>
      <st-form-item label="基础代谢">
        <a-input
          type="number"
          :min="0"
          v-decorator="decorators.basal_metabolism"
        >
          <div slot="addonAfter" class="st-form-item-unit">kcal</div>
        </a-input>
      </st-form-item>
      <st-form-item label="脂肪含量">
        <a-input type="number" :min="0" v-decorator="decorators.fat_content">
          <div slot="addonAfter" class="st-form-item-unit">kg</div>
        </a-input>
      </st-form-item>
      <st-form-item label="骨骼肌含量">
        <a-input
          type="number"
          :min="0"
          v-decorator="decorators.skeletal_muscle_content"
        >
          <div slot="addonAfter" class="st-form-item-unit">kg</div>
        </a-input>
      </st-form-item>
      <st-form-item label="胸围">
        <a-input type="number" :min="0" v-decorator="decorators.bust">
          <div slot="addonAfter" class="st-form-item-unit">cm</div>
        </a-input>
      </st-form-item>
      <st-form-item label="腰围">
        <a-input type="number" :min="0" v-decorator="decorators.namwaistlinee">
          <div slot="addonAfter" class="st-form-item-unit">cm</div>
        </a-input>
      </st-form-item>
      <st-form-item label="臀围">
        <a-input type="number" :min="0" v-decorator="decorators.hipline">
          <div slot="addonAfter" class="st-form-item-unit">cm</div>
        </a-input>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { AddLateralRecordingService } from './add-lateral-recording.service'
import { ruleOptions } from './add-lateral-recording.config'
export default {
  serviceInject() {
    return {
      Service: AddLateralRecordingService
    }
  },
  name: 'addFollowRecords',

  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false
    }
  },
  methods: {
    getMemberFollowHistory(data) {
      let self = this
      self.Service.getAddMemberPhysical(data).subscribe(state => {
        self.getData = state.info
        self.$emit('done', true)
        self.show = false
      })
    },

    save(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        values.id = this.$route.query.id
        this.getMemberFollowHistory(values)
      })
    }
  },

  watch: {}
}
</script>
