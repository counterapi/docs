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

counter.up("MyCounter01")
```

## Count Down

```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.down("MyCounter01")
```

## Set Count

You can set your counter to with `set` function.

```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.set("MyCounter01", 10)
```

## Get Count Number

After counting up/down, you can get the final status of your counter with `get` function.

```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.get("MyCounter01")
```
