# Natural Language to Code Compiler (Backend)

## Overview

This project implements a **Natural Language to Code Compiler** that converts English instructions into executable source code using a compiler pipeline.

The system uses a **Large Language Model (Gemini API)** only for **token generation**, and the actual code generation is performed by a custom-built compiler consisting of:

- Lexer
- Parser
- Semantic Analyzer
- Intermediate Representation (IR) Generator
- Code Generator

The compiler currently supports **50 predefined programs** in:

- Python
- C

If the user does not specify a language, the compiler defaults to **Python**.

---

## Key Features

- Converts natural language into code
- Supports Python and C
- Default language: Python
- Auto-corrects spelling mistakes
- Uses real compiler phases
- Template-based code generation
- Proper semantic validation
- Robust error handling
- REST API interface (Flask)

---

## Compiler Architecture

The system follows a standard compiler pipeline:

