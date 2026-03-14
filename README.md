# MinuteMate AI

MinuteMate AI is an AI-powered meeting notes analyzer designed to convert raw and unstructured meeting notes into clear, actionable insights. The application helps users quickly generate a concise summary, identify action items, capture deadlines, detect blockers, and create a professional follow-up email.

This project was built to demonstrate practical full-stack development skills, modern UI design, backend API integration, and real-world AI application development.

---

## Project Overview

In many real-world teams, meeting notes are often messy, lengthy, and difficult to convert into actionable follow-ups. MinuteMate AI solves this problem by allowing users to paste meeting notes into a clean interface and instantly receive structured outputs.

The goal of this project is to reduce manual effort after meetings and improve clarity by automatically organizing important discussion points into business-friendly sections.

---

## Key Features

- AI-generated summary of meeting notes
- Action items extraction with owner, task, and deadline
- Deadlines detection
- Blockers identification
- Professional follow-up email generation
- Clean and modern UI built with Tailwind CSS
- Loading state while generating results
- Input validation for empty and whitespace-only notes
- Error handling for backend/API issues
- Responsive layout suitable for demo and portfolio presentation

---

## Tech Stack

### Frontend
- Next.js
- Tailwind CSS
- TypeScript / TSX

### Backend
- Next.js API Routes

### AI Integration
- OpenAI API

---

## How the Application Works

1. The user pastes meeting notes into the input area.
2. The frontend sends the notes to a backend API route.
3. The backend sends a structured prompt to the OpenAI API.
4. The AI processes the notes and returns structured JSON output.
5. The frontend displays the response in separate sections:
   - Summary
   - Action Items
   - Deadlines
   - Blockers
   - Follow-up Email

---

## What I Built in This Project

In this project, I worked on both the frontend and backend to create a complete end-to-end AI-powered web application.

### Frontend Work
- Designed a polished dark-themed modern UI
- Built the meeting notes input section
- Added a generate button with loading state
- Displayed AI output in structured result cards
- Added character count display
- Implemented responsive layout and clean visual hierarchy
- Added user-friendly error messages

### Backend Work
- Built a Next.js API route for processing notes
- Integrated the OpenAI API securely using environment variables
- Designed a prompt that returns structured JSON
- Added validation for empty input
- Added error handling for invalid JSON and API failures
- Connected frontend and backend for end-to-end functionality

---

## Testing Completed

The application was tested with multiple real-world and edge-case scenarios, including:

- Standard structured meeting notes
- Notes without deadlines
- Notes without blockers
- Very short notes
- Very long notes
- Bullet-point meeting notes
- Informal / messy natural language notes
- Duplicate deadlines and duplicate blockers
- Lowercase names and mixed formatting
- Missing owner cases
- Empty input validation
- Whitespace-only input validation

### Testing Result
The core functionality works successfully for MVP/demo use.  
The application performs well across different input formats and handles common validation cases properly.

---

## Current Strengths

- Strong real-world use case
- Professional UI suitable for portfolio presentation
- Practical AI integration
- Good functional testing coverage
- Clear separation between frontend and backend logic
- Easy deployment path using Vercel

---

## Known Limitations

- Some long notes may not extract every blocker perfectly
- Certain milestone or event-style lines may occasionally be missed
- No authentication or saved history yet
- No export functionality yet
- No rate limiting yet for public deployment

---

## Future Improvements

- User authentication
- Saved meeting history
- Export to PDF or copy-to-email feature
- Better extraction for milestones and event-based lines
- Rate limiting for public usage
- Deployment with custom domain
- SEO improvements for discoverability

---

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/Sangam-555/MinuteMate-AI.git
cd MinuteMate-AI

2. Install dependencies
npm install
3. Create environment file

Create a .env.local file in the project root and add:

OPENAI_API_KEY = your_openai_api_key_here
4. Run the development server
npm run dev
5. Open in browser

Visit the local URL shown in the terminal.

## Author

** Bala Venkata Naga Ravindranath **  
🎓 MSc Artificial Intelligence and Robotics  
🏛️ University of Hertfordshire