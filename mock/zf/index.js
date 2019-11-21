module.exports = {
  'GET /_api/v1/course/package/course_all'(req, res) {
    res.status(200).json({
      code: 0,
      msg: 'success',
      data: {
        course_list: [
          { id: 1, name: '设置名称128', parent_id: 0 },
          { id: 2, name: 'aaaaa', parent_id: 0 },
          { id: 3, name: '天天吃肉', parent_id: 0 },
          { id: 44, name: '一把把把把住', parent_id: 1 },
          { id: 120, name: '这个删不掉', parent_id: 1 },
          { id: 122, name: '这个也删不掉', parent_id: 1 },
          { id: 38241416314938, name: '课程类型1', parent_id: 2 },
          { id: 222, name: '团体课', parent_id: 2 },
          { id: 533, name: '新增团体课-测试', parent_id: 3 },
          { id: 611, name: '门店团体课-测试', parent_id: 3 }
        ]
      },
      checkAuth: []
    })
  }
}
