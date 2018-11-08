<template>
  <div id="app">
    <router-view></router-view>
    <router-view name="layout">

        <transition name="fadeTran">
          <keep-alive>
            <router-view name="content"></router-view>
          </keep-alive>
        </transition>

      </router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="less">
ol, ul, li {
  list-style: none;
}

caption, th, td {
  text-align: left;
  font-weight: normal;
  vertical-align: middle;
}

q, blockquote {
  quotes: none;
}
q:before, q:after, blockquote:before, blockquote:after {
  content: "";
  content: none;
}

a img {
  border: none;
}

a {
  color: #000000;
}

.clearfix:after {
  content: " ";
  display: block;
  height: 0;
  clear: both;
}
.clearfix {
zoom: 1;
}
.pull-right {
  float: right;
}
// add button
.clearfix .add-btn {
  margin-bottom: 10px;
  // float: right;
}
.edit-wrapper {
  padding: 20px;
}
.error-pre {
  color: #c7254e;
  background-color: #f9f2f4;
  box-shadow: 0 1px 4px rgba(0,0,0,.1);
}
.select-wrapper {
  margin-bottom: 10px;
}
.select-wrapper-col {
  padding-right: 1em;
  padding-bottom: 4px;
}
.ivu-input-wrapper .ivu-input[disabled],.ivu-input-number-input[disabled] {
  color: #777777
}
.text-center{
  text-align: center
}
.hr {
  border: 1px solid #e4e4e4;
  margin: 10px 0;
}
.hr-fff {
  border: 1px solid #ffffff;
}
.ivu-table-row-highlight td {
  background-color: #2d8cf0 !important;
}
@media print {
  .noprint{ display:none;}
}

.input-uppercase .ivu-input {
  text-transform: uppercase
}
  /* CSS */
html,body{
  height: 100%;
  width: 100%;
}
#app {
  position: relative;
  height: 100%;
  width: 100%;
}
.fadeTran-enter-active {
  transition: all 1s;
}
.fadeTran-enter {
  transform: translateX(-40px);
  opacity: 0;
}
</style>
