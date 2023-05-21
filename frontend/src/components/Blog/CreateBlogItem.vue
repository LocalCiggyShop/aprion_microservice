<script setup>
import { computed, reactive } from 'vue';
import axios from 'axios';
import form_header from '../Form/form_header.vue'
import useVuelidate from "@vuelidate/core";
import { required, maxLength, minLength/*, email*/ } from "@vuelidate/validators";
import BaseButton from '../utils/BaseButton.vue';
import BaseInput from '../utils/BaseInput.vue';

const formData = reactive({
  title: '',
  description: ''
})


const rules = computed(() => {
  return {
    title: { 
      required, 
      /*minLength: minLength(2), email*/
      maxLength: maxLength(30)
    },
    description: { 
      required, 
      minLength: minLength(10),
      maxLength: maxLength(80)
    }
  }
})

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  const result = await v$.value.$validate();

  let title = formData.title;
  let description = formData.description;

  const params = {
    title: title,
    content: description,
    published: true,
    authorId: 4
  }
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
    axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/v1/blogs/blog`, { 
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer '+ accessToken,
        'x-access-signature': signature
      }
    })
    // axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/v1/blogs/blog`, params, { 
    //   timeout: 5000,
    //   headers:{
    //     contentType:'multipart/form-data'
    //   },
    //  })
      .then(doc => {
        // window.location.href="/";
        formData.btnLoading = false;
        formData.showMsg = true;

        if(doc.data.msg === "SUCCESS"
          || doc.data === "SUCCESS") {
          formData.statusClass = "success"
          formData.text = "Successfully created blog post and removed cache!"
        }
        else {
          formData.statusClass = "error"
          doc.data.msg == "" ? formData.text = doc.data.msg : formData.text = doc.data
        }
      })
      .catch(err => {

        formData.btnLoading = false;
        formData.statusClass = "error"
        formData.showMsg = true;
        if(err.response.status)
          formData.text = "You don't have the permission to create a blog post!";
        else
          formData.text = "An error has occured.";
      })
  } else {
    
    console.log(formData.description)
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
                  Create Blog
              </h1>
              <div :class="formData.statusClass" v-if="formData.showMsg"> 
                {{ formData.text }} 
              </div>
              <form class="space-y-4 md:space-y-6" @submit.prevent="submitForm">
                <!-- <div>
                  <span class="bg-purple-500 p-1 rounded text-white text-xs">Temporary</span>
                  <BaseInput for="authorName" v-model="formData.authorName" label="Your username" />
                  <span class="error" v-for="error in v$.authorName.$errors" :key="error.$uid">{{ error.$message }} </span>
                </div> -->
                <div>
                  <BaseInput for="title" v-model="formData.title" label="Enter Title" />
                  <span class="error" v-for="error in v$.title.$errors" :key="error.$uid">{{ error.$message }} </span>
                </div>
                <div>
                    <BaseInput type="textarea" v-model="formData.description" label="Enter Description" />
                    <span class="error" v-for="error in v$.description.$errors" :key="error.$uid">{{ error.$message }} <br></span>
                </div>
                <BaseButton @click="submitForm" theme="primary" :disabled="formData.btnLoading" :loading="formData.btnLoading" label="Create Blog" />
               </form>
          </div>
      </div>
    </div>
</template>