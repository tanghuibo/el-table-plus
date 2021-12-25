<template>
  <div>
    <el-table-plus :data="data">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="code" label="编码"></el-table-column>
      <el-table-column prop="key" label="键"></el-table-column>
    </el-table-plus>
  </div>
</template>

<script>
import ElTablePlus from './components/ElTablePlus.vue';
export default {
  components: {
    ElTablePlus
  },
  data() {
    return {
      data: (() => {
        let list = [];
        for (let i = 0; i < 10; i++) {
          list.push({ id: i, name: "名称" + i, code: "编码" + i, key: "键" + i });
        }
        return list;
      })(),
    };
  },
};
</script>

<style>
</style>