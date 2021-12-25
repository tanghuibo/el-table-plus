<template>
  <div style="position: relative;">
    <TableSetting :dataSource="storeKey" :wholeList="wholeHeadList" v-if="wholeHeadListInit" @change="changeHeadList" style="position: absolute;top: 0px;z-index: 999;right: 10px;"></TableSetting>
    <el-table v-on="$listeners" v-bind="$attrs">
      <ElTableWarpper ref="tableWarpper" @output="changeWholeHeadList">
        <slot />
      </ElTableWarpper>
    </el-table>
  </div>
</template>

<script>
import TableSetting from "./TableSetting";
import ElTableWarpper from "./ElTableWarpper";
export default {
  name: "el-table-plus",
  components: {
    TableSetting,
    ElTableWarpper,
  },
  props: {
    storeKey: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      wholeHeadList: [],
      wholeHeadListInit: false,
    };
  },
  methods: {
    changeHeadList(headList) {
      this.$refs.tableWarpper.setHeadList(headList);
    },
    changeWholeHeadList(wholeHeadList) {
      this.wholeHeadListInit = false;
      this.$nextTick(() => {
        this.wholeHeadList = wholeHeadList;
        this.wholeHeadListInit = true;
      });
    },
  },
};
</script>

<style></style>
