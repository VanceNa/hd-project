<template>
  <ul class="treeMenu"
      :class="{expandStyle:isExpand}"
      :style="{marginTop:marginTop+'px'}">
    <li v-for="(item, index) in items"
        :key="index"
        class="first-menu"
        :class="{expandStyle:isExpand,liAct:item.isExpand}"
        @mouseenter="showSubMenu(item)"
        @mouseleave="showSubMenu(item)">
      <div class="treeMenu-title "
           :class="{expandStyle:isExpand,firstMenuAct:item.isExpand,firstCheck:item.hasOpenTab}">
        <div class="titleIcon "
             :class="{firstMenuAct:item.isExpand}">
          <div class="leftDiv"
               :class="{liHover:item.isExpand,liCheck:item.hasOpenTab}"></div>
          <Icon size="24"
                :type="item.icon"></Icon>
        </div>
        <div class="titleName"
             :title="item.title"
             v-if="isExpand">
          {{item.menuName}}
        </div>
      </div>
      <TreeMenuNode v-show="item.isExpand"
                    class="first-submenu"
                    @getHasOpenTab="getHasOpenTab"
                    :onMenuClick="onMenuClick"
                    :class="{firstSubmenuExpand:isExpand}"
                    :style="{ top : menuTopH + 'px' }"
                    :isExpand="isExpand"
                    :menuName="item.menuName"
                    :data="item"></TreeMenuNode>
    </li>
  </ul>
</template>

<script>
import TreeMenuNode from './TreeMenuNode.vue'
export default {
  name: 'TreeMenu',
  props: ['data', 'isExpand', 'onMenuClick', 'marginTop'],
  components: {
    'TreeMenuNode': TreeMenuNode
  },
  data () {
    return {
      firstMenu: null,
      items: [],
      menuExpand: false,
      hasOpenTab: false,
      menuTopH: 0
    }
  },
  computed: {

  },
  watch: {
    data: function () {
      let data = JSON.parse(JSON.stringify(this.data))
      let items = this.processTreeData(data)
      items.forEach(item => {
        if (item.menuName.length > 5) {
          item.title = item.menuName
          item.menuName = item.menuName.substring(0, 4) + '...'
        }
      })

      this.items = items
    }
  },
  methods: {
    showSubMenu (item) {
      item.childs.forEach(item => {
        if (item.menuName.length > 6) {
          item.title = item.menuName
          item.menuName = item.menuName.substring(0, 5) + '...'
        }
      })
      item.isExpand = !item.isExpand
      this.menuExpand = item.isExpand

      this.$nextTick(() => {
        let index = this.$parent.data.findIndex(i => i.menuId === item.menuId)
        if(document.getElementsByClassName('first-submenu')[index].offsetParent){
          let menuTop = document.getElementsByClassName('first-submenu')[index].offsetParent.offsetTop + 64
          let currentMneuH = document.getElementsByClassName('first-submenu')[index].offsetHeight
          let height = window.innerHeight - menuTop
          if (height < currentMneuH) {
            this.menuTopH = height - currentMneuH
          } else {
            this.menuTopH = 0
          }
        }else{
          this.menuTopH = 0
        }
      })
    },
    processTreeData (data) {
      let item
      for (item in data) {
        if (data[item].childs && data[item].childs.length > 0) {
          data[item].isExpand = false
          data[item].childs = this.processTreeData(data[item].childs)
        }
      }
      return data
    },
    getFirstMenu (list, menuId) {
      if (!list) {
        return
      }
      for (var i = 0; i < list.length; i++) {
        if (list[i].menuId == menuId) {
          this.firstMenu = list[i]
          break
        } else {
          this.getFirstMenu(list[i].childs, menuId)
          if (this.firstMenu) {
            this.firstMenu = list[i]
            break
          }
        }
      }
    },
    getHasOpenTab (menuId) {
      if (!menuId) {
        this.items.forEach(item => {
          this.$set(item, 'hasOpenTab', false)
        })
      } else {
        var menuList = this.items
        this.getFirstMenu(menuList, menuId)
        if (this.firstMenu) {
          this.items.forEach(item => {
            if (item.menuId == this.firstMenu.menuId) {
              this.$set(item, 'hasOpenTab', true)
            } else {
              this.$set(item, 'hasOpenTab', false)
            }
          })
        } else {
          this.items.forEach(item => {
            this.$set(item, 'hasOpenTab', false)
          })
        }
        this.firstMenu = null
      }
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
.treeMenu {
  transition: all 0.2s ease-in-out;
  padding-left: 0;
  margin-top: 0;
  height: 100%;
  width: 64px;
  box-sizing: border-box;
  /*z-index: 999;*/
  /*border-right: 1px solid #c8c7c7;*/
  cursor: pointer;
  text-align: center;
  ul,
  li,
  div {
    box-sizing: border-box;
    z-index: 999;
  }
  .first-menu {
    transition: all 0.2s ease-in-out;
    height: 48px;
    width: 64px;
    display: block;
    position: relative;
    .treeMenu-title {
      border-right: 1px solid #c8c7c7;
      height: 48px;
      width: 64px;
      display: flex;
      .titleIcon {
        height: 48px;
        width: 64px;
        text-align: center;
        display: flex;
        flex-direction: row;
      }
      .leftDiv {
        width: 4px;
        height: 48px;
        background-color: #ffffff;
      }
      .iconfont {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        line-height: 48px;
      }
      &:hover {
        border-right: 1px solid #c8c7c7;
        background-color: #f6f6f6;
        color: #1a76d2;
      }
      &:hover .leftDiv,
      .liHover {
        background-color: #4fc3f7;
      }
      .titleName {
        transition: all 0.2s ease-in-out;
        font-size: 12px;
        line-height: 48px;
      }
    }
    .first-submenu {
      position: absolute;
      left: 64px;
      top: 0;
      text-align: left;
    }
  }
}
.ivu-icon {
  flex: 1;
  padding-top: 10px;
}
.expandStyle {
  /*border-right: 1px solid #c8c7c7 !important;*/
  width: 144px !important;
  transition: all 0.095s ease-in-out;
}
.firstSubmenuExpand {
  left: 144px !important;
  transition: all 0.2s ease-in-out;
}
.firstMenuAct {
  background-color: #f6f6f6 !important;
  color: #1a76d2 !important;
}
.firstCheck {
  background-color: #f6f6f6 !important;
  color: #1a76d2 !important;
}
.liCheck {
  background-color: #4fc3f7 !important;
}
.liAct {
  background-color: #f6f6f6 !important;
}
</style>

