# Using CounterAPI in Node.js

This guide demonstrates how to use CounterAPI in Node.js applications for tracking various metrics server-side.

## Installation

To use CounterAPI in your Node.js project, first install the package:

```bash
npm install counterapi
```

Or with Yarn:

```bash
yarn add counterapi
```

## Basic Setup

Import the CounterAPI module and create a client:

```javascript
// ES Modules (recommended)
import { Counter } from 'counterapi';

// Or using CommonJS
const { Counter } = require('counterapi');

// Create a client
const counter = new Counter({
  workspace: 'my-nodejs-app',  // Replace with your workspace name
  debug: false,                // Optional: Enable debug logging
  timeout: 5000,               // Optional: Request timeout in ms (default: 10000)
  accessToken: 'your-token'    // Optional: Authentication token for API requests (V2 API only)
});
```

> **Important:** The `accessToken` parameter is only available for the V2 API. Authentication is not supported in V1 API.

## Simple Counter Operations

### Get Current Count

```javascript
async function getCurrentCount() {
  try {
    const result = await counter.get('api-usage');
    console.log(`Current count: ${result.value}`);
    return result;
  } catch (error) {
    console.error('Error getting count:', error.message);
    throw error;
  }
}
```

### Increment Counter

```javascript
async function incrementCounter() {
  try {
    const result = await counter.up('api-usage');
    console.log(`Count after increment: ${result.value}`);
    return result;
  } catch (error) {
    console.error('Error incrementing counter:', error.message);
    throw error;
  }
}
```

### Decrement Counter

```javascript
async function decrementCounter() {
  try {
    const result = await counter.down('api-usage');
    console.log(`Count after decrement: ${result.value}`);
    return result;
  } catch (error) {
    console.error('Error decrementing counter:', error.message);
    throw error;
  }
}
```

## Integration with Express.js

Here's how to integrate CounterAPI with an Express.js application to track API endpoints usage:

```javascript
import express from 'express';
import { Counter } from 'counterapi';

const app = express();
const port = process.env.PORT || 3000;

// Create CounterAPI client
const counter = new Counter({ workspace: 'my-express-app' });

// Middleware to track API usage
app.use(async (req, res, next) => {
  const path = req.path.replace(/\//g, '-') || 'root';
  try {
    // Track endpoint usage
    await counter.up(`endpoint${path}`);
  } catch (error) {
    // Just log error but don't block the request
    console.error(`Counter error for ${path}:`, error.message);
  }
  next();
});

// Example routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'This is data' });
});

// Route to show endpoint statistics
app.get('/stats', async (req, res) => {
  try {
    const rootStats = await counter.get('endpoint-root');
    const apiDataStats = await counter.get('endpoint-api-data');
    
    res.json({
      home: rootStats.value,
      apiData: apiDataStats.value
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

## Scheduled Tasks with Node.js

Use CounterAPI to track scheduled job executions:

```javascript
import { Counter } from 'counterapi';
import cron from 'node-cron';

const counter = new Counter({ workspace: 'scheduled-tasks' });

// Function to run and track a scheduled task
async function runBackup() {
  try {
    console.log('Starting backup process...');
    
    // Track that backup was started
    await counter.up('backup-started');
    
    // Simulate backup process
    await someBackupFunction();
    
    // Track successful completion
    await counter.up('backup-completed');
    console.log('Backup completed successfully');
  } catch (error) {
    // Track failures
    await counter.up('backup-failed');
    console.error('Backup failed:', error);
  }
}

// Schedule backup to run every day at midnight
cron.schedule('0 0 * * *', runBackup);
```

## Using with API Rate Limiting

Track and manage API rate limits:

```javascript
import { Counter } from 'counterapi';

const counter = new Counter({ workspace: 'api-rate-limits' });

async function checkRateLimit(userId) {
  try {
    // Get current usage count
    const usage = await counter.get(`user-${userId}-api-calls`);
    
    // Check if user has exceeded limit
    if (usage.value >= 100) { // 100 calls per day limit
      return {
        allowed: false,
        current: usage.value,
        message: 'Rate limit exceeded'
      };
    }
    
    // Increment the usage counter
    await counter.up(`user-${userId}-api-calls`);
    
    return {
      allowed: true,
      current: usage.value + 1,
      message: 'Request allowed'
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    // In case of error, allow the request but log the issue
    return { allowed: true, message: 'Rate limit check failed' };
  }
}

// Reset counters daily
async function resetDailyCounters() {
  try {
    // Get all user IDs (in a real app, you'd get this from your database)
    const userIds = ['user1', 'user2', 'user3'];
    
    // Reset rate limit counter for each user
    for (const userId of userIds) {
      // For v2 API, use reset method
      await counter.reset(`user-${userId}-api-calls`);
    }
    
    console.log('Daily rate limits reset successfully');
  } catch (error) {
    console.error('Error resetting rate limits:', error);
  }
}
```

## Error Handling Best Practices

Implement robust error handling for production applications:

```javascript
async function safeCounterOperation(operation, counterName) {
  try {
    const result = await operation(counterName);
    return { success: true, data: result };
  } catch (error) {
    // Log the error with details
    console.error(`Counter operation failed for '${counterName}':`, {
      message: error.message,
      status: error.status,
      code: error.code
    });
    
    // Handle specific error scenarios
    if (error.status === 429) {
      // Rate limit exceeded
      console.warn(`Rate limit exceeded for counter '${counterName}'`);
      // Implement retry logic with exponential backoff
    } else if (error.status === 404) {
      // Counter doesn't exist
      console.warn(`Counter '${counterName}' not found`);
      // Maybe create the counter?
    } else if (error.status >= 500) {
      // Server error
      console.error(`Server error when accessing counter '${counterName}'`);
    }
    
    return { success: false, error: error.message };
  }
}

// Usage example
async function trackUserAction(userId, action) {
  const counterName = `user-${userId}-${action}`;
  const result = await safeCounterOperation(
    name => counter.up(name), 
    counterName
  );
  
  if (!result.success) {
    // Handle the error appropriately
    // Maybe use a fallback tracking method or queue for retry
  }
  
  return result;
}
```

## Advanced: Using with V1 API

If you need to use the legacy V1 API:

```javascript
import { Counter } from 'counterapi';

const counterV1 = new Counter({
  version: 'v1',       // Specify V1 API
  namespace: 'my-app', // Your namespace
  debug: false,
  timeout: 5000
});

async function setCounterValue(name, value) {
  try {
    // V1 API provides the 'set' method
    const result = await counterV1.set(name, value);
    console.log(`Counter ${name} set to ${result.value}`);
    return result;
  } catch (error) {
    console.error(`Failed to set counter ${name}:`, error);
    throw error;
  }
}
```

## Best Practices for Node.js Implementation

1. **Use environment variables for configuration**:
   ```javascript
   const counter = new Counter({
     workspace: process.env.COUNTER_WORKSPACE,
     debug: process.env.NODE_ENV !== 'production'
   });
   ```

2. **Implement retries for network failures**:
   ```javascript
   async function counterWithRetry(operation, maxRetries = 3) {
     let lastError;
     for (let attempt = 1; attempt <= maxRetries; attempt++) {
       try {
         return await operation();
       } catch (error) {
         lastError = error;
         // Only retry network-related errors
         if (!isNetworkError(error)) throw error;
         
         const delay = 2 ** attempt * 100;
         console.log(`Retry attempt ${attempt} after ${delay}ms`);
         await new Promise(resolve => setTimeout(resolve, delay));
       }
     }
     throw lastError;
   }
   ```

3. **Batch counter operations when possible**:
   ```javascript
   async function processBatchEvents(events) {
     const operations = events.map(event => 
       counter.up(`event-${event.type}`).catch(err => {
         console.error(`Failed to track event ${event.type}:`, err);
         return null;
       })
     );
     
     return Promise.allSettled(operations);
   }
   ```

4. **Implement graceful shutdown**:
   ```javascript
   process.on('SIGTERM', async () => {
     try {
       // Record that service is shutting down
       await counter.up('service-shutdown');
       console.log('Recorded service shutdown');
     } catch (error) {
       console.error('Failed to record shutdown:', error);
     } finally {
       process.exit(0);
     }
   });
   ``` 