# Quick Start

`counterapi` is totally compatible both `Typescript` and `JavaScript`. Just import it in your project and start to
count!

<br/>

It does not require authentication or login. Only obligation is the rate limit. The API is limited to `2`
request/second per IP.

```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();
```

## Count Up

You can count up with given name. The name of the counter is unique. Do not forget that anyone with same name can count
up or down.


```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.up("test", "test").then((res) => {
    console.log(res)
})
```

Output

```shell
Counter {
  ID: 1,
  Name: 'test',
  Count: 15,
  UpdatedAt: '2023-03-27T13:33:51.315934+01:00',
  CreatedAt: '2023-03-26T21:46:18.624369+08:00'
}
```

## Count Down

```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.down("test", "test").then((res) => {
    console.log(res)
})
```

Output

```shell
Counter {
  ID: 1,
  Name: 'test',
  Count: 14,
  UpdatedAt: '2023-03-27T13:33:51.315934+01:00',
  CreatedAt: '2023-03-26T21:46:18.624369+08:00'
}
```
## Set Count

You can set your counter to with `set` function.

### Set by Name

```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.set("test", "test", 10).then((res) => {
    console.log(res)
})
```

Output

```shell
Counter {
  ID: 1,
  Name: 'test',
  Count: 10,
  UpdatedAt: '2023-03-27T13:33:51.315934+01:00',
  CreatedAt: '2023-03-26T21:46:18.624369+08:00'
}
```

## Get Count Number

After counting up/down, you can get the final status of your counter with `get` function.

```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.get("test", "test").then((res) => {
    console.log(res)
})
```

Output

```shell
Counter {
  ID: 1,
  Name: 'test',
  Count: 14,
  UpdatedAt: '2023-03-27T13:33:51.315934+01:00',
  CreatedAt: '2023-03-26T21:46:18.624369+08:00'
}
```


## Get Count List by Name

You can get the counts historically. Use `group_by` to group them, default `day`.

```typescript
import {CounterAPI, GroupByTypes, OrderByTypes} from "counterapi";

const counter = new CounterAPI();

const q = {
    group_by: GroupByTypes.Day,
    order_by: OrderByTypes.ASC,
};

counter.counts("test", "test", q).then((res) => {
    console.log(res);
});
```

Output

```shell
[
  Count { Count: 2, Date: '2023-03-07T00:00:00+08:00' },
  Count { Count: 14, Date: '2023-03-26T00:00:00+08:00' },
  Count { Count: 40, Date: '2023-03-27T00:00:00+08:00' }
]
```
