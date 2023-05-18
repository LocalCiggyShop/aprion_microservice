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
    axios.post(`http://localhost:3001/v1/user/register`, params, { 
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

<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="../assets/logo.png" alt="logo">
          aprion    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign up for an account
              </h1>
              <div class="error" v-if="formData.showMsg"> 
                {{ formData.text }} 
              </div>
              <form class="space-y-4 md:space-y-6" @submit.prevent="submitForm">
                  <div>
                    <BaseInput for="email" v-model="formData.username" label="Enter Username" />
                    <span class="error" v-for="error in v$.username.$errors" :key="error.$uid">{{ error.$message }} </span>
                      <!-- <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label> -->
                      <!-- <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""> -->
                    </div>
                    <div>
                        <BaseInput v-model="formData.email" label="Enter Email" />
                        <span class="error" v-for="error in v$.email.$errors" :key="error.$uid">{{ error.$message }} <br></span>
                    </div>
                  <div>
                      <BaseInput v-model="formData.password" label="Enter Password" />
                      <span class="error" v-for="error in v$.password.$errors" :key="error.$uid">{{ error.$message }} <br></span>
                      <!-- <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label> -->
                      <!-- <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""> -->
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <BaseButton @click="submitForm" theme="primary" :disabled="formData.btnLoading" :loading="formData.btnLoading" label="Login" />
                  <!-- <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button> -->
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
  
  <!-- <div>
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
  </div> -->
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