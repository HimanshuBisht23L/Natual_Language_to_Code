from backend.compiler.utils.three_address_code import get_three_address_code

def generate_english_3ac(ast_properties, target_language, original_program, final_program):
    input_str = ast_properties.get("RAW_INPUT", "")
    input_escaped = input_str.replace('"', '\\"')
    
    # Determine if spell check helper was active
    spell_corrected = (original_program == "UNKNOWN" or original_program != final_program)
    
    lines = []
    lines.append('// 3AC representing translation of English prompt to target code')
    lines.append(f't1 = SCAN("{input_escaped}")')
    lines.append('t2 = PARSE_TOKENS(t1)')
    lines.append(f't3 = GET_PROPERTY(t2, "LANGUAGE")  // t3 = "{target_language.upper()}"')
    
    if spell_corrected:
        lines.append(f't4 = GET_PROPERTY(t2, "PROGRAM")   // t4 = "{original_program}"')
        lines.append('t5 = VERIFY_SUPPORT(t4)             // t5 = 0 (Spelling typo/Unknown)')
        lines.append('if t5 == 0 goto L_FAIL')
    else:
        lines.append(f't4 = GET_PROPERTY(t2, "PROGRAM")   // t4 = "{final_program}"')
        lines.append('t5 = VERIFY_SUPPORT(t4)             // t5 = 1 (Supported)')
        lines.append('if t5 == 0 goto L_FAIL')
        
    lines.append('t6 = CHECK_TEMPLATE(t3, t4)         // t6 = 1')
    lines.append('if t6 == 0 goto L_FAIL')
    lines.append('t7 = LOAD_CODE_TEMPLATE(t3, t4)')
    lines.append('t8 = MAP_VARIABLES(t7)')
    lines.append('GENERATE_CODE(t8)')
    lines.append('goto L_SUCCESS')
    
    lines.append('L_FAIL:')
    if spell_corrected:
        lines.append(f't9 = CALL_SPELL_HELPER(t4)          // t9 = "{final_program}" (Spell-corrected!)')
        lines.append('if t9 == 0 goto L_ERROR')
        lines.append('t4 = t9')
        lines.append('t10 = CHECK_TEMPLATE(t3, t4)        // t10 = 1')
        lines.append('if t10 == 0 goto L_ERROR')
        lines.append('t7 = LOAD_CODE_TEMPLATE(t3, t4)')
        lines.append('t8 = MAP_VARIABLES(t7)')
        lines.append('GENERATE_CODE(t8)')
        lines.append('goto L_SUCCESS')
    else:
        lines.append('t9 = CALL_SPELL_HELPER(t4)          // t9 = 0')
        lines.append('if t9 == 0 goto L_ERROR')
        
    lines.append('L_ERROR:')
    lines.append('THROW_COMPILER_ERROR("Program or template not supported")')
    lines.append('L_SUCCESS:')
    lines.append('// Translation completed successfully')
    
    return "\n".join(lines)


def generate_ir(ast):

    program_name = ast.properties.get("PROGRAM", "UNKNOWN")
    original_program = ast.properties.get("ORIGINAL_PROGRAM", program_name)
    three_address_code = get_three_address_code(program_name)
    english_3ac = generate_english_3ac(ast.properties, ast.language, original_program, program_name)

    return {

        "language": ast.language.lower(),

        "properties": ast.properties,

        "three_address_code": three_address_code,

        "english_3ac": english_3ac

    }

