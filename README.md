# AI Interview Board

A local interview-practice app with a five-agent workflow built using LangChain 1.x and LangGraph. Upload a CV, let the CV agent extract the candidate profile, complete an eight-question interview, and receive a strict, evidence-based review.

## Agents and workflow

- **Reem — CV analyst:** extracts the candidate's name, specialty, experience, skills, education, projects, languages, and email from the CV. It does not intentionally fill in missing facts.
- **Noura — specialty interviewer:** creates four tailored technical or specialty questions in English.
- **Mazen — HR interviewer:** creates four behavioral and motivation questions in Arabic.
- **Lina — evaluator:** scores each written answer against the question and records specific evidence and improvement feedback.
- **Rashid — summary writer:** produces Arabic strengths and improvement areas based on the interview answers.

Each role is a LangChain `create_agent` agent. LangGraph `StateGraph` coordinates question generation and answer evaluation, including the branch that either requests the next question or creates the final report.

## Requirements

- Python 3.11 or newer
- VS Code (optional)
- An OpenRouter API key and internet connection for model requests

## Run on Windows

Open the project folder in VS Code, then run these commands in its integrated PowerShell terminal:

```powershell
py -3 -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
Copy-Item .env.example .env
notepad .env
```

In `.env`, replace `paste-your-key-here` with your OpenRouter API key. Save and close Notepad. Keep `.env` private; it is excluded from Git. The model can be changed using the `OPENROUTER_MODEL` value.

Start the server either way:

1. In VS Code, press `Ctrl+Shift+P`, choose **Tasks: Run Task**, then choose **تشغيل مقابلة LangChain محليًا**.
2. Or run this in PowerShell:

```powershell
.\.venv\Scripts\python.exe -m uvicorn backend.app:app --host 127.0.0.1 --port 8000
```

Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in your browser. Keep the terminal open while using the app. Press `Ctrl+C` to stop the server.

## CV formats and privacy

The browser extracts text from text-based PDF, DOCX, TXT, and Markdown files. Scanned image PDFs are not supported because OCR is not included. PDF.js and Mammoth are loaded from a CDN.

The extracted CV text and interview answers are sent from the local FastAPI server to OpenRouter for AI processing. Do not upload a CV unless you are comfortable sending its contents to the selected model provider. The API key stays in your local `.env` file and must never be committed.

Interview sessions are held temporarily in server memory. Restarting the server clears active sessions; no database is configured.

## API

- `GET /api/health` — reports whether the local service and API key are configured.
- `POST /api/cv/analyze` — extracts a candidate profile from CV text.
- `POST /api/interviews` — creates the interview questions and session.
- `POST /api/interviews/{session_id}/answers` — evaluates an answer and returns the next question or final report.

## Project structure

```text
interview-board/
├── index.html                 # Interface, CV upload, and browser-side text extraction
├── backend/
│   ├── __init__.py
│   └── app.py                 # FastAPI routes, LangChain agents, and LangGraph workflows
├── .vscode/tasks.json         # VS Code task to run the Python server
├── .env.example               # Safe environment-variable template
├── .gitignore                 # Excludes secrets and local Python files
├── requirements.txt           # Python dependencies
└── مقابلة.code-workspace
```

## Submit to GitHub

Review the files in VS Code Source Control, then commit and push the project. Never add `.env` or your API key. Add this line to the bottom of the README if required by the academy:

```text
Submitted by: Mohammed ALqahtani — academy: @SDAIAAcademy
```

Submitted by: Mohammed ALqahtani — academy: @SDAIAAcademy
