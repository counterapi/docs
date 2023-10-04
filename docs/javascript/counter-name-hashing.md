# Counter Name Hashing

Counter name is unique. However, anyone who knows the name can count up or down. Also, the counter name can be
only `100` character long and `alphanumeric`.

## Valid & Invalid Counter Names

|Valid|Invalid|
|---|---|
|MyCounter001|my-counter-001| 
|MyCounter|my-counter&|
|mycounter|my.counter|

## Hashing

If you would like to name your counter with different characters, or making it unique. You can use built in hashing
option.

```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.up("My Counter 01", true).then((response) => {
    console.log(response);
});
```

Output:

```shell
Counter {
  ID: 10,
  Name: '9eacf10d08ba89201f4017cd6eba6586a0559cbe0b01a2d75564ffb93d610f17',
  Count: 2,
  UpdatedAt: '2021-03-27T19:50:30.556599163Z',
  CreatedAt: '2021-03-28T03:47:05.422508+08:00'
}
```

Passing `true` value will hash `MyCounter01` string with `SHA256` and store it with hashed string.

When you want to check back your counter, you can use the same string. The string will be hashed again and return the
counter value back.

```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.get("My Counter 01", true).then((response) => {
    console.log(response);
});
```

Output:

```shell
Counter {
  ID: 10,
  Name: '9eacf10d08ba89201f4017cd6eba6586a0559cbe0b01a2d75564ffb93d610f17',
  Count: 2,
  UpdatedAt: '2021-03-27T19:50:30.556599163Z',
  CreatedAt: '2021-03-28T03:47:05.422508+08:00'
}
```
