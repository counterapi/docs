# Introduction

Counter API offers a single, current version of endpoints: **v2**. The legacy v1 API has been deprecated and is no longer available as of **August 7, 2026**.

!!! danger "V1 is deprecated"
    As of **August 7, 2026**, the v1 API has been retired and no longer serves requests. All new and existing integrations must use the v2 API. See the [V1 Endpoints](endpoints/v1.md) page for migration notes.

## API Versions

### V2 Endpoints (Current)

The v2 API is our current and only supported offering, with enhanced features and capabilities:

- **User Authentication**: Requires signup and login
- **Private Counters**: Support for private counters that only you can access
- **Superior Rate Limits**: 600 requests per minute per user
- **API Base URL**: [https://api.counterapi.dev/v2](https://api.counterapi.dev/v2)
- **Use Case**: Ideal for all applications, from simple public counters to production workloads requiring higher throughput and private data

The v2 endpoints provide robust features for developers who need higher performance and private counter management. By requiring authentication, we can offer better security for your count data and much higher throughput for your applications.

**All projects, new and existing, must use v2 endpoints.**

### V1 Endpoints (Deprecated — No Longer Available)

The v1 API was our original offering, but it has been **deprecated and shut down as of August 7, 2026**. Requests to the v1 API base URL ([https://api.counterapi.dev/v1](https://api.counterapi.dev/v1)) will no longer succeed.

If you still have applications using v1, migrate them to the [V2 Endpoints](endpoints/v2.md) as soon as possible. See the [V1 Endpoints documentation](endpoints/v1.md) for migration guidance.

## Choosing the Right Version

- Use **v2** — it is the only supported version for all applications, public or private, regardless of scale.

For more information about rate limits, see our [Rate Limits](rate-limit.md) documentation.

---

