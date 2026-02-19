from difflib import get_close_matches


def correct_program(user_input, supported_programs):

    if not user_input:

        return None


    match = get_close_matches(

        user_input.upper(),

        supported_programs,

        n=1,

        cutoff=0.6

    )


    return match[0] if match else None
