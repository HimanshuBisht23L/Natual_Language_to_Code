import google.generativeai as genai
from backend.config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

# FIXED MODEL NAME
model = genai.GenerativeModel("gemini-2.5-flash")


def load_prompt():

    with open("backend/llm/prompt.txt", "r") as f:
        return f.read()


def get_tokens(user_input):

    prompt = load_prompt()

    final_prompt = prompt.replace("{user_input}", user_input)

    response = model.generate_content(final_prompt)

    return response.text.strip()
