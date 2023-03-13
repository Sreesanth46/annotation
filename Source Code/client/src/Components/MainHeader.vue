<template>
  <div class="header-container">
    <router-link to="" class="underlinesearch"
      ><span class="searchItems">Search items</span></router-link
    >
    <div class="searchbox">
      <form ref="closesearch">
        <input type="text" class="search" />
        <div class="search-image">
          <span class="material-symbols-outlined search-icon"> search </span>
          <div class="close">
            <span
              class="material-symbols-outlined close-button"
              @click="clearSearchText()"
            >
              cancel
            </span>
          </div>
        </div>
      </form>
    </div>
    <div class="notification">
      <span
        class="material-symbols-outlined notification-button"
        @click="showNotificationMenubar()"
      >
        notifications
      </span>
    </div>

    <div
      class="dropdown-content-notification"
      id="notificationmenubar"
      ref="notificationDropdown"
    >
      <ul id="notificationmenus" class="notificationmenuitems">
        <li><span>Notifications</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainHeader",

  data() {
    return {
      open: false,
      showdropDown: false,
      i: 0,
    };
  },

  beforeUnmound() {
    window.removeEventListener("click", this.notificationMenuClose);
  },

  methods: {
    //FUNCTION TO CLOSE THE NOTIFICATION MENU

    notificationMenuClose(e) {
      if (!this.$refs.notificationDropdown?.contains(e.target)) {
        const menuList = document.getElementById("notificationmenubar");

        if (
          this.showdropDown &&
          menuList.style.display == "block" &&
          this.i != 0
        ) {
          menuList.style.display = "none";
          this.showdropDown = false;
          this.i = this.i - 2;
          window.removeEventListener("click", this.notificationMenuClose);
        }
        this.i = this.i + 1;
      }
    },

    //FUNCTION TO SHOW THE NOTIFICATION MENU

    showNotificationMenubar() {
      const menuList = document.getElementById("notificationmenubar");
      window.removeEventListener("click", this.notificationMenuClose);
      if (menuList.style.display == "none" || menuList.style.display == "") {
        menuList.style.display = "block";
        this.showdropDown = true;
        window.addEventListener("click", this.notificationMenuClose);
      } else {
        this.showdropDown = false;
        menuList.style.display = "none";
      }
    },

    //FUNCTION TO CLEAR THE TEXT INSIDE THE SEARCH BOX

    clearSearchText() {
      this.$refs.closesearch.reset();
    },
  },
};
</script>

<style scoped>
.header-container {
  width: 100%;
  height: 6.375vh;
  display: flex;
  border-bottom: 1px solid black;
  justify-content: center;
}

.searchItems {
  font-family: sans-serif;
  color: #26d6ff;
  font-size: smaller;
}

.searchbox {
  display: flex;
}

.searchbox .search {
  margin-top: 9px;
  margin-left: 2%;
  border: 1px solid grey;
}
.searchbox input {
  height: 30px;
  width: 200px;
  border-radius: 4px;
  padding: 0 30px;
}

.search-image {
  display: flex;
  margin-top: -26px;
  margin-left: 5px;
}

.close-button {
  cursor: pointer;
  margin-left: 610%;
}

.notification-button {
  margin-left: 100%;
  margin-top: 14px;
  cursor: pointer;
}

.notification-button:hover {
  color: grey;
}
.close-button:hover {
  color: grey;
}

/* CSS FOR THE DROPDOWN WHILE CLICKING ON NOTIFICATIONS */

#notificationmenubar {
  display: none;
}

.dropdown-content-notification {
  background-color: #ffffff;
  width: 20%;
  margin-top: 50px;
  margin-left: 10%;
  position: absolute;
  height: auto;
  padding: 20px;
  display: inline-block;
  border-radius: 3px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  z-index: 999;
}

.dropdown-content-notification .notificationmenuitems {
  list-style: none;
  color: #636363;
}

.underlinesearch {
  margin-top: 12px;
  text-decoration: none;
}

@media screen and (max-width: 1024px) {
  .searchbox .search {
    margin-top: 4px;
    margin-left: 2%;
    border: 1px solid grey;
  }
  .notification-button {
    margin-left: 100%;
    margin-top: 10px;
    cursor: pointer;
  }

  .underlinesearch {
    margin-top: 8px;
    text-decoration: none;
  }

  .dropdown-content-notification {
        background-color: #ffffff;
    width: 20%;
    margin-top: 50px;
    margin-left: 17%;
    position: absolute;
    height: auto;
    padding: 20px;
    display: inline-block;
    border-radius: 3px;
    box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 75%);
    z-index: 999;
  }
}

@media screen and (max-width: 820px) {
  .searchbox .search {
    margin-top: 20px;
    margin-left: 2%;
    border: 1px solid grey;
  }
  .notification-button {
    margin-left: 100%;
    margin-top: 25px;
    cursor: pointer;
  }

  .underlinesearch {
    margin-top: 24px;
    text-decoration: none;
  }

  .dropdown-content-notification {
    background-color: #ffffff;
    width: 20%;
    margin-top: 55px;
    margin-left: 25%;
    position: absolute;
    height: auto;
    padding: 20px;
    display: inline-block;
    border-radius: 3px;
    -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
    z-index: 999;
  }
}

@media screen and (max-width: 540px) {
  .searchbox .search {
    margin-top: 10px;
    margin-left: 2%;
    border: 1px solid grey;
  }
  .notification-button {
    margin-left: 100%;
    margin-top: 15px;
    cursor: pointer;
  }

  .underlinesearch {
    margin-top: 14px;
    text-decoration: none;
  }

  .dropdown-content-notification {
    background-color: #ffffff;
    width: 35%;
    margin-top: 52px;
    margin-left: 38%;
    position: absolute;
    height: auto;
    padding: 20px;
    display: inline-block;
    border-radius: 3px;
    -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
    z-index: 999;
  }
}
</style>
