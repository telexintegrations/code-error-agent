# Code Error Agent Integration - v1.0

## Overview
The Code Error Agent Integration is a lightweight tool designed to capture errors in your codebase using static analysis tools such as ESLint, the TypeScript compiler, Prettier, or Flake8 (for Python). It categorizes and prioritizes errors and sends detailed error reports directly to a Telex channel.

## Features
- **Static Analysis Integration**: Automatically detects errors using popular tools.
- **Error Categorization**:
  - **Syntax Errors**
  - **Type Errors**
  - **Linting Violations**
- **Prioritization**:
  - **High**: Breaking errors
  - **Medium**: Warnings
  - **Low**: Style violations
- **Telex Reporting**: Pushes error logs to a Telex channel for real-time monitoring.

## Prerequisites
- **Environment**:
  - Node.js (for JavaScript/TypeScript projects) or Python (for Python projects).
- **Static Analysis Tools**:
  - JavaScript/TypeScript: ESLint, TypeScript compiler, Prettier.
  - Python: Flake8.
- **Telex Access**: Valid credentials and API access to your Telex channel.

{
  "channel_id": "01952917-3cdd-7761-a70e-dd99db8bd139",
  "return_url": "https://ping.telex.im/v1/webhooks/01952917-3cdd-7761-a70e-dd99db8bd139",
  "settings": [
      {
        "label": "codeBasePath",
        "type": "text",
        "required": true,
        "default": "./src"
      },
      {
        "label": "errorThreshold",
        "type": "text",
        "required": true,
        "default": "1"
      },
      {
        "label": "interval",
        "type": "text",
        "required": true,
        "default": "*/15 * * * *"
      }
    ]
}