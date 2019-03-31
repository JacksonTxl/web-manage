<template>
  <st-form>
    <!-- <div class="sg-box">block 拉到本块到1144px看对齐效果</div> -->
    <!-- <a-row :gutter="8">
      <a-col :span="1"
        v-for="n in 24"
        :key="n">
        <div class="sg-box">{{n}}</div>
      </a-col>
    </a-row> -->
    <a-row :gutter="8">
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="员工头像">
          <a-upload style="width:164px;display:inline-block;height:164px;"
            type="drag">
            <st-icon type="anticon:plus"></st-icon>
          </a-upload>
        </st-form-item>
        <st-form-item label="姓名" required>
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="手机号" required>
          <a-input-group compact>
            <a-select defaultValue="Option1">
              <a-select-option value="Option1">+86</a-select-option>
            </a-select>
            <a-input style="width: 50%" defaultValue="input content" />
          </a-input-group>
        </st-form-item>
        <st-form-item label="性别" required>
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
      </a-col>
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="员工人脸">
          <a-upload style="width:164px;display:inline-block;height:164px;"
            type="drag">
            <st-icon type="anticon:plus"></st-icon>
          </a-upload>
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
        <st-form-item
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
        <st-form-item label="工作性质" >
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="角色" >
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
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="系统权限">
          <a-checkbox value="1">开通系统使用权限</a-checkbox>
        </st-form-item>
        <st-form-item label="登录账号" required>
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="登录密码" required>
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
        <st-form-item label="确认密码" required>
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>
      </a-col>
      <a-col :lg="10"
        :xs="22"
        :offset="2">
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
            @click="goNext"
            type="primary">继续 填写</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
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
