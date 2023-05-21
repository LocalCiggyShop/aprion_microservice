<!-- <script setup>
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
} -->

<template>
  <div class="container list-none mx-auto max-w-screen-sm">
    <div class="success my-4" v-if="Page.loading">
      Loading
    </div>
    <div class="error my-4" v-if="Page.error">
      {{ Page.errorMsg }}
    </div>
    
    <div class="flex space-x-4 my-3 justify-center flex-wrap -mx-50">
      <BaseButton to="/createBlog" class="w-40" theme="primary" label="Create Blog" />
      <BaseButton to="/deleteBlog" class="w-40" theme="danger" label="Delete Blog" />
    </div>
      <br />
    <div class="container mx-auto my-2">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div v-for="item in Articles.blogs" class="flex justify-center">
          <a href="#"
            class="text-ellipsis overflow-hidden block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="text-ellipsis overflow-hidden mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><span class="align-top bg-red-500 p-1 rounded" style="font-size: xx-small;">#{{ item.id }}</span> {{ item.title }}</h5>
            <p class="text-ellipsis overflow-hidden font-normal text-gray-700 dark:text-gray-400">{{ item.content }}</p>
            <p class="text-ellipsis overflow-hidden text-sm/[25px] text-gray-700 dark:text-gray-300">John Williams</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BaseButton from '../utils/BaseButton.vue';

export default {
    data() {
        return {
            Articles: {
                blogs: {}
            },
            Page: {
                loading: true,
                text: "",
                error: false,
                errorMsg: 'Error'
            }
        };
    },
    mounted() {
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
        axios.get(`${import.meta.env.VITE_BASE_SERVER_URL}/v1/blogs/blog/all`,
        {
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+ accessToken,
            'x-access-signature': signature
          }
        })
        .then(doc => {
          this.Page.loading = false;
          this.Page.error = false;
          this.Articles.blogs = doc.data;
        })
        .catch(err => {
          if(err.response.status == 402) 
            localStorage.removeItem('user')

          this.Page.loading = false;
          this.Page.error = true;
          console.log(err);
          this.Page.errorMsg = "Error: You are not authorized to view this."
          return console.error("An error has occured.");
        });
    },
    components: { BaseButton }
}
</script>