# Authentication

This guide explains how to use authentication with CounterAPI to secure your counters and access private features.

## Overview

CounterAPI offers authentication to:

- Secure your counters from unauthorized access
- Enable access to private counters
- Unlock additional features and higher rate limits
- Track usage across multiple applications with a single account

> **Note:** Authentication is only available with the V2 API. The legacy V1 API does not support authentication.

## Registration Process

To use authentication with CounterAPI:

1. **Create an account** at [counterapi.dev](https://counterapi.dev)
   - Click on the "Sign Up" button in the top right corner
   - Complete the registration form with your email and password
   - Verify your email address

2. **Create a workspace**
   - After logging in, navigate to the Dashboard
   - Click "Create Workspace" and provide a name for your workspace
   - This workspace name will be used in your API clients

3. **Generate an access token**
   - From your Dashboard, navigate to "API Tokens"
   - Click "Create New Token"
   - Provide a name for your token (e.g., "Production App", "Development Environment")
   - Select the appropriate permissions for this token
   - Click "Generate Token"

4. **Securely store your token**
   - Copy the generated token and store it securely
   - **Important:** This token will only be displayed once for security reasons
   - If you lose your token, you'll need to generate a new one

## Using Authentication in Your Applications

Once you have your access token, you can use it with the CounterAPI client libraries. For language-specific implementation details and code examples, refer to:

- **JavaScript**: See [JavaScript Authentication Guide](../javascript/auth-examples.md)
- **Go**: See [Go Authentication Guide](../go/auth-examples.md)

## Security Best Practices

When using authentication tokens, follow these security best practices:

1. **Never hardcode tokens in client-side code**
   - Tokens visible in browser-side code can be extracted by users
   - For browser applications, consider using a proxy server to make authenticated requests

2. **Use environment variables for server-side applications**
   - Store your tokens in environment variables and access them in your code
   - Never commit tokens to version control systems

3. **Create multiple tokens with different scopes**
   - Use different tokens for different applications or environments
   - This allows you to revoke specific tokens if needed without affecting other applications

4. **Rotate tokens periodically**
   - Regularly generate new tokens and phase out old ones
   - This limits the impact if a token is accidentally exposed

5. **Monitor token usage**
   - Regularly check your CounterAPI dashboard for unusual activity
   - Set up alerts for unexpected spikes in usage

## Token Permissions and Scopes

When creating tokens on counterapi.dev, you can assign specific permissions:

| Permission | Description |
|------------|-------------|
| Read | Allows retrieving counter values and statistics |
| Write | Allows modifying counter values (increment, decrement, reset) |
| Admin | Allows creating and deleting counters in your workspace |

Choose the minimum permissions necessary for each application or environment.

## Troubleshooting Authentication

If you encounter authentication issues:

1. **Verify your token is correct**
   - Check for typos or formatting issues
   - Ensure you're not using a revoked or expired token

2. **Confirm your workspace name**
   - The workspace name is case-sensitive
   - Make sure it matches exactly what's shown in your CounterAPI dashboard

3. **Check for network issues**
   - Authentication failures can sometimes be caused by network problems
   - Implement proper error handling to distinguish between authentication errors and network issues

4. **Common error messages**
   - `401 Unauthorized`: Invalid or expired token
   - `403 Forbidden`: Token doesn't have required permissions
   - `404 Not Found`: The workspace name is incorrect

If problems persist, contact CounterAPI support through your dashboard. 