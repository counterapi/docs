# Get Started with CounterAPI JavaScript

This guide provides a comprehensive overview of how to use the CounterAPI JavaScript client in your projects.

## Installation

### Using NPM (recommended)

```bash
npm install counterapi
```

### Using Yarn

```bash
yarn add counterapi
```

### Browser via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/counterapi/dist/counter.browser.min.js"></script>
```

## Creating a Client

### V2 API (Recommended)

```javascript
import { Counter } from 'counterapi';

// Create a client for the V2 API
const counter = new Counter({
  workspace: 'my-workspace',  // Your workspace name
  debug: false,               // Optional: Enable debug logging
  timeout: 5000,              // Optional: Request timeout in ms (default: 10000)
  accessToken: 'your-token'   // Optional: Authentication token for API requests (V2 API only)
});
```

> **Important:** The `accessToken` parameter is only available for the V2 API. Authentication is not supported in V1 API.

### V1 API (Legacy)

```javascript
import { Counter } from 'counterapi';

// Create a client for the V1 API
const counterV1 = new Counter({
  version: 'v1',       // Specify V1 API
  namespace: 'my-app', // Your namespace
  debug: false,        // Optional: Enable debug logging
  timeout: 5000        // Optional: Request timeout in ms (default: 10000)
  // Note: accessToken is not supported in V1 API
});
```

## Basic Operations

### Getting a Counter Value

```javascript
// Get the current value of a counter
try {
  const counter = await counterClient.get('page-views');
  console.log(`Current count: ${counter.value}`);
} catch (error) {
  console.error('Error retrieving counter:', error.message);
}
```

### Incrementing a Counter

```javascript
// Increment a counter by 1
try {
  const counter = await counterClient.up('page-views');
  console.log(`New count after increment: ${counter.value}`);
} catch (error) {
  console.error('Error incrementing counter:', error.message);
}
```

### Decrementing a Counter

```javascript
// Decrement a counter by 1
try {
  const counter = await counterClient.down('page-views');
  console.log(`New count after decrement: ${counter.value}`);
} catch (error) {
  console.error('Error decrementing counter:', error.message);
}
```

### Resetting a Counter (V2 API only)

```javascript
// Reset a counter to 0
try {
  const counter = await counterV2.reset('page-views');
  console.log(`Counter reset to: ${counter.value}`);
} catch (error) {
  console.error('Error resetting counter:', error.message);
}
```

### Setting a Counter Value (V1 API only)

```javascript
// Set a counter to a specific value
try {
  const counter = await counterV1.set('page-views', 100);
  console.log(`Counter set to: ${counter.value}`);
} catch (error) {
  console.error('Error setting counter value:', error.message);
}
```

## Working with Statistics (V2 API only)

The V2 API provides rich statistics about your counters, including temporal data:

```javascript
// Get statistics for a counter
try {
  const result = await counterV2.stats('page-views');
  
  // Basic stats
  console.log(`Up count: ${result.data.up_count}`);
  console.log(`Down count: ${result.data.down_count}`);
  
  // Today's stats
  console.log(`Today's up count: ${result.data.stats.today.up}`);
  console.log(`Today's down count: ${result.data.stats.today.down}`);
  
  // This week's stats
  console.log(`This week's up count: ${result.data.stats.this_week.up}`);
  console.log(`This week's down count: ${result.data.stats.this_week.down}`);
  
  // Temporal data
  console.log('Hourly breakdown:', result.data.stats.temporal.hours);
  console.log('Weekday breakdown:', result.data.stats.temporal.weekdays);
  console.log('Quarterly breakdown:', result.data.stats.temporal.quarters);
} catch (error) {
  console.error('Error getting counter stats:', error.message);
}
```

## Error Handling

The CounterAPI client throws standardized errors that you can catch and handle:

```javascript
try {
  const counter = await counterClient.up('page-views');
} catch (error) {
  console.error('Error:', error.message);
  console.error('Status:', error.status);
  console.error('Code:', error.code);
  
  // Handle specific error cases
  if (error.status === 429) {
    console.error('Rate limit exceeded. Please try again later.');
  } else if (error.status === 404) {
    console.error('Counter not found. Check your counter name and workspace.');
  }
}
```

## Next Steps

- Explore implementation examples for different environments:
  - [Browser Implementation](browser.md) - Learn how to use CounterAPI in web browsers
  - [Node.js Implementation](node.md) - Discover server-side implementation patterns
- Learn how to [secure your counters with authentication](../api/authentication.md) (V2 API only)
- Check out the full [API documentation](../api/index.md) for more details 