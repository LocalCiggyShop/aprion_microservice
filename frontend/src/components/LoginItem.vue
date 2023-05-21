<script setup>
import { reactive, computed } from 'vue';
import BaseInput from './utils/BaseInput.vue';
import axios from 'axios';
import form_header from '../components/Form/form_header.vue'
import useVuelidate from "@vuelidate/core";
import { required, maxLength, minLength/*, email*/ } from "@vuelidate/validators";
import BaseButton from './utils/BaseButton.vue';

const formData = reactive({
  username: "",
  password: "",
  showMsg: false,
  text: "",
  btnLoading: false,
  statusClass: "error"
})

const rules = computed(() => {
  return {
    username: { 
      required, 
      /*minLength: minLength(2), email*/
      maxLength: maxLength(30)
    },
    password: { 
      required, 
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

  const params = {
    username: username,
    password: password
  }
  formData.btnLoading = true;

  if (result) {
    axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/v1/user/login`, params, { timeout: 5000,
      headers:{
        contentType:'multipart/form-data'
      },
     })
      .then(doc => {
        // window.location.href="/";
        formData.btnLoading = false;
        formData.showMsg = true;
        console.log(doc.data)

        if(doc.data.msg === "SUCCESS") {
          formData.statusClass = "success"
          // DO NOT USE LOCAL STORAGE IN PRODUCTION
          localStorage.setItem("user", JSON.stringify(doc.data));
          formData.text = "You have logged in!"
          // this.$router.push('/blogs');
        }
        else {
          formData.statusClass = "error"
          doc.data.msg == "" ? formData.text = doc.data : formData.text = doc.data.msg
        }
      })
      .catch(_ => {
        formData.btnLoading = false;
        formData.showMsg = true;
        formData.text = "An error has occured.";

        return console.log("An error has occured.")
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
    <!-- <div class="flex items-center justify-center h-screen ">
  Centered using Tailwind Flex
</div> -->
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <form_header />
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <div :class="formData.statusClass" v-if="formData.showMsg"> 
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
                      <BaseInput type="password" v-model="formData.password" label="Enter Password" />
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
                      Don’t have an account yet? <a href="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
  <!-- <h3 class="text-3xl font-bold dark:text-white">Login to aprion</h3>
  <form @submit.prevent="submitForm">
    <BaseInput v-model="formData.username" label="Enter Username" />
    <span class="error" v-for="error in v$.username.$errors" :key="error.$uid">{{ error.$message }} <br></span>
    <br>
    <BaseInput v-model="formData.password" label="Enter Password" />
    <span class="error" v-for="error in v$.password.$errors" :key="error.$uid">{{ error.$message }} <br></span>
    <br>
    <BaseButton @click="submitForm" :loading="false" label="Login" />
  </form> -->
</template>