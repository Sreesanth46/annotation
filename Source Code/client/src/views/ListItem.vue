<template>
  <div class="unreadcomments-inner-layer">
    <div class="unreadcomments-headers-area">
      <project-header  />
      <list-item-header @itemadd="showitem($event)" />
    </div>
    <div v-if="selectcheckbox" class="bulkselection">
      <div class="pullrightcontent">
        <div>
          <button id="deselectbtn" v-on:click="DeselectCheckbox()">
            Deselect</button
          >&nbsp;

          <button id="selectbtn" @click="SelectCheckBox()">Select All</button
          >&nbsp;
          <button class="button-secondary" type="button">Download</button>
          &nbsp;
          <button class="button-secondarydelete" type="button">Delete</button>
          &nbsp;
        </div>
      </div>
    </div>
    <div class="list-inner-body">
      <div class="datatablewithcontent">
        <table
          class="table-striped dataTable"
          role="grid"
          aria-describedby="DataTables_Table_0_info"
        >
          <thead>
            <tr role="row">
              <th
                class="account-id sorting_asc"
                data-field="account-id"
                tabindex="0"
                id="accountId"
                aria-controls="DataTables_Table_0"
                rowspan="1"
                colspan="1"
                aria-sort="ascending"
                aria-label="Account ID: activate to sort column descending"
              >
                Select
              </th>
              <th
                class="account-id sorting_asc"
                data-field="account-id"
                tabindex="0"
                id="accountId"
                aria-controls="DataTables_Table_0"
                rowspan="1"
                colspan="1"
                aria-sort="ascending"
                aria-label="Account ID: activate to sort column descending"
              >
                Lock
              </th>
              <th
                class="account-nm sorting"
                data-field="account-nm"
                tabindex="0"
                aria-controls="DataTables_Table_0"
                rowspan="1"
                colspan="1"
                id="nickName"
                aria-label="Nickname: activate to sort column ascending"
              >
                Pin
              </th>
              <th
                class="mail-address sorting"
                data-field="mail-address"
                tabindex="0"
                aria-controls="DataTables_Table_0"
                rowspan="1"
                colspan="1"
                id="email"
                aria-label="Email Address: activate to sort column ascending"
              >
                Unread
              </th>
              <th
                class="collaboration sorting"
                data-field="collaboration"
                tabindex="0"
                aria-controls="DataTables_Table_0"
                rowspan="1"
                colspan="1"
                id="disclosure"
                aria-label="Account disclosure: activate to sort column ascending"
              >
                ItemName
              </th>
              <th
                class="account-rank sorting"
                data-field="account-rank"
                tabindex="0"
                aria-controls="DataTables_Table_0"
                rowspan="1"
                colspan="1"
                id="role"
                aria-label="Role: activate to sort column ascending"
              >
                Update Date and Time
              </th>
              <th
                class="account-rank sorting"
                data-field="account-rank"
                tabindex="0"
                aria-controls="DataTables_Table_0"
                rowspan="1"
                colspan="1"
                id="role"
                aria-label="Role: activate to sort column ascending"
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="itm in itemlist" :key="itm.id">
              <td>
                <input
                  type="checkbox"
                  class="form-control"
                  v-on:change="selectcurrent()"
                  name="chk"
                />
              </td>
              <td>
                <div class="itemlock">
                  <Icon icon="material-symbols:lock"  :class="{active:lock}" />
                </div>
              </td>
              <td>
                <div class="itempin">
                  <Icon
                    icon="material-symbols:push-pin-outline-sharp"
                    :class="{ active: isActive }"
                    @click="SetPinTrue()"
                  />
                </div>
              </td>
              <td>{{ itm.unread }}</td>
              <td>
                <div class="itemwrapper">
                  <div class="itemimagethumnail">
                    <img
                      v-if="itm.file !== null"
                      :src="itm.file"
                      alt="itemimage"
                    />
                  </div>
                  <div class="itemname">
                    <router-link to="" class="itemname">{{
                      itm.name
                    }}</router-link>
                  </div>
                </div>
              </td>
              <td>{{ formatDateTime(itm.updatedAt) }}</td>
              <td>
                
                <router-link to="" class="itemname" @click="showModal(itm)"
                  >Edit</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
        <EditItem v-if="ismodaleditvisible" @close="closeModal" :item= itemDetails  @editlist="showitem($event)"/>
      </div>
    </div>
  </div>
</template>
<script>
import ListItemHeader from "../Components/ListItemHeader.vue";
import ProjectHeader from "../Components/ProjectHeader.vue";
import { Icon } from "@iconify/vue";
import MemberService from "@/services/MemberService";
import EditItem from "@/views/EditItem.vue";

export default {
  components: { ProjectHeader, ListItemHeader, Icon, EditItem },

  name: "ListItem",
  data() {
    return {
      selectcheckbox: false,
      isActive: false,
      itemlist: [],
      ismodaleditvisible: false,
      itemDetails: null,
      message:''
    };
  },
  mounted() {
    this.listItem();
    this.selectItem();
  },
  computed: {
    allSelected() {
      return this.itemlist.every((itm) => itm.selected);
    },
  },
  methods: {
    SelectCheckBox() {
      this.selectcheckbox = true;
      let ele = document.getElementsByName("chk");
      for (let i = 0; i < ele.length; i++) {
        if (ele[i].type == "checkbox") ele[i].checked = true;
      }
    },
    selectcurrent() {
      this.selectcheckbox = !this.selectcheckbox;
      let ele = document.getElementsByName("chk");
      ele.checked = true;
    },
    DeselectCheckbox() {
      this.selectcheckbox = false;
      let ele = document.getElementsByName("chk");
      for (let i = 0; i < ele.length; i++) {
        if (ele[i].type == "checkbox") ele[i].checked = false;
      }
    },
    SetPinTrue() {
      this.isActive = !this.isActive;
    },
    select() {
      this.SelectCheckBox();
    },
    selectItem() {
      this.itemlist.forEach((itm) => this.$set(itm, "selected", false));
    },
    selectAll() {
      let all_s = this.allSelected;
      this.itemlist.forEach((itm) => (itm.selected = !all_s));
    },
    showModal(item) {
      this.itemDetails = item
      this.ismodaleditvisible = !this.ismodaleditvisible;
    },
    closeModal() {
      this.ismodaleditvisible = false;
    },

    formatDateTime(date) {
      if (date == null) {
        return date;
      }
      return new Intl.DateTimeFormat("en-Us", {
        dateStyle: "medium",
        timeStyle: "medium",
      })
        .format(new Date(date))
        .slice();
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
    showitem(message)
    {
     this.message=message;
     this.listItem();
    },
  },
};
</script>
<style scoped>
* {
  font-family: sans-serif;
}
.unreadcomments-inner-layer {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.unreadcomments-headers-area {
  display: flex;
  flex-direction: column;
}
.pinitem {
  height: 28px;
  width: 28px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.itemimage {
  height: 24px;
  width: 31px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.lockitem {
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.list-inner-body {
  margin-top: 19px;
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #f7f8f8;
}
.bulkselection {
  width: 100%;

  background-color: #fff;
  height: 100%;
  padding: 6px 15px;
  justify-content: center;
  display: inline-block;
  border-bottom: 1px #e4e4e4 solid;
}
.pullrightcontent {
  float: right;
}
#selectbtn {
  background: #ebebeb;
  color: #2371bd;
  border: solid 1px #d0d0d0;
  border-radius: 5px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 0 0 0 5px;
  float: none;
}

#deselectbtn {
  background: #ebebeb;
  color: #2371bd;
  border: solid 1px #d0d0d0;
  border-radius: 5px;
  margin: 0 0 0 5px;
  float: none;
  padding-left: 15px;
  padding-right: 15px;
}
.button-secondary {
  background: #33a69d !important;
  color: #ffffff;
  box-shadow: none;
  border-color: #41c3b8;

  cursor: pointer;
  border-radius: 5px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 0 0 0 5px;
}
.button-secondarydelete {
  background: red !important;
  color: #ffffff;
  box-shadow: none;
  border-color: red;

  cursor: pointer;
  border-radius: 5px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 0 0 0 5px;
}
.form-control {
  display: block;
  width: 90%;
  height: 15px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
.datatablewithcontent {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.dataTable {
  clear: both;
  border-spacing: 0;
  background-color: transparent;
  border-collapse: collapse;
  border: 1px solid;
  padding: 10px 12px;
  margin-top: 20px;
}

th {
  border: solid 1px #c8c8c8;
  background-color: #f7f8f8;
  border-bottom: 2px #e4e4e4 solid;
}
th:hover {
  text-decoration: underline;
  color: black;
}

td {
  border: solid 1px #c8c8c8;
  background-color: #f7f8f8;
  border-bottom: 2px #e4e4e4 solid;
}
.dataTable th,
.dataTable td {
  line-height: 20px !important;
  vertical-align: middle;
}

.itemlock {
  position: relative;
  top: 2px;
  right: auto;
  display: flex;
  justify-content: center;
}
.itempin {
  position: relative;
  top: 2px;
  right: auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
}
.active {
  color: orange;
}
.itemimagethumnail {
  display: block;
  position: relative;
  width: 24px;
  height: 24px;

  background-color: #fff;
  flex-shrink: 0;
}
.itemwrapper {
  display: flex;
  align-items: center;
}
.itemname:hover {
  color: #028fc8;
  text-decoration: underline;
}
.itemname {
  color: #028fc8;
  text-decoration: none;
  text-align: left;
  line-height: 16px;
  margin-left: 21px;
}
@media screen and (max-width: 768px) {
  .unreadcomments-inner-layer {
    margin-top: 20px;
  }
}
</style>
