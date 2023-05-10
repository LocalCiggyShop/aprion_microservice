<script setup>
import { reactive, computed } from 'vue';
import BaseInput from './utils/BaseInput.vue';
import axios from 'axios';
import useVuelidate from "@vuelidate/core";
import { required, maxLength, minLength, email } from "@vuelidate/validators";
import BaseButton from './utils/BaseButton.vue';

const formData = reactive({
  username: "",
  password: "",
  email: "",
  showMsg: false,
  text: "",
  btnLoading: false
})

const rules = computed(() => {
  return {
    username: { 
      required, 
      /*minLength: minLength(2) */
      maxLength: maxLength(30)
    },
    password: { 
      required, 
      minLength: minLength(10),
      maxLength: maxLength(80)
    },
    email: { 
      required, 
      email,
      minLength: minLength(10),
      maxLength: maxLength(80)
    }
  }
})

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  const result = await v$.value.$validate();

  let username = formData.username;
  let password = formData.password;
  let email = formData.email;

  formData.btnLoading = true;

  const params = {
    username: username,
    password: password,
    email: email
  }

  if (result) {
    axios.post(`http://localhost:3000/v1/user/register`, params, { 
      timeout: 5000,
      headers:{
        contentType:'multipart/form-data'
      },
     })
      .then(doc => {
        // window.location.href="/";
        formData.btnLoading = false;
        // console.log(formData.text)
        formData.showMsg = true;
        formData.text = doc.data.msg;
        
        // console.log(doc.data.msg);
      })
      .catch(_ => {
        formData.btnLoading = false;
        formData.showMsg = true;
        formData.text = "An error has occured.";
        //this.data = response.data.name;
        // console.log(err.message)
        return console.error("An error has occured.")
      })
  } else {
    formData.btnLoading = false;
    return;
    //console.log("Error, form not submitted!")
  }
}
</script>

<template>
  <!-- <div style="text-align: center;">
      <b>Please correct the following error(s):</b>
      <p v-for="error in v$.$errors" :key="error.$uid">
        {{ error.$property }} - {{ error.$message }}
      </p>
    </div> -->
  <div>
    <div class="modal" v-if="formData.showMsg"> 
      {{ formData.text }} 
    </div>
    <form @submit.prevent="submitForm" style="margin-top: 20px; justify-content: center; text-align: center; float:center">
      <BaseInput v-model="formData.username" label="Enter Username" />
      <span class="error" v-for="error in v$.username.$errors" :key="error.$uid">{{ error.$message }} <br></span>
      <br>
      <BaseInput type="password" v-model="formData.password" label="Enter Password" />
      <span class="error" v-for="error in v$.password.$errors" :key="error.$uid">{{ error.$message }} <br></span>
      <br>
      <BaseInput v-model="formData.email" label="Enter Email" />
      <span class="error" v-for="error in v$.email.$errors" :key="error.$uid">{{ error.$message }} <br></span>
      <br>
      <BaseButton @click="submitForm" theme="primary" :disabled="formData.btnLoading" :loading="formData.btnLoading" label="Register" />
    </form>
  </div>
</template>
<!-- &rarr; = "->" -->
<style>
.modal {
  border: 1px solid rgba(62, 62, 62, 0.872);
  background-color: rgba(59, 52, 52, 0.775);
  top: 7px;
  padding: 5px;
  max-width: 210px; 
  margin: 0 auto 2rem;
  color: white;
  text-align: center;
}
@media (min-width: 1024px) {
  .register {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.error {
  border-radius: 5px;
  top: 7px;
  border: 1px solid rgba(255, 63, 63, 0.872);
  background-color: rgba(252, 70, 70, 0.341);
  padding: 5px;
}
</style>
<!-- <script>
export default {
  data() {
    return {
      text: "success",
      showMsg: false
    }
  },
}
</script>
   -->
  <!-- // methods: {
  //   submitForm() {
  //     // let username = this.form.username;
  //     // let password = this.form.password;

  //     // this.errors = []
  //     // for(const item in this.form)
  //     // {
  //     //   if(this.form[item] === "" || this.form[item] ===0) {
  //     //     this.errors.push(item)
  //     //   }
  //     //   // if(this.errors.length === 0) {
  //     //   //   console.log("Submitted!")
  //     //   // }
  //     // }

  //     // axios.get('http://localhost:3000/api/v1/user/search/test')
  //     // .then(response => {
  //     //   this.info = response
  //     //   console.log('response ' + JSON.stringify(response))
  //     // })
  //     // .catch(err => console.log(err.message))
  //   }
  // } -->