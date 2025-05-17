import { Blog, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'johndoe@example.com',
    name: 'John Doe',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    email: 'janedoe@example.com',
    name: 'Jane Doe',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    excerpt: 'Learn how to set up a new project with React and TypeScript to improve your development experience.',
    content: `# Getting Started with React and TypeScript

TypeScript has become increasingly popular in the React ecosystem, and for good reason. It provides static type checking, which can help catch errors early in the development process and improve code quality.

## Setting Up a New Project

To create a new React project with TypeScript, you can use Create React App with the TypeScript template:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

Or if you prefer Vite (which is faster):

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
\`\`\`

## Benefits of TypeScript

- **Type Safety**: Catch type-related errors during development rather than at runtime
- **Better IDE Support**: Get better autocomplete and IntelliSense in your editor
- **Self-Documenting Code**: Types serve as documentation for your code
- **Safer Refactoring**: TypeScript helps ensure that refactors don't break existing code

## Basic TypeScript with React

Here's a simple component with TypeScript:

\`\`\`tsx
import React from 'react';

interface GreetingProps {
  name: string;
  age?: number;
}

const Greeting: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old.</p>}
    </div>
  );
};

export default Greeting;
\`\`\`

By defining the \`GreetingProps\` interface, we're making it clear what props our component expects.
`,
    coverImage: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    author: mockUsers[0],
    createdAt: '2023-06-15T10:00:00Z',
    updatedAt: '2023-06-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Mastering CSS Grid Layout',
    excerpt: 'CSS Grid has revolutionized web layouts. Learn how to create complex grid layouts with ease.',
    content: `# Mastering CSS Grid Layout

CSS Grid Layout is a two-dimensional layout system designed for the web. It lets you lay out items in rows and columns, and has many features that make building complex layouts straightforward.

## Basic Grid Container

To create a grid container, you set the display property to grid:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
\`\`\`

This creates a three-column grid with equal-width columns and 20px gaps between grid items.

## Grid Template Areas

One of the most powerful features of CSS Grid is grid-template-areas, which lets you name areas of your grid and place items in them:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header header"
    "sidebar main main main"
    "footer footer footer footer";
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
\`\`\`

## Responsive Grids

CSS Grid makes it easy to create responsive layouts without media queries (although you can certainly use them together):

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
}
\`\`\`

This creates a grid where columns are at least 250px wide, and as many columns as can fit in the container.
`,
    coverImage: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    author: mockUsers[1],
    createdAt: '2023-07-22T14:30:00Z',
    updatedAt: '2023-07-22T14:30:00Z',
  },
  {
    id: '3',
    title: 'Introduction to State Management with Redux',
    excerpt: 'Learn how Redux can help you manage application state in large React applications.',
    content: `# Introduction to State Management with Redux

Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments, and are easy to test.

## When to Use Redux

Redux is most useful in the following scenarios:

- When you have a large amount of application state needed in many places
- When the app state is updated frequently
- When the logic to update the state is complex
- When many people work on the codebase and need a predictable way to make changes

## Redux Core Concepts

Redux has three core concepts:

### Store

The store holds the application state and provides methods to interact with it:

\`\`\`javascript
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);
\`\`\`

### Actions

Actions are payloads of information that send data to the store:

\`\`\`javascript
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    payload: {
      id: nextTodoId++,
      text
    }
  };
};
\`\`\`

### Reducers

Reducers specify how the application's state changes in response to actions:

\`\`\`javascript
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.payload.id,
          text: action.payload.text,
          completed: false
        }
      ];
    default:
      return state;
  }
};
\`\`\`

## Redux with React

To use Redux with React, you'll typically use the react-redux library:

\`\`\`javascript
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
\`\`\`

This makes the Redux store available to any nested components that need to access it.
`,
    coverImage: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    author: mockUsers[0],
    createdAt: '2023-08-05T09:15:00Z',
    updatedAt: '2023-08-05T09:15:00Z',
  },
  {
    id: '4',
    title: 'Building Responsive UIs with Tailwind CSS',
    excerpt: 'Discover how Tailwind CSS can help you build beautiful, responsive UIs without writing custom CSS.',
    content: `# Building Responsive UIs with Tailwind CSS

Tailwind CSS is a utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup. It provides low-level utility classes that let you build completely custom designs without ever leaving your HTML.

## Getting Started

To add Tailwind to your project, you can install it via npm:

\`\`\`bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Then, configure your template paths in \`tailwind.config.js\`:

\`\`\`javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

And include Tailwind in your CSS:

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

## Utility-First Workflow

Tailwind encourages a utility-first workflow, where you use utility classes to build components from scratch:

\`\`\`html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>
\`\`\`

## Responsive Design

Tailwind makes it easy to build responsive designs with its responsive variants:

\`\`\`html
<div class="text-center sm:text-left">
  <!-- This text will be centered on mobile, but left-aligned on screens wider than the "sm" breakpoint -->
</div>
\`\`\`

The default breakpoints are:

- \`sm\`: 640px
- \`md\`: 768px
- \`lg\`: 1024px
- \`xl\`: 1280px
- \`2xl\`: 1536px

But you can customize these in your \`tailwind.config.js\` file.

## Dark Mode

Tailwind also supports dark mode:

\`\`\`html
<div class="bg-white dark:bg-gray-800 text-black dark:text-white">
  <!-- This div will have a white background and black text in light mode, and a gray background and white text in dark mode -->
</div>
\`\`\`

To enable dark mode, add the following to your \`tailwind.config.js\`:

\`\`\`javascript
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}
\`\`\`
`,
    coverImage: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    author: mockUsers[1],
    createdAt: '2023-09-12T16:45:00Z',
    updatedAt: '2023-09-12T16:45:00Z',
  },
  {
    id: '5',
    title: 'Modern JavaScript Features Every Developer Should Know',
    excerpt: 'Explore the essential modern JavaScript features that will help you write cleaner, more maintainable code.',
    content: `# Modern JavaScript Features Every Developer Should Know

JavaScript has evolved significantly in recent years, with new features that make the language more powerful and developer-friendly. Here are some essential modern JavaScript features every developer should know.

## Arrow Functions

Arrow functions provide a concise syntax for writing functions:

\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With multiple statements
const calculate = (a, b) => {
  const sum = a + b;
  return sum * 2;
};
\`\`\`

## Destructuring Assignment

Destructuring makes it easier to extract values from objects and arrays:

\`\`\`javascript
// Object destructuring
const person = { name: 'John', age: 30, city: 'New York' };
const { name, age } = person;
console.log(name, age); // 'John' 30

// Array destructuring
const colors = ['red', 'green', 'blue'];
const [primary, secondary] = colors;
console.log(primary, secondary); // 'red' 'green'
\`\`\`

## Spread and Rest Operators

The spread operator (\`...\`) can be used to expand arrays or objects:

\`\`\`javascript
// Spread with arrays
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5]; // [1, 2, 3, 4, 5]

// Spread with objects
const baseConfig = { apiUrl: 'example.com', timeout: 5000 };
const configWithAuth = { ...baseConfig, authToken: '123' };
\`\`\`

The rest operator looks the same but is used in function parameters to collect arguments:

\`\`\`javascript
const sum = (...numbers) => numbers.reduce((total, num) => total + num, 0);
console.log(sum(1, 2, 3, 4)); // 10
\`\`\`

## Template Literals

Template literals make string interpolation and multiline strings easier:

\`\`\`javascript
const name = 'Alice';
const greeting = \`Hello, ${name}!
Welcome to our website.\`;
\`\`\`

## Optional Chaining

Optional chaining (\`?.\`) allows you to access deeply nested properties without checking each level:

\`\`\`javascript
const user = {
  details: {
    profile: {
      firstName: 'John'
    }
  }
};

// Without optional chaining
const firstName = user && user.details && user.details.profile && user.details.profile.firstName;

// With optional chaining
const firstName = user?.details?.profile?.firstName;
\`\`\`

## Nullish Coalescing

The nullish coalescing operator (\`??\`) provides a default value when a value is null or undefined:

\`\`\`javascript
const count = data?.count ?? 0; // 0 if data.count is null or undefined, otherwise data.count
\`\`\`

## Async/Await

Async/await makes asynchronous code more readable:

\`\`\`javascript
// Using promises
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Using async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

These modern JavaScript features can help you write more concise, readable, and maintainable code.
`,
    coverImage: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    author: mockUsers[0],
    createdAt: '2023-10-28T11:20:00Z',
    updatedAt: '2023-10-28T11:20:00Z',
  },
];