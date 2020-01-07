<template>
  <st-panel-layout class="page-team-info">
    <div :class="b('title-action')">
      <st-t3 :class="b('title')">
        {{ groupCourseHeaderInfo.course_name }}
      </st-t3>
      <st-btn-actions :options="btnOptions"></st-btn-actions>
    </div>
    <div class="mg-b24 header">
      <div :class="b('left')" class="mg-r24">
        <div :class="b('tip')">
          <div class="item">
            <span class="label">开班时间:</span>
            <span class="value">{{ groupCourseHeaderInfo.course_time }}</span>
          </div>
          <div class="item">
            <span class="label ">报名人数:</span>
            <span class="value">{{ groupCourseHeaderInfo.apply_num }}人</span>
          </div>
        </div>
        <div :class="b('tip')">
          <div class="item">
            <span class="label">人数限制:</span>
            <span class="value">{{ groupCourseHeaderInfo.num_limit }}</span>
          </div>
          <div class="item">
            <span class="label ">适用范围:</span>
            <span
              class="value"
              :key="item.id"
              v-for="item in groupCourseHeaderInfo.scope_application"
            >
              {{ item.setting_name }}
            </span>
          </div>
        </div>
        <div :class="b('tip')">
          <div class="item">
            <span class="label">负责人:</span>
            <span class="value">{{ groupCourseHeaderInfo.charge_person }}</span>
          </div>
          <div class="item">
            <span class="label ">总课时:</span>
            <span class="value">{{ groupCourseHeaderInfo.course_times }}</span>
          </div>
        </div>
      </div>
      <div :class="b('right')" v-viewer="{ url: 'data-src' }">
        <img
          :src="image | imgFilter({ w: 560, h: 320, type: 'course' })"
          :data-src="image | imgFilter({ w: 1000, type: 'course' })"
          :alt="groupCourseHeaderInfo.course_name"
        />
      </div>
    </div>
    <st-panel app :tabs="tabs">
      <div slot="actions"></div>
      <router-view></router-view>
    </st-panel>
  </st-panel-layout>
</template>
<script>
import { InfoService } from './info.service'
import { MessageService } from '@/services/message.service'

import { CLASS_STATUS } from '@/constants/course/small-course'
export default {
  bem: {
    b: 'page-group-course-info'
  },
  name: 'SmallCourseInfo',
  serviceInject() {
    return {
      infoService: InfoService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      groupCourseHeaderInfo: this.infoService.groupCourseHeaderInfo$
    }
  },
  computed: {
    image() {
      return (
        this.groupCourseHeaderInfo && this.groupCourseHeaderInfo.image.image_key
      )
    },
    btnOptions() {
      return [
        {
          text: '编辑',
          click: this.onGoEdit,
          if: this.groupCourseHeaderInfo.auth[
            'shop:product:small_class_course|edit'
          ]
        },
        {
          text: '去退款',
          click: this.onGoOrder,
          if: this.groupCourseHeaderInfo.auth[
            'shop:product:small_class_course|refund'
          ]
        },
        {
          text: '立即成班',
          click: this.onBeGroup,
          if: this.groupCourseHeaderInfo.auth[
            'shop:product:small_class_course|finish'
          ]
        },
        {
          text: '删除',
          click: this.onDelGroup,
          if: this.groupCourseHeaderInfo.auth[
            'shop:product:small_class_course|del'
          ]
        },
        {
          text: '发布',
          click: this.onPublish,
          if: this.groupCourseHeaderInfo.auth[
            'shop:product:small_class_course|publish'
          ]
        }
      ]
    }
  },
  data() {
    return {
      CLASS_STATUS,
      tabs: [
        {
          label: '基础信息',
          route: {
            name: 'shop-product-course-manage-small-course-info-basic',
            query: {
              courseId: this.$searchQuery.courseId,
              status: this.groupCourseHeaderInfo.class_status
            }
          }
        },
        {
          label: '班级信息',
          route: {
            name: 'shop-product-course-manage-small-course-info-class',
            query: {
              courseId: this.$searchQuery.courseId,
              status: this.groupCourseHeaderInfo.class_status
            }
          }
        }
      ]
    }
  },
  methods: {
    onGoOrder() {
      this.$router.push({
        path: '/shop/sold/course/list/small-course',
        query: {
          course_id: this.groupCourseHeaderInfo.course_id
        }
      })
    },
    onGoEdit() {
      this.$router.push({
        path: '/shop/product/course/manage/small-course/edit',
        query: {
          id: this.groupCourseHeaderInfo.course_id,
          type: this.groupCourseHeaderInfo.small_course_type
        }
      })
    },
    onBeGroup() {
      this.infoService
        .beGroup(this.groupCourseHeaderInfo.course_id)
        .subscribe(() => {
          this.messageService.success({ content: '状态已变更成功' })
          this.$router.reload()
        })
    },
    onDelGroup() {
      const that = this
      this.$confirm({
        title: '提示',
        content: '一旦删除则无法恢复，确认删除吗',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          that.infoService
            .deleteGroup(that.groupCourseHeaderInfo.course_id)
            .subscribe(() => {
              that.$router.push({
                path: '/shop/product/course/manage/small-course/list'
              })
            })
        },
        onCancel() {}
      })
    },
    onPublish() {
      this.infoService
        .publish(this.groupCourseHeaderInfo.course_id)
        .subscribe(() => {
          this.messageService.success({ content: '状态已变更成功' })
          this.$router.reload()
        })
    }
  }
}
</script>
