# LingoComp: Natural Language to Executable Code Compiler

An interactive, hybrid natural-language-to-code compiler built as a Course Project-Based Learning (PBL) workspace for **Compiler Design**. It translates English algorithm prompts into clean Python and C source code, complete with live token streams and register-based Intermediate Three-Address Code (3AC).

---

## 📖 Project Overview

**LingoComp** is a hybrid compilation pipeline that leverages Large Language Models (LLMs) solely for front-end tokenization and translates these intents into target code through a robust, custom-built compiler backend. The system represents a realistic compilation platform illustrating standard textbook phases:

```
[English Prompt] ──► [Gemini front-end tokenizer] ──► [Lexical Analysis (Stage 1)]
                                                             │
[Code Generation] ◄── [Semantic Correction] ◄── [AST Parser] ◄─┘
       │
[Code Lexer (Stage 3)] ──► [Detailed Token Grid Response]
       │
[IR / 3AC Generator] ───► [Register-based Three-Address Code]
```

### Why a Hybrid Design?
Traditional generative systems write code end-to-end but lack structure or semantic guarantees, often producing "hallucinations." **LingoComp** solves this by:
1. Utilizing the **Gemini API** as an intelligent lexical front-end to extract target programming languages and program intents (represented as key:value tokens).
2. Passing these configurations through a **formal Compiler Pipeline** (formal AST parsing, contextual semantic Spell-checking correction, absolute template code generation, realistic intermediate assembly-like Three-Address Code translation, and formal high-fidelity source code token scanning) to guarantee structured, compile-ready, and correct code output.

---

## 🚀 Key Features

* **Dual-Language Targets**: Full C and Python templates supported for **53 classic algorithms** (from Prime Checks to Bubble Sorts and Binary Search).
* **Automatic Spelling Corrections**: Seamlessly corrects misspelled algorithm requests using a sequence-similarity algorithm (Spell Helper) during Semantic Analysis.
* **Intermediate Representation (3AC)**: Outputs register-based assembly-style Three-Address Code showing loop labels (`L1`, `L2`), temporary variables (`t1`, `t2`), and conditional control flow for educational clarity.
* **Full Source Lexer Scans**: Performs a secondary, high-fidelity regular expression scanner on the compiled Python/C output to return line-by-line streams of Keywords, Identifiers, Operators, Numbers, Strings, and Comments.
* **Interactive Frontend Workspace**: A gorgeous dark-mode dashboard styled with Tailwind CSS, featuring search filters for scanned tokens, visual compilation status badges, and copy hooks.
* **Fully Responsive Design**: Fully optimized views with touch-scrollable, shrink-proof workspace tabs that render beautifully on mobile devices, tablets, and desktop displays.

---

## 📁 Workspace Directory Structure

```
Compiler Design PBL/
├── backend/
│   ├── app.py                      # Main Flask server with CORS & absolute sys.path resolvers
│   ├── config.py                   # Dotenv configurations
│   ├── requirements.txt            # Python backend dependencies
│   ├── steps.md                    # Working explanation manual
│   ├── compiler/
│   │   ├── ast.py                  # Abstract Syntax Tree nodes (ProgramNode)
│   │   ├── parser.py               # AST Parser converting prompt tokens to tree nodes
│   │   ├── semantic.py             # Semantic analyzer (verifies availability & spell corrects)
│   │   ├── ir_generator.py         # Intermediate Representation generator
│   │   ├── codegen.py              # Template-based code compiler
│   │   ├── lexer.py                # Dual lexers (Prompt tokenizer & Source code scan)
│   │   ├── supported_programs.py   # Collection of 53 supported compiler tasks
│   │   ├── templates/              # High-level Python and C file structures
│   │   └── utils/
│   │       ├── errors.py           # Custom CompilerError module
│   │       ├── spell_helper.py     # Real-time spelling suggestion matching
│   │       ├── template_loader.py  # Absolute-path relative template fetcher
│   │       └── three_address_code.py# Repository of 53 educational 3AC mappings
│   └── llm/
│       ├── gemini_client.py        # Gemini client for front-end token extraction
│       └── prompt.txt              # Absolute-path relative Gemini system instructions
├── frontend/
│   ├── package.json                # React-Vite project dependencies
│   ├── tailwind.config.js          # Tailwind CSS configurations
│   ├── postcss.config.js           # PostCSS configurations
│   ├── src/
│   │   ├── main.jsx                # React-Vite entrypoint
│   │   ├── index.css               # Tailwind CSS directives
│   │   ├── App.jsx                 # Router client setup (Routes: Home, Compiler, About)
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Responsive glassmorphism header
│   │   │   ├── HomePage.jsx        # Landing page with interactive compilation stages
│   │   │   ├── AboutPage.jsx       # Educational textbook theory page
│   │   │   └── CompilerPage.jsx    # Complete interactive compiler workspace dashboard
│   │   └── utils/
│   │       └── PhasesSteps.jsx     # Compilation phase descriptive parameters
```

---

## 🛠️ Step-by-Step Installation

Follow these steps to set up and run the entire hybrid compiler project on your local system:

### 1. Prerequisites
Ensure you have the following installed on your machine:
* [Python 3.10+](https://www.python.org/downloads/)
* [Node.js (v18+)](https://nodejs.org/) with `npm`

---

### 2. Backend Setup (Flask Server)

1. Open your terminal and navigate to the project's `backend` directory:
   ```powershell
   cd "C:\Users\Himanshu\Desktop\Compiler Design PBL\backend"
   ```

2. Create a virtual environment to manage dependencies cleanly:
   ```powershell
   python -m venv venv
   ```

3. Activate the virtual environment:
   * **On Windows (PowerShell):**
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   * **On Windows (Command Prompt):**
     ```cmd
     .\venv\Scripts\activate.bat
     ```
   * **On macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

4. Install the required Python backend dependencies:
   ```powershell
   pip install -r requirements.txt
   ```

5. **Configure Environment Variables:**
   * Create a file named `.env` in the root of the `backend/` directory (or use the one in the parent workspace directory).
   * Open the `.env` file and add your Google Gemini API key:
     ```env
     GEMINI_API_KEY=your_actual_gemini_api_key_here
     ```

6. **Start the Flask backend server:**
   * You can run the application directly from the `backend/` folder:
     ```powershell
     python .\app.py
     ```
   * The server will launch and listen for API requests at: **`http://127.0.0.1:5000`**

---

### 3. Frontend Setup (React & Tailwind CSS)

1. Open a new terminal window and navigate to the `frontend` directory:
   ```powershell
   cd "C:\Users\Himanshu\Desktop\Compiler Design PBL\frontend"
   ```

2. Install all node modules and interface dependencies:
   ```powershell
   npm install
   ```

3. **Start the Vite development server:**
   ```powershell
   npm run dev
   ```

4. Open your browser and navigate to the local host address printed in the terminal (usually **`http://localhost:5173/`**).

---

## 💻 Working Example & API Flow

When you send a compilation query to LingoComp, the compiler processes it and yields structured educational outputs.

### Sample API Request
* **Endpoint:** `POST http://127.0.0.1:5000/generate`
* **JSON Body:**
  ```json
  {
    "input": "write a python program to check if a number is prime"
  }
  ```

### Sample JSON Response
```json
{
  "success": true,
  "language": "PYTHON",
  "program": "PRIME_CHECK",
  "code": "n=int(input())\nflag=True\nfor i in range(2,n):\n    if n%i==0:\n        flag=False\nif flag: print(\"Prime\")\nelse: print(\"Not Prime\")",
  "tokens": {
    "LANGUAGE": "PYTHON",
    "PROGRAM": "PRIME_CHECK"
  },
  "lexical_tokens": [
    {"type": "IDENTIFIER", "value": "n", "line": 1},
    {"type": "OPERATOR", "value": "=", "line": 1},
    {"type": "KEYWORD", "value": "int", "line": 1},
    {"type": "PUNCTUATION", "value": "(", "line": 1},
    {"type": "IDENTIFIER", "value": "input", "line": 1},
    ...
  ],
  "three_address_code": "input n\nflag = 1\nif n <= 1 goto L2\ni = 2\nL1:\nt1 = n / 2\nif i > t1 goto L3\nt2 = n % i\nif t2 != 0 goto L4\nflag = 0\ngoto L3\nL4:\nt3 = i + 1\ni = t3\ngoto L1\nL3:\nif flag == 1 goto L5\nL2:\nprint \"Not Prime\"\ngoto END\nL5:\nprint \"Prime\"\nEND:"
}
```

---

## 🎓 Compiler Phases Explained (PBL Perspective)

1. **Lexical Analysis (Stage 1 - Lexer):** Matches incoming Gemini text configurations to build strict dictionaries of compiler inputs (`LANGUAGE` and `PROGRAM` name).
2. **Syntax Analysis (Stage 2 - Parser):** Maps parsed parameters to dynamic Program Nodes (`ProgramNode`) in the Abstract Syntax Tree (AST), checking target structures.
3. **Semantic Analysis (Stage 3 - Semantic):** Ensures logical validity. Checks if the requested algorithm exists within our 53 supported modules. Runs a Sequence Similarity correction algorithm to correct slight spell check typos.
4. **Intermediate Code Generation (Stage 4 - 3AC):** Transforms abstract logic into **Three-Address Code (3AC)**. 3AC serves as an educational register-based assembly-style view using instructions containing at most three memory addresses.
5. **Code Generation (Stage 5 - Codegen):** Compiles high-level templates from safe relative-path files to build correct executable source scripts in the target language (C/Python).
6. **Detailed Source Code Scan (Stage 6 - High-Fidelity Lexer):** Takes the generated program and runs regular expression rules to produce a detailed list of token classes complete with actual source line numbers.
