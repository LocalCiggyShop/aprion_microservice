<script setup>
import { reactive } from 'vue';

const data = reactive({
  blogs: [],
  loading: true,
  text: "",
  error: false
})

const requestBlogs = async () => {
  axios.get(`http://localhost:3001/v1/blogs/blog/all`)
    .then(doc => {
      this.data.loading = false;
      this.data.error = false;

      //  this.Articles.blogs = [...proxyArr]
      console.log("this ", this.data.blogs)
      this.data.blogs = doc.data
    })
    .catch(_ => {
      this.data.loading = false;
      this.data.error = true;
      console.log(_)

      return console.error("An error has occured.")
    })
}
</script>

<template>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          aprion    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create Blog
              </h1>
              <div class="error" v-if="formData.showMsg"> 
                {{ formData.text }} 
              </div>
              <form class="space-y-4 md:space-y-6" @submit.prevent="submitForm">
                  <div>
                    <BaseInput for="email" v-model="formData.username" label="Enter Username" />
                    <span class="error" v-for="error in v$.username.$errors" :key="error.$uid">{{ error.$message }} </span>
                  </div>
                  <div>
                      <BaseInput v-model="formData.password" label="Enter Password" />
                      <span class="error" v-for="error in v$.password.$errors" :key="error.$uid">{{ error.$message }} <br></span>
                  </div>
               </form>
          </div>
      </div>
    </div>
</template>