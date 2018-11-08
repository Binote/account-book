<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
<template>
    <div class="layout" style="height:100%">
        <Layout style="height:100%">
            <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="/statistical" theme="dark" width="auto" :class="menuitemClasses"
                @on-select="handleMenu">
                    <MenuItem name="/statistical">
                        <Icon type="md-stats" />
                        <span>统计</span>
                    </MenuItem>
                    <MenuItem name="/diesel_acc">
                        <Icon type="ios-list-box" />
                        <span>加油记账</span>
                    </MenuItem>
                    <MenuItem name="/driver">
                        <Icon type="md-people" />
                        <span>司机管理</span>
                    </MenuItem>
                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout>
                <Header class="layout-header-bar"></Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '400px'}">
                    <slot/>
                </Content>
                <!-- 返回到顶端 -->
                <BackTop></BackTop>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
      data () {
        return {
          isCollapsed: false
        }
      },
      computed: {
        menuitemClasses: function () {
          return [
            'menu-item',
            this.isCollapsed ? 'collapsed-menu' : ''
          ]
        }
      },
      methods: {
        handleMenu (name) {
          this.$router.push({
            path: name
          })
        }
      }
    }
</script>
