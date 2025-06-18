# Quick Start

Get up and running with CounterAPI JavaScript client in just a few minutes.

## Install

```bash
npm install counterapi
```

## Basic Usage

### Browser

```html
<script type="module">
  import { Counter } from 'https://cdn.jsdelivr.net/npm/counterapi/dist/counter.esm.min.js';
  
  // Create a counter client (V2 API)
  const counter = new Counter({ workspace: 'my-workspace' });
  
  // Increment a page view counter
  counter.up('page-views')
    .then(result => {
      console.log(`Page views: ${result.value}`);
      document.getElementById('counter').textContent = result.value;
    })
    .catch(error => console.error('Counter error:', error.message));
</script>

<div>Views: <span id="counter">Loading...</span></div>
```

### Node.js

```javascript
import { Counter } from 'counterapi';

// Create a counter client
const counter = new Counter({ workspace: 'my-workspace' });

// Track an event
async function trackEvent() {
  try {
    const result = await counter.up('api-calls');
    console.log(`Total API calls: ${result.value}`);
  } catch (error) {
    console.error('Failed to track event:', error.message);
  }
}

trackEvent();
```

### CommonJS

```javascript
const { Counter } = require('counterapi');

// Create a counter client
const counter = new Counter({ workspace: 'my-workspace' });

// Get current count
counter.get('downloads')
  .then(result => console.log(`Downloads: ${result.value}`))
  .catch(err => console.error(err));
```

## CDN Options

### UMD Build (global variable)

```html
<script src="https://cdn.jsdelivr.net/npm/counterapi/dist/counter.browser.min.js"></script>
<script>
  // Counter is available as a global variable
  const counter = new Counter({ workspace: 'my-workspace' });
  
  counter.up('visits')
    .then(result => console.log(`Visits: ${result.value}`))
    .catch(err => console.error(err));
</script>
```

### ESM Build (modern browsers)

```html
<script type="module">
  import { Counter } from 'https://cdn.jsdelivr.net/npm/counterapi/dist/counter.esm.min.js';
  
  const counter = new Counter({ workspace: 'my-workspace' });
  // Use counter methods here
</script>
```

## Next Steps

For more detailed usage information, check out the [Get Started](get-started.md) guide. 