# Backend API Documentation

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibecommerce
NODE_ENV=development
```

## Installation

```bash
npm install
```

## Running the Server

Development mode (with nodemon):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Database Models

### Product
- `name` (String, required)
- `price` (Number, required)
- `description` (String)
- `image` (String)
- `category` (String)

### CartItem
- `userId` (String, default: 'mock-user-123')
- `productId` (ObjectId, ref: Product)
- `quantity` (Number, required, min: 1)
- `product` (Object, embedded product data)

### Order
- `userId` (String)
- `customerName` (String, required)
- `customerEmail` (String, required)
- `cartItems` (Array)
- `total` (Number, required)
- `timestamp` (Date)

