# RISEVEST SENIOR BACKEND TEST SUBMISSION

---

## Introduction

In this submission, I've decided to dive deeper into the world of [Uncle Bob's Clean Code Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). This approach, which blends ideas from hexagonal and onion architectures, focuses on keeping the business logic separate from the framework. For example, I've separated TypeORM and Redis from the core business logic, making it easier to switch to a different ORM or in-memory storage solution in the future.

### Why Choose Uncle Bob's Clean Code Architecture?

- **Framework Independence**: This architecture ensures that your system isn't tied to any specific framework. Frameworks are seen as tools that can be easily swapped out, making your system more adaptable.
- **Easier Testing**: It simplifies the process of setting up tests. I've started with some basic mock tests and plan to expand this to cover different parts of the codebase, ensuring thorough test coverage.
- **Database Flexibility**: It allows for easy swapping of databases, offering flexibility in data storage solutions and making it easier to transition to different database technologies as needed.

---

## Exploring My Codebase

### Controller

- **Where to Find**: `src/controller`
- **What It Does**: The controller acts as the entry point to my application. It's responsible for handling incoming requests and directing them to the right services.

### Core

- **Where to Find**: `src/core`
- **What It Does**: The core folder is where the building blocks of my application are stored. This includes abstract classes, entities, data transfer objects (DTOs), enums, environment variables, and types. These elements are crucial for defining the structure and behavior of the application.

### Framework

- **Where to Find**: `src/framework`
- **What It Does**: The framework folder is where the core frameworks used in my application are kept separate from the business logic. This separation makes it easier to maintain and potentially swap out frameworks. For example, it includes the integration with TypeORM for database operations.

### Services

- **Where to Find**: `src/services`
- **What It Does**: The services folder is where the heart of the application's functionality resides. This is where data processing, business rules, and interactions with external services or databases are implemented.

## Getting Around the Codebase

To easily navigate through the different parts of the codebase, you can follow these links:

- [Controller](src/controller)
- [Core](src/core)
- [Framework](src/framework)
- [Services](src/services)

This structure is designed to make it easier for you to understand and navigate through the codebase, providing a clear and organized overview.


### Setup Application 
- **Clone Repository**: git clone 