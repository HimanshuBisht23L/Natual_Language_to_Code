import re

def tokenize(text):

    tokens = {}

    lines = text.split("\n")

    for line in lines:

        if ":" in line:

            key, value = line.split(":", 1)

            tokens[key.strip().upper()] = value.strip().upper()

    return tokens



def tokenize_code(code, language):

    patterns = [
        # Preprocessor directives
        ('PREPROCESSOR',
         r'#include\s*<[^>]+>|#include\s*"[^"]+"|#define\s+\w+'),

        # Comments
        ('COMMENT',
         r'//.*|/\*[\s\S]*?\*/'),

        # String literals
        ('STRING',
         r'"[^"\\]*(?:\\.[^"\\]*)*"|\'[^\'\\]*(?:\\.[^\'\\]*)*\''),

        # Numbers
        ('NUMBER',
         r'\b\d+(\.\d+)?\b'),

        # C Keywords
        ('KEYWORD',
         r'\b(auto|break|case|char|const|continue|default|do|double|else|'
         r'enum|extern|float|for|goto|if|int|long|register|return|short|'
         r'signed|sizeof|static|struct|switch|typedef|union|unsigned|'
         r'void|volatile|while)\b'),

        # Operators
        ('OPERATOR',
         r'==|!=|<=|>=|\+\+|--|\+=|-=|\*=|/=|&&|\|\||<<|>>|'
         r'[+\-*/%&|^=<>!]'),

        # Separators
        ('SEPARATOR',
         r'[()\[\]{},;:]'),

        # Identifiers
        ('IDENTIFIER',
         r'\b[a-zA-Z_][a-zA-Z0-9_]*\b'),

        # Newline
        ('NEWLINE',
         r'\n'),

        # Spaces/Tabs
        ('SPACE',
         r'[ \t]+'),
    ]

    tok_regex = '|'.join(
        f'(?P<{name}>{pattern})'
        for name, pattern in patterns
    )

    tokens = []
    line_num = 1

    for match in re.finditer(tok_regex, code):

        kind = match.lastgroup
        value = match.group()

        if kind == 'NEWLINE':
            line_num += 1
            continue

        elif kind == 'SPACE':
            continue

        else:
            tokens.append({
                'line': line_num,
                'type': kind,
                'value': value
            })

    return tokens


# def tokenize_code(code, language):
#     patterns = [
#         ('COMMENT', r'#.*|//.*|/\*[\s\S]*?\*/'),
#         ('PREPROCESSOR', r'#include\s*<[^>]+>|#include\s*"[^"]+"|#define\s+\w+'),
#         ('STRING', r'"[^"\\]*(?:\\.[^"\\]*)*"|\'[^\'\\]*(?:\\.[^\'\\]*)*\''),
#         ('NUMBER', r'\b\d+(?:\.\d+)?\b'),
#         ('KEYWORD', r'\b(def|if|else|elif|for|while|return|import|from|in|is|not|and|or|try|except|raise|class|pass|break|continue|print|int|float|double|char|void|long|short|unsigned|signed|struct|union|enum|switch|case|default|sizeof|printf|scanf|include|main)\b'),
#         ('OPERATOR', r'==|!=|<=|>=|\+=|-=|\*=|\/=|&&|\|\||<<|>>|[+\-*/%&|^=<>!]'),
#         ('PUNCTUATION', r'[()\[\]{},;:.]'),
#         ('IDENTIFIER', r'\b[a-zA-Z_][a-zA-Z0-9_]*\b'),
#         ('NEWLINE', r'\n'),
#         ('SPACE', r'[ \t]+'),
#     ]

#     tok_regex = '|'.join(f'(?P<{name}>{pattern})' for name, pattern in patterns)
#     tokens = []
#     line_num = 1

#     for mo in re.finditer(tok_regex, code):
#         kind = mo.lastgroup
#         value = mo.group()
#         if kind == 'NEWLINE':
#             line_num += 1
#         elif kind == 'SPACE':
#             continue
#         elif kind == 'COMMENT':
#             line_num += value.count('\n')
#             tokens.append({'type': kind, 'value': value, 'line': line_num})
#         else:
#             tokens.append({'type': kind, 'value': value, 'line': line_num})

#     return tokens

