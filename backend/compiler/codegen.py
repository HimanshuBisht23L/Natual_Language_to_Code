from backend.utils.template_loader import load_template


def generate_code(ir):

    language = ir["language"]

    program = ir["properties"].get("PROGRAM")


    return load_template(

        language,

        program

    )
