# Unleashing Gemini Pro's Capabilities with a Developer-Friendly API

**Harness the power of Gemini Pro for text generation, semantic todo creation, and more—all through a convenient API built with NestJS.**

## Overview

This project provides a developer-friendly API that unlocks the capabilities of Gemini Pro, enabling you to:

- **Generate text** in response to natural language queries.
- **Create semantic todos** based on a given topic, powered by Gemini Pro's understanding of language nuances.

The project was created from scratch using Duet AI, no prior knowledge of NestJS was required. And Duet AI demonstrated to be a powerful ally for code generation.

## Features

- **Natural language queries** for text generation.
- **Semantic todo generation** for enhanced productivity and organization.
- **NestJS framework** for a structured and scalable API.
- **Clear documentation** and examples for easy integration.

## Target Audience

Developers who want to:

- Integrate Gemini Pro's capabilities into their applications.
- Build creative text generation features.
- Enhance productivity with AI-powered todo generation.

## Project Structure

- **main.ts:** Entry point for bootstrapping the application.
- **app.module.ts:** Root module, importing prediction and configuration modules.
- **config.module.ts:** Defines environment variables for model name and API key.
- **prediction.module.ts:** Contains endpoints for interacting with Gemini Pro:
  - `/predict`: For text generation.
  - `/predict/todos/`: For semantic todo generation.
  - `/predict/gcp-exam/`: For question generation for the GCP Professional Cloud Architect exam.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Using the API

- **Text generation:**

  - Send a POST request to `/predict` with your query in the request body.
    This will be free form based input. So feel free to ask anything you want.

- **Semantic todo generation:**

  - Send a POST request to `/predict/todos/` with the topic in the request body.
    Semantic todo generation is based on the topic you provide. For instance, if you want to generate todos about gaming, then you can send `gaming` as the topic. The endpoint is expecting from you to set the topic in the request's body.

        {
            "topic": "gaming"
        }

- **GCP Professional Cloud Architect exam question generation:**

  - Send a POST request to `/predict/gcp-exam/` with the number of questions you want to generate in the request body.
    The endpoint is expecting from you to set the number of questions in the request's body (optional). If you don't set the number of questions, the endpoint will generate 1 question by default.

        {
            "numQuestions": 5
        }

## Explore Further

- **Documentation:** [Link to your project's documentation]
- **Examples:** [Link to example code snippets or usage scenarios]

## Contributing

We welcome contributions! Please see the Contributing Guidelines: [Link to contributing guidelines] for more information.

**Let's unleash the potential of Gemini Pro together!**

## License

This project is [MIT licensed](LICENSE).
