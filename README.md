# Bookstore API

This is a simple backend system built using **Node.js**, **Express**, and **MongoDB**. It supports user authentication and allows basic CRUD operations on books.

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bookstore-api.git
   cd bookstore-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PRIVATE_KEY=any_private_key
   PORT=5000
   ```

4. **Run the server**
   ```bash
   npm start
   ```

   The server should now be running at:  
   [http://localhost:5000](http://localhost:5000)

---

## Authentication

This API uses JWT for authentication.

- After signing up or logging in, you'll receive a token.
- Use this token in the `Authorization` header for all protected routes:
  ```
  Authorization: Bearer <your_token>
  ```

---

## API Endpoints

###  Auth Routes

#### POST `/api/auth/signup`
For registering new users.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

#### POST `/api/auth/login`
Logs in a user and returns a token.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "token": "jwt_token"
}
```

---

### Book Routes (require token)

#### POST `/api/books`
Create or add a new book.

**Sample Body:**
```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "category": "Self-help",
  "price": 450,
  "rating": 5
}
```

---

#### GET `/api/books`
Retrieve books it has support for filters, sorting, and pagination.

**Query Parameters (optional):**
according to the book i added above
- `author=James Clear`
- `category=Self-help`
- `rating=4` (shows books with rating >= 4)
- `title=atom` (searches by title(partial matching), case-insensitive)
- `sortBy=price` or `sortBy=rating`
- `page=1&limit=10` (for pagination)

---

#### GET `/api/books/:id`
Retrieve a  book by its ID.

---

#### PUT `/api/books/:id`
Update a book by its ID.

**Sample Body:**
```json
{
  "price": 299,
  "rating": 4.8
}
```

---

#### DELETE `/api/books/:id`
Delete a book by its ID.

---

## Assumptions & Enhancements
**Assumptions**
- JWT tokens expire after **6 hours**.
- Email and password are required for both sign-up and login.
- Passwords are hashed using bcrypt before saving to the database.
- Book ratings are assumed to be numerical and range between 0 to 5.
- Book search supports partial title matches .
- Pagination defaults to page 1 and 10 items per page if not provided.

**Enhancements**
- We can add 'roles' like admin and 'reader'
- Implement a email verification
- Can further add book reviews 
- Support for book images or PDs
- Rate-limiting

---

