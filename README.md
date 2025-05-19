# Yum Menu & Ordering App

This is a web application built with React and TypeScript to display a menu, manage a shopping cart, and simulate ordering/receipt processes by interacting with an external API server. The application handles API key management and tenant registration.

## Features

* Fetches and displays menu data from an API.
* Organizes the menu into different sections (Wontons, Dips, Drinks) based on data from the API.
* Includes a shopping cart to add menu items (cart contents are likely managed in the Redux store).
* Navigation between different views: Menu, Order Status, and Receipt using React Router.
* Automatic fetching of an API key for the session upon application startup.
* Automatic registration of a tenant named "Yum" with the API, and reuse of the tenant ID if already saved locally.
* Basic error handling for API calls, etc.
* Uses React Context to make the API key and tenant ID available throughout the component tree.
* Styling using SASS Modules.

## Technologies

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [React Router v6](https://reactrouter.com/)
* [Redux Toolkit](https://redux-toolkit.js.org/) (inferred via `react-redux` `Provider` and `store` - likely used for the shopping cart)
* [React Context API](https://reactjs.org/docs/context.html) (`VarContext`)
* [SASS](https://sass-lang.com/) (both global styles and CSS Modules)
* Custom API communication service (`service/api/api.ts`)
* `localStorage`

## Prerequisites

* [Node.js](https://nodejs.org/): Ensure you have Node.js installed (LTS version recommended).
* A package manager: [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/).
* **Access to a Compatible API Server:** The application relies on an external API server capable of handling endpoints like fetching a key (`/key`), creating/managing tenants (`/tenants`), and fetching the menu (`/menu`).

## Installation

1. Clone the repository:
  
    ```bash
    git clone <YOUR REPO URL>
    cd <YOUR REPO NAME>
    ```

2. Install dependencies:
  
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Configure API Base URL:**
    The application communicates with an external API server. You will likely need to configure the base URL for this API. Check the file `src/service/api/api.ts` (or similar file where `getKey` and `apiCom` are defined) and ensure the variable holding the base URL (e.g., `API_BASE_URL`) points to the correct address for your API server.

## Running the Application

To start the development server, run the command:

```bash
npm start
# or
yarn start
# or
pnpm start


The application should then build and open in your web browser, usually at http://localhost:3000.

Project Structure
The project follows a standard structure for React applications with TypeScript:

.
├── public/           # Static files (e.g., index.html)
├── src/              # Source code
│   ├── app/          # Redux store and related files
│   │   └── store.ts  # Redux store configuration
│   ├── components/   # Reusable UI components (e.g., button, card, header, cart)
│   │   ├── cart/
│   │   ├── header/
│   │   └── menu/
│   ├── service/      # Services, hooks, context for logic (API calls, data handling)
│   │   ├── api/      # API communication logic
│   │   ├── context/  # React Context definitions (e.g., VarContext)
│   │   └── hooks/    # Custom React hooks (e.g., useApiKey)
│   ├── sass/         # SASS files for styling (global styles, modules)
│   ├── vews/         # Views/Pages (top-level components for the router)
│   │   ├── Error.tsx       # Error handling page
│   │   ├── Menu.tsx        # Menu page
│   │   ├── OrderStatus.tsx # Order status page
│   │   └── Receipt.tsx     # Receipt page
│   ├── utils/        # Utility functions, types/interfaces, etc.
│   │   └── interfaces.ts   # (Assumed file based on imports in Menu.tsx)
│   ├── App.tsx       # Main App component (handles API key, tenant, routing via Outlet)
│   ├── index.tsx     # Application entry point
│   └── router.ts     # React Router configuration
├── .gitignore        # Files ignored by Git
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── README.md         # This file

src/vews/: Contains components that represent entire pages or views in the application, rendered by react-router-dom based on the URL.
src/components/: Contains smaller, reusable UI elements and parts that build up the views.
src/service/: Contains logic not directly tied to the UI, such as API calls, managing global state via Context, and custom hooks to simplify access to data/functions.
Redux (in src/app/): Likely used to manage the application's global state, such as the contents of the shopping cart, which needs to be accessible across different views/components.
Context API (VarContext): Used to efficiently pass down the API key and tenant ID to components deep in the component tree without prop drilling.
API Interactions
The application interacts with the following API endpoints based on the provided code:

GET /key: Fetches an API key for the session.
POST /tenants: Attempts to register a tenant with the name "Yum". Handles the case where the tenant already exists by loading its ID from localStorage to avoid creating duplicates.
GET /menu: Fetches the menu items for the current tenant using the retrieved API key.
Note: The address of the API server must be configured separately in the code (see "Installation").

Further Development / Contributing
If you wish to contribute to the project, please follow these steps:

Fork the repository. 2. Create a new branch (git checkout -b feature/your-feature-name).
Make your changes and ensure the code follows the project's style (if any).
Test your changes thoroughly.
Commit your changes with a clear message (git commit -m 'Add new feature: brief description').
Push to your branch (git push origin feature/your-feature-name).
Create a Pull Request to the main repository.
This README provides a good overview for anyone looking to understand, install, or contribute to your project. Good luck!
