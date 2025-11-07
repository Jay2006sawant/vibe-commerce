# Vibe Commerce - Full Stack Shopping Cart

A full-stack e-commerce shopping cart application built with React, Node.js/Express, and MongoDB.

## Features

- 🛍️ Product browsing with grid layout
- 🛒 Shopping cart with add/remove/update functionality
- 💳 Mock checkout with receipt generation
- 💾 Database persistence with MongoDB
- 🔄 Fake Store API integration (bonus)
- 📱 Fully responsive design
- ⚠️ Comprehensive error handling

## Tech Stack

- **Frontend**: React 18, Vite, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **API**: RESTful APIs

## Project Structure

```
.
├── backend/          # Express.js backend
│   ├── models/      # MongoDB models
│   ├── routes/      # API routes
│   ├── controllers/ # Route controllers
│   └── server.js    # Entry point
├── frontend/        # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── public/
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibecommerce
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Products
- `GET /api/products` - Get all products (returns 5-10 mock items)
- `GET /api/products/fake-store` - Get products from Fake Store API (bonus feature)

### Cart
- `GET /api/cart` - Get cart items with total calculation
- `POST /api/cart` - Add item to cart (requires `productId` and optional `qty`)
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

### Checkout
- `POST /api/checkout` - Process checkout and generate receipt (requires `customerName`, `customerEmail`, and optional `cartItems`)

### Request/Response Examples

**Add to Cart:**
```json
POST /api/cart
{
  "productId": "507f1f77bcf86cd799439011",
  "qty": 2
}
```

**Checkout:**
```json
POST /api/checkout
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "cartItems": []
}
```

## Usage

1. Start MongoDB (local or use MongoDB Atlas)
2. Start the backend server: `cd backend && npm run dev`
3. Start the frontend server: `cd frontend && npm run dev`
4. Open `http://localhost:5173` in your browser
5. Browse products and add them to cart
6. View cart, update quantities, or remove items
7. Proceed to checkout with name and email
8. View receipt after successful checkout

## Bonus Features

### 1. Database Persistence
- All cart items and orders are persisted in MongoDB
- Mock user system (`mock-user-123`) for demonstration
- Cart persists across page refreshes

### 2. Fake Store API Integration
- Toggle to fetch products from Fake Store API
- Seamless integration with existing cart functionality
- Access via checkbox on Products page

### 3. Error Handling
- Comprehensive error handling on both frontend and backend
- User-friendly error messages
- Validation for email format and required fields
- Graceful error recovery

## Development Notes

- Backend uses MongoDB with Mongoose for data persistence
- Frontend uses React Context API for cart state management
- All API calls are handled through Axios
- Responsive design works on mobile, tablet, and desktop
- Cart automatically syncs with backend on all operations

## Screenshots

_Add screenshots here after running the application_

## Demo Video

_Link to demo video will be added here_

## License

ISC

