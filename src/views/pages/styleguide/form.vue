<template>
  <div>
    <h3 class="mg-t32">按钮样式复选st-checkbox-button-group</h3>
    <section>
      <st-form>
        <st-form-item label="营业时间">
          <st-checkbox-button-group v-model="checkBoxModel1">
            <st-checkbox-button-item disabled value="1"
              >周一</st-checkbox-button-item
            >
            <st-checkbox-button-item value="2">周二</st-checkbox-button-item>
            <st-checkbox-button-item value="3">周三</st-checkbox-button-item>
            <st-checkbox-button-item value="4">周四</st-checkbox-button-item>
            <st-checkbox-button-item value="5">周五</st-checkbox-button-item>
            <st-checkbox-button-item value="6">周六</st-checkbox-button-item>
            <st-checkbox-button-item value="7">周日</st-checkbox-button-item>
          </st-checkbox-button-group>
          {{ checkBoxModel1 }}
        </st-form-item>
      </st-form>
    </section>

    <h3 class="mg-t24">按钮样式复选st-checkbox-button-group</h3>
    <section>
      <st-checkbox-facility-group v-model="checkBoxModel2">
        <st-checkbox-facility-item
          disabled
          value="wechat"
          icon="wechat"
          label="wifi"
        ></st-checkbox-facility-item>
        <st-checkbox-facility-item
          value="weibo"
          icon="weibo"
          label="weibo"
        ></st-checkbox-facility-item>
        <st-checkbox-facility-item
          value="home"
          icon="home"
          label="home"
        ></st-checkbox-facility-item>
      </st-checkbox-facility-group>
      {{ checkBoxModel2 }}
    </section>

    <h3 class="mg-t24">One Col 单栏表单</h3>
    <ul>
      默认表单项目fabel与input项的间距已调整,使用a-row gutter=8 和 a-col lg=10
      <li>使用st-form-item 作为表单项容器 用法同a-form-item</li>
      <li>表单label与input区域间隔固定为24px</li>
      <li>label默认定宽为88px两个格子宽度</li>
      <li>保存按钮等带有标签间隔的使用st-form-item 的labelFix属性</li>
    </ul>
    <section class="sg-app-content">
      <st-panel initial class="pd-x24">
        <a-row :gutter="8">
          <a-col :span="7">Left</a-col>
          <a-col :span="14">
            <st-form>
              <st-t3 class="mg-y32">基础设置</st-t3>
              <st-form-item label="会员卡类型">
                <a-select placeholder="请输入会员卡类型">
                  <a-select-option value="1">1</a-select-option>
                  <a-select-option value="2">2</a-select-option>
                  <a-select-option value="3">3</a-select-option>
                </a-select>
              </st-form-item>

              <st-form-item label="会员卡名称">
                <a-input placeholder="请输入会员卡名称"></a-input>
              </st-form-item>

              <st-t3 class="mg-y32">售卖设置</st-t3>
              <st-form-item label="支持入场范围">
                <a-checkbox-group>
                  <a-checkbox value="1">单个门店</a-checkbox>
                  <a-checkbox value="2">多个门店</a-checkbox>
                  <a-checkbox value="3">全部门店</a-checkbox>
                </a-checkbox-group>
              </st-form-item>
              <st-form-item label="支持入场范围">
                <a href=""> <st-icon type="anticon:plus"></st-icon>添加门店 </a>
              </st-form-item>

              <st-t3 class="mg-y32">更多设置</st-t3>
              <st-form-item label="卡背景">
                <a-row>
                  <a-col :lg="5">
                    <a-radio-group>
                      <a-radio value="1">默认背景图</a-radio>
                      <a-radio value="2">自定义背景</a-radio>
                    </a-radio-group>
                  </a-col>
                  <a-col :lg="15">
                    <div class="sg-box" style="width:172px;height:94px"></div>
                  </a-col>
                </a-row>
              </st-form-item>
            </st-form>
          </a-col>
        </a-row>
      </st-panel>
    </section>

    <section class="mg-t16">
      <h3>Form Two Cols 多栏目表单</h3>
      <p>
        row的gutter固定为8 col的lg=10 分割线使用 st-hr 分割线上下margin为32px
      </p>
      <div class="sg-app-content">
        <st-panel>
          <st-form>
            <a-row :gutter="8">
              <a-col :lg="10" :xs="22" :offset="1">
                <st-form-item label="员工头像">
                  <a-upload
                    style="width:164px;display:inline-block;height:164px;"
                    type="drag"
                  >
                    <st-icon type="anticon:plus"></st-icon>
                  </a-upload>
                </st-form-item>
                <st-form-item label="姓名" required>
                  <a-input placeholder="姓名"></a-input>
                </st-form-item>
                <st-form-item label="手机号" required>
                  <a-input-group compact>
                    <a-select style="width: 20%" defaultValue="+86">
                      <a-select-option value="86">+86</a-select-option>
                    </a-select>
                    <a-input style="width:80%" placeholder="手机号"></a-input>
                  </a-input-group>
                </st-form-item>
                <st-form-item label="性别" required>
                  <a-input placeholder="性别"></a-input>
                </st-form-item>
              </a-col>
              <a-col :lg="10" :xs="22" :offset="1">
                <st-form-item label="员工头像">
                  <a-upload
                    style="width:164px;display:inline-block;height:164px;"
                    type="drag"
                  >
                    <st-icon type="anticon:plus"></st-icon>
                  </a-upload>
                </st-form-item>
                <st-form-item label="姓名" required>
                  <a-input placeholder="姓名"></a-input>
                </st-form-item>
                <st-form-item label="手机号" required>
                  <a-input-group compact>
                    <a-select style="width: 20%" defaultValue="+86">
                      <a-select-option value="86">+86</a-select-option>
                    </a-select>
                    <a-input style="width:80%" placeholder="手机号"></a-input>
                  </a-input-group>
                </st-form-item>
                <st-form-item label="程程时长" required>
                  <a-input defaultValue="mySite" placeholder="输入时间">
                    <div slot="addonAfter" class="st-form-item-unit">
                      分钟
                    </div>
                  </a-input>
                </st-form-item>
                <st-form-item label="参考定价" required>
                  <a-input defaultValue="mySite" placeholder="输入时间">
                    <div slot="addonAfter" class="st-form-item-unit">
                      元/节
                    </div>
                  </a-input>
                </st-form-item>
                <st-form-item class="mg-b0" label="注意" required>
                  在最后一行st-form-item 添加.mg-b0 修正
                </st-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :offset="1" :lg="22">
                <st-hr></st-hr>
              </a-col>
            </a-row>
            <a-row :gutter="8">
              <a-col :offset="1">
                <st-form-item labelFix>
                  <st-button type="primary" ghost
                    >保存 使用labelFix修正margin-left</st-button
                  >
                  <st-button class="mg-l16" type="primary">继续 填写</st-button>
                </st-form-item>
              </a-col>
            </a-row>
          </st-form>
        </st-panel>
      </div>
    </section>

    <st-t3>单个row实现多栏布局</st-t3>
    <section class="sg-app-content">
      <st-panel>
        <st-form>
          <a-row :gutter="8">
            <a-col :offset="1" :lg="10" :xs="20">
              <st-form-item label="t1">
                <a-input placeholder="测试"></a-input>
              </st-form-item>
            </a-col>
            <a-col :offset="1" :lg="10" :xs="20">
              <st-form-item label="t2">
                <a-input placeholder="测试"></a-input>
              </st-form-item>
            </a-col>
            <a-col :offset="1" :lg="10" :xs="20">
              <st-form-item label="t3">
                <a-input placeholder="测试"></a-input>
              </st-form-item>
            </a-col>
            <a-col :offset="1" :lg="10" :xs="20">
              <st-form-item label="t4">
                <a-input placeholder="测试"></a-input>
              </st-form-item>
            </a-col>
            <a-col :offset="1" :lg="10" :xs="20">
              <st-form-item label="t5">
                <a-input placeholder="测试"></a-input>
              </st-form-item>
            </a-col>
            <a-col :offset="1" :lg="10" :xs="20">
              <st-form-item label="t6">
                <a-input placeholder="测试"></a-input>
              </st-form-item>
            </a-col>
            <a-col :offset="1" :lg="10" :xs="20">
              <st-form-item label="t7" label-gutter="72px">
                <a-input placeholder="测试"></a-input>
              </st-form-item>
            </a-col>
          </a-row>
        </st-form>
      </st-panel>
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
