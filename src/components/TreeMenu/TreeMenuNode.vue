<template>
  <ul v-if="data.childs && data.childs.length > 0" class="subTreeMenu">
    <li class="icon-title" v-if="menuName" v-show="!isExpand">{{menuName}}</li>
    <li v-for="(item, index) in data.childs" @click="item.childs.length || clickMenu(item)" :class="{showMoreMenuAct:item.childs.length > 0,showMoreMenuAct: item.isExpand}" class="subTreeMenu-li" @mouseenter="showSubMenu(item)" @mouseleave="showSubMenu(item)">
      <div class="treeMenu-title" >
       <!-- <Icon :type="item.icon"></Icon>-->
       <span :title="item.title">{{item.menuName}}</span>
        <Icon class="menuArrow" v-if="item.childs && item.childs.length > 0" type="chevron-right"></Icon>
      </div>
      <TreeNodeMenu v-show="item.isExpand" class="more-submenu" :onMenuClick="onMenuClick" :data="item"></TreeNodeMenu>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'TreeNodeMenu',
    props: ['data', 'onMenuClick', 'menuName', 'isExpand', 'getHasOpenTab'],
    data () {
      return {

      }
    },
    methods: {
      clickMenu (item) {
        this.$emit('getHasOpenTab', item.menuId)
     this.onMenuClick(item)

    },
      showSubMenu (item) {
        item.childs.forEach(item => {
          if (item.menuName.length > 8) {
            item.title = item.menuName
        item.menuName = item.menuName.substring(0, 7) + '...';
          }
        })
        item.isExpand = !item.isExpand
    }
    }
  }
</script>

<style lang="less" scoped>
  .subTreeMenu{
    padding: 0;
    box-sizing: border-box;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
    background-color: #fff;
  .icon-title {
    height: 32px;
    padding: 10px 0 5px 15px;
    color: #1a76d2;
  }
  ul, li, div{
    box-sizing: border-box;
    z-index: 999;
  }
  .subTreeMenu-li{
    display: block;
    height: 32px;
    width: 118px;
    z-index: 999;
    position: relative;
    padding-left: 16px;
  .treeMenu-title{
    height: 32px;
   /* width: 118px;*/
    line-height: 32px;
    position: relative;
    font-size: 12px;
  .menuArrow{
    font-size: 12px;
    position: absolute;
    right: 18px;
    top: 11px;
  }
  }
  .more-submenu{
    color: #2c3e50;
    position: absolute;
    left: 119px;
    top: 0;
     li {
        background-color: #ffffff !important;
        color: #555555 ;
        &:hover {
           background-color: #ffffff !important;
           color: #0097a7 !important;
         }
      }
  }
  }
  }
  .first-submenu > li.subTreeMenu-li:hover {
    background-color:#03a9f4;
    color: #fff;
  }
  .showMoreMenuAct{
    background-color: #f6f6f6!important;
    color: #555555 !important;
  }
</style>
