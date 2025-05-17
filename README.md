# BlogSpace

A modern, full-stack blog application built with React, TypeScript, and Supabase. BlogSpace allows users to create, read, update, and delete blog posts with a beautiful, responsive interface.

## Features

- 🔐 User authentication with email/password
- ✍️ Create, edit, and delete blog posts
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 📝 Rich text content support
- 🔍 Public blog listing with pagination
- ⚡ Real-time updates with Supabase

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - React Router v6
  - React Hook Form
  - Lucide React Icons

- **Backend & Database:**
  - Supabase (PostgreSQL)
  - Row Level Security (RLS)
  - Real-time subscriptions

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/       # React context providers
├── lib/           # Utility functions and configurations
├── pages/         # Page components
├── types/         # TypeScript type definitions
└── main.tsx       # Application entry point
```

## Database Schema

### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ
);
```

### Blogs Table
```sql
CREATE TABLE blogs (
  id UUID PRIMARY KEY,
  title TEXT,
  content TEXT,
  user_id UUID,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

## Authentication

The application uses Supabase Authentication with email/password sign-up. Row Level Security (RLS) policies ensure that:
- Anyone can view blogs and profiles
- Only authenticated users can create blogs
- Users can only edit/delete their own blogs
- Users can only update their own profile

## Deployment

The application can be deployed to any static hosting platform:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` directory to your hosting platform of choice

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.

# Spring Boot Backend Setup Instructions

## Prerequisites
- Java 17 or higher installed
- Maven installed

## Create Spring Boot Project
Use Spring Initializr (https://start.spring.io/) with the following options:
- Project: Maven
- Language: Java
- Spring Boot: 3.2.x
- Packaging: Jar
- Java: 17

Dependencies:
- Spring Web
- Spring Data JPA
- Spring Security
- Spring Validation
- H2 Database (for development)
- Lombok
- JSON Web Token (JWT) Support

## Backend Project Structure
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── blogverse/
│   │           ├── config/
│   │           │   ├── SecurityConfig.java
│   │           │   └── JwtConfig.java
│   │           ├── controller/
│   │           │   ├── AuthController.java
│   │           │   └── BlogController.java
│   │           ├── model/
│   │           │   ├── User.java
│   │           │   └── Blog.java
│   │           ├── repository/
│   │           │   ├── UserRepository.java
│   │           │   └── BlogRepository.java
│   │           ├── service/
│   │           │   ├── AuthService.java
│   │           │   └── BlogService.java
│   │           ├── security/
│   │           │   ├── JwtTokenProvider.java
│   │           │   └── JwtAuthenticationFilter.java
│   │           ├── dto/
│   │           │   ├── request/
│   │           │   │   ├── LoginRequest.java
│   │           │   │   ├── RegisterRequest.java
│   │           │   │   └── BlogRequest.java
│   │           │   └── response/
│   │           │       ├── AuthResponse.java
│   │           │       └── BlogResponse.java
│   │           └── BlogverseApplication.java
│   └── resources/
│       ├── application.yml
│       └── application-dev.yml


## Terminal Commands to Run and Set Up Backend

bash
# Create a new Spring Boot project
spring init --dependencies=web,data-jpa,security,validation,h2,lombok --name=blogverse-backend --package-name=com.blogverse --java-version=17 blogverse-backend

# Navigate to the project directory
cd blogverse-backend

# Add JWT dependencies to pom.xml
# You'll need to manually add this to pom.xml
# <dependency>
#     <groupId>io.jsonwebtoken</groupId>
#     <artifactId>jjwt-api</artifactId>
#     <version>0.11.5</version>
# </dependency>
# <dependency>
#     <groupId>io.jsonwebtoken</groupId>
#     <artifactId>jjwt-impl</artifactId>
#     <version>0.11.5</version>
#     <scope>runtime</scope>
# </dependency>
# <dependency>
#     <groupId>io.jsonwebtoken</groupId>
#     <artifactId>jjwt-jackson</artifactId>
#     <version>0.11.5</version>
#     <scope>runtime</scope>
# </dependency>

# Build the project
./mvnw clean install

# Run the application
./mvnw spring-boot:run


## Sample application.yml Configuration
yaml
spring:
  datasource:
    url: jdbc:h2:mem:blogdb
    driver-class-name: org.h2.Driver
    username: sa
    password: password
  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: update
    show-sql: true
  h2:
    console:
      enabled: true
      path: /h2-console

app:
  jwtSecret: yourSecretKey
  jwtExpirationMs: 86400000  # 24 hours

server:
  port: 8080


## CORS Configuration for Spring Boot
Create a configuration class to enable CORS for your React frontend:

java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // React app's URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}


## Database Schema

### User Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


### Blog Table
CREATE TABLE blogs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


## Building and Running

To build and run the backend in production mode:

bash
# Build the application
./mvnw clean package

# Run the jar file
java -jar target/blogverse-backend-0.0.1-SNAPSHOT.jar


For running with a specific profile:

bash
java -jar -Dspring.profiles.active=prod target/blogverse
