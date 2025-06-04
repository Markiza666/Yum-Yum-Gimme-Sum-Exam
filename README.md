# Yum Menu & Ordering App

A modern and user-friendly web application designed for easily ordering delicious wontons! Developed with React, Redux Toolkit, and React Router to provide a seamless ordering experience.

## 🌟 **Features**

* Menu Overview: Browse a dynamic menu featuring various wontons and side dishes.
* Intuitive Shopping Cart: Effortlessly add, adjust quantities, and remove products.
* Smooth Ordering Process: Send your order to the API and receive a unique order number along with an estimated time of arrival (ETA).
* Order Status: Track your order with a clear and concise order status page.
* Digital Receipt: View and verify your receipt directly within the app after placing an order.
* Local Storage: Manages the last placed order and tenant information using localStorage for an enhanced user experience.

## 🛠️ **Technologies**

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [React Router v6](https://reactrouter.com/)
* [Redux Toolkit](https://redux-toolkit.js.org/) (inferred via `react-redux` `Provider` and `store` - likely used for the shopping cart)
* [React Context API](https://reactjs.org/docs/context.html) (`VarContext`)
* [SASS](https://sass-lang.com/) (both global styles and CSS Modules)
* Custom API communication service (`service/api/api.ts`)
* `localStorage`
  
## 🚀 **Getting Started**

Follow these steps to get Wonton Express up and running on your local machine.

## Prerequisites

* [Node.js](https://nodejs.org/): Ensure you have Node.js installed (LTS version recommended).
* A package manager: [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/).
* **Access to a Compatible API Server:** The application relies on an external API server capable of handling endpoints like fetching a key (`/key`), creating/managing tenants (`/tenants`), and fetching the menu (`/menu`).

## Installation

1. **Clone the repository**:
  
    ```bash
    git clone <YOUR REPO URL>
    cd <YOUR REPO NAME>
    ```

2. **Install dependencies**:
  
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
```

The application should then build and open in your web browser, usually at http://localhost:3000.

## 📂 **Project Structure**

The project follows a standard structure for React applications with TypeScript:

```bash
Yum-Yum-Gimme-Sum-Exam/
├── public/                     # Static assets
├── src/
│   ├── app/                    # Redux store, hooks, and global context
│   │   ├── hooks/
│   │   ├── context/
│   │   └── store.ts
│   ├── assets/                 # Images and other static assets
│   ├── components/             # Reusable UI components
│   │   ├── button/
│   │   ├── cart/
│   │   └── header/
│   ├── features/               # Redux slices for specific functionality (e.g., cart, menu)
│   │   ├── cart/
│   │   └── menu/
│   ├── service/                # API communication
│   │   └── api/
│   ├── sass/                   # Global Sass styles
│   ├── utils/                  # Types (interfaces), helper functions
│   ├── vews/                   # Main views/pages (e.g., Menu, OrderStatus, Receipt)
│   ├── App.tsx                 # Main component
│   ├── Error.tsx               # Error view
│   ├── main.tsx                # Application entry point
│   └── router.ts               # React Router configuration
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

## 💡 **Contributing**

All contributions are welcome! If you have suggestions for improvements, find bugs, or want to add new features, don't hesitate to open an issue or submit a pull request.

Fork this repository.
Create a new branch: git checkout -b feature/your-feature-name
Make your changes and commit them: git commit -m 'Add your feature'
Push to the branch: git push origin feature/your-feature-name
Create a Pull Request.

This README provides a good overview for anyone looking to understand, install, or contribute to your project. Good luck!
