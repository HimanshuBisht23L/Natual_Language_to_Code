import os


def generate_code(ir):

    language = ir["language"]

    program = ir["properties"].get("PROGRAM")

    path = f"backend/compiler/templates/{language}/{program}.txt"


    if not os.path.exists(path):

        raise Exception(

            f"Template for {program} not found"

        )


    with open(path, "r") as f:

        return f.read()
