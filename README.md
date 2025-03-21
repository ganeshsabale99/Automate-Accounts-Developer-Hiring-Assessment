# 🛠 Receipt Processing System - Backend

## 🚀 Project Overview
This backend system processes scanned receipts, extracts key details using OCR (Tesseract.js), and stores the extracted data in a SQLite database.

---

## 📌 Tech Stack
- **Node.js** - Backend runtime
- **Express.js** - API framework
- **SQLite** - Database for storing receipts
- **Multer** - File upload handling
- **Tesseract.js** - OCR for text extraction
- **Child Process (pdftoppm)** - PDF to image conversion

---

## 📌 API Documentation

## 1️⃣ Upload Receipt
- **Method:** `POST`
- **Endpoint:** `/upload`
- **Description:** Uploads a receipt (PDF) and stores metadata.
- **Request Body:**
  - `receipt` (file) - The PDF file to be uploaded.
- **Response:**
  ```json
  {
    "message": "File uploaded successfully",
    "fileId": 1
  }

## 2️⃣ Validate Receipt
- **Method:** `POST`
- **Endpoint:** `/validate`
- **Description:** Validates if the uploaded file is a valid PDF.
- **Request Body:**
  - `fileId` (integer) - The ID of the uploaded file.
- **Response:**
  ```json
  {
    "fileId": 1,
    "isValid": true,
    "invalidReason": null
  }

## 3️⃣ Process Receipt
- **Method:** `POST`
- **Endpoint:** `/process`
- **Description:** Extracts receipt details using OCR and stores them in the database.
- **Request Body:**
  - `fileId` (integer) - The ID of the uploaded file.
- **Response:**
  ```json
  {
    "message": "Receipt processed successfully",
    "receiptId": 1,
    "totalAmount": 2174.62
  }

## 4️⃣ Get All Receipts
- **Method:** `GET`
- **Endpoint:** `/receipts`
- **Description:** Retrieves all processed receipts.
- **Response:**
  ```json
  [
    {
      "id": 1,
      "merchant_name": "The Venetian",
      "total_amount": 2174.62,
      "purchased_at": "03/20/2025",
      "created_at": "2025-03-20 21:53:29"
    }
  ]

## 5️⃣ Get Single Receipt
- **Method:** `GET`
- **Endpoint:** `/receipts/:id`
- **Description:** Retrieves a specific receipt by ID.
- **Response:**
  ```json
  {
    "id": 1,
    "merchant_name": "The Venetian",
    "total_amount": 2174.62,
    "purchased_at": "03/20/2025",
    "created_at": "2025-03-20 21:53:29"
  }

## 6️⃣ Delete Receipt
- **Method:** `DELETE`
- **Endpoint:** `/delete/:fileId`
- **Description:** Deletes a receipt from the database.
- **Response:**
  ```json
  {
    "message": "Receipt deleted successfully"
  }

## 📌 Contact
For any issues or improvements, contact:  
📧 **Email:** [sabaleganesh99@gmail.com](mailto:sabaleganesh99@gmail.com)  
🌐 **GitHub:** [ganeshsabale99](https://github.com/ganeshsabale99)
