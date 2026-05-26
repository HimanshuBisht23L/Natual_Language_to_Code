from backend.compiler.utils.three_address_code import get_three_address_code

def generate_ir(ast):

    program_name = ast.properties.get("PROGRAM", "UNKNOWN")
    three_address_code = get_three_address_code(program_name)

    return {

        "language": ast.language.lower(),

        "properties": ast.properties,

        "three_address_code": three_address_code

    }

