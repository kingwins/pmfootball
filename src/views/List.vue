<template>
  <div class="container-fluid px-3 px-sm-5">
    <h1 class="text-left">User List</h1>
    <br />
    <div class="user-list">
      <div class="row">
        <b-col cols="12" sm="6" xl="4">
          <b-form-input type="text" class="searchInput" placeholder="Search for users..."></b-form-input>
          <font-awesome-icon icon="search" class="search-icon" />
        </b-col>
        <b-col cols="12" sm="6" xl="8" class="d-sm-flex justify-content-end py-5 py-sm-0">
          <b-button class="button-add" variant="success" pill to="/football/adduser" >
            <font-awesome-icon class="plus-icon" icon="plus" />Add User
          </b-button>
        </b-col>
      </div>
      <br>
      <hr>
      <br>

      <div class="overflow-auto">
        <b-table
          id="my-table"
          :items="allUsers.data"
          :current-page="allUsers.page"
          :fields="fields"
          small
          borderless
          striped
          hover
          class="text-left"    
        >
          <!-- primary-key="id"
          :tbody-transition-props="transProps" -->

          <!-- A virtual column -->
          <template slot="[avatar]" slot-scope="data">
            <b-img :src="data.value" class="avatar" rounded="circle" alt="Circle image"></b-img>
          </template>
          <template
            slot="[full_name]"
            slot-scope="data"
          >{{ data.item.first_name }} {{ data.item.last_name}}</template>
          <template slot="[action]" slot-scope="data">
            <div class="text-nowrap">
              <router-link :to="`/football/edituser/${data.item.id}`"> 
                <font-awesome-icon class="action-icon" icon="edit" @click="editRecord(data.item.id)" />
              </router-link>
              <font-awesome-icon
                class="action-icon"
                icon="trash"
                @click="removeRecord(data.item.id)"
              />
            </div>
          </template>
        </b-table>

        <b-pagination
          v-model="allUsers.page"
          :total-rows="allUsers.total"
          :per-page="allUsers.per_page"
          @input="changedPage"
          aria-controls="my-table"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { log } from 'util'

export default {
  name: 'List',
  data() {
    return {
      transProps: {
        // Transition name
        name: 'animate-list'
      },
      fields: [
        { key: 'avatar', label: '', tdClass: 'avatar-col' },
        { key: 'full_name', label: 'Full Name', tdClass: 'name-col' },
        { key: 'action', label: 'Action', tdClass: 'action-col' }
      ]
    }
  },
  methods: {
    ...mapActions(['fetchUsers', 'deleteUser']),    
    changedPage(nr) {
      this.fetchUsers(nr)
    },
    removeRecord(id) {
      this.deleteUser(id)
    },
    editRecord(id) {
      // console.log(id)
    }
  },
  computed: {
    ...mapGetters(['allUsers'])
  },
  created() {
    // this.fetchUsers()
    // console.log('created hook')
  }
}
</script>

<style>
.action-icon {
  cursor: pointer;
  color: #ababab;
  margin-right: 20px;
}
.search-icon {
  pointer-events: none;
  color: #858585;
  position: absolute;
  right: 30px;
  top: 11px;
}
.avatar {
  width: 45px;
}
.avatar-col {
  width: 85px !important;
  vertical-align: middle !important;
  padding-left: 10px !important;
}
.name-col {
  width: 80% !important;
  vertical-align: middle !important;
  padding-top: 25px !important;
  padding-bottom: 25px !important;
}
.action-col {
  vertical-align: middle !important;
  width: 60px !important;
}
.page-item.active .page-link {
  background-color: #459672 !important;
  border-color: #459672 !important;
  color: #fff !important;
}
.page-link {
  color: #459672 !important;
}
.user-list {
  background: white;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #d4d4d4;
  padding: 20px;
  margin-bottom: 30px;
}
.button-add {
  padding: 10px 20px !important;
  background: #459672 !important;
  transition: all 0.3s ease;
  border: none !important;  

}
.button-add:hover {
  background: #307455 !important;
}
.plus-icon {
  margin-right: 10px;
}
.searchInput {
  border: none !important;
  background: #f2f2f2 !important;
}
.animate-list-leave-active {
  /* animation: fadeOutLeft 1s; */
  transition: all 1s ease;
  opacity: 0;
  /* position: absolute; */
}
.animate-list-enter-active {
  /* transition: all 1s ease;
  opacity: 1; */
  animation: fade-in 1s;
  display: none !important;
}
@keyframes fade-in {
  0% {
    display: block !important;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
