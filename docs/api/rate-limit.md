# Rate Limit

Although Counter API does not have any authentication or login, it does have rate limits.

## Rate Limits by API Version

Counter API has different rate limits depending on which version of the API you're using:

### V1 Endpoints

V1 endpoints have a rate limit of `30` requests per minute per IP address.

### V2 Endpoints

V2 endpoints have a higher rate limit of `600` requests per minute per IP address. **Note: V2 endpoints require user signup to access.**

## How Rate Limiting Works

The API enforces rate limits per IP address. It identifies clients by their IP address and restricts their request volume accordingly.

<br/>

If you are interested how it's implemented, you can find
it <a href="https://github.com/counterapi/counterapi/blob/master/pkg/middlewares/limiter.go#L46" target="_blank">
here</a>.
