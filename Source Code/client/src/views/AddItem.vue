<template>
  <div class="add-item-outer-container">
    <div class="modal-container" id="modalcontainer">
      <form id="clear" ref="clearForm">
        <div class="modal-header">
          <div class="modal-name">
            <span>Add Item</span
            ><font-awesome-icon icon="fa-regular fa-circle-xmark" />
          </div>
          <div class="close-button">
            <span class="closebutton" @click="closeModal()">X</span>
          </div>
        </div>
        <div class="label-item-name">
          <label class="labelname-item">Item Name</label
          ><span class="required">(Required)</span>
        </div>
        <div class="input-item-name">
          <input
            type="text"
            class="itemname"
            v-model.trim="itemName"
            name="itemName"
            @blur="v$.itemName.$touch()"
            @keydown="v$.itemName.$touch()"
            v-bind:class="{
              error: v$.itemName.$error,
              valid: v$.itemName.$dirty && !v$.itemName.$invalid,
            }"
            autocomplete="off"
          /><br />
          <span v-if="v$.itemName.$error" style="color: red">
            {{ v$.itemName.$errors[0].$message }}
          </span>
        </div>
        <div class="label-file">
          <label class="labelname-file">Files</label>
        </div>
        <div class="input-file">
          <button
            type="button"
            id="filebutton"
            class="file-button"
            onclick="document.getElementById('myfile').click()"
          >
            Click to select a file.
          </button>
          <input
            type="file"
            id="myfile"
            name="file"
            class="file"
            accept="image/jpeg,image/jpg,image/png,image/tga"
            ref="fileclear"
            v-on:change="getFileName"
          />
          <div class="close-icon" id="closeicon">
            <Icon
              icon="mdi:close-circle-outline"
              width="20"
              height="20"
              @click="clearInputFile()"
            />
          </div>
          <div class="file-error-message" id="errormessage">
            <span class="error-message">Please select a file</span>
          </div>
        </div>
        <div class="buttons">
          <div class="cancel">
            <button type="button" class="cancel-button" @click="closeModal()">
              Cancel
            </button>
          </div>
          <div class="add">
            <button
              type="button"
              class="add-button"
              id="addid"
              @click="addItem()"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, maxLength, alphaNum } from "@vuelidate/validators";
import { Icon } from "@iconify/vue";
import Swal from "sweetalert2";
import MemberService from "../services/MemberService";
export default {
  name: "AddItem",

  components: {
    Icon,
  },

  validations() {
    return {
      itemName: {
        required: helpers.withMessage("Item name is required", required),
        maxLength: helpers.withMessage(
          "Please enter maximum of 50 characters",
          maxLength(50)
        ),
        alphaNum: helpers.withMessage(
          "Please enter alphanumeric characters",
          alphaNum
        ),
        $autodirty: true,
      },
    };
  },

  data() {
    return {
      itemName: "",
      v$: useVuelidate(),
      itemImage: "",
    };
  },
  created() {
    this.listItem();
  },

  methods: {
    //FUNCTION TO ADD ITEM

    addItem() {
      let message = document.getElementById("errormessage");
      let file = document.getElementById("myfile");
      this.v$.$validate();
      if (!this.v$.itemName.$error && file.files.length != 0) {
        let formData = new FormData();
        formData.append("file", this.itemImage);
        formData.append("itemName", this.itemName);
        formData.append("projectId", this.itemlist.project.id);
        MemberService.addItem(formData)
          .then((response) => {
            document.getElementById("addid").disabled = true;
            this.result = response.data;
            this.closeModal();
            this.$emit("additem", this.result);
            Swal.fire({
              icon: "success",
              title: "Item Added",
              text: "Item added succesfully",
            });
          })
          .catch((err) => {
            this.errormsg = err.response.data.errorCode;
          });
      } else {
        message.style.display = "block";
      }
    },

    //FUNCTION TO LIST THE ITEM

    listItem() {
      MemberService.getAllItem()
        .then((res) => {
          this.itemlist = res.data;
        })
        .catch((err) => {
          this.error = err;
        });
    },

    //FUNCTION TO GET THE FILENAME TO DISPLAY IN THE BUTTON

    getFileName(event) {
      let message = document.getElementById("errormessage");
      let file = document.getElementById("myfile");
      let fileName = file.files.item(0).name;
      if (file.files.length != 0) {
        this.itemImage = event.target.files[0];

        const closeicon = document.getElementById("closeicon");
        closeicon.style.display = "block";
        document.getElementById("filebutton").innerText = fileName;
        console.log("file");
        console.log(fileName);
        message.style.display = "none";
      } else {
        message.style.display = "block";
      }
    },

    //FUNCTION TO CLEAR THE INPUT FILE

    clearInputFile() {
      this.$refs.fileclear.value = null;
      document.getElementById("filebutton").innerText =
        " Click to select a file ";
      const closeicon = document.getElementById("closeicon");
      closeicon.style.display = "none";
      console.log("working");
    },

    //FUNCTION TO RESET THE FORM

    resetForm() {
      this.itemName = "";
      this.clearInputFile();
      this.v$.$reset();
    },

    //FUNCTION TO RESET THE ERROR MESSAGE OF FILE

    resetFileErrorMessage() {
      let message = document.getElementById("errormessage");
      message.style.display = "none";
    },

    //FUNCTION TO CLOSE THE MODAL

    closeModal() {
      this.resetFileErrorMessage();
      this.resetForm();
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
}
.add-item-outer-container {
  height: 100vh;
  width: 100%;
  background-color: white;
}

.modal-container {
  height: auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 32px;
  left: 18%;
  width: 60%;
  border-radius: 3px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  color: #535353;
  font-family: Arial, Helvetica, sans-serif;
  z-index: 999;
}
.modal-header {
  display: grid;
  grid-template-columns: 10fr 1fr;
  padding: 10px;
  border-bottom: 1px solid #e5e5e5;
}
.close-button {
  margin-left: 35px;
}
.label-item-name {
  padding: 10px;
}
.itemname {
  border: 1px solid rgb(214, 212, 212);
  border-radius: 5px;
  width: 97%;
  height: 34px;
  padding: 8px;
}
.input-item-name {
  padding-left: 10px;
}
.labelname-item {
  color: black;
}
.labelname-file {
  color: black;
}
.required {
  color: #bd7170;
}
.label-file {
  padding: 10px;
}
.file {
  padding: 10px;
  display: none;
}
.buttons {
  display: flex;
  justify-content: end;
  padding: 10px;
}
.add-and-continue {
  padding-left: 20px;
  display: none;
}
.add {
  padding-left: 20px;
}
.cancel-button {
  background-color: white;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  width: 106px;
  height: 33px;
  color: #62c5e9;
}
.add-and-continue-button {
  background-color: #41c3b8;
  border: none;
  border-radius: 5px;
  width: 176px;
  height: 33px;
  color: white;
}
.add-button {
  background-color: #41c3b8;
  border: none;
  border-radius: 5px;
  width: 87px;
  height: 33px;
  color: white;
}
.file-button {
  display: block;
  padding: 10px;
  margin-left: 10px;
  background-color: #e0f4fb;
  border-radius: 5px;
  color: #00a0dc;
  border-style: dotted;
  border-color: #00a0dc;
  width: 97%;
  padding-bottom: 10px;
}
.closebutton {
  color: #cfcfcf;
  cursor: pointer;
  font-weight: bold;
}
.closebutton:hover {
  color: grey;
  cursor: pointer;
}
.cancel-button:hover {
  background-color: rgb(226, 221, 221);
}
.add-and-continue-button:hover {
  background-color: #31b3a8;
}
.add-button:hover {
  background-color: #31b3a8;
}
.uploaded-file-button {
  display: none;
  padding: 10px;
  margin-left: 10px;
  background-color: #e0f4fb;
  border-radius: 5px;
  color: #00a0dc;
  border-style: dotted;
  border-color: #00a0dc;
  width: 97%;
  padding-bottom: 10px;
}
.close-icon {
  margin-top: -3.5%;
  margin-left: 93%;
  display: none;
  cursor: pointer;
}
.input-file {
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
}
.file-error-message {
  padding: 10px;
  display: none;
}
.error-message {
  color: red;
}

@media screen and (max-width: 768px) {
  .close-icon {
    margin-top: -7%;
    margin-left: 93%;
    display: none;
    cursor: pointer;
  }
}
@media screen and (max-width: 1280px) {
  .close-icon {
    margin-top: -4%;
    margin-left: 93%;
    display: none;
    cursor: pointer;
  }
}
@media screen and (max-width: 1024px) {
  .close-icon {
    margin-top: -5%;
    margin-left: 93%;
    display: none;
    cursor: pointer;
  }
}
</style>
