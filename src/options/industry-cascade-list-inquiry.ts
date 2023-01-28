const industryList = [
  {
    value: '1',
    label: '农、林、牧、渔业',
    children: [
      {
        value: '21',
        label: '农业',
        children: null
      },
      {
        value: '22',
        label: '林业',
        children: null
      },
      {
        value: '23',
        label: '畜牧业',
        children: null
      },
      {
        value: '24',
        label: '渔业',
        children: null
      },
      {
        value: '25',
        label: '农、林、牧、渔专业及辅助性活动',
        children: null
      }
    ]
  },
  {
    value: '2',
    label: '采矿业',
    children: [
      {
        value: '26',
        label: '煤炭开采和洗选业',
        children: null
      },
      {
        value: '27',
        label: '石油和天然气开采业',
        children: null
      },
      {
        value: '28',
        label: '黑色金属矿采选业',
        children: null
      },
      {
        value: '29',
        label: '有色金属矿采选业',
        children: null
      },
      {
        value: '30',
        label: '非金属矿采选业',
        children: null
      },
      {
        value: '31',
        label: '开采专业及辅助性活动',
        children: null
      },
      {
        value: '32',
        label: '其他采矿业',
        children: null
      }
    ]
  },
  {
    value: '3',
    label: '制造业',
    children: [
      {
        value: '33',
        label: '农副食品加工业',
        children: null
      },
      {
        value: '34',
        label: '食品制造业',
        children: null
      },
      {
        value: '35',
        label: '酒、饮料及精制茶制造业',
        children: null
      },
      {
        value: '36',
        label: '烟草制品业 ',
        children: null
      },
      {
        value: '37',
        label: '纺织业',
        children: null
      },
      {
        value: '38',
        label: '纺织服装、服饰业',
        children: null
      },
      {
        value: '39',
        label: '皮革、毛皮、羽毛及其制品和制鞋业',
        children: null
      },
      {
        value: '40',
        label: '木材加工和木、竹、藤、棕、草制品业',
        children: null
      },
      {
        value: '41',
        label: '家具制造业 ',
        children: null
      },
      {
        value: '42',
        label: '造纸和纸制品业 ',
        children: null
      },
      {
        value: '43',
        label: '印刷和记录媒介复制业',
        children: null
      },
      {
        value: '44',
        label: '文教、工美、体育和娱乐用品制造业',
        children: null
      },
      {
        value: '45',
        label: '石油、煤炭及其他燃料加工业 ',
        children: null
      },
      {
        value: '46',
        label: '化学原料和化学制品制造业',
        children: null
      },
      {
        value: '47',
        label: '医药制造业 ',
        children: null
      },
      {
        value: '48',
        label: '化学纤维制造业',
        children: null
      },
      {
        value: '49',
        label: '橡胶和塑料制品业',
        children: null
      },
      {
        value: '50',
        label: '非金属矿物制品业',
        children: null
      },
      {
        value: '51',
        label: '黑色金属冶炼和压延加工业 ',
        children: null
      },
      {
        value: '52',
        label: '有色金属冶炼和压延加工业 ',
        children: null
      },
      {
        value: '53',
        label: '金属制品业 ',
        children: null
      },
      {
        value: '54',
        label: '通用设备制造业',
        children: null
      },
      {
        value: '55',
        label: '专用设备制造业 ',
        children: null
      },
      {
        value: '56',
        label: '汽车制造业',
        children: null
      },
      {
        value: '57',
        label: '铁路、船舶、航空航天和其他运输设备制造业',
        children: null
      },
      {
        value: '58',
        label: '电气机械和器材制造业 ',
        children: null
      },
      {
        value: '59',
        label: '计算机、通信和其他电子设备制造业',
        children: null
      },
      {
        value: '60',
        label: '仪器仪表制造业',
        children: null
      },
      {
        value: '61',
        label: '其他制造业',
        children: null
      },
      {
        value: '62',
        label: '废弃资源综合利用业',
        children: null
      },
      {
        value: '63',
        label: '金属制品、机械和设备修理业',
        children: null
      }
    ]
  },
  {
    value: '4',
    label: '电力、热力、燃气及水生产和供应业',
    children: [
      {
        value: '64',
        label: '电力、热力生产和供应业',
        children: null
      },
      {
        value: '65',
        label: '燃气生产和供应业',
        children: null
      },
      {
        value: '66',
        label: '水的生产和供应业',
        children: null
      }
    ]
  },
  {
    value: '5',
    label: '建筑业',
    children: [
      {
        value: '67',
        label: '房屋建筑业',
        children: null
      },
      {
        value: '68',
        label: '土木工程建筑业',
        children: null
      },
      {
        value: '69',
        label: '建筑安装业',
        children: null
      },
      {
        value: '70',
        label: '建筑装饰、装修和其他建筑业',
        children: null
      }
    ]
  },
  {
    value: '6',
    label: '批发和零售业',
    children: [
      {
        value: '71',
        label: '批发业',
        children: null
      },
      {
        value: '72',
        label: '零售业',
        children: null
      }
    ]
  },
  {
    value: '7',
    label: '交通运输、仓储和邮政业',
    children: [
      {
        value: '73',
        label: '铁路运输业',
        children: null
      },
      {
        value: '74',
        label: '道路运输业',
        children: null
      },
      {
        value: '75',
        label: '水上运输业',
        children: null
      },
      {
        value: '76',
        label: '航空运输业 ',
        children: null
      },
      {
        value: '77',
        label: '管道运输业 ',
        children: null
      },
      {
        value: '78',
        label: '多式联运和运输代理业',
        children: null
      },
      {
        value: '79',
        label: '装卸搬运和仓储业 ',
        children: null
      },
      {
        value: '80',
        label: '邮政业',
        children: null
      }
    ]
  },
  {
    value: '8',
    label: '住宿和餐饮业',
    children: [
      {
        value: '81',
        label: '住宿业',
        children: null
      },
      {
        value: '82',
        label: '餐饮业',
        children: null
      }
    ]
  },
  {
    value: '9',
    label: '信息传输、软件和信息技术服务业',
    children: [
      {
        value: '83',
        label: '电信、广播电视和卫星传输服务',
        children: null
      },
      {
        value: '84',
        label: '互联网和相关服务',
        children: null
      },
      {
        value: '85',
        label: '软件和信息技术服务业',
        children: null
      }
    ]
  },
  {
    value: '10',
    label: '金融业',
    children: [
      {
        value: '86',
        label: '货币金融服务',
        children: null
      },
      {
        value: '87',
        label: '资本市场服务',
        children: null
      },
      {
        value: '88',
        label: '保险业',
        children: null
      },
      {
        value: '89',
        label: '其他金融业',
        children: null
      }
    ]
  },
  {
    value: '11',
    label: '房地产业',
    children: [
      {
        value: '90',
        label: '房地产业',
        children: null
      }
    ]
  },
  {
    value: '12',
    label: '租赁和商务服务业',
    children: [
      {
        value: '91',
        label: '租赁业',
        children: null
      },
      {
        value: '92',
        label: '商务服务业',
        children: null
      }
    ]
  },
  {
    value: '13',
    label: '科学研究和技术服务业',
    children: [
      {
        value: '93',
        label: '研究和试验发展',
        children: null
      },
      {
        value: '94',
        label: '专业技术服务业',
        children: null
      },
      {
        value: '95',
        label: '科技推广和应用服务',
        children: null
      }
    ]
  },
  {
    value: '14',
    label: '水利、环境和公共设施管理业',
    children: [
      {
        value: '96',
        label: '水利管理业',
        children: null
      },
      {
        value: '97',
        label: '生态保护和环境治理业',
        children: null
      },
      {
        value: '98',
        label: '公共设施管理业',
        children: null
      },
      {
        value: '99',
        label: '土地管理业',
        children: null
      }
    ]
  },
  {
    value: '15',
    label: '居民服务、修理和其他服务业',
    children: [
      {
        value: '100',
        label: '居民服务业',
        children: null
      },
      {
        value: '101',
        label: '机动车、电子产品和日用产品修理业',
        children: null
      },
      {
        value: '102',
        label: '其他服务业',
        children: null
      }
    ]
  },
  {
    value: '16',
    label: '教育',
    children: [
      {
        value: '103',
        label: '教育',
        children: null
      }
    ]
  },
  {
    value: '17',
    label: '卫生和社会工作',
    children: [
      {
        value: '104',
        label: '卫生',
        children: null
      },
      {
        value: '105',
        label: '社会工作',
        children: null
      }
    ]
  },
  {
    value: '18',
    label: '文化、体育和娱乐业',
    children: [
      {
        value: '106',
        label: '新闻和出版业',
        children: null
      },
      {
        value: '107',
        label: '广播、电视、电影和影视录音制作业',
        children: null
      },
      {
        value: '108',
        label: '文化艺术业',
        children: null
      },
      {
        value: '109',
        label: '体育',
        children: null
      },
      {
        value: '110',
        label: '娱乐业',
        children: null
      }
    ]
  },
  {
    value: '19',
    label: '公共管理、社会保障和社会组织',
    children: [
      {
        value: '111',
        label: '中国共产党机关',
        children: null
      },
      {
        value: '112',
        label: '国家机构',
        children: null
      },
      {
        value: '113',
        label: '人民政协、民主党派',
        children: null
      },
      {
        value: '114',
        label: '社会保障',
        children: null
      },
      {
        value: '115',
        label: '群众团体、社会团体和其他成员组织',
        children: null
      },
      {
        value: '116',
        label: '基层群众自治组织及其他组织',
        children: null
      }
    ]
  },
  {
    value: '20',
    label: '国际组织',
    children: [
      {
        value: '117',
        label: '国际组织',
        children: null
      }
    ]
  }
]

export default industryList
