# Quick Start

## Import and Usage

`counterapi` is totally compatible both `Typescript` and `JavaScript`. Just import it in your project and start to
count!

It does not require authentication or login.

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

## Get Count Number

After counting up/down, you can get the final status of your counter with `get` function.

```typescript
import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.get("MyCounter01")
```
