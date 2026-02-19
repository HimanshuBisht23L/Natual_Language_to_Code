from backend.compiler.ast import ProgramNode


def parse(tokens, raw_input=None):

    language = tokens.get("LANGUAGE")

    # ✅ Default language Python
    if not language:

        language = "PYTHON"


    tokens["RAW_INPUT"] = raw_input

    tokens["LANGUAGE"] = language


    return ProgramNode(

        language,

        None,

        tokens

    )
