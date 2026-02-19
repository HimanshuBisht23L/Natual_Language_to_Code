from flask import Flask, request, jsonify
from flask_cors import CORS

from backend.llm.gemini_client import get_tokens

from backend.compiler.lexer import tokenize
from backend.compiler.parser import parse
from backend.compiler.semantic import analyze
from backend.compiler.ir_generator import generate_ir
from backend.compiler.codegen import generate_code

# ✅ NEW IMPORT
from backend.utils.errors import CompilerError


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


        # Parser (default Python handled here)
        ast = parse(tokens, user_input)


        # Semantic analysis
        analyze(ast)


        # IR
        ir = generate_ir(ast)


        # Code generation
        code = generate_code(ir)


        return jsonify({

            "success": True,

            "language": ast.language,

            "program": ast.properties.get("PROGRAM"),

            "code": code

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
