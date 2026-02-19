from flask import Flask, request, jsonify

from flask_cors import CORS

from backend.llm.gemini_client import get_tokens

from backend.compiler.lexer import tokenize

from backend.compiler.parser import parse

from backend.compiler.semantic import analyze

from backend.compiler.ir_generator import generate_ir

from backend.compiler.codegen import generate_code


app = Flask(__name__)

CORS(app)


@app.route("/generate", methods=["POST"])

def generate():

    try:

        data = request.json

        user_input = data["input"]


        token_text = get_tokens(user_input)

        tokens = tokenize(token_text)

        ast = parse(tokens, user_input)

        analyze(ast)

        ir = generate_ir(ast)

        code = generate_code(ir)


        return jsonify({

            "success": True,

            "language": ast.language,

            "program": ast.properties.get("PROGRAM"),

            "code": code

        })


    except Exception as e:

        return jsonify({

            "success": False,

            "error": str(e)

        })


if __name__ == "__main__":

    app.run(debug=True)
