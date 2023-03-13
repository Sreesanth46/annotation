<template>
  <nav class="list-item-header-container">
    <span class="selected">Item</span>
    <ul class="features">
      
        <ul @click="showModal">+Additem</ul>
        <AddItem v-show="isModalVisible" @close="closeModal" @additem="showadditem(event)"/>
      
      <li v-on:click="SelectCheckBox()">Filter</li>

      <li class="line"></li>
      <li class="material-symbols-outlined"><Icon icon="material-symbols:grid-view-outline" color="blue" /></li>
      <li class="material-symbols-outlined"><Icon icon="ic:baseline-view-list" color="orange" /></li>
      <li class="material-symbols-outlined"><Icon icon="material-symbols:calendar-month-rounded" color="blue" /></li>
    </ul>
   
  </nav>
</template>
<script>
import { Icon } from '@iconify/vue';
import AddItem from '@/views/AddItem.vue'; 
import MemberService from '@/services/MemberService';
export default {
  name: "ListItemHeader",
  components: { Icon,AddItem},

  data() {
    return {
      isModalVisible: false,
      additems:''
    };
  },
  methods:
  {
    SelectCheckBox()
    {
      this.$emit('checkbox')
    },
    showModal() {
            this.isModalVisible = !this.isModalVisible;
        },

        closeModal() {
            this.isModalVisible = false;
        },
        showadditem(message)
        {
          this.additems=message
          this.$emit('itemadd',this.additems)
        },
        listItem() {
      MemberService.getAllItem()
        .then((res) => {
          console.log("csjfjs", res.data);
          this.itemlist = res.data.item;
        })
        .catch((err) => {
          this.error = err;
        });
    },
  }
};
</script>

<style scoped>
.material-symbols-outlined
{
  color: black;
  cursor: pointer;
}
.list-item-header-container {
  background-color: #f7f8f8;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 10px;
  width: 100%;
  height: 45px;
  padding: 10px;
  border-bottom: 2px #e4e4e4 solid;
}
.features {
  display: flex;
  color: rgb(2, 143, 200);
  cursor: pointer;
}
.selected
{
  border-bottom: 1px solid #253c52;
color: #253c52;
width:fit-content
}
.features > * {
  padding-inline: 10px;
}
.line {
  border-right: 1px solid black;
  height: 30px;
}
li {
  list-style: none;
}
</style>
