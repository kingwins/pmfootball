<template>
  <div class="container-fluid px-3 px-sm-5">
    <h1 class="text-left">{{ headTitle }}</h1>
    <br />
    <b-row>
      <b-col cols="12" md="8" order="2" order-md="1">
        <div class="user-list text-left d-flex flex-column justify-content-between">
          <b-form @submit="onSubmit" class="formularz">
            <b-row>
              <b-col cols="12" md="6" class="pt-5">
                <label for="first-name">First Name</label>
                <b-form-input
                  id="first-name"
                  v-model="firstName"
                  type="text"
                  min="0"
                  max="30"
                  step="0.5"
                  required
                ></b-form-input>
              </b-col>
              <b-col cols="12" md="6" class="pt-5">
                <label for="last-name">Last Name</label>
                <b-form-input
                  id="last-name"
                  v-model="lastName"
                  type="text"
                  min="0"
                  max="30"
                  step="0.5"
                  required
                ></b-form-input>
              </b-col>
            </b-row>
            <b-button
              type="submit"
              variant="success"
              class="align-self-start button-add mt-5 font-14"
            >Update Details</b-button>
          </b-form>
        </div>
      </b-col>
      <b-col cols="12" md="4" order="1" order-md="1">
        <div class="user-list d-flex flex-column align-items-center">
          <img :src="imageSrc" alt class="py-5 avatar-image" />
          <b-button
            v-b-modal.modal-avatar
            class="mt-5 btn-photo font-14"
            variant="outline-secondary"
          >
            <font-awesome-icon icon="camera" class="icon-cam"/>Change Photo
          </b-button>
        </div>
      </b-col>
    </b-row>

    <!-- <b-modal id="modal-1" title="Enter URL">
      <b-form-input id="avatar-input" v-model="avatar" type="text" min="0" max="150" step="0.5"></b-form-input>
      
    </b-modal>-->
    <b-modal
      id="modal-avatar"
      ref="modalAvatar"
      title="Enter URL"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="formAvatar" @submit.stop.prevent="submitAvatar">
        <b-form-group
          :state="avatarState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="avatar"
            :state="avatarState"
            required
            placeholder="https://..."
            v-validate="'required|url'"
            name="avatarURL"
          ></b-form-input>
          <b-tooltip :show.sync="errors.has('avatarURL')" target="name-input" triggers="none" placement="top">
            Enter proper URL
          </b-tooltip>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'List',
  data() {
    return {
      firstName: '',
      lastName: '',
      imageSrc: require('@/assets/defaultAvatar.png'),
      avatar: null,
      avatarState: null,
      paramId: null,
      headTitle: '',
    }
  },
  created(){
    this.paramId = this.$route.params.id
    if (this.paramId){
      this.singleUser(this.paramId)
      this.headTitle = 'Edit User'
    } else {
      this.headTitle = 'Add User'
    }
  },
  methods: {
    ...mapActions(['addUser', 'updateUser']),
    async singleUser(id) {
      const response = await axios.get('https://reqres.in/api/users/'+id)
      this.firstName = response.data.data.first_name
      this.lastName = response.data.data.last_name
      this.imageSrc = response.data.data.avatar
    },
    onSubmit(e) {
      e.preventDefault()
      if(this.paramId){
        this.updateUser({
          id: parseInt(this.paramId),
          first_name: this.firstName,
          last_name: this.lastName,
          avatar: this.imageSrc,
        })
      } else {
        this.addUser({          
          first_name: this.firstName,
          last_name: this.lastName,
          avatar: this.imageSrc,
        })
        this.firstName = ''
        this.lastName = ''
      }
      this.$router.go(-1)
    },
    resetModal() {
      this.avatar = ''
      this.avatarState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
            // console.log(this.avatar)
            this.imageSrc = this.avatar

            // Hide the modal manually
            this.$nextTick(() => {
              this.$refs.modalAvatar.hide()
            })
          }
        }
      )
    }
  }
}
</script>

<style >
.avatar-image {
  height: 152px;
  border-radius: 50%;
  box-sizing: content-box;
  width: 152px;
  object-fit: cover;
}
.btn-photo {
  width: 100%;
  padding: 10px 20px;
  /* margin-bottom: 5px; */
}
.icon-cam{
  margin-right:6px;
}
.font-14 {
  font-size: 14px;
}
.user-list {
  height: calc(100% - 35px) !important;
}
label {
  font-size: 13px !important;
  font-weight: bold;
  color: rgb(73, 73, 73);
}
.formularz {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}

</style>
