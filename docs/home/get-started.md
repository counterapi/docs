# Get Started

## Prerequisites

Counter API is a REST API to help developers to keep their count data online. It is designed to use in static applications
where you do not have backend to store your data.

## Available Libraries

CounterAPI provides official libraries to make integration easy in your applications:

### JavaScript Library

The JavaScript library supports both browser and Node.js environments, making it versatile for frontend and backend applications.

- **Repository**: [counter.js](https://github.com/counterapi/counter.js)
- **Documentation**: [JavaScript Guide](../javascript/README.md)
- **Features**:
  - Universal JavaScript support (Node.js, browser, ESM)
  - Compatible with both v1 and v2 CounterAPI endpoints
  - TypeScript support
  - Promise-based API
  - Custom error handling

### Go Library

The Go library provides a native implementation for Go applications.

- **Repository**: [counter-go](https://github.com/counterapi/api)
- **Documentation**: [Go Guide](../go/README.md)
- **Features**:
  - Native Go implementation
  - Thread-safe
  - Context support
  - Support for both v1 and v2 API endpoints

## Quick Start

The fastest way to get Counter API for your JavaScript project, install it with `yarn` or `npm`.

To use it, open up your terminal in the desired directory and run the following command:

<br/>

=== "Yarn"

    ``` shell
    yarn add counterapi
    ```

=== "npm"

    ``` shell
    npm install counterapi
    ```

=== "Go"

    ``` shell
    go get github.com/counterapi/api/pkg/client
    ```

## Next Steps

Choose your preferred language to get started:

- **JavaScript developers**: 
  - Start with the [JavaScript Quick Start](../javascript/quick-start.md)
  - Learn about [Browser Implementation](../javascript/browser.md)
  - Explore [Node.js Implementation](../javascript/node.md)

- **Go developers**: 
  - Begin with the [Go Quick Start](../go/quick-start.md)
  - Learn about [Counter Names in Go](../go/counter-name.md)

---
