# Gemini AI Web & API Service

A Node.js & Express application integrated with Google Gemini API (`gemini-3.5-flash-lite`) using the `@google/genai` SDK. It features a modern AI Chatbot web interface as well as API endpoints for text generation and document processing.

---

## 🚀 Key Features

- **Interactive AI Chatbot Web UI**: Modern chat frontend with full conversation context memory.
- **Multimodal Document Processing**: Upload files (PDFs, text, images, etc.) to analyze or summarize content via Google Gemini API.
- **Express API Endpoints**:
  - `/generate-text`: Direct single prompt generation.
  - `/generate-from-doc`: Document analysis and summarization via multipart upload (`multer`).
  - `/api/chat`: Multi-turn conversational chat completion.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, ES Modules (`"type": "module"`)
- **AI SDK**: `@google/genai` (`GoogleGenAI`)
- **File Upload**: `multer`
- **Frontend**: HTML5, CSS3, JavaScript (Fetch API)
- **Environment Management**: `dotenv`

---

## 📋 Prerequisites

- **Node.js** (v18 or higher recommended)
- **Google Gemini API Key** (Get it from [Google AI Studio](https://aistudio.google.com/))

---

## ⚙️ Installation & Setup

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   git clone <repository-url>
   cd gemini
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   ```

---

## 🏃 Running the Project

Start the Express server:
```bash
node index.js
```

The server will run on `http://localhost:3000`.

---

## 📡 API Reference

### 1. Simple Text Generation
- **Endpoint**: `POST /generate-text`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "prompt": "Jelaskan apa itu kecerdasan buatan"
  }
  ```

### 2. Document Analysis / Summarization
- **Endpoint**: `POST /generate-from-doc`
- **Content-Type**: `multipart/form-data`
- **Form Fields**:
  - `file`: (File binary)
  - `prompt`: (Optional text prompt, defaults to summarization)

### 3. Multi-turn Chat
- **Endpoint**: `POST /api/chat`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "conversation": [
      { "role": "user", "text": "Halo!" },
      { "role": "model", "text": "Halo! Ada yang bisa saya bantu?" },
      { "role": "user", "text": "Apa nama ibu kota Indonesia?" }
    ]
  }
  ```

---

## 💻 Web Interface

Open `public/index.html` in your browser or serve static files to interact with the chatbot frontend built in `public/script.js`.

---

## 📜 License

ISC
