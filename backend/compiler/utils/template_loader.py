import os

from backend.compiler.utils.errors import CompilerError


def load_template(language, program):

    # Resolve absolute path relative to this utility's file position
    # __file__ is inside backend/compiler/utils/
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    path = os.path.join(base_dir, "compiler", "templates", language, f"{program}.txt")


    if not os.path.exists(path):

        raise CompilerError(

            f"{program} template not found for {language}"

        )


    with open(path, "r") as f:

        return f.read()

