from backend.utils.errors import CompilerError


def validate_tokens(tokens):

    if "PROGRAM" not in tokens:

        raise CompilerError(

            "PROGRAM token missing"

        )


    return True
