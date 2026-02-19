import os
from difflib import get_close_matches
from backend.compiler.supported_programs import SUPPORTED_PROGRAMS


def analyze(ast):

    program = ast.properties.get("PROGRAM")

    language = ast.language.lower()


    if not program:

        raise Exception("No PROGRAM identified")


    # Auto-correct UNKNOWN

    if program == "UNKNOWN":

        raw = ast.properties.get("RAW_INPUT", "").upper()

        suggestion = get_close_matches(

            raw,

            SUPPORTED_PROGRAMS,

            n=1,

            cutoff=0.6

        )

        if suggestion:

            program = suggestion[0]

            ast.properties["PROGRAM"] = program

        else:

            raise Exception("Program not recognized")



    # Check template exists

    path = f"backend/compiler/templates/{language}/{program}.txt"

    if not os.path.exists(path):

        raise Exception(

            f"{program} not available in {language}"

        )


    return True
