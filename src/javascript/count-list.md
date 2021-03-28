# Count List

Counter API keeps every count with a timestamp. You can get the list simply passing the count name. This feature design
to generate useful history chart.

## Get Count List

You can use `CounterAPI` to get count list grouped by `hour`, `day`, `week`, `month` and `year`.

You can also use `order_by` query parameter to order the list. For now, result list length is limited to `1000`. If you
need more than that, please contact with me.

```typescript
import {CounterAPI, GroupByTypes, OrderByTypes} from "counterapi";

const counter = new CounterAPI();

const q = {
    name: "test",
    group_by: GroupByTypes.Day,
    order_by: OrderByTypes.ASC,
};

counter.counts(q).then((res) => {
    console.log(res);
});
```

Output:

```shell
[
  Count { Count: 2, Date: '2021-03-07T00:00:00+08:00' },
  Count { Count: 14, Date: '2021-03-26T00:00:00+08:00' },
  Count { Count: 40, Date: '2021-03-27T00:00:00+08:00' }
]
```
