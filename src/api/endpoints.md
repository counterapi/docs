# Endpoints

## Browser API Endpoints

Counter API does not have any authentication. You do not need any token, or a password to use it. The API address
is [https://api.counterapi.dev/v1](https://api.counterapi.dev/v1)

<br/>

You can find all endpoints listed below. You can simply run the given example query to see the result.

## Counter Up

You can count up with given counter name. The endpoint is `https://api.counterapi.dev/v1/up`.

### Parameters

name | required | description
--- | --- | ---
`name`| yes | Counter name

### Test

```shell
curl -X GET https://api.counterapi.dev/v1/up?name=APITest
```

<APIRun type="up" />

## Counter Down

You can count down with given counter name. The endpoint is `https://api.counterapi.dev/v1/down`.

### Parameters

name | required | description
--- | --- | ---
`name`| true | Counter name

### Test

```shell
curl -X GET https://api.counterapi.dev/v1/down?name=APITest
```

<APIRun type="down" />

## Counter Get

You can count get with given counter name. The endpoint is `https://api.counterapi.dev/v1/get`.

### Parameters

name | required | description
--- | --- | ---
`name`| true | Counter name

### Test

```shell
curl -X GET https://api.counterapi.dev/v1/get?name=APITest
```

<APIRun type="get" />

## Counts List

You can get count list with given counter name. The endpoint is `https://api.counterapi.dev/v1/counts`.

### Parameters

name | required | description
--- | --- | ---
`name`| true | Counter name
`group_by`| true | Grouping the results by given time interval. e.g. `hour`, `day`, `month`, `year`.
`order_by`| no | Ordering the results. e.g. `asc`, `desc`.

### Test

```shell
curl -X GET https://api.counterapi.dev/v1/counts?name=APITest&group_by=day
```

<APIRun type="counts/" />
