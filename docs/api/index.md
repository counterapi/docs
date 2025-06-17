# Introduction

Counter API offers two versions of endpoints: v1 and v2, each with different capabilities and limits.

## API Versions

### V2 Endpoints (Recommended)

The v2 API is our premium offering with enhanced features and capabilities:

- **User Authentication**: Requires signup and login
- **Private Counters**: Support for private counters that only you can access
- **Superior Rate Limits**: 600 requests per minute per user (20x higher than v1)
- **API Base URL**: [https://api.counterapi.dev/v2](https://api.counterapi.dev/v2)
- **Use Case**: Ideal for production applications, higher throughput needs, and private data

The v2 endpoints provide significantly more robust features for developers who need higher performance and private counter management. By requiring authentication, we can offer better security for your count data and much higher throughput for your applications.

**We strongly recommend using v2 endpoints for all new projects.**

### V1 Endpoints (Legacy)

The v1 API is our original offering with the following limitations:

- **Public Access**: No authentication required
- **Restricted Rate Limits**: Limited to only 30 requests per minute per IP
- **API Base URL**: [https://api.counterapi.dev/v1](https://api.counterapi.dev/v1)
- **Use Case**: Simple projects, public counters, and basic applications

The v1 endpoints do not require any authentication or authorization to use. This means that anyone who has access to the API can access and modify the count data stored in it. As a result, there is no need to use any token or password to access the API.

This is a significant advantage for simple use cases, as it allows developers to easily integrate count data into their applications without the need for complex authentication and authorization systems.

## Choosing the Right Version

- Choose **v2** for most applications, especially those requiring private data, higher throughput, or that you plan to scale
- Choose **v1** only if you need a simple, public counter with minimal requirements

For more information about rate limits, see our [Rate Limits](rate-limit.md) documentation.
