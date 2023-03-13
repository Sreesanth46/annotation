<template>
  <nav class="project-item-header-container">
      <button class="button-first-letter">P</button>Project<span
            class="material-symbols-outlined editThreeDots"
            id="threeeditdots"
            @click="showEditMenubar()"
            >more_vert</span
          >
      <div
    class="dropdown-content-item"
    id="editmenubar"
    ref="editDropdown"
  >
    <ul id="projecteditmenus" class="projecteditmenuitems">
      <li class="borderm"><a href="#">Edit project</a></li>
    </ul>
  </div>
    
  </nav>
  
</template>
<script>
export default {
  name: "ProjectHeader",
  beforeMount() {
  window.removeEventListener("click", this.editMenuClose);
  },

  data() {
    return {
      showdropDown:false,
      i:0,
      open:false
    }
  },
  methods:
  {
    showEditMenubar() {
    const menuList = document.getElementById("editmenubar");
    window.removeEventListener("click", this.editMenuClose);
    if (menuList.style.display == "none" || menuList.style.display == "") {
      menuList.style.display = "block";
      this.showdropDown = true;
      window.addEventListener("click", this.editMenuClose);
    } else {
      this.showdropDown = false;
      menuList.style.display = "none";
    }
  },
  editMenuClose(e) {
    if (!this.$refs.editDropdown?.contains(e.target)) {
      const menuList = document.getElementById("editmenubar");

      if (
        this.showdropDown &&
        menuList.style.display == "block" &&
        this.i != 0
      ) {
        menuList.style.display = "none";
        this.showdropDown = false;
        this.i = this.i - 2;
        window.removeEventListener("click", this.editMenuClose);
      }
      this.i = this.i + 1;
    }
  },

  }
};
</script>

<style scoped>

#editmenubar
{
  display: none;
}
.project-item-header-container {
  background-color: #fff;
  grid-template-columns: 3fr 1fr;
  gap: 10px;
  width: 100%;
  height: 6.375vh;
  padding: 10px;
  border-bottom: 3px #e4e4e4 solid;
  display: flex;
 
}
.material-symbols-outlined {
cursor: pointer;
}
.editThreeDots
{
margin-left: 20px;
}
.features {
  display: flex;
}
.button-first-letter {
background-color: #516776;
height: 32px;
width: 32px;
border-radius: 5px;
color: #ffffff;
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
.dropdown-content-item {
background-color: #ffffff;

width: 13%;

position: relative;
height: 66px;
padding: 20px;
border-radius: 10px;
display: inline-block;
border-radius: 3px;
-webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
-moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
z-index: 999;
}

.dropdown-content-item .projecteditmenuitems {
list-style: none;
color: #636363;
}

.dropdown-content-item a {
text-decoration: none;
color: #636363;
display: block;
}


.dropdown-content-item .borderm {
  padding: 5px;
}

.dropdown-content-item .borderm:hover {
  background-color: #dadada;
}
</style>
