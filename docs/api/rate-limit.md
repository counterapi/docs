# Rate Limit

Rate limiting is a security measure that CounterAPI implements to ensure fair usage and system stability. It restricts the number of API requests a client can make within a specific time period, preventing any single user from overwhelming the service and ensuring consistent performance for everyone.

## Rate Limits by API Version

Counter API has different rate limits depending on which version of the API you're using:

### V1 Endpoints

V1 endpoints have a rate limit of `30` requests per minute per IP address. For detailed documentation on V1 endpoints, see the [V1 Endpoints Documentation](endpoints/v1.md).

### V2 Endpoints

V2 endpoints have a higher rate limit of `600` requests per minute per IP address. **Note: V2 endpoints require user signup to access.** For comprehensive documentation on V2 endpoints, see the [V2 Endpoints Documentation](endpoints/v2.md).

## How Rate Limiting Works

CounterAPI implements a sliding window rate limiting approach to manage API traffic efficiently. Here's how it works:

### IP-Based Identification

For V1 endpoints, the system identifies users by their IP address. This means all requests coming from the same IP address share the same rate limit allocation. While this approach is simple, it can be limiting for users behind shared IPs or corporate networks.

### Authentication-Based Identification

For V2 endpoints, the system primarily identifies users by their API key, which provides a more accurate way to track and allocate rate limits. This ensures that your rate limit is tied to your account rather than your network location.

### Sliding Window Implementation

Rather than using a fixed time window (which could allow request spikes at window boundaries), CounterAPI employs a sliding window approach that:

1. Tracks requests over a rolling time period (1 minute)
2. Gradually expires older requests from the count
3. Provides a smoother, more consistent rate limiting experience

### Rate Limit Headers

When you make requests to the API, the response includes headers that help you track your rate limit usage:

- `X-RateLimit-Limit`: Your total allocation (30 or 600 requests depending on API version)
- `X-RateLimit-Remaining`: Number of requests remaining in the current window
- `X-RateLimit-Reset`: Time in seconds until your rate limit fully resets

### Handling Rate Limit Exceeded

If you exceed your rate limit, the API will respond with:

- HTTP Status Code: `429 Too Many Requests`
- A JSON response indicating you've exceeded your limit
- A `Retry-After` header indicating when you can resume making requests

### Best Practices

To make the most of your rate limits:

- Implement exponential backoff for retries
- Cache frequently accessed data on your side
- Use bulk operations where available instead of multiple single requests
- For high-volume needs, consider upgrading to V2 endpoints with higher limits

---

