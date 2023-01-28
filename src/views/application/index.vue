<template>
  <div class="index flex flex-between">
    <div class="left-serve">
      <div class="serve">
        <div class="title">已开通</div>
        <div class="record" @click="router.push('/application/record')">开通记录</div>
        <br />
        <div
          v-if="data.dataList.openProductList && data.dataList.openProductList.length > 0"
          class="flex flex-only-center flex-wrap"
        >
          <div
            v-for="(item, index) of data.dataList.openProductList"
            :key="index"
            class="content flex flex-only-center"
            @click="goUrl(item.productUrl)"
          >
            <div :class="item.iconUri ? 'serve-logo' : ' serve-logo serve-text'">
              <img v-if="item.iconUri" :src="item.iconUri" :alt="item.productName" />
              <span v-else>{{ item.productName.substr(0, 1) }}</span>
            </div>
            <div class="flex flex-between flex-column">
              <p>{{ item.productName }}</p>
              <p class="time">开通日期：{{ timeText(item.beginTime) }} 至 {{ timeText(item.endTime) }}</p>
            </div>
          </div>
        </div>
        <Empty v-else />
      </div>
      <div class="serve">
        <div class="title">未开通</div>
        <br />
        <el-tabs v-if="data.classify.dataList" v-model="data.activeName" @tab-click="handleClick">
          <el-tab-pane
            v-for="(item, index) of data.classify.dataList"
            :key="index"
            :label="item.categoryName"
            :name="item.id"
          ></el-tab-pane>
        </el-tabs>
        <br />
        <template v-if="data.dataList.data">
          <template v-for="(item, index) of data.dataList.data" :key="index">
            <div class="flex flex-only-center flex-wrap">
              <template v-for="(list, i) of item" :key="i">
                <div
                  v-if="data.activeName == list.id"
                  class="content flex flex-only-center flex-between"
                  @click="router.push('/application/opened?id=' + list.productNo)"
                >
                  <div class="flex flex-only-center">
                    <div :class="list.iconUri ? 'serve-logo' : ' serve-logo serve-text'">
                      <img v-if="list.iconUri" :src="list.iconUri" :alt="list.productName" />
                      <span v-else>{{ list.productName.substr(0, 1) }}</span>
                    </div>
                    <div class="shorten">{{ list.productName }}</div>
                  </div>
                  <div class="detail">查看详情</div>
                </div>
              </template>
            </div>
          </template>
        </template>
        <Empty v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import api from '@/api/application'
import Empty from '@/components/Empty/index.vue'

const router = useRouter()

const data = reactive({
  activeName: '',
  page: {
    count: 0,
    orderBy: '',
    pageNum: 1,
    pageSize: 10,
    returnCount: true
  },
  dataList: <any>{},
  classify: <any>{},
  classifyData: <any>{}
})

onMounted(() => {
  // 获取列表
  getList()
})

const goUrl = (url: string) => {
  location.href = url
}

// 切换标签
const handleClick = (tab: any) => {
  data.activeName = tab.props.name
}

const timeText = (value: any) => {
  var time = new Date(value)

  function add0(m: any) {
    return m < 10 ? '0' + m : m
  }

  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var mm = time.getMinutes()
  var s = time.getSeconds()
  var timeResult = y + '-' + add0(m) + '-' + add0(d)
  if (timeResult === '1970-01-01' || timeResult === '1970-01-02') {
    return '--'
  } else {
    return timeResult
  }
}

// 开通列表
const getList = async () => {
  // 未开通
  const res = await api.UserProductActivedListInquiry({
    subjectId: Cookies.get('entityId'),
    userId: Cookies.get('userId')
  })
  if (res.status.success) {
    data.dataList = res.body
  }
  // 分类
  const classify = await api.ProductCategoryListInquiry({})
  if (classify.status.success) {
    data.classify = classify.body
    if (classify.body.dataList) {
      data.activeName = classify.body.dataList[0].id
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  .shorten {
    width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /*autoprefixer: on */
  }
  .record {
    width: 104px;
    height: 38px;
    background: #3c7dff;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 20px;
    top: 30px;
    cursor: pointer;
  }
  .title {
    color: #121212;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;
    &::before {
      content: '';
      width: 4px;
      height: 18px;
      margin-right: 6px;
      display: inline-block;
      vertical-align: text-bottom;
      background-color: #3c7dff;
    }
  }
  .left-serve {
    width: 100%;
    min-width: 350px;
    .serve {
      padding: 30px;
      margin-bottom: 20px;
      box-sizing: border-box;
      background-color: #fff;
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
      position: relative;
      .content {
        width: 32.2%;
        padding: 10px;
        cursor: pointer;
        color: #121212;
        font-size: 14px;
        font-weight: 500;
        border-radius: 4px;
        margin-right: 10px;
        margin-bottom: 10px;
        background-color: #fff;
        border: 1px solid rgba(217, 217, 217, 0.5);
        transition: all 0.3s;
        -ms-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -webkit-transition: all 0.3s;
        -o-transition: all 0.3s;
        transform: translateY(0px);
        -moz-transform: translateY(0px);
        -o-transform: translateY(0px);
        -webkit-transform: translateY(0px);
        &:hover {
          color: #3c7dff;
          border-color: #3c7dff;
          transform: translateY(-2px);
          -moz-transform: translateY(-2px);
          -o-transform: translateY(-2px);
          -webkit-transform: translateY(-2px);
        }
        .serve-text {
          background-color: #3c7dff;
        }
        .serve-logo {
          width: 44px;
          height: 44px;
          color: #fff;
          font-size: 24px;
          font-weight: 600;
          line-height: 44px;
          border-radius: 4px;
          text-align: center;
          margin-right: 10px;
          img {
            width: 44px;
            height: 44px;
            border-radius: 4px;
          }
        }
        .time {
          font-size: 12px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.45);
        }
        .detail {
          width: 72px;
          height: 28px;
          cursor: pointer;
          font-size: 12px;
          color: #3c7dff;
          line-height: 28px;
          border-radius: 2px;
          text-align: center;
          border: 1px solid #3c7dff;
        }
      }
      .no-serve {
        color: #999;
        font-size: 16px;
        text-align: center;
        i {
          width: 100px;
          height: 100px;
          margin: 0 auto;
          display: block;
          background: url('../../assets/imgs/no-team.png') no-repeat 0 0;
          background-size: 100%;
        }
      }
    }
  }
}
</style>
