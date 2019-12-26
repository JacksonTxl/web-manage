<template>
  <st-panel-layout class="page-team-info">
    <div :class="b('title-action')">
      <st-t3 :class="b('title')">
        {{ groupCourseHeaderInfo.course_name }}
      </st-t3>
      <div>
        <st-button type="primary" @click="onGoEdit" v-if="auth.edit">
          编辑
        </st-button>
        <a-dropdown type="primary" class="mg-r24 mg-l16">
          <a-menu slot="overlay">
            <a-menu-item key="1" v-if="auth.refund" @click="onGoOrder()">
              去退款
            </a-menu-item>
            <a-menu-item key="2" v-if="auth.finish" @click="onBeGroup">
              立即成班
            </a-menu-item>
            <a-menu-item key="2" v-if="auth.del">
              <st-popconfirm
                :title="
                  '一旦删除则无法恢复，确认删除' +
                    groupCourseHeaderInfo.course_name +
                    '？'
                "
                @confirm="onDelGroup()"
              >
                删除
              </st-popconfirm>
            </a-menu-item>
            <a-menu-item key="2" v-if="auth.publish" @click="onPublish">
              发布
            </a-menu-item>
          </a-menu>
          <a-button type="primary">
            更多
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>
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
              {{ item.name }}
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
            <span class="value">{{ groupCourseHeaderInfo.num_limit }}</span>
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
import { CLASS_STATUS } from '@/constants/course/small-course'
export default {
  bem: {
    b: 'page-group-course-info'
  },
  name: 'TeamCourseInfo',
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  rxState() {
    return {
      groupCourseHeaderInfo: this.infoService.groupCourseHeaderInfo$,
      auth: this.infoService.auth$
    }
  },
  computed: {
    image() {
      return (
        this.groupCourseHeaderInfo && this.groupCourseHeaderInfo.image.image_key
      )
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
            query: { courseId: this.$searchQuery.courseId }
          }
        },
        {
          label: '班级信息',
          route: {
            name: 'shop-product-course-manage-small-course-info-class',
            query: { courseId: this.$searchQuery.courseId }
          }
        }
      ]
    }
  },
  methods: {
    onGoOrder() {
      this.$router.push({
        path: '/shop/stat/order',
        query: this.$searchQuery
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
          this.$router.reload()
        })
    },
    onDelGroup() {
      this.infoService
        .deleteGroup(this.groupCourseHeaderInfo.course_id)
        .subscribe(() => {
          this.$router.reload()
        })
    },
    onPublish() {
      this.infoService
        .publish(this.groupCourseHeaderInfo.course_id)
        .subscribe(() => {
          this.$router.reload()
        })
    }
  }
}
</script>
