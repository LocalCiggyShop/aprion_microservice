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
  <div class="container list-none mx-auto">
    <div class="loaded" v-if="Page.loading">
      Loading
    </div>
    <div class="error" v-if="Page.error">
      Error
    </div>
    <div class="flex space-x-4 flex-wrap -mx-50">
      <li v-for="item in Articles.blogs">
        <a href="#"
          class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ item.title }}</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">{{ item.content }}</p>
        </a>
      </li>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      Articles: {
        blogs: {}
      },
      Page: {
        loading: true,
        text: "",
        error: false
      }
    }
  },
  mounted() {
    axios.get(`http://localhost:3001/v1/blogs/blog/all`)
      .then(doc => {
        this.Page.loading = false;
        this.Page.error = false;
        this.Articles.blogs = doc.data;
      })
      .catch(_ => {
        this.Page.loading = false;
        this.Page.error = true;
        console.log(_);

        return console.error("An error has occured.");
      })
  }
}
</script>