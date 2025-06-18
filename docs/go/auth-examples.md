# Go Authentication Examples

This page provides practical examples of how to use authentication with the CounterAPI Go client.

> **Note:** Authentication is only available with the V2 API. The legacy V1 API does not support authentication.

## Prerequisites

Before you can use authentication, you need to:

1. [Create an account](https://counterapi.dev) on CounterAPI
2. Create a workspace
3. Generate an access token

For detailed instructions on these steps, see the [Authentication](../api/authentication.md) guide.

## Basic Authentication

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/counterapi/api/pkg/client"
)

func main() {
	// Create an authenticated client
	counter, err := client.New(
		client.WithWorkspace("your-workspace-name"),
		client.WithAccessToken("your-access-token"), // The token you generated on counterapi.dev
	)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	// Use the authenticated client
	ctx := context.Background()
	result, err := counter.Get(ctx, "secure-counter")
	if err != nil {
		log.Fatalf("Failed to get counter: %v", err)
	}

	fmt.Printf("Counter value: %d\n", result.Value)
}
```

## Using Environment Variables

It's best practice to store your authentication tokens in environment variables:

```go
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/counterapi/api/pkg/client"
)

func main() {
	// Using environment variables in Go
	counter, err := client.New(
		client.WithWorkspace(os.Getenv("COUNTER_WORKSPACE")),
		client.WithAccessToken(os.Getenv("COUNTER_API_TOKEN")),
	)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	ctx := context.Background()
	result, err := counter.Up(ctx, "api-call-counter")
	if err != nil {
		log.Fatalf("Failed to update counter: %v", err)
	}

	fmt.Printf("Updated count: %d\n", result.Value)
}
```

## Authentication with Custom HTTP Client

You can use a custom HTTP client with your authenticated CounterAPI client:

```go
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/counterapi/api/pkg/client"
)

func main() {
	// Create a custom HTTP client with specific timeout
	httpClient := &http.Client{
		Timeout: 5 * time.Second,
	}

	// Create an authenticated counter client with custom HTTP client
	counter, err := client.New(
		client.WithWorkspace("your-workspace-name"),
		client.WithAccessToken("your-access-token"),
		client.WithHTTPClient(httpClient),
	)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	// Use the authenticated client
	ctx := context.Background()
	result, err := counter.Up(ctx, "secure-counter")
	if err != nil {
		log.Fatalf("Failed to update counter: %v", err)
	}

	fmt.Printf("Counter value: %d\n", result.Value)
}
```

## With Error Handling

More comprehensive error handling for authentication issues:

```go
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/counterapi/api/pkg/client"
)

func main() {
	// Create an authenticated client
	counter, err := client.New(
		client.WithWorkspace(os.Getenv("COUNTER_WORKSPACE")),
		client.WithAccessToken(os.Getenv("COUNTER_API_TOKEN")),
	)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	ctx := context.Background()
	result, err := counter.Get(ctx, "secure-counter")
	if err != nil {
		// Handle different types of authentication errors
		var httpErr *client.HTTPError
		if errors.As(err, &httpErr) {
			switch httpErr.StatusCode {
			case http.StatusUnauthorized:
				log.Fatalf("Authentication failed: Invalid token")
			case http.StatusForbidden:
				log.Fatalf("Permission denied: Token lacks required permissions")
			case http.StatusNotFound:
				log.Fatalf("Workspace or counter not found")
			default:
				log.Fatalf("HTTP error: %v", err)
			}
		} else {
			log.Fatalf("Error: %v", err)
		}
	}

	fmt.Printf("Counter value: %d\n", result.Value)
}
```

## With HTTP Web Server

Here's how to implement authenticated counter updates in a Go HTTP server:

```go
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/counterapi/api/pkg/client"
)

func main() {
	// Create an authenticated counter client
	counter, err := client.New(
		client.WithWorkspace(os.Getenv("COUNTER_WORKSPACE")),
		client.WithAccessToken(os.Getenv("COUNTER_API_TOKEN")),
	)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	// Create a middleware to track endpoint usage
	trackEndpoint := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Format endpoint name for counter
			endpoint := strings.ReplaceAll(r.URL.Path, "/", "-")
			if endpoint == "" || endpoint == "-" {
				endpoint = "root"
			}
			counterName := fmt.Sprintf("endpoint%s", endpoint)

			// Update counter in a goroutine to avoid blocking
			go func() {
				ctx := context.Background()
				_, err := counter.Up(ctx, counterName)
				if err != nil {
					log.Printf("Failed to update counter for %s: %v", endpoint, err)
				}
			}()

			next.ServeHTTP(w, r)
		})
	}

	// Define a simple handler
	helloHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, authenticated world!")
	})

	// Apply middleware and start server
	http.Handle("/", trackEndpoint(helloHandler))
	port := "8080"
	if p := os.Getenv("PORT"); p != "" {
		port = p
	}

	fmt.Printf("Server listening on port %s...\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
```

## Related Resources

- [Authentication Overview](../api/authentication.md) - Main authentication documentation
- [Get Started with Go](get-started.md) - General Go client guide
- [API Rate Limits](../api/rate-limit.md) - Information on rate limiting 