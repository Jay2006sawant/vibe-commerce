# Frontend Documentation

## Installation

```bash
npm install
```

## Running the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/      # Reusable components
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── CartItem.jsx
│   ├── CheckoutForm.jsx
│   └── ReceiptModal.jsx
├── pages/          # Page components
│   ├── Products.jsx
│   └── Cart.jsx
├── context/        # React Context
│   └── CartContext.jsx
├── services/       # API services
│   └── api.js
├── App.jsx         # Main app component
└── main.jsx        # Entry point
```

## Features

- React Router for navigation
- Context API for cart state management
- Axios for API calls
- Responsive CSS design
- Error handling and loading states

