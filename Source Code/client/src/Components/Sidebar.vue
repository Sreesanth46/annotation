<template>
  <div class="sidebar-container">
    <div class="menubar" id="menubarList" ref="profileDropdown">
      <div class="avatar">
        <div class="avatarspace">
          <img
            v-if="userdata.profilePic == null"
            src="../assets/profile1.png"
            class="profileavatar"
            aria-haspopup="true"
            aria-controls="dropdown-content-menubar"
            @click.prevent="toggle"
            alt="/"
          />
          <img
            v-if="userdata.profilePic !== null"
            :src="userdata.profilePic"
            class="uploadprofileavatar"
            alt="ProfilePic"
          />
        </div>
        <div class="name">
          <span>Name: {{ userName }}</span>
        </div>
        <div class="companycode">
          <span>Company Code: {{ companyCode }}</span>
        </div>
      </div>

      <div class="dropdown-content-menubar" id="menubar">
        <ul id="menus" class="menuitems">
          <li class="borderm">
            <router-link to="/viewprofile">Profile</router-link>
          </li>
          <li class="borderm">
            <router-link to="">Personal settings</router-link>
          </li>
          <li class="divider"></li>
          <li class="borderm"><router-link to="">Workspaces</router-link></li>
          <li class="borderm" v-if="this.$store.state.userRole != 3">
            <router-link to="/listaccounts">Accounts</router-link>
          </li>
          <li class="borderm" v-if="this.$store.state.userRole != 3">
            <router-link to="">Step groups</router-link>
          </li>
          <li class="borderm" v-if="this.$store.state.userRole != 3">
            <router-link to="">Labels</router-link>
          </li>
          <li class="borderm" v-if="this.$store.state.userRole != 3">
            <router-link to="">Label groups</router-link>
          </li>

          <li class="borderm" v-if="this.$store.state.userRole != 3">
            <router-link to="">Collaboration beween companies</router-link>
          </li>
          <li class="divider" v-if="this.$store.state.userRole != 3"></li>
          <li class="borderm">
            <router-link to="">General settings</router-link>
          </li>
          <li class="borderm" v-if="this.$store.state.userRole != 3">
            <router-link to="">Security settings</router-link>
          </li>
          <li class="borderm">
            <router-link to="">Sort projects</router-link>
          </li>
          <li class="divider"></li>
          <li class="borderm" @click="logout()">Logout</li>
        </ul>
      </div>
    </div>

    <div class="sidebar-top">
      <div class="common">
        <div class="home">
          <span class="material-symbols-outlined" @click="home()">home</span>
        </div>
        <div>
          <img
            v-if="userdata.profilePic == null"
            src="../assets/profile1.png"
            class="profile1"
            id="profileImage"
            @click="showProfileMenubar()"
            alt="profilepic"
          />
          <img
            v-if="userdata.profilePic !== null"
            :src="userdata.profilePic"
            class="uploadedimage"
            @click="showProfileMenubar()"
            alt="ProfilePic"
          />
        </div>
      </div>
      <div class="company-icon">
        <img src="../assets/Annotation.png" class="clogo" alt="c-logo" />
      </div>
      <div class="company-name">
        <span>{{ companyName }}</span>
      </div>
    </div>
    <div
      class="workspaces"
      @mouseover="showButtonsHover()"
      @mouseout="showButtonsHover()"
    >
      <ul class="workspacenames">
        <li>
          <span class="wrkspacename">Workspace</span>
        </li>
      </ul>
      <div class="sidemenus">
        <div class="sidemenubutton">
          <span
            class="material-symbols-outlined threedot"
            id="dot"
            @click="showWorkspaceMenubar()"
          >
            more_vert
          </span>
        </div>
        <div class="expandmore">
          <span
            class="material-symbols-outlined down"
            id="downarrow"
            @click="showDropDown()"
          >
            expand_more
          </span>
          <span
            class="material-symbols-outlined expandless"
            id="uparrow"
            @click="hideDropDown()"
          >
            expand_less
          </span>
        </div>
      </div>
    </div>

    <div
      class="dropdown"
      @mouseover="showDotsHover()"
      @mouseout="showDotsHover()"
    >
      <div class="dropdown-content" id="drop">
        <ul id="list" class="listitems">
          <li class="pro-border">
            <router-link to="/listitem" class="routerListItem">
              <button class="button-first-letter">P</button>
              Project</router-link
            ><span
              class="material-symbols-outlined projectThreeDots"
              id="threedots"
              @click="showProjectMenubar()"
              >more_vert</span
            >
          </li>
        </ul>
      </div>
    </div>

    <div
      class="dropdown-content-project"
      id="projectmenubar"
      ref="projectDropdown"
    >
      <ul id="projectmenus" class="projectmenuitems">
        <li class="borderm"><a href="#">Edit project</a></li>
        <li class="divider"></li>
        <li class="borderm"><a href="#">Members</a></li>
      </ul>
    </div>

    <div
      class="dropdown-content-workspace"
      id="workspacemenubar"
      ref="workspaceDropdown"
    >
      <ul id="workspacemenus" class="workspacemenuitems">
        <li class="borderm"><a href="#">Edit workspace</a></li>
        <li class="divider"></li>
        <li class="borderm"><a href="#">Projects</a></li>
        <li class="borderm"><a href="#">Add project</a></li>
        <li class="divider"></li>
        <li class="borderm"><a href="#">Items</a></li>
      </ul>
    </div>

    <div class="search">
      <div class="filter">
        <input type="text" class="filteritems" placeholder="Filter" />
      </div>
    </div>
  </div>
</template>

<script>
import MemberService from "@/services/MemberService";

export default {
  name: "SideBar",

  data() {
    return {
      open: false,
      showdropDown: false,
      i: 0,
      userName: "",
      companyCode: "",
      companyName: "",
      profiledata: [],
      companydata: [],
      userdata: [],
    };
  },

  mounted() {
    this.companyProfile();
    this.currentUserProfileDetails();
  },

  beforeUnmound() {
    window.removeEventListener("click", this.profileMenuClose);
    window.removeEventListener("click", this.projectMenuClose);
    window.removeEventListener("click", this.workspaceMenuClose);
  },

  methods: {
    //FUNCTION TO LOGOUT

    logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      this.$store.commit("updateRole", 0);
      this.$router.push("/login");
    },

    //FUNCTION TO GET THE DETAILS OF CURRENT USER

    currentUserProfileDetails() {
      MemberService.currentUserProfile().then(
        (response) => {
          this.profiledata = response.data;
          this.companydata = JSON.parse(
            JSON.stringify(this.profiledata.company)
          );
          this.userdata = JSON.parse(JSON.stringify(this.profiledata.user));
          this.logindata = this.userdata.auth;
        },
        (err) => {
          this.error = err;
        }
      );
    },

    //FUNCTION TO GET THE COMPANY PROFILE

    companyProfile() {
      MemberService.getCompanyProfile().then((res) => {
        this.companyCode = res.data.company.code;
        this.userName = res.data.user.firstName;
        this.companyName = res.data.company.name;
      });
    },

    //FUNCTION TO CLOSE THE MENU WHILE CLICKING ON PROFILE ICON

    profileMenuClose(e) {
      if (!this.$refs.profileDropdown?.contains(e.target)) {
        const menuList = document.getElementById("menubarList");

        if (
          this.showdropDown &&
          menuList.style.display == "block" &&
          this.i != 0
        ) {
          menuList.style.display = "none";
          this.showdropDown = false;
          this.i = this.i - 2;
          window.removeEventListener("click", this.profileMenuClose);
        }
        this.i = this.i + 1;
      }
    },

    //FUNCTION TO CLOSE THE MENU WHILE CLICKING ON PROJECT HOVER BUTTON

    projectMenuClose(e) {
      if (!this.$refs.projectDropdown?.contains(e.target)) {
        const menuList = document.getElementById("projectmenubar");

        if (
          this.showdropDown &&
          menuList.style.display == "block" &&
          this.i != 0
        ) {
          menuList.style.display = "none";
          this.showdropDown = false;
          this.i = this.i - 2;
          window.removeEventListener("click", this.projectMenuClose);
        }
        this.i = this.i + 1;
      }
    },

    //FUNCTION TO CLOSE THE MENU WHILE CLICKING ON WORKSPACE HOVER BUTTON

    workspaceMenuClose(e) {
      if (!this.$refs.workspaceDropdown?.contains(e.target)) {
        const menuList = document.getElementById("workspacemenubar");

        if (
          this.showdropDown &&
          menuList.style.display == "block" &&
          this.i != 0
        ) {
          menuList.style.display = "none";
          this.showdropDown = false;
          this.i = this.i - 2;
          window.removeEventListener("click", this.workspaceMenuClose);
        }
        this.i = this.i + 1;
      }
    },

    //FUNCTION TO HOVER THE BUTTONS IN THE WORKSPACE DIV

    showButtonsHover() {
      let dot = document.getElementById("dot");
      if (dot.style.visibility == "visible") {
        dot.style.visibility = "hidden";
      } else {
        dot.style.visibility = "visible";
      }

      let arrow = document.getElementById("downarrow");
      if (arrow.style.visibility == "visible") {
        arrow.style.visibility = "hidden";
      } else {
        arrow.style.visibility = "visible";
      }

      let uparrow = document.getElementById("uparrow");
      if (uparrow.style.visibility == "visible") {
        uparrow.style.visibility = "hidden";
      } else {
        uparrow.style.visibility = "visible";
      }
    },

    //FUNCTION TO HOVER THE BUTTONS IN THE PROJECT DIV

    showDotsHover() {
      let dot = document.getElementById("threedots");
      if (dot.style.visibility == "visible") {
        dot.style.visibility = "hidden";
      } else {
        dot.style.visibility = "visible";
      }
    },

    //FUNCTION TO SHOW THE DROPDOWN PROJECT LIST WHILE CLICKING ON THE WORKSPACE ARROW

    showDropDown() {
      const list = document.getElementById("list");
      const expandmore = document.getElementById("downarrow");
      const expandless = document.getElementById("uparrow");
      expandmore.style.display = "none";
      expandless.style.display = "block";

      if (list.style.display == "none" || list.style.display == "") {
        list.style.display = "block";
      } else {
        list.style.display = "none";
      }
    },

    //FUNCTION TO HIDE THE DROPDOWN PROJECT LIST WHILE CLICKING ON THE WORKSPACE ARROW

    hideDropDown() {
      const list = document.getElementById("list");
      const expandless = document.getElementById("uparrow");
      const expandmore = document.getElementById("downarrow");

      expandless.style.display = "none";
      expandmore.style.display = "block";

      if (list.style.display == "none" || list.style.display == "") {
        list.style.display = "block";
      } else {
        list.style.display = "none";
      }
    },

    //FUNCTION TO OPEN THE MENU WHILE CLICKING ON PROFILE ICON

    showProfileMenubar() {
      const menuList = document.getElementById("menubarList");
      window.removeEventListener("click", this.profileMenuClose);
      if (menuList.style.display == "none" || menuList.style.display == "") {
        menuList.style.display = "block";
        this.showdropDown = true;
        window.addEventListener("click", this.profileMenuClose);
      } else {
        this.showdropDown = false;
        menuList.style.display = "none";
      }
    },

    //FUNCTION TO OPEN THE MENU WHILE CLICKING ON PROJECT HOVER BUTTON

    showProjectMenubar() {
      const menuList = document.getElementById("projectmenubar");
      window.removeEventListener("click", this.projectMenuClose);
      if (menuList.style.display == "none" || menuList.style.display == "") {
        menuList.style.display = "block";
        this.showdropDown = true;
        window.addEventListener("click", this.projectMenuClose);
      } else {
        this.showdropDown = false;
        menuList.style.display = "none";
      }
    },

    //FUNCTION TO OPEN THE MENU WHILE CLICKING ON WORKSPACE HOVER BUTTON

    showWorkspaceMenubar() {
      const menuList = document.getElementById("workspacemenubar");
      window.removeEventListener("click", this.workspaceMenuClose);
      if (menuList.style.display == "none" || menuList.style.display == "") {
        menuList.style.display = "block";
        this.showdropDown = true;
        window.addEventListener("click", this.workspaceMenuClose);
      } else {
        this.showdropDown = false;
        menuList.style.display = "none";
      }
    },

    //FUNCTION TO REDIRECT TO THE HOME PAGE

    home() {
      this.$router.push("/unreadcomments");
    },
  },
};
</script>

<style scoped>
.sidebar-container {
  height: 100vh;
  width: 19.5vw;
  background-color: #283441;

  padding: 2px;
  padding-left: 2px;
}

.sidebar-container .sidebar-top {
  height: 150px;
  margin-top: 0;
  color: #fff;
  position: relative;
  text-align: center;
}

.material-symbols-outlined {
  cursor: pointer;
}

.close {
  display: none;
}
.profile1 {
  height: 24px;
  width: 24px;
  cursor: pointer;
  position: absolute;
  right: 0;
}
.uploadedimage {
  height: 24px;
  width: 24px;
  cursor: pointer;
  position: absolute;
  right: 0;
  border-radius: 50%;
}

.home {
  height: 24px;
  width: 100%;
  margin-right: 40%;
}
.home:hover {
  color: orange;
}
.common {
  display: flex;
  width: 20%;
  justify-content: space-between;
}
.clogo {
  height: 150px;
  width: 150px;
}
.company-name {
  display: flex;
  justify-content: center;
}

.sidebar-container .workspaces {
  background-color: #1c2129;
  display: flex;
  padding: 2px;
  margin-top: 60px;
  border: #fff;
  color: #fff;
  cursor: pointer;
}
.sidebar-container .workspaces ul {
  text-decoration: none;
  list-style: none;
  font-family: sans-serif;
}
.threedot {
  margin-top: 12px;
  padding: 2px;
  color: grey;
}
.threedot:hover {
  color: white;
}
.expandmore .down {
  margin-top: 12px;
  padding: 2px;
  color: grey;
}
.expandmore .down:hover {
  color: white;
}
#dot {
  visibility: hidden;
}
#downarrow {
  visibility: hidden;
}
#uparrow {
  visibility: hidden;
}

.expandless:hover {
  color: white;
}

#threedots {
  visibility: hidden;
  position: relative;
  bottom: 23px;
}
.workspacenames {
  margin-top: 15px;
}

.wrkspacename {
  font-family: sans-serif;
  font-size: bold;
}
.search {
  background-color: #1c2129;
  height: 50px;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 19.3vw;
}
.filteritems {
  margin-top: 15px;
  background-color: #283441;
  border-color: grey;
  height: 25px;
  width: 95%;
  margin-left: 4px;
  border-radius: 5px;
  padding-left: 10px;
}
.sidemenus {
  display: flex;
  margin-left: 50%;
}

.dropdown {
  display: flex;
  position: relative;
}
.dropdown-content {
  justify-content: center;
}

#list {
  display: none;
}

#dropBtn {
  background-color: #1c2129;
  border: none;
  color: #fff;
}
.dropdown .dropdown-content .pro-border {
  height: 42px;
  padding-top: 15px;
  padding-left: 2px;
  width: 110%;

  color: #636363;
  cursor: pointer;
}
.avatarspace {
  height: 50px;
  width: 50px;
}

/* CSS OF MENUBAR WHILE CLICKING IN THE PROFILE LOGO */

#menubarList {
  display: none;
}

.menubar {
  height: auto;
  background-color: #ffffff;
  display: inline-block;
  position: absolute;
  top: 32px;
  left: 90%;
  width: 100%;
  border-radius: 3px;
  box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 75%);
  z-index: 999;
}
.menuitems {
  list-style: none;
  padding: 10px;
  color: #6c6c6c;
  font-family: sans-serif;
  box-sizing: border-box;
}
.dropdown-content-menubar .divider {
  height: 1px;
  margin: 9px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}

.dropdown-content-menubar .borderm {
  padding: 5px;
  cursor: pointer;
}
.dropdown-content-menubar a {
  text-decoration: none;
  color: #636363;
  display: block;
}
.dropdown-content-menubar .borderm:hover {
  background-color: #dadada;
}
.profileavatar {
  height: 40px;
  width: 40px;
  padding: 10px;
}
.uploadprofileavatar {
  height: 40px;
  width: 40px;
  padding: 10px;
  border-radius: 50%;
}
.name {
  display: flex;
  justify-content: center;
  margin-top: -38px;
}
.companycode {
  justify-content: center;
  display: flex;
}
.show {
  display: block;
}

/* THREE DOTS IN THE PROJECTS */

.projectThreeDots {
  margin-left: 205%;
}

.listitems {
  padding: 2px;
}

/* CSS FOR DROP DOWN WHILE CLICKING ON THE PROJECT */

#projectmenubar {
  display: none;
}

.dropdown-content-project {
  background-color: #ffffff;
  margin-left: 93%;
  width: 100%;
  margin-top: -47px;
  position: relative;
  height: auto;
  padding: 20px;
  display: inline-block;
  border-radius: 3px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  z-index: 999;
}

.dropdown-content-project .projectmenuitems {
  list-style: none;
  color: #636363;
}

.dropdown-content-project a {
  text-decoration: none;
  color: #636363;
  display: block;
}

.dropdown-content-project .borderm {
  padding: 5px;
}

.dropdown-content-project .borderm:hover {
  background-color: #dadada;
}
.dropdown-content-project .divider {
  height: 1px;
  margin: 9px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}

/* CSS FOR DROP DOWN WHILE CLICKING ON THE WORKSPACE */

#workspacemenubar {
  display: none;
}

.dropdown-content-workspace {
  background-color: #ffffff;
  margin-left: 93%;
  width: 100%;
  margin-top: -47px;
  position: relative;
  height: auto;
  padding: 20px;
  display: inline-block;
  border-radius: 3px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  z-index: 999;
}

.dropdown-content-workspace .workspacemenuitems {
  list-style: none;
  color: #636363;
}

.dropdown-content-workspace a {
  text-decoration: none;
  color: #636363;
  display: block;
}

.dropdown-content-workspace .borderm {
  padding: 5px;
}

.dropdown-content-workspace .borderm:hover {
  background-color: #dadada;
}
.dropdown-content-workspace .divider {
  height: 1px;
  margin: 9px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}

.expandless {
  margin-top: 13px;
  display: none;
  color: grey;
}

/* CSS FOR BUTTON INSIDE PROJECT */

.button-first-letter {
  background-color: #516776;
  height: 32px;
  width: 32px;
  border-radius: 5px;
  color: #ffffff;
}

/* CSS FOR  ROUTERLINK */

.routerListItem {
  color: white;
  text-decoration: none;
}

@media screen and (max-width: 1280px) {
  .sidemenus {
    display: flex;
    margin-left: 40%;
  }

  .projectThreeDots {
    margin-left: 170%;
    margin-top: -13%;
  }
}

@media screen and (max-width: 1275px) {
  .sidemenus {
    display: flex;
    margin-left: 40%;
  }

  .projectThreeDots {
    margin-left: 165%;
    margin-top: -13%;
  }
}

@media screen and (max-width: 1150px) {
  .sidemenus {
    display: flex;
    margin-left: 30%;
  }
}

@media screen and (max-width: 1062px) {
  .projectThreeDots {
    margin-left: 138%;
    margin-top: -13%;
  }
}

@media screen and (max-width: 1024px) {
  .menubar {
    height: auto;
    background-color: #ffffff;
    display: inline-block;
    position: absolute;
    top: 32px;
    left: 90%;
    width: 100%;
    border-radius: 3px;
    box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 75%);
    z-index: 999;
    padding: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
}
@media screen and (max-width: 976px) {
  .projectThreeDots {
    margin-left: 130%;
    margin-top: -13%;
  }
}

@media screen and (max-width: 912px) {
  .projectThreeDots {
    margin-left: 115%;
    margin-top: -13%;
  }
  .menubar {
    height: auto;
    background-color: #ffffff;
    display: inline-block;
    position: absolute;
    top: 32px;
    left: 90%;
    width: 100%;
    border-radius: 3px;
    box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 75%);
    z-index: 999;
    padding: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
}
@media screen and (max-width: 768px) {
  .projectThreeDots {
    margin-left: 95%;
    margin-top: -13%;
  }
}

@media screen and (max-width: 468px) {
  .projectThreeDots {
    margin-left: 70%;
    margin-top: -13%;
  }
}
@media screen and (max-width: 1000px) {
  .sidemenus {
    display: flex;
    margin-left: 20%;
  }
}
@media screen and (max-width: 860px) {
  .sidemenus {
    display: flex;
    margin-left: 10%;
  }
}
@media screen and (max-width: 899px) {
  .sidemenus {
    display: flex;
    margin-left: 5%;
  }
}

@media screen and (max-width: 765px) {
  .sidemenus {
    display: flex;
    margin-left: -5%;
  }
}

@media screen and (max-width: 690px) {
  .sidemenus {
    display: flex;
    margin-left: -7%;
  }
  .wrkspacename {
    font-size: x-small;
  }
}

@media screen and (max-width: 560px) {
  .clogo {
    height: 50px;
    width: 100px;
  }
}

@media screen and (max-width: 540px) {
  .projectThreeDots {
    margin-left: 77%;
  }

  .dropdown-content-workspace[data-v-a6aa4908] {
    background-color: #ffffff;
    margin-left: 93%;
    width: 120%;
    margin-top: -47px;
    position: relative;
    height: auto;
    padding: 20px;
    display: inline-block;
    border-radius: 3px;
    box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 75%);
    z-index: 999;
  }
  .menubar {
    height: auto;
    background-color: #ffffff;
    display: inline-block;
    position: absolute;
    top: 32px;
    left: 90%;
    width: 100%;
    border-radius: 3px;
    box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 75%);
    z-index: 999;
  }

  #threedots {
    bottom: 19px;
  }
}
@media screen and (max-width: 522px) {
  .wrkspacename {
    font-size: xx-small;
  }

  .sidemenus {
    display: flex;
    margin-left: -12%;
    padding: 0;
    left: 0;
  }
}
</style>
