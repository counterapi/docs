<template>
  <section>
    <h1 class="font-sans text-teal">hello world</h1>
    <div class="bg-gray-100 flex justify-center items-center h-screen">
      <!-- Left: Image -->
      <!-- Right: Login Form -->
      <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 class="text-2xl font-semibold mb-4">Login</h1>
        <form action="#" method="POST">
          <!-- Username Input -->
          <div class="mb-4">
            <label for="username" class="block text-gray-600">Username</label>
            <input type="text" id="username" name="username" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off">
          </div>
          <!-- Password Input -->
          <div class="mb-4">
            <label for="password" class="block text-gray-600">Password</label>
            <input type="password" id="password" name="password" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off">
          </div>
          <!-- Remember Me Checkbox -->
          <div class="mb-4 flex items-center">
            <input type="checkbox" id="remember" name="remember" class="text-blue-500">
            <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
          </div>
          <!-- Forgot Password Link -->
          <div class="mb-6 text-blue-500">
            <a href="#" class="hover:underline">Forgot Password?</a>
          </div>
          <!-- Login Button -->
          <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
        </form>
        <!-- Sign up  Link -->
        <div class="mt-6 text-blue-500 text-center">
          <a href="#" class="hover:underline">Sign up Here</a>
        </div>
      </div>
    </div>
    <div class="columns is-multiline">
      <div class="column is-12">
        <button
          :loading="loading"
          class="is-pulled-right is-primary"
          @click="run"
          >Run →
        </button>
      </div>
      <div v-if="result" class="column is-12 pt-0">
        <p class="subtitle mb-0">Result</p>
        <pre class="has-background-white-ter">{{ result }}</pre>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import "tailwindcss/tailwind.css"

const BASE_URL = "https://api.counterapi.dev/v1/";

export const apiConfig = {
  returnRejectedPromiseOnError: true,
  withCredentials: false,
  timeout: 30000,
  baseURL: BASE_URL,
  headers: {
    common: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
};

let axiosInstance = axios.create(apiConfig);

export default {
  props: {
    type: String,
  },
  data() {
    return {
      result: null,
      loading: false,
    };
  },
  methods: {
    getQueryFromType() {
      switch (this.type) {
        case "up":
          return {
            name: "APITest",
          };
        case "down":
          return {
            name: "APITest",
          };
        case "get":
          return {
            name: "APITest",
          };
        case "set":
          return {
            name: "APITest",
            count: 10,
          };
        case "counts/":
          return {
            name: "APITest",
            group_by: "days",
          };
      }
    },
    run() {
      let that = this;
      this.loading = true;
      const query = this.getQueryFromType();
      axiosInstance
        .get(this.type, {
          params: query,
        })
        .then(function (response) {
          that.result = response.data;
        })
        .finally(() => {
          this.loading = false;
          setTimeout(function () {
            that.result = null;
          }, 8000);
        });
    },
  },
};
</script>

<style lang="scss">
</style>
