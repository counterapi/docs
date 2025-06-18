# JavaScript Authentication Examples

This page provides practical examples of how to use authentication with the CounterAPI JavaScript client.

> **Note:** Authentication is only available with the V2 API. The legacy V1 API does not support authentication.

## Prerequisites

Before you can use authentication, you need to:

1. [Create an account](https://counterapi.dev) on CounterAPI
2. Create a workspace
3. Generate an access token

For detailed instructions on these steps, see the [Authentication](../api/authentication.md) guide.

## Node.js Examples

### Basic Authentication

```javascript
import { Counter } from 'counterapi';

// Create an authenticated client
const counter = new Counter({
  workspace: 'your-workspace-name',
  accessToken: 'your-access-token'  // The token you generated on counterapi.dev
});

// Use the authenticated client
const result = await counter.get('secure-counter');
console.log(`Counter value: ${result.value}`);
```

### Using Environment Variables

It's best practice to store your authentication tokens in environment variables:

```javascript
import { Counter } from 'counterapi';

// Using environment variables in Node.js
const counter = new Counter({
  workspace: process.env.COUNTER_WORKSPACE,
  accessToken: process.env.COUNTER_API_TOKEN
});

// Use the authenticated client
try {
  const result = await counter.up('api-call-counter');
  console.log(`Updated count: ${result.value}`);
} catch (error) {
  console.error('Authentication error:', error);
}
```

### With Express.js

Here's how to implement authenticated counter updates in an Express.js application:

```javascript
import express from 'express';
import { Counter } from 'counterapi';

const app = express();
const port = process.env.PORT || 3000;

// Create authenticated counter client
const counter = new Counter({
  workspace: process.env.COUNTER_WORKSPACE,
  accessToken: process.env.COUNTER_API_TOKEN
});

// Track API usage with authentication
app.use(async (req, res, next) => {
  const endpoint = req.path.replace(/\//g, '-') || 'root';
  try {
    await counter.up(`endpoint${endpoint}`);
  } catch (error) {
    console.error(`Counter error for ${endpoint}:`, error);
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, authenticated world!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

## Browser Examples

### Warning: Security Considerations

When using authentication in browser-side JavaScript, be aware that your access tokens can be viewed by anyone examining your code. For production applications, consider these approaches:

1. **Using a proxy server**: Create a backend proxy that makes authenticated requests to CounterAPI
2. **Limited token scope**: If you must use client-side tokens, create tokens with minimal permissions

### Basic Browser Example

```javascript
// When importing from CDN or bundled script
const counter = new Counter({
  workspace: 'your-workspace-name',
  accessToken: 'your-access-token'  // The token you generated on counterapi.dev
});

// Use the client as normal
counter.up('page-views')
  .then(result => {
    console.log(`Updated count: ${result.value}`);
    document.getElementById('counter').textContent = result.value;
  })
  .catch(error => {
    console.error('Authentication error:', error);
    document.getElementById('error').textContent = 'Error updating counter';
  });
```

### With Error Handling

More comprehensive error handling for authentication issues:

```javascript
const counter = new Counter({
  workspace: 'your-workspace-name',
  accessToken: 'your-access-token'
});

async function updateCounter(name) {
  try {
    const result = await counter.up(name);
    return {
      success: true,
      value: result.value,
      message: 'Counter updated successfully'
    };
  } catch (error) {
    // Handle authentication errors specifically
    if (error.status === 401) {
      console.error('Authentication failed: Invalid token');
      return {
        success: false,
        message: 'Authentication error: Invalid token'
      };
    } else if (error.status === 403) {
      console.error('Permission denied: Token lacks required permissions');
      return {
        success: false,
        message: 'Authentication error: Insufficient permissions'
      };
    }
    
    // Handle other errors
    console.error('Counter error:', error);
    return {
      success: false,
      message: `Error: ${error.message}`
    };
  }
}
```

## With React

Integration example for React applications:

```jsx
import { useState, useEffect } from 'react';
import { Counter } from 'counterapi';

// Create the counter client
const counter = new Counter({
  workspace: process.env.REACT_APP_COUNTER_WORKSPACE,
  accessToken: process.env.REACT_APP_COUNTER_TOKEN
});

function SecureCounter({ counterName }) {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Get the initial counter value
    counter.get(counterName)
      .then(result => {
        setCount(result.value);
        setLoading(false);
      })
      .catch(err => {
        setError(`Authentication error: ${err.message}`);
        setLoading(false);
      });
  }, [counterName]);
  
  // Increment the counter
  const handleIncrement = async () => {
    try {
      const result = await counter.up(counterName);
      setCount(result.value);
    } catch (err) {
      setError(`Authentication error: ${err.message}`);
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  
  return (
    <div>
      <h2>Secure Counter: {count}</h2>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}

export default SecureCounter;
```

## Related Resources

- [Authentication Overview](../api/authentication.md) - Main authentication documentation
- [Get Started with JavaScript](get-started.md) - General JavaScript client guide
- [API Rate Limits](../api/rate-limit.md) - Information on rate limiting 