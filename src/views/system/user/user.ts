import { reactive } from 'vue'

// 邮箱验证
const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === null) {
    callback()
  } else {
    if (value === '') {
      callback()
    } else {
      const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式错误'))
      }
    }
  }
}

const userData = reactive({
  searchForm: [
    // 头部搜索框内容
    {
      type: 'input',
      lable: '用户姓名',
      placeholder: '请输入用户姓名',
      value: '',
      size: 'small',
      tips: '可以根据用户姓名进行模糊查询',
      show: true,
      point: 'userName'
    },
    {
      type: 'input',
      lable: '手机号码',
      placeholder: '请输入手机号码',
      value: '',
      size: 'small',
      tips: '我就是一个简单的提示',
      show: true,
      point: 'mobile'
    }
  ],
  seachOperation: true,
  // table 传入数据
  tableDetail: {
    // 序号开启
    selection: false,
    // 头像开启
    avatar: true,
    dataList: [], // 表格内容
    // 表格标题
    tableLabels: [
      {
        label: '手机号',
        key: 'phone'
      },
      {
        label: '邮箱',
        key: 'email'
      },
      {
        label: '部门',
        key: 'groupName'
      },
      {
        label: '状态',
        key: 'status'
      }
    ],
    // 操作区
    operation: true
  },
  // 批量操作 table 的底部按钮
  batchEvents: [
    {
      text: '批量删除',
      type: 'default',
      interpret: 'batchDelete'
    },
    {
      text: '批量审批',
      type: 'primary',
      interpret: 'batchApprove'
    }
  ],
  // 用户新增
  add: {
    dialog: false,
    title: '新增成员',
    formList: []
  },
  // 用户编辑
  edit: {
    dialog: false,
    title: '',
    pattern: 'edit',
    formList: [
      {
        title: '基础信息',
        list: [
          {
            value: '',
            label: '姓名',
            type: 'input',
            placeholder: '请输入姓名',
            point: 'name',
            rules: [
              { required: true, message: '请输入姓名', trigger: 'blur' },
              { min: 0, max: 40, message: '请输入姓名(最大字数不得超过40字)', trigger: 'blur' }
            ]
          },
          {
            value: '',
            label: '手机号',
            type: 'input',
            inputType: 'number',
            placeholder: '请输入手机号',
            point: 'phone',
            rules: [
              { required: false, message: '请输入手机号', trigger: 'blur' },
              { pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/, message: '手机号码格式错误' }
            ]
          },
          {
            value: '',
            label: '生日',
            type: 'date',
            placeholder: '请选择生日',
            point: 'birthday',
            rules: [{ required: false, message: '请选择生日', trigger: 'blur' }]
          },
          {
            value: '',
            label: '邮箱',
            type: 'input',
            placeholder: '请输入邮箱',
            point: 'email',
            rules: [{ required: false, validator: validateEmail, trigger: 'change' }]
          },
          {
            value: '',
            label: '部门',
            type: 'cascader',
            placeholder: '分配部门',
            point: 'groupId',
            multiple: false,
            rules: [{ required: false, message: '分配部门', trigger: 'change' }],
            options: []
          },
          {
            value: '',
            label: '部门负责人',
            type: 'input',
            placeholder: '部门负责人',
            disabled: true,
            point: 'managerName',
            rules: [{ required: false, message: '部门负责人', trigger: 'change' }]
          },
          {
            value: [],
            label: '角色',
            type: 'select',
            placeholder: '角色',
            point: 'roleId',
            multiple: true,
            rules: [{ required: true, message: '请选择角色', trigger: 'change' }],
            options: []
          },
          {
            value: '',
            label: '职位',
            type: 'input',
            placeholder: '请输入职位',
            point: 'title',
            rules: [
              { required: false, message: '请输入职位', trigger: 'blur' },
              { min: 0, max: 60, message: '最大字符不得超过60个字', trigger: 'blur' }
            ]
          },
          {
            value: '',
            label: '工号',
            type: 'input',
            inputType: 'number',
            placeholder: '请输入工号',
            point: 'jobNo',
            rules: [
              { required: false, message: '请输入工号', trigger: 'blur' },
              { min: 0, max: 10, message: '最大字符不得超过10个字', trigger: 'blur' }
            ]
          }
        ]
      }
    ]
  }
})

export default userData
