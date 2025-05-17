<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

# Endpoints

Counter API does not have any authentication. You do not need any token, or a password to use it. The API address
is [https://api.counterapi.dev/v1](https://api.counterapi.dev/v1)

<br/>

You can find all endpoints listed below. You can simply run the given example query to see the result.

## Counter Up

You can count up with given counter name. The endpoint is `https://api.counterapi.dev/v1/:namespace/:name/up`.

### Parameters

name | required | description
--- | --- | ---
`:namespace`| yes | Namespace for the counter
`:name`| yes | Counter name

### Test

```shell
curl -X GET https://api.counterapi.dev/v1/test/test/up
```

<div id="up">
    <a v-on:click="Run('up')" class="md-button" :class="{'md-button--primary': !loading}">
        <span v-if="loading">Loading...</span>
        <span v-else>Run →</span>
    </a>
    <pre>
        <code v-if="result" class="language-shell">{{result}}</code>
    </pre>
</div>

## Counter Down

You can count down with given counter name. The endpoint is `https://api.counterapi.dev/v1/:namespace/:name/down`.

### Parameters

name | required | description
--- | --- | ---
`:namespace`| yes | Namespace for the counter
`:name`| yes | Counter name


### Test

```shell
curl -X GET https://api.counterapi.dev/v1/test/test/down
```

<div id="down">
    <a v-on:click="Run('down')" class="md-button" :class="{'md-button--primary': !loading}">
        <span v-if="loading">Loading...</span>
        <span v-else>Run →</span>
    </a>
    <pre>
        <code v-if="result" class="language-shell">{{result}}</code>
    </pre>
</div>

## Set Counter

You can set counter with given counter name and count number. The endpoint is `https://api.counterapi.dev/v1/:namespace/:name/set`.

### Parameters

name | required | description
--- |----------| ---
`:namespace`| yes      | Namespace for the counter
`:name`| yes      | Counter name
`count`| yes      | Count number

### Test

```shell
curl -X GET https://api.counterapi.dev/v1/test/test/?count=10
```

<div id="set">
    <a v-on:click="Run('set?count=10')" class="md-button" :class="{'md-button--primary': !loading}">
        <span v-if="loading">Loading...</span>
        <span v-else>Run →</span>
    </a>
    <pre>
        <code v-if="result" class="language-shell">{{result}}</code>
    </pre>
</div>

## Counter Get

You can count get with given counter name. The endpoint is `https://api.counterapi.dev/v1/:namespace/:name/`.

### Parameters

name | required | description
--- | --- | ---
`:namespace`| yes | Namespace for the counter
`:name`| yes | Counter name

### Test

```shell
curl -X GET https://api.counterapi.dev/v1/test/test
```

<div id="get">
    <a v-on:click="Run('')" class="md-button" :class="{'md-button--primary': !loading}">
        <span v-if="loading">Loading...</span>
        <span v-else>Run →</span>
    </a>
    <pre>
        <code v-if="result" class="language-shell">{{result}}</code>
    </pre>
</div>

## Counts List

You can get count list with given counter name. The endpoint is `https://api.counterapi.dev/v1/:namespace/:name/list`.

### Parameters

name | required | description
--- |----------| ---
`:namespace`| yes      | Namespace for the counter
`:name`| yes      | Counter name
`group_by`| no       | Grouping the results by given time interval, default `day`. Options: `hour`, `day`, `week`, `month`, `year`.
`order_by`| no       | Ordering the results. e.g. `asc`, `desc`.

### Test

```shell
curl -X GET https://api.counterapi.dev/v1/test/test/list?group_by=day
```

<div id="list">
    <a v-on:click="Run('list')" class="md-button" :class="{'md-button--primary': !loading}">
        <span v-if="loading">Loading...</span>
        <span v-else>Run →</span>
    </a>
    <pre>
        <code v-if="result" class="language-shell">{{result}}</code>
    </pre>
</div>

---


<script>
  const { createApp, ref } = Vue
  const App = {
    setup() {
      const result = ref('')
      const loading = ref(false)
      const baseURL = ref('https://api.counterapi.dev/v1/')
      const Run = function(apiType) {
        loading.value = true
        fetch(baseURL.value + 'test/test/' + apiType)
          .then(response => response.json())
          .then(data => {
            result.value = JSON.stringify(data, null, 2)
            setTimeout(() => result.value = '', 10000);
            loading.value = false
          })
      }
      return {
        result,
        loading,
        Run
      }
    }
  }
  createApp(App).mount('#up')
  createApp(App).mount('#down')
  createApp(App).mount('#set')
  createApp(App).mount('#get')
  createApp(App).mount('#list')
</script>