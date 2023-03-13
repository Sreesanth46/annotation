<template>
  <div class="add-item-outer-container">
    <div class="modal-container" id="modalcontainer">
      <div class="modal-header">
        <div class="modal-name">
          <span>Delete Item</span
          ><font-awesome-icon icon="fa-regular fa-circle-xmark" />
        </div>
        <div class="close-button">
          <span class="closebutton" @click="closeModal()">X</span>
        </div>
      </div>
      <div class="modal-contents">
        <div class="input-boxes">
          <div class="input-item-name">
            <input
              type="text"
              id="item"
              class="itemname"
              v-model="itemName"
              name="itemName"
              readonly
            />
          </div>
        </div>
        <div class="description">
          <span class="delete-description"
            >All the data in Item has been deleted and cannot be returned to how
            it was.
          </span>
        </div>
        <div class="input-checkboxes-lock">
          <div class="input-checkbox">
            <input type="checkbox" @click="enableDeleteButton()" v-model="checked" />
          </div>
          <div class="label-checkbox">
            <label for="lock">I have understood the contents shown above</label>
          </div>
        </div>
      </div>
      <div class="buttons">
        <div class="right">
          <div class="cancel">
            <button type="button" class="cancel-button" @click="closeModal()">
              Close
            </button>
          </div>
          <div class="add">
            <button
              type="button"
              class="delete-button"
              @click="deleteItem()"
              :disabled="!checked"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MemberService from "../services/MemberService";
import Swal from "sweetalert2";

export default {
  name: "DeleteItem",

  props: {
    item: { type: Object, required: true },
  },

  data() {
    return {
      checked: false,
      itemData: "",
      itemName: "",
      lock: "",
    };
  },
  computed: {
    itemDetails() {
      return this.item;
    },
  },

  mounted() {
    this.itemName = this.itemDetails.name;
  },

  methods: {
    //FUNCTION TO CHECK THE VALUE TO ENABLE AND DISABLE DELETE BUTTON

   enableDeleteButton() {
      this.checked = !this.checked;
    },

    //FUNCTION TO DELETE THE ITEM

    deleteItem() {
      MemberService.deleteItem(this.item.id).then((response) => {
        console.log(response);
        this.closeModal();
        Swal.fire({
          icon: "success",
          title: "Item updated",
          text: "Item updated succesfully",
        });
      });
    },

    //FUNCTION TO CLOSE THE MODAL

    closeModal() {
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
  width: 40%;
  border-radius: 3px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  color: #535353;
  font-family: Arial, Helvetica, sans-serif;
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
  width: 120%;
  height: 34px;
  padding: 8px;
}
.input-item-name {
  padding-left: 10px;
  width: 80%;
}
.labelname-item {
  color: black;
}
.modal-contents {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e5e5e5;
}
.input-checkboxes-lock {
  display: flex;
  margin-top: 10px;
  padding: 10px;
}
.label-checkbox {
  padding-left: 5px;
  padding-right: 10px;
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
  justify-content: flex-end;
  padding: 10px;

}
.right {
  display: flex;
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
.delete-button {
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  width: 106px;
  height: 33px;
  background-color: #f95858;
  color: white;
}
.delete-button:hover {
  background-color: #d43f3f;
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
.description {
  padding: 10px;
}
.input-boxes {
  padding: 10px;
}

.delete-button[disabled] {
  background-color: white;
  cursor: not-allowed;
  color: #62c5e9;
}

.label-checkbox label{
  font-weight: bold;
  color: black;
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
