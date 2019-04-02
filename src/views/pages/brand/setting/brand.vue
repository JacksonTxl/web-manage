<template>
  <div class="page-brandSetting">
    <st-panel app>
      <div>品牌设置</div>
      <a-row :gutter="8">
        <a-col :span="14" :push="5" align="center">
          <img src="../../../../assets/img/logo.png">
          <p>三体云动</p>
          <p><i></i>已认证</p>
          <p align="left">三体云动是三体云智能科技有限公司旗下品牌。成立于2015年，总部位于上海。三体云动以健身SaaS管理系统及营 销服务为依托，专注于物联网硬件和门店大数据技术研发，全力打造“SaaS+物联网+大数据”三位一体的线下门店智 能生态闭环，实现“管店”、“管钱”、“管员工”、“管会员”的全流程智能数字化，并在业务发展上向大生活服务的全 领域拓展。</p>
          <p>胡蓉</p>
          <p>186 6666 6666</p>
          <st-button type="primary" ghost class="st-btn__edit">编辑</st-button>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :span="10" :push="7">
          <st-form>
            <st-form-item label="品牌logo">
              <a-upload
                style="width:100px;display:inline-block;height:100px;"
                type="drag"
              >
                <st-icon type="anticon:plus"></st-icon>
                <div class="ant-upload-text">上传logo</div>
              </a-upload>
            </st-form-item>
            <st-form-item label="品牌名称">
              <a-input placeholder="请输入品牌名称"></a-input>
            </st-form-item>
            <st-form-item label="品牌介绍">
              <a-textarea placeholder="height:180"></a-textarea>
            </st-form-item>
            <st-form-item label="联系人">
              <a-input placeholder="请输入联系人"></a-input>
            </st-form-item>
            <st-form-item label="联系电话">
              <a-input placeholder="请输入联系电话"></a-input>
            </st-form-item>
          </st-form>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :offset="7">
          <st-form-item labelFix>
            <st-button type="primary" class="st-btn__save">保存</st-button>
          </st-form-item>
        </a-col>
      </a-row>
    </st-panel>
  </div>
</template>
