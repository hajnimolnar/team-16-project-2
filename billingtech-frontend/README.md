# BillingTech Frontend

This is the frontend application for the BillingTech project. It is built using React, Vite, and Material-UI.

## Features

- Dynamic table view with row selection.
- Fetches data from a backend API.
- Mock data fallback in case of API errors.
- Environment-based configuration using `.env`.

## Prerequisites

- Node.js v18 (specified in `.nvmrc`).
- A running backend server on `http://localhost:3000`.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd billingtech-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:
   ```plaintext
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Build

To build the application for production:

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Proxy Configuration

The development server is configured to proxy API requests to the backend. This is defined in `vite.config.ts`:

```typescript
server: {
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
},
```

## Folder Structure

```
billingtech-frontend/
├── src/
│   ├── api/                # API utility functions
│   ├── components/         # Reusable components (e.g., TableView)
│   ├── hooks/              # Custom React hooks (e.g., useTableData)
│   ├── main.tsx            # Application entry point
│   ├── App.tsx             # Main application component
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
```

## Dependencies

- **React**: Frontend library.
- **Material-UI**: UI components.
- **Vite**: Development server and build tool.
- **TypeScript**: Static typing.

## Troubleshooting

### CORS Errors

If you encounter CORS errors when making API requests, ensure the backend server allows requests from `http://localhost:5173`. For example, in an Express backend:

```javascript
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));
```

### Node.js Version

Ensure you are using Node.js v18. You can switch to the correct version using `nvm`:

```bash
nvm use
```

## License

This project is licensed under the MIT License.
