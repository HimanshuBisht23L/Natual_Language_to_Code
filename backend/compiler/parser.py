from backend.compiler.ast import ProgramNode


def parse(tokens, raw_input=None):

    language = tokens.get("LANGUAGE")


    if not language:

        language = "PYTHON"


    tokens["RAW_INPUT"] = raw_input


    return ProgramNode(

        language,

        None,

        tokens

    )
