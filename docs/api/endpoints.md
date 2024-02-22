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

<APIRun type="up" />

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

<APIRun type="down" />

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
curl -X GET https://api.counterapi.dev/v1/test/test/set?count=10
```

<APIRun type="set" />

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

<APIRun type="" />

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

<APIRun type="list" />
