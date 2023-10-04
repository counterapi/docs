<template>
  <section>
    <div class="columns-1">
      <div class="w-full">
        <Button
            size="md"
            color="default"
            :loading="loading"
            @click="run"
            class="float-right"
        >
          Run
          <template #suffix>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
          </template>
        </Button>
      </div>
      <div v-if="result" class="w-full bg-blue-50 dark:bg-slate-700 rounded-md border-1 border-blue-800 sm p-3 mt-3">
        <p class="text-lg font-semibold mb-0">Result</p>
        <pre class="has-background-white-ter">{{ result }}</pre>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { Button,  } from 'flowbite-vue'

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
  components: {
    Button,
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
        .get(`test/test/${this.type}`, {
          params: query,
        })
        .then(function (response) {
          that.result = response.data;
        })
        .finally(() => {
          this.loading = false;
          setTimeout(function () {
            that.result = null;
          }, 20000);
        });
    },
  },
};
</script>
