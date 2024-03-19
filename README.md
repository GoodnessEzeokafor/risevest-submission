# RISEVEST SENIOR BACKEND TEST SUBMISSION

---

## Task 
[Risevest Senior Backend Test](https://github.com/risevest/senior-backend-test)

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

### Getting Started with the Application

Follow these simple steps to set up and run the application:

1. **Clone the Repository**: First, you need to clone the repository to your local machine. Open your terminal and run the following command:

   ```bash
   git clone https://github.com/GoodnessEzeokafor/risevest-senior-backend-test-submission.git
   ```

2. **Install Dependencies**: Once the repository is cloned, navigate into the project directory and install the necessary packages. You can do this by running:

   ```bash
   npm i
   ```

3. **Configure Environment Variables**: Before running the application, you'll need to set up your environment variables. Copy the sample environment file and create a new `.env` file by running:

   ```bash
   cp .env.sample .env
   ```

   Then, open the `.env` file and fill in your specific configuration details.

4. **Start the Server**: Finally, you're ready to start the server. Run the following command to start the application in development mode:
   ```bash
   npm run start:dev
   ```

Now, your application should be up and running! You can access it through your web browser or any API client at the address provided in the terminal.

### Submission Evaluation

To evaluate my submission, you can access the following resources:

1. **Live API**: You can interact with the deployed API directly by visiting the [Live URL](https://risevest-submission-production.up.railway.app). This will allow you to see the application in action and test its functionality.

2. **Source Code**: The complete source code for this submission is available on [GitHub](https://github.com/GoodnessEzeokafor/risevest-senior-backend-test-submission). You can review the code, run it locally, or contribute to the project if you wish.

3. **API Documentation**: For detailed information on the API endpoints, including request and response formats, you can refer to the [Postman Documentation](https://documenter.getpostman.com/view/24047717/2sA2xpU9fv). This documentation provides a comprehensive guide to understanding and using the API effectively.

### Important Criteria To Look Out For

As you evaluate my submission, please pay particular attention to the following endpoints:

- **User Management**: These endpoints allow you to create and retrieve user information.

```
POST https://risevest-submission-production.up.railway.app/api/v1/users
GET https://risevest-submission-production.up.railway.app/api/v1/users
```

- **Post Management**: These endpoints enable you to create and retrieve posts for all users.

```
POST https://risevest-submission-production.up.railway.app/api/v1/users/:id/posts
GET https://risevest-submission-production.up.railway.app/api/v1/users/:id/posts
```

- **Commenting on Posts**: This endpoint allows you to add comments to a specific post.

```
POST https://risevest-submission-production.up.railway.app/api/v1/users/:id/posts/:postId/comments
```

- **Optimized Query**
  Used in [TopPost](src/services/use-case/post/post.service.ts)

```sql
WITH latest_comments AS (
        SELECT posts."userId", posts.id AS postId, MAX(comments."createdAt") AS latestCommentTime
        FROM posts
        LEFT JOIN comments ON posts.id = comments."postId"
        GROUP BY posts."userId", posts.id
    ),
    user_posts_count AS (
        SELECT posts."userId", COUNT(*) AS postCount
        FROM posts
        GROUP BY posts."userId"
    ),
    ranked_users AS (
        SELECT u.id, u."fullName", p.title, c.comment, uc.postCount,
               ROW_NUMBER() OVER (ORDER BY uc.postCount DESC) AS rank
        FROM users u
        JOIN posts p ON u.id = p."userId"
        JOIN latest_comments lc ON p.id = lc.postId
        JOIN comments c ON lc.postId = c."postId" AND lc.latestCommentTime = c."createdAt"
        JOIN user_posts_count uc ON u.id = uc."userId"
    )
    SELECT id, "fullName", title, "comment"
    FROM ranked_users
    WHERE rank <= 3;
```

### Run test

- Tests are stored in each controller folder

```
npm run test
```

These resources should provide you with a comprehensive view of my submission, allowing you to assess its quality and functionality.
