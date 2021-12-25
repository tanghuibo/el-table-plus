# el-table-plus

element-ui table 组件 增强版

## 使用

引入 `el-table-plus` 替换 `el-table`, 并设置 `storeKey`; storeKey 用作存储表格信息的唯一标识, 不同的表格需要有不同的 storeKey。

```html
<el-table-plus :data="data" storeKey="table_1">
  <el-table-column prop="id" label="id"></el-table-column>
  <el-table-column prop="name" label="名称"></el-table-column>
  <el-table-column prop="code" label="编码"></el-table-column>
  <el-table-column prop="key" label="键"></el-table-column>
</el-table-plus>
```

## 功能

### 自定义表头

可以控制展示哪些表头、通过拖拽控制表头顺序

![demo.gif](./screenshots/demo.gif)
