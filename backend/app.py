import sys
import os

# Add parent directory to sys.path to support running app.py directly
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask, request, jsonify
from flask_cors import CORS

from backend.llm.gemini_client import get_tokens

from backend.compiler.lexer import tokenize, tokenize_code, tokenize_english
from backend.compiler.parser import parse
from backend.compiler.semantic import analyze
from backend.compiler.ir_generator import generate_ir
from backend.compiler.codegen import generate_code

from backend.compiler.utils.errors import CompilerError


app = Flask(__name__)

CORS(app)


@app.route("/generate", methods=["POST"])

def generate():

    try:

        data = request.json

        if not data or "input" not in data:

            raise CompilerError("Input not provided")


        user_input = data["input"]


        # Gemini → Tokens
        token_text = get_tokens(user_input)


        # Lexer
        tokens = tokenize(token_text)


        # Save original parsed program for dynamic 3AC branch mapping
        original_program = tokens.get("PROGRAM", "UNKNOWN")


        # Parser (default Python handled here)
        ast = parse(tokens, user_input)


        ast.properties["ORIGINAL_PROGRAM"] = original_program


        # Semantic analysis
        analyze(ast)


        # IR
        ir = generate_ir(ast)


        # Code generation
        code = generate_code(ir)


        # Extract lexical tokens from generated code
        lexical_tokens = tokenize_code(code, ast.language)

        # Extract lexical tokens from input English prompt
        english_tokens = tokenize_english(user_input)

        return jsonify({

            "success": True,

            "language": ast.language,

            "program": ast.properties.get("PROGRAM"),

            "code": code,

            "tokens": tokens,

            "lexical_tokens": lexical_tokens,

            "three_address_code": ir.get("three_address_code"),

            "english_tokens": english_tokens,

            "english_3ac": ir.get("english_3ac")

        })



    # ✅ Compiler errors handled cleanly
    except CompilerError as e:

        return jsonify({

            "success": False,

            "error": e.message

        })


    # ✅ Any other unexpected error
    except Exception as e:

        return jsonify({

            "success": False,

            "error": str(e)

        })


if __name__ == "__main__":

    app.run(debug=True)
