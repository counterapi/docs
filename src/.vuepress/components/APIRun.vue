<template>
  <section>
    <div class="columns is-multiline">
      <div class="column is-12">
        <b-button
          :loading="loading"
          class="is-pulled-right is-primary"
          @click="run"
          >Run →
        </b-button>
      </div>
      <div v-if="result" class="column is-12 pt-0">
        <p class="subtitle mb-0">Result</p>
        <pre class="has-background-white-ter">{{ result }}</pre>
      </div>
    </div>
  </section>
</template>

<script>
let axios = require("axios");

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

axios = axios.create(apiConfig);

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
      axios
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
