# Rate Limit

Rate limiting is a security measure that CounterAPI implements to ensure fair usage and system stability. It restricts the number of API requests a client can make within a specific time period, preventing any single user from overwhelming the service and ensuring consistent performance for everyone.

## Rate Limits by API Version

Counter API has different rate limits depending on which version of the API you're using:

### V1 Endpoints

V1 endpoints have a rate limit of `30` requests per minute per URL path. For detailed documentation on V1 endpoints, see the [V1 Endpoints Documentation](endpoints/v1.md).

### V2 Endpoints

V2 endpoints have a higher rate limit of `600` requests per minute per URL path. **Note: V2 endpoints require user signup to access.** For comprehensive documentation on V2 endpoints, see the [V2 Endpoints Documentation](endpoints/v2.md).

## How Rate Limiting Works

CounterAPI implements a sliding window rate limiting approach to manage API traffic efficiently. Here's how it works:

### URL Path-Based Identification

The system identifies requests based on the URL path. This means all requests to the same endpoint path share the same rate limit allocation, regardless of which client is making the request. This approach provides more granular and fair distribution of rate limits across different API operations.

### Authentication-Based Identification

For V2 endpoints, the system also considers the API key when allocating rate limits, which provides an additional layer of request tracking. This ensures that your rate limit is tied to both your account and the specific endpoints you're accessing.

### Sliding Window Implementation

Rather than using a fixed time window (which could allow request spikes at window boundaries), CounterAPI employs a sliding window approach that:

1. Tracks requests over a rolling time period (1 minute)
2. Gradually expires older requests from the count
3. Provides a smoother, more consistent rate limiting experience

### Rate Limit Headers

When you make requests to the API, the response includes headers that help you track your rate limit usage:

- `X-RateLimit-Limit`: Your total allocation (30 or 600 requests depending on API version)
- `X-RateLimit-Remaining`: Number of requests remaining in the current window

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

