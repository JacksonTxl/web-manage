<template>
  <st-modal
    title="三体云顶服务协议"
    class="modal-team-order-setting"
    v-model="show"
  >
    <div>
      <a-row :gutter="24" class="mg-t16">
        <a-col :lg="8">
          本服务条款是三体云动SaaS管理系统（www.styd.cn以下称为“三体云动”、“本系统”）的经营者三体云智能科技有限公司与本系统使用者（下称为“用户”），共同缔结的对双方具有约束力的有效契约。三体云动向用户提供本系统上所展示的产品与服务（下称“三体云动服务”、“本服务”），并将不断更新服务内容，最新的三体云动服务以本系统上的相关产品及服务介绍的页面展示以及向用户实际提供的为准。
        </a-col>
        <a-col :lg="8">
          <st-info>
            <st-info-item label="1、总则">
              1.1、
              您确认：您在使用本服务之前，已经充分阅读、理解并接受本服务条款的全部内容，一旦您选择“同意”并完成注册流程或使用本服务，即表示您同意遵循本服务条款之所有约定。
            </st-info-item>
            <st-info-item label="">
              1.2、
              您同意：三体云动有权随时对本服务条款及相应的服务规则内容进行单方面的变更，并有权以消息推送、网页公告等方式予以公布，而无需另行单独通知您；若您在本服务条款内容公告变更后继续使用本服务的，表示您已充分阅读、理解并接受修改后的协议内容，也将遵循修改后的条款内容使用本服务；若您不同意修改后的服务条款，您应立即停止使用本服务。
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </div>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      messageService: MessageService
    }
  },
  rxState() {
    return {}
  },
  data() {
    return {
      show: false
    }
  },
  created() {},
  methods: {
    onCheckboxChange(index) {}
  }
}
</script>
