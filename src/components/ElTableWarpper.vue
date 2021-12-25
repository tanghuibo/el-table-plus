<template>
  <div>
    <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
  </div>
</template>

<script>
let tableIdSeed = 1;
export default {
  computed: {
    owner() {
      let parent = this.$parent;
      while (parent && !parent.tableId) {
        parent = parent.$parent;
      }
      return parent;
    },
  },
  data() {
    return {
      tableId: "el-table-warpper_" + tableIdSeed++,
      leftColumList: [],
      allowSortColumList: [],
      rightColumList: [],
      columnConfigList: [],
      allowSortPropMap: {},
      mountedOver: false,
      store: {
        commit: (...args) => {
          let [command, ...columnConfig] = args;
          if (command === "insertColumn") {
            let { property, label, fixed, type } = columnConfig[0];
            if (fixed == null || fixed === "false" || fixed === false) {
              fixed = false;
            } else if (fixed === "true" || fixed === true) {
              fixed = "left";
            } else {
              fixed = "right";
            }
            let columnInex = columnConfig[1];
            this.columnConfigList.push({
              prop: property,
              label,
              fixed,
              type,
              columnInex,
              show: true,
              data: columnConfig,
            });
          }

          if (command === "removeColumn") {
            let { property } = columnConfig[0];
            delete this.allowSortPropMap[property];
            for (let i = 0; i < this.columnConfigList.length; i++) {
              if (this.columnConfigList[i].prop === property) {
                this.removeColumn(this.columnConfigList[i].data);
                this.columnConfigList.splice(i, 1);
                break;
              }
            }
          }

          if(this.mountedOver === true) {
            this.dataInit();
          }
        },
      },
    };
  },
  mounted() {
    this.dataInit();
    this.mountedOver = true;
  },
  methods: {
    dataInit() {
      this.allowSortPropMap = {};
      this.allowSortColumList = [];
      this.leftColumList = [];
      this.rightColumList = [];
      for (let i = 0; i < this.columnConfigList.length; i++) {
        let columnConfig = this.columnConfigList[i];
        let { type, label, prop } = columnConfig;
        if (
          type != "default" ||
          label == null ||
          label === "" ||
          prop == null ||
          prop === "" ||
          label === "操作"
        ) {
          if (i < this.columnConfigList.length / 2) {
            this.leftColumList.push(columnConfig);
          } else {
            this.rightColumList.push(columnConfig);
          }
          continue;
        }
        this.allowSortColumList.push(columnConfig);
        this.allowSortPropMap[columnConfig.prop] = columnConfig;
      }
      this.$emit(
        "output",
        this.allowSortColumList.map(({ label, prop, fixed }) => ({
          label,
          prop,
          fixed,
          show: true,
        }))
      );
    },
    removeColumn(data) {
      this.owner.store.commit("removeColumn", data[0], data[2]);
    },
    insertColumn(index, data) {
      this.owner.store.commit("insertColumn", data[0], index, data[2]);
    },
    setHeadList(headList) {
      for (let columnConfig of this.leftColumList) {
        this.removeColumn(columnConfig);
      }
      for (let columnConfig of this.allowSortColumList) {
        this.removeColumn(columnConfig);
      }
      for (let columnConfig of this.rightColumList) {
        this.removeColumn(columnConfig);
      }

      let index = 0;
      for (let columnConfig of this.leftColumList) {
        this.insertColumn(index, columnConfig.data);
        index++;
      }

      for (let head of headList) {
        let { prop, fixed } = head;
        let columnConfig = this.allowSortPropMap[prop];
        if (columnConfig == null) {
          continue;
        }
        columnConfig.data[0].fixed = fixed;
        this.insertColumn(index, columnConfig.data);
        index++;
      }

      for (let columnConfig of this.rightColumList) {
        this.insertColumn(index, columnConfig.data);
        index++;
      }
    },
  },
};
</script>

<style></style>
