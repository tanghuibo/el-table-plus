<template>
  <div>
    <el-table-plus border :data="data" storeKey="table_1">
      <el-table-column min-width="100" fixed prop="id" label="id"></el-table-column>
      <el-table-column min-width="200" prop="name" label="姓名"></el-table-column>
      <el-table-column min-width="200" prop="vipLevel" label="会员等级">
        <template scope="{row}">
          <div>
            <el-tag type="success" v-if="row.vipLevel === 3">至尊 VIP</el-tag>
            <el-tag type="danger" v-if="row.vipLevel === 2">高级 VIP</el-tag>
            <el-tag type="warning" v-if="row.vipLevel === 1">普通 VIP</el-tag>
            <el-tag type="info" v-if="row.vipLevel === 0">非 VIP</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="100" prop="sex" label="性别"></el-table-column>
      <el-table-column min-width="200" prop="birthday" label="生日"></el-table-column>
      <el-table-column min-width="200" prop="company" label="公司"></el-table-column>
      <el-table-column min-width="200" prop="phone" label="电话"></el-table-column>
      <el-table-column min-width="200" prop="mail" label="邮箱"></el-table-column>
      <el-table-column min-width="300" prop="address" label="住址"></el-table-column>
      <el-table-column min-width="200" fixed="right" label="操作">
        <template>
          <div>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table-plus>
  </div>
</template>

<script>
import ElTablePlus from "./components/ElTablePlus.vue";
export default {
  components: {
    ElTablePlus,
  },
  data() {
    return {
      data: [
        {
          id: 1,
          name: "张三",
          sex: "男",
          birthday: "1994-05-07",
          vipLevel: 3,
          company: "新狼",
          phone: "138****1231",
          mail: "zhang****@qq.com",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          name: "王小妹",
          sex: "女",
          birthday: "1994-12-17",
          vipLevel: 1,
          company: "阿狸",
          phone: "139****1211",
          mail: "wang****@qq.com",
          address: "北京市朝阳区",
        },
        {
          id: 3,
          name: "马策东",
          sex: "男",
          birthday: "1988-01-16",
          vipLevel: 2,
          company: "网亦",
          phone: "187****5322",
          mail: "1333****@163.com",
          address: "河南省郑州市",
        },
      ],
    };
  },
};
</script>

<style>
</style>