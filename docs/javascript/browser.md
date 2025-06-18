# Using CounterAPI in the Browser

This guide shows you how to integrate CounterAPI into your web applications.

## Basic Setup

Include the CounterAPI JavaScript library in your HTML file using the CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/counterapi/dist/counter.browser.min.js"></script>
```

## Creating a Counter Client

Once the script is loaded, you can create a counter client:

```html
<script>
  // Counter is available as a global variable
  const counter = new Counter({ 
    workspace: 'my-workspace' // Replace with your workspace name
  });
  
  // Optional configuration
  const counterWithOptions = new Counter({
    workspace: 'my-workspace',
    debug: true,              // Enable debug mode for logging
    timeout: 8000,            // Set request timeout to 8 seconds
    accessToken: 'your-token' // Optional: Authentication token for API requests (V2 API only)
  });
</script>
```

> **Important:** The `accessToken` parameter is only available for the V2 API. Authentication is not supported in V1 API.

## Simple Page View Counter

Here's how to implement a simple page view counter:

```html
<div>Page Views: <span id="view-count">Loading...</span></div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const counter = new Counter({ workspace: 'my-website' });
    
    // Increment the view count when the page loads
    counter.up('page-views')
      .then(result => {
        document.getElementById('view-count').textContent = result.value;
      })
      .catch(error => {
        console.error('Error tracking page view:', error);
        document.getElementById('view-count').textContent = 'Error loading count';
      });
  });
</script>
```

## Interactive Button Counter

Create a button that counts clicks:

```html
<button id="like-button">Like (0)</button>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const counter = new Counter({ workspace: 'my-website' });
    const likeButton = document.getElementById('like-button');
    
    // Get initial count
    counter.get('button-likes')
      .then(result => {
        likeButton.textContent = `Like (${result.value})`;
      })
      .catch(err => console.error(err));
    
    // Add click handler
    likeButton.addEventListener('click', function() {
      counter.up('button-likes')
        .then(result => {
          likeButton.textContent = `Like (${result.value})`;
        })
        .catch(err => console.error(err));
    });
  });
</script>
```

## Tracking Multiple Elements

You can track multiple elements with different counters:

```html
<div class="counters">
  <div class="counter-item">
    <h3>Feature A</h3>
    <div>Votes: <span class="count" data-counter="feature-a">0</span></div>
    <button class="vote-up" data-counter="feature-a">👍</button>
    <button class="vote-down" data-counter="feature-a">👎</button>
  </div>
  
  <div class="counter-item">
    <h3>Feature B</h3>
    <div>Votes: <span class="count" data-counter="feature-b">0</span></div>
    <button class="vote-up" data-counter="feature-b">👍</button>
    <button class="vote-down" data-counter="feature-b">👎</button>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const counter = new Counter({ workspace: 'feature-voting' });
    
    // Initialize all counters
    document.querySelectorAll('.count').forEach(element => {
      const counterName = element.dataset.counter;
      
      counter.get(counterName)
        .then(result => {
          element.textContent = result.value;
        })
        .catch(err => console.error(`Error loading ${counterName}:`, err));
    });
    
    // Set up vote-up buttons
    document.querySelectorAll('.vote-up').forEach(button => {
      button.addEventListener('click', function() {
        const counterName = this.dataset.counter;
        const countElement = document.querySelector(`.count[data-counter="${counterName}"]`);
        
        counter.up(counterName)
          .then(result => {
            countElement.textContent = result.value;
          })
          .catch(err => console.error(`Error updating ${counterName}:`, err));
      });
    });
    
    // Set up vote-down buttons
    document.querySelectorAll('.vote-down').forEach(button => {
      button.addEventListener('click', function() {
        const counterName = this.dataset.counter;
        const countElement = document.querySelector(`.count[data-counter="${counterName}"]`);
        
        counter.down(counterName)
          .then(result => {
            countElement.textContent = result.value;
          })
          .catch(err => console.error(`Error updating ${counterName}:`, err));
      });
    });
  });
</script>
```

## Using with Modern JavaScript Frameworks

### Using with ES Modules

```html
<script type="module">
  import { Counter } from 'https://cdn.jsdelivr.net/npm/counterapi/dist/counter.esm.min.js';
  
  const counter = new Counter({ workspace: 'my-app' });
  
  // Use counter methods here
  counter.up('app-loads')
    .then(result => console.log(`App loaded ${result.value} times`))
    .catch(err => console.error(err));
</script>
```

### Example with React

If you're using React:

```jsx
import { useEffect, useState } from 'react';
import { Counter } from 'counterapi';

function ViewCounter({ pagePath }) {
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const counter = new Counter({ workspace: 'my-react-app' });
    
    // Increment view count and update state
    counter.up(`page-${pagePath}`)
      .then(result => {
        setViews(result.value);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching view count:', error);
        setLoading(false);
      });
  }, [pagePath]);
  
  if (loading) return <span>Loading views...</span>;
  
  return <span>{views} views</span>;
}

export default ViewCounter;
```

## Error Handling

Implement proper error handling to ensure a smooth user experience:

```javascript
counter.up('page-views')
  .then(result => {
    // Success handling
    document.getElementById('counter').textContent = result.value;
  })
  .catch(error => {
    // Error handling
    console.error('Counter error:', error);
    
    if (error.status === 429) {
      document.getElementById('error-message').textContent = 'Too many requests. Please try again later.';
    } else if (error.status === 404) {
      document.getElementById('error-message').textContent = 'Counter not found.';
    } else {
      document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
    }
  });
```

## Best Practices for Browser Implementation

1. **Load the script asynchronously** to prevent blocking page rendering:
   ```html
   <script async src="https://cdn.jsdelivr.net/npm/counterapi/dist/counter.browser.min.js"></script>
   ```

2. **Initialize after DOM content is loaded**:
   ```javascript
   document.addEventListener('DOMContentLoaded', function() {
     // Counter initialization code here
   });
   ```

3. **Handle offline scenarios** by using the browser's online/offline events:
   ```javascript
   window.addEventListener('online', function() {
     // Retry failed counter operations
   });
   ```

4. **Consider rate limiting** on user interactions to prevent excessive API calls.

5. **Show loading states** to improve user experience while waiting for API responses. 