<template>
  <st-modal
    title="选择团课"
    v-model='show'>
    <div :class="course()">
      <div :class="course('search')">
        <a-select :class="course('search-select')" defaultValue="lucy">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
        </a-select>
        <st-input-search :class="course('search-input')" placeholder="请输入课程名称进行查询"/>
      </div>
      <div :class="course('all-table')">
        <table>
          <colgroup>
            <col style="width:26%;">
            <col style="width:22%;">
            <col style="width:31%;">
            <col style="width:21%;">
          </colgroup>
          <tr class="bg-thead">
            <th class="pl-24">课程类别</th>
            <th>课程类型</th>
            <th>课程名称</th>
            <th>操作</th>
          </tr>
          <tbody>
            <tr>
              <td colspan="4">
                <ul :class="course('scroll-content')" v-scrollBar='false'>
                  <li class="table-item" v-for="(item,index) in course_list" :class="{'bg-row-odd':index%2===0,'bg-row-even':index%2!==0}" :key="index">
                    <div class="pl-24">{{item.course_category}}</div>
                    <div>{{item.course_type}}</div>
                    <div>{{item.course_name}}</div>
                    <div><a href="javascript:void(0)">添加</a></div>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p :class="course('count')">
        <span>共查到20条记录</span>
        <a href="javascript:void(0)">全部添加</a>
      </p>
      <p :class="course('selet-course-title')">已选定2种课程</p>
      <div :class="course('select-table')">
        <table>
          <colgroup>
            <col style="width:26%;">
            <col style="width:22%;">
            <col style="width:31%;">
            <col style="width:21%;">
          </colgroup>
          <tr class="bg-thead">
            <th class="pl-24">课程类别</th>
            <th>课程类型</th>
            <th>课程名称</th>
            <th>操作</th>
          </tr>
          <tbody>
            <tr>
              <td colspan="4">
                <ul :class="course('scroll-content')" v-scrollBar='false'>
                  <li class="table-item" v-for="(item,index) in course_list" :class="{'bg-row-odd':index%2===0,'bg-row-even':index%2!==0}" :key="index">
                    <div class="pl-24">{{item.course_category}}</div>
                    <div>{{item.course_type}}</div>
                    <div>{{item.course_name}}</div>
                    <div><a href="javascript:void(0)">添加</a></div>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </st-modal>
</template>
<script>
export default {
  bem: {
    course: 'st-select-course'
  },
  data() {
    return {
      show: false,
      course_list: [
        {
          course_id: 1,
          course_name: '团体课测试',
          course_category: '团体课程',
          course_type: '测试课程类型2'
        },
        {
          course_id: 2,
          course_name: '团体课测试1',
          course_category: '团体课程',
          course_type: '测试课程类型2'
        },
        {
          course_id: 3,
          course_name: '团体课测试1',
          course_category: '团体课程',
          course_type: '测试课程类型2'
        },
        {
          course_id: 4,
          course_name: '团体课测试1',
          course_category: '团体课程',
          course_type: '测试课程类型2'
        },
        {
          course_id: 5,
          course_name: '团体课测试1',
          course_category: '团体课程',
          course_type: '测试课程类型2'
        },
        {
          course_id: 6,
          course_name: '团体课测试1',
          course_category: '团体课程',
          course_type: '测试课程类型2'
        },
        {
          course_id: 7,
          course_name: '团体课测试1',
          course_category: '团体课程',
          course_type: '测试课程类型2'
        }
      ]
    }
  }
}
</script>
