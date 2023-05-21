<script setup>
import { computed, reactive } from 'vue';
import axios from 'axios';
import form_header from '../Form/form_header.vue'
import useVuelidate from "@vuelidate/core";
import { required, maxLength, minLength/*, email*/ } from "@vuelidate/validators";
import BaseButton from '../utils/BaseButton.vue';
import BaseInput from '../utils/BaseInput.vue';

const formData = reactive({
  id: ''
})


const rules = computed(() => {
  return {
    id: { 
      required, 
      /*minLength: minLength(2), email*/
      maxLength: maxLength(30)
    }
  }
})

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  const result = await v$.value.$validate();

  let id = formData.id;

  formData.btnLoading = true;

  if (result) {
    let accessToken;
    let signature;
    try {
      accessToken = JSON.parse(localStorage.getItem('user')).accessToken
      signature = JSON.parse(localStorage.getItem('user')).signature
    } catch (error) {
      console.log(error)
      accessToken = null
      signature = null
    }
    axios.delete(`${import.meta.env.VITE_BASE_SERVER_URL}/v1/blogs/blog/${id}`, { 
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer '+ accessToken,
        'x-access-signature': signature
      }
    })
      .then(doc => {
        // window.location.href="/";
        formData.btnLoading = false;
        formData.showMsg = true;
        if(doc.data.msg === "SUCCESS"
          || doc.data === "SUCCESS") {
          formData.statusClass = "success"
          formData.text = "Successfully deleted blog from db and from cache!"
        }
        // else if(doc.response.status) {
        //   formData.statusClass = "error"
        //   formData.text = "You don't have the permission to create a blog post!";
        // }
        else {
          formData.statusClass = "error"
          doc.data.msg == "" ? formData.text = doc.data.msg : formData.text = doc.data
        }
      })
      .catch(err => {
        console.log(err)
        formData.statusClass = "error"
        formData.btnLoading = false;
        formData.showMsg = true;
        if(err.response.status)
          formData.text = "You don't have the permission to delete a blog post!";
        else
          formData.text = "An error has occured.";
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
      <form_header />
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Delete Blog
              </h1>
              <div :class="formData.statusClass" v-if="formData.showMsg"> 
                {{ formData.text }} 
              </div>
              <form class="space-y-4 md:space-y-6" @submit.prevent="submitForm">
                  <div>
                    <BaseInput for="id" v-model="formData.id" label="Enter ID" />
                    <span class="error" v-for="error in v$.id.$errors" :key="error.$uid">{{ error.$message }} </span>
                  </div>
                  <BaseButton @click="submitForm" theme="danger" :disabled="formData.btnLoading" :loading="formData.btnLoading" label="Delete Blog" />
               </form>
          </div>
      </div>
    </div>
</template>