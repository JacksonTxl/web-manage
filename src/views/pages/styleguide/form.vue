<template>
  <div>
    <h3 class="mg-t32">按钮样式复选st-checkbox-button-group</h3>
    <section>
      <st-form>
        <st-form-item label="营业时间">
          <st-checkbox-button-group v-model="checkBoxModel1">
            <st-checkbox-button-item disabled
              value="1">周一</st-checkbox-button-item>
            <st-checkbox-button-item value="2">周二</st-checkbox-button-item>
            <st-checkbox-button-item value="3">周三</st-checkbox-button-item>
            <st-checkbox-button-item value="4">周四</st-checkbox-button-item>
            <st-checkbox-button-item value="5">周五</st-checkbox-button-item>
            <st-checkbox-button-item value="6">周六</st-checkbox-button-item>
            <st-checkbox-button-item value="7">周日</st-checkbox-button-item>
          </st-checkbox-button-group>
          {{checkBoxModel1}}
        </st-form-item>
      </st-form>
    </section>

    <h3 class="mg-t24">按钮样式复选st-checkbox-button-group</h3>
    <section>
      <st-checkbox-facility-group v-model="checkBoxModel2">
        <st-checkbox-facility-item disabled
          value="wechat"
          icon="wechat"
          label="wifi"></st-checkbox-facility-item>
        <st-checkbox-facility-item value="weibo"
          icon="weibo"
          label="weibo"></st-checkbox-facility-item>
        <st-checkbox-facility-item value="home"
          icon="home"
          label="home"></st-checkbox-facility-item>
      </st-checkbox-facility-group>
      {{checkBoxModel2}}
    </section>

    <h3 class="mg-t24">One Col 单栏表单</h3>
    <ul>
      默认表单项目fabel与input项的间距已调整,使用a-row gutter=8 和 a-col lg=10
      <li>使用st-form-item 作为表单项容器 用法同a-form-item</li>
      <li>表单label与input区域间隔固定为24px</li>
      <li>label默认定宽为88px两个格子宽度</li>
      <li>保存按钮等带有标签间隔的使用st-form-item 的labelOffset属性</li>
    </ul>
    <section class="sg-app-content">
      <st-panel initial>
        <st-form>
          <st-form-section title="基础设置">
            <div class="sg-box">block 拉到本块到1144px看对齐效果</div>
            <a-row :gutter="8">
              <a-col :span="1"
                v-for="n in 24"
                :key="n">
                <div class="sg-box">{{n}}</div>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :lg="12"
                :xs="22"
                :offset="1">
                <st-form-item label="从业时间"
                  validate-status="error"
                  has-feedback
                  help="Should be combination of numbers & alphabets"
                  required>
                  <a-date-picker style="width:100%"
                    placeholder="请选择日期"></a-date-picker>
                </st-form-item>
                <st-form-item label="文本框"
                  required>
                  <a-input placeholder="填写点什么吧"></a-input>
                </st-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :offset="1"
                :lg="22">
                <st-form-item required
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
                <st-form-item required
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
                  <st-button type="primary">保存</st-button>
                </st-form-item>
              </a-col>
            </a-row>
          </st-form-section>
        </st-form>
      </st-panel>
    </section>

    <section class="mg-t16">
      <h3>Form Two Cols 多栏目表单</h3>
      <p>
        row的gutter固定为8 col的lg=10
        分割线使用 st-hr 分割线上下margin为32px
      </p>
      <div class="sg-app-content">
        <st-panel>
          <st-form>
            <a-row :gutter="8">
              <a-col :lg="10"
                :xs='22'
                :offset="1">
                <st-form-item label="员工头像">
                  <a-upload style="width:164px;display:inline-block;height:164px;"
                    type="drag">
                    <st-icon type="anticon:plus"></st-icon>
                  </a-upload>
                </st-form-item>
                <st-form-item label="姓名"
                  required>
                  <a-input placeholder="姓名"></a-input>
                </st-form-item>
                <st-form-item label="手机号"
                  required>
                  <a-input-group compact>
                    <a-select style="width: 20%"
                      defaultValue="+86">
                      <a-select-option value="86">+86</a-select-option>
                    </a-select>
                    <a-input style="width:80%"
                      placeholder="手机号"></a-input>
                  </a-input-group>
                </st-form-item>
                <st-form-item label="性别"
                  required>
                  <a-input placeholder="性别"></a-input>
                </st-form-item>
              </a-col>
              <a-col :lg="10"
                :xs='22'
                :offset="1">
                <st-form-item label="员工头像">
                  <a-upload style="width:164px;display:inline-block;height:164px;"
                    type="drag">
                    <st-icon type="anticon:plus"></st-icon>
                  </a-upload>
                </st-form-item>
                <st-form-item label="姓名"
                  required>
                  <a-input placeholder="姓名"></a-input>
                </st-form-item>
                <st-form-item label="手机号"
                  required>
                  <a-input-group compact>
                    <a-select style="width: 20%"
                      defaultValue="+86">
                      <a-select-option value="86">+86</a-select-option>
                    </a-select>
                    <a-input style="width:80%"
                      placeholder="手机号"></a-input>
                  </a-input-group>
                </st-form-item>
                <st-form-item label="程程时长"
                  required>
                  <a-input defaultValue="mySite"
                    placeholder='输入时间'>
                    <div slot="addonAfter"
                      style='width:50px'>
                      分钟
                    </div>
                  </a-input>
                </st-form-item>
                <st-form-item label="参考定价"
                  required>
                  <a-input defaultValue="mySite"
                    placeholder='输入时间'>
                    <div slot="addonAfter"
                      style='width:50px'>
                      元/节
                    </div>
                  </a-input>
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
              <a-col :offset="1">
                <st-form-item labelOffset>
                  <st-button type="primary"
                    ghost>保存</st-button>
                  <st-button class="mg-l16"
                    type="primary">继续 填写</st-button>
                </st-form-item>
              </a-col>
            </a-row>
          </st-form>
        </st-panel>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkBoxModel1: [],
      checkBoxModel2: [],
      checkbox1: [],
      radio1: ''
    }
  }
}
</script>
