import os

from backend.utils.errors import CompilerError


def load_template(language, program):

    path = f"backend/compiler/templates/{language}/{program}.txt"


    if not os.path.exists(path):

        raise CompilerError(

            f"{program} template not found for {language}"

        )


    with open(path, "r") as f:

        return f.read()
