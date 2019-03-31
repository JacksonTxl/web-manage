<template>
    <div>
        <st-form>
          <st-form-section>
            <div class="sg-box">block 拉到本块到1144px看对齐效果</div>
            <a-row :gutter="8">
              <a-col :span="1"
                v-for="n in 24"
                :key="n">
                <div class="sg-box">{{n}}</div>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :lg="10"
                :xs="22"
                :offset="1">
                <st-form-item label="员工头像">
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
                <st-form-item label="姓名" required>
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
                <st-form-item label="手机号" required>
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
                <st-form-item label="性别" required>
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
              </a-col>
              <a-col :lg="10"
                :xs="22"
                :offset="1">
                <st-form-item label="员工人脸">
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
                <st-form-item label="昵称" required>
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
                <st-form-item label="工号" >
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
                <st-form-item label="证件" >
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="8">
              <a-col :offset="1"
                :lg="22">
                <st-hr></st-hr>
              </a-col>
            </a-row>

            <a-row :gutter="8">
              <a-col :offset="1"
                :lg="22">
                <st-form-item required
                  label='复选'>
                  <span slot="label">
                    身份&nbsp;
                    <a-tooltip placement="right"
                      title="What do you want others to call you?">
                      <st-icon type="anticon:question-circle-o" />
                    </a-tooltip>
                  </span>
                  <a-checkbox-group v-model="checkbox1">
                    <a-checkbox value="1">普通员工</a-checkbox>
                    <a-checkbox value="2">会籍销售</a-checkbox>
                    <a-checkbox value="3">团课教练</a-checkbox>
                    <a-checkbox value="4">私人教练</a-checkbox>
                    <a-checkbox value="5">游泳教练</a-checkbox>
                  </a-checkbox-group>
                </st-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :lg="10"
                :xs="22"
                :offset="1">
                <st-form-item label="部门">
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
                <st-form-item label="教练等级" >
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
                <st-form-item label="入职时间" >
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
                <st-form-item label="所属门店" >
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
              </a-col>
              <a-col :lg="10"
                :xs="22"
                :offset="2">
                <st-form-item label="职务">
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
                <st-form-item label="昵称" >
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
                <st-form-item label="工号" >
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
                <st-form-item label="证件" >
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :offset="1"
                :lg="22">
                <st-form-item
                  label='复选'>
                  <span slot="label">
                    多选&nbsp;
                    <a-tooltip placement="right"
                      title="What do you want others to call you?">
                      <st-icon type="anticon:question-circle-o" />
                    </a-tooltip>
                  </span>
                  <a-checkbox-group v-model="checkbox1">
                    <a-checkbox value="1">单车</a-checkbox>
                    <a-checkbox value="2">瑜伽</a-checkbox>
                    <a-checkbox value="3">舞蹈</a-checkbox>
                    <a-checkbox value="4">拳击/舞蹈</a-checkbox>
                    <a-checkbox value="5">杠铃</a-checkbox>
                    <a-checkbox value="6">踏板</a-checkbox>
                    <a-checkbox value="7">高强度间歇训练</a-checkbox>
                  </a-checkbox-group>
                  {{checkbox1}}
                </st-form-item>
                <st-form-item
                  label='单选'>
                  <span slot="label">
                    单选&nbsp;
                    <a-tooltip title="What do you want others to call you?">
                      <st-icon type="anticon:question-circle-o" />
                    </a-tooltip>
                  </span>
                  <a-radio-group v-model="radio1">
                    <a-radio value="1">单车</a-radio>
                    <a-radio value="2">瑜伽</a-radio>
                    <a-radio value="3">舞蹈</a-radio>
                    <a-radio value="4">拳击/舞蹈</a-radio>
                    <a-radio value="5">杠铃</a-radio>
                  </a-radio-group>
                  {{radio1}}
                </st-form-item>
              </a-col>
            </a-row>
          </st-form-section>
          <st-form-section title="售卖设置">这是第二个</st-form-section>
          <st-form-section title="售卖设置">
            <a-row :gutter="8">
              <a-col :lg="12"
                :offset="1">
                <st-form-item labelOffset>
                  <st-button @click="save">保存</st-button>
                  <st-button type="primary" @click="goNext">继续，填写</st-button>
                </st-form-item>
              </a-col>
            </a-row>
          </st-form-section>
        </st-form>

    </div>
</template>
<script>
export default {
  name: 'StaffDetailBasics',
  methods: {
    goNext() {
      let data = {
        isGoNext: true
      }
      this.$emit('goNext', data)
    },
    save() {

    }
  }
}
</script>
