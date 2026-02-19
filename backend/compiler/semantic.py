from backend.compiler.supported_programs import SUPPORTED_PROGRAMS

from backend.utils.spell_helper import correct_program

from backend.utils.errors import CompilerError

import os


def analyze(ast):

    program = ast.properties.get("PROGRAM")

    language = ast.language.lower()


    if not program:

        raise CompilerError(

            "No program detected"

        )


    if program == "UNKNOWN":

        suggestion = correct_program(

            ast.properties.get("RAW_INPUT"),

            SUPPORTED_PROGRAMS

        )


        if suggestion:

            ast.properties["PROGRAM"] = suggestion

            program = suggestion

        else:

            raise CompilerError(

                "Program not recognized"

            )


    path = f"backend/compiler/templates/{language}/{program}.txt"


    if not os.path.exists(path):

        raise CompilerError(

            f"{program} not available in {language}"

        )


    return True
