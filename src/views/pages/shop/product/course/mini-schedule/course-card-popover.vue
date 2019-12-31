<template>
  <div>
    <a-popover
      title="冲突排期"
      overlayClassName="samll-course-course-card-popover"
      v-model="showFlag"
      placement="bottom"
      v-if="conflict"
    >
      <template slot="content">
        <st-table
          :pagination="false"
          :columns="columns"
          :scroll="{ x: 680 }"
          :dataSource="conflictList"
          rowKey="index"
        ></st-table>
      </template>
      <div :class="[bS('wrapper'), bS('wrapper-conflict')]">
        <div class="eidt-current-course-btns">
          <a href="javascript:;" @click="onEdit">
            <st-icon type="edit" class="edit-course-btn"></st-icon>
          </a>
          <a href="javascript:;" @click="onDelete">
            <st-icon type="delete" class="delete-course-btn"></st-icon>
          </a>
        </div>
        <span class="time">
          <st-icon type="timer"></st-icon>
          {{ cardItem.start_time }}-{{ cardItem.end_time }}
        </span>
        <st-t3 class="course__name">
          {{ cardItem.current_course_name }}
        </st-t3>
        <p class="course__coach">
          {{ $c('coach') }}：
          <span>{{ cardItem.coach_name }}</span>
        </p>
        <p class="course__scene">
          场地：
          <span>{{ cardItem.court_name }}</span>
        </p>
      </div>
    </a-popover>
    <div :class="bS('wrapper')" v-else>
      <div class="eidt-current-course-btns">
        <a href="javascript:;" @click="onEdit">
          <st-icon type="edit" class="edit-course-btn"></st-icon>
        </a>
        <a href="javascript:;" @click="onDelete">
          <st-icon type="delete" class="delete-course-btn"></st-icon>
        </a>
      </div>
      <span class="time">
        <st-icon type="timer"></st-icon>
        {{ cardItem.start_time }}-{{ cardItem.end_time }}
      </span>
      <st-t3 class="course__name">
        {{ cardItem.current_course_name }}
      </st-t3>
      <p class="course__coach">
        {{ $c('coach') }}：
        <span>{{ cardItem.coach_name }}</span>
      </p>
      <p class="course__scene">
        场地：
        <span>{{ cardItem.court_name }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { dateColumns } from './course-card-popover.config.ts'
export default {
  name: 'ModalShopMiniCourseCard',
  bem: {
    bS: 'course-card-schedule'
  },
  props: {
    cardItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      moment: moment,
      showFlag: false,
      columns: dateColumns(this),
      conflict: 0,
      conflictList: []
    }
  },
  created() {
    this.showFlag = this.cardItem.show
    this.conflict = this.cardItem.conflict
    this.conflictList = this.cardItem.conflictList
    console.log(this.conflict)
    console.log(this.conflictList)
  },
  methods: {
    hide() {
      this.showFlag = false
    },
    onEdit() {
      this.$emit('onEditCourse')
    },
    onDelete() {
      this.$emit('onDeleteCourse')
    }
  }
}
</script>
