<template>
  <st-modal
    title="解除门店关系"
    size="small"
    v-model="show"
    class="model-leave-store-container"
    :footer="false"
  >
    <a-row :gutter="8">
      <a-col :lg="24">
        <template v-for="item in data.identity">
          <st-tag :key="item" v-if="item === 4" class="mg-r4" type="coach-personal"/>
          <st-tag :key="item" v-if="item === 3" class="mg-r4" type="coach-team"/>
          <st-tag :key="item" v-if="item === 1" class="mg-r4" type="role-staff"/>
          <st-tag :key="item" v-if="item === 2" class="mg-r4" type="role-saler"/>
        </template>
        <span>{{ data.staff_name }}</span>
      </a-col>
    </a-row>
    <template v-if="list.length === 0">
      <a-row :gutter="8" class="mg-t16">
        <a-col :lg="24">
          <p class="model-leave-store-container_tip">确认此员工不在{{'门店名称'}}进行相关工作</p>
        </a-col>
        <a-row :gutter="8" class="mg-t16">
          <a-col :lg="24" style="text-align: right;">
            <st-button class="mg-r8" @click="onCancel">取消</st-button>
            <st-button type="primary" @click="onSubmit">确认</st-button>
          </a-col>
        </a-row>
      </a-row>
    </template>
    <template v-if="list.length > 0">
      <a-row :gutter="8" class="mg-t16" v-if="list.length !== 0">
        <a-col :lg="24">
          <div class="model-leave-store-container_info">
            <div class="model-leave-store-container_same mg-b8">该员工在本门店还有未完成的事项，无法解除</div>
            <template v-for="item in list">
              <div :key="item.type" class="model-leave-store-container_same mg-b8">
                {{ item.num }}节未完成{{ item.name }}，
                <a href="javascript:;">查看详情</a>
              </div>
            </template>
          </div>
        </a-col>
      </a-row>

      <a-row :gutter="8">
        <a-col :lg="24" style="text-align: right;">
          <st-button type="primary" @click="onCancel">知道了</st-button>
        </a-col>
      </a-row>
    </template>
  </st-modal>
</template>
<script>
import { LeaveStoreService } from './leave-current-store.service'
import { MessageService } from '@/services/message.service'

export default {
  serviceInject() {
    return {
      service: LeaveStoreService,
      message: MessageService
    }
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      list: []
    }
  },
  mounted() {
    this.service.getInfo(1).subscribe(res => {
      console.log(res)
      this.list = res.list
    })
  },
  methods: {
    onCancel() {
      this.show = false
    },
    onSubmit() {
      this.service.leaveStore(1).subscribe(res => {
        console.log(res)
        this.message.success({ content: '解除门店关系成功' })
        this.show = false
      })
    }
  }
}
</script>
