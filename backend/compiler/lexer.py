def tokenize(text):

    tokens = {}

    lines = text.split("\n")

    for line in lines:

        if ":" in line:

            key, value = line.split(":", 1)

            tokens[key.strip().upper()] = value.strip().upper()

    return tokens
