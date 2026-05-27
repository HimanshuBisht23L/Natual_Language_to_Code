from difflib import get_close_matches

def correct_program(user_input, supported_programs):
    if not user_input:
        return None

    # Convert supported programs set to a list for matching
    supported_list = list(supported_programs)

    # 1. Clean the input: uppercase and replace dividers with spaces
    cleaned = user_input.upper().replace("_", " ").replace("-", " ")
    for punc in [".", ",", "?", "!", "(", ")", "[", "]"]:
        cleaned = cleaned.replace(punc, " ")

    words = cleaned.split()

    # Common prompt stop-words to exclude for better intent matching
    stop_words = {
        "GIVE", "ME", "WRITE", "CODE", "IN", "PROGRAM", "TO", "CHECK", "IF", 
        "A", "AN", "THE", "PLEASE", "IMPLEMENT", "FOR", "GET", "CREATE", 
        "C", "PYTHON", "JAVA", "CPP", "LANG", "LANGUAGE", "FIND"
    }

    meaningful_words = [w for w in words if w not in stop_words]

    if not meaningful_words:
        meaningful_words = words

    # Join the meaningful target search terms
    search_term_space = " ".join(meaningful_words)
    search_term_underscore = "_".join(meaningful_words)

    # 2. Check direct similarity on the combined search term
    match = get_close_matches(search_term_underscore, supported_list, n=1, cutoff=0.5)
    if match:
        return match[0]

    # Try matching space-stripped keywords (e.g., binryserch vs binarysearch)
    search_stripped = search_term_space.replace(" ", "")
    supported_stripped_map = {p.replace("_", ""): p for p in supported_list}
    match = get_close_matches(search_stripped, list(supported_stripped_map.keys()), n=1, cutoff=0.5)
    if match:
        return supported_stripped_map[match[0]]

    # 3. Fallback: try individual words matching
    for word in meaningful_words:
        if len(word) < 3:
            continue
        match = get_close_matches(word, supported_list, n=1, cutoff=0.5)
        if match:
            return match[0]

    # 4. Ultimate fallback: run close match on the whole input string
    match = get_close_matches(user_input.upper().replace(" ", "_"), supported_list, n=1, cutoff=0.35)
    if match:
        return match[0]

    return None
