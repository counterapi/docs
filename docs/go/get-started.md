# Get Started with CounterAPI Go

## Prerequisites

CounterAPI is a REST API to help developers keep their count data online. It is designed to use in static applications
where you do not have backend to store your data.

- [Go](https://golang.org/) 1.16 or later

<br/>

## Installation

The fastest way to get CounterAPI for your Go project is to install it with `go get`.

To use it, open up your terminal and run the following command:

```shell
go get -u github.com/counterapi/api/pkg/client
```

## Basic Usage

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/counterapi/api/pkg/client"
)

func main() {
	// Create a counter client
	counter, err := client.New(client.WithWorkspace("my-workspace"))
	if err != nil {
		log.Fatal(err)
	}

	// Use the client to increment a counter
	ctx := context.Background()
	result, err := counter.Up(ctx, "page-views")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Current count: %d\n", result.Value)
}
```

## Authentication

For secure access to your counters and to use protected features, CounterAPI provides authentication via API tokens. This functionality is only available with the V2 API.

To secure your counters with authentication:

```go
counter, err := client.New(
    client.WithWorkspace("my-workspace"),
    client.WithAccessToken("your-access-token"), // Add your API token here
)
```

For detailed instructions on how to generate and use API tokens, see the [Authentication](../api/authentication.md) guide.

## Next Steps

- For more detailed information about the Go client, check out the [Quick Start](quick-start.md) guide
- Learn more about [Counter Names](counter-name.md) in Go
- Explore the [API documentation](../api/index.md) for complete reference
