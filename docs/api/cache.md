# Cache

The Counter API incorporates a caching mechanism to deliver exceptionally fast response times. Caching is activated for the following API paths:

| Path                        |Caching| Duration     |
|-----------------------------|---|--------------|
| `/v1/:namespace/:name/`     |Yes| `10` minutes |
| `/v1/:namespace/:name/list` |Yes| `24` hours   |


## Why do we need caching?

The Counter API is a crucial component of the application that provides a count of a specific event or action. It is backed by a `Postgres` database, which is a reliable and scalable database, but it may not be the fastest database available. 

<br>

To improve the performance of the Counter API, we have implemented a `Redis` cache, which is a high-performance in-memory data store that can be used to store frequently accessed data. We have used the Redis cache to store the count of the event or action for the most popular API paths, which can significantly improve the response time of the API.

## Can I disable caching?

Currently, there is no plan to implement the ability to disable caching in the Counter API. However, we are open to adding this feature in the future if there is a need for it. If you have a specific use case where you need to disable caching, please feel free to open an issue on our [GitHub repository](https://github.com/counterapi/api). so that we can discuss the implementation details.

---

