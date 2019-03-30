<template>
  <div>
    <h3 class="mg-t32">按钮样式复选st-checkbox-button-group</h3>
    <section>
      <a-form class="st-form">
        <a-form-item label="营业时间">
          <st-checkbox-button-group v-model="checkBoxModel1">
            <st-checkbox-button-item disabled value="1">周一</st-checkbox-button-item>
            <st-checkbox-button-item value="2">周二</st-checkbox-button-item>
            <st-checkbox-button-item value="3">周三</st-checkbox-button-item>
            <st-checkbox-button-item value="4">周四</st-checkbox-button-item>
            <st-checkbox-button-item value="5">周五</st-checkbox-button-item>
            <st-checkbox-button-item value="6">周六</st-checkbox-button-item>
            <st-checkbox-button-item value="7">周日</st-checkbox-button-item>
          </st-checkbox-button-group>
          {{checkBoxModel1}}
        </a-form-item>
      </a-form>
    </section>

    <h3 class="mg-t24">按钮样式复选st-checkbox-button-group</h3>
    <section>
      <st-checkbox-facility-group v-model="checkBoxModel2">
        <st-checkbox-facility-item disabled value="wechat" icon="wechat" label="wifi"></st-checkbox-facility-item>
        <st-checkbox-facility-item value="weibo" icon="weibo" label="weibo"></st-checkbox-facility-item>
        <st-checkbox-facility-item value="home" icon="home" label="home"></st-checkbox-facility-item>
      </st-checkbox-facility-group>
      {{checkBoxModel2}}
    </section>

    <h3 class="mg-t24">One Col 单栏表单</h3>
    <ul>
      默认表单项目fabel与input项的间距已调整,使用a-row gutter=8 和 a-col lg=10
      务必添加st-form类使label样式生效
      <li>表单label与input区域间隔固定为24px</li>
      <li>label默认定宽为88px两个格子宽度</li>
      <li>使用.st-form__offset-label修正按钮位置margin-left</li>
    </ul>
    <section class="sg-app-content">
      <div class="st-panel">
        <a-form class="st-form st-form--is-label-3">
          <div class="st-panel__header">
            <st-t1>基础信息</st-t1>
          </div>
          <div class="st-panel__body">
            <div class="sg-box">block 拉到本块到1144px看对齐效果</div>
            <a-row :gutter="8">
              <a-col :span="1" v-for="n in 24" :key="n">
                <div class="sg-box">{{n}}</div>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :lg="10" :xs="22" :offset="1">
                <a-form-item
                  label="从业时间"
                  validate-status="error"
                  has-feedback
                  help="Should be combination of numbers & alphabets"
                  required
                >
                  <a-date-picker placeholder="请选择日期"></a-date-picker>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :lg="21" :offset="1">
                <a-form-item required>
                  <span slot="label">
                    多选&nbsp;
                    <a-tooltip placement="right" title="What do you want others to call you?">
                      <st-icon type="anticon:question-circle-o"/>
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
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :lg="20" :offset="1">
                <a-form-item required>
                  <span slot="label">
                    单选&nbsp;
                    <a-tooltip title="What do you want others to call you?">
                      <st-icon type="anticon:question-circle-o"/>
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
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :lg="10" :offset="1">
                <a-form-item label="专业认证" required>
                  <a-select>
                    <a-select-option value=".com">.com</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :lg="10" :offset="1">
                <a-form-item label="个人经历" required>
                  <a-textarea rows="5" placeholder="请输入员工简洁"></a-textarea>
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <div class="st-panel__header">
            <st-t1>售卖设置</st-t1>
          </div>
          <div class="st-panel__body"></div>
          <div class="st-panel__header">
            <st-t1>更多设置</st-t1>
          </div>
          <div class="st-panel__body">
            <a-row :gutter="8" class="mg-b0">
              <a-col :offset="1" :lg="10">
                <st-button class="st-form__offset-label" type="primary">提交</st-button>
                <st-button type="primary" ghost class="mg-l16">保存 继续</st-button>
              </a-col>
            </a-row>
          </div>
        </a-form>
      </div>
    </section>

    <section class="mg-t16">
      <h3>Form Two Cols 多栏目表单</h3>
      <p>
        row的gutter固定为8 col的lg=10 使用st-form__offset-label 修正保存按钮等的margin-left
        分割线使用 st-hr
      </p>
      <div class="sg-app-content">
        <div class="st-panel">
          <div class="st-panel__body">
            <a-form class="st-form">
              <a-row :gutter="8">
                <a-col :lg="10" :offset="1">
                  <a-form-item label="员工头像">
                    <a-upload style="width:164px;display:inline-block;height:164px;" type="drag">
                      <st-icon type="anticon:plus"></st-icon>
                    </a-upload>
                  </a-form-item>
                  <a-form-item label="姓名" required>
                    <a-input placeholder="姓名"></a-input>
                  </a-form-item>
                  <a-form-item label="手机号" required>
                    <a-input-group compact>
                      <a-select style="width: 20%" defaultValue="+86">
                        <a-select-option value="86">+86</a-select-option>
                      </a-select>
                      <a-input style="width:80%" placeholder="手机号"></a-input>
                    </a-input-group>
                  </a-form-item>
                  <a-form-item label="性别" required>
                    <a-input placeholder="性别"></a-input>
                  </a-form-item>
                </a-col>
                <a-col :lg="10" :offset="1">
                  <a-form-item label="员工头像">
                    <a-upload style="width:164px;display:inline-block;height:164px;" type="drag">
                      <st-icon type="anticon:plus"></st-icon>
                    </a-upload>
                  </a-form-item>
                  <a-form-item label="姓名" required>
                    <a-input placeholder="姓名"></a-input>
                  </a-form-item>
                  <a-form-item label="手机号" required>
                    <a-input-group compact>
                      <a-select style="width: 20%" defaultValue="+86">
                        <a-select-option value="86">+86</a-select-option>
                      </a-select>
                      <a-input style="width:80%" placeholder="手机号"></a-input>
                    </a-input-group>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="8">
                <a-col :offset="1" :lg="22">
                  <st-hr></st-hr>
                </a-col>
              </a-row>
              <a-row :gutter="8" class="mg-t24">
                <a-col :offset="1">
                  <st-button class="st-form__offset-label" type="primary" ghost>保存</st-button>
                  <st-button class="mg-l16" type="primary">继续 填写</st-button>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </div>
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
