# Rate Limit

Although Counter API does not have any authentication or login, it does have rate limit.

## Limit Per Request

The API has rate limit per IP. It gathers IP address from the client. The limit is `2` requests per second for an IP.

<br/>

If you are interested how it's implemented, you can find
it <a href="https://github.com/counterapi/counterapi/blob/master/pkg/middlewares/limiter.go#L46" target="_blank">
here</a>.