import pathlib
import textwrap

import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown
GOOGLE_API_KEY='AIzaSyA4ERF5pL0sVVgFY9KCiv1VfKlurpoet3w'

genai.configure(api_key=GOOGLE_API_KEY)

def word_to_sentence(question, ans):
  model = genai.GenerativeModel('gemini-pro')
  chat = model.start_chat(history=[])
  GOOGLE_API_KEY='AIzaSyA4ERF5pL0sVVgFY9KCiv1VfKlurpoet3w'
  genai.configure(api_key=GOOGLE_API_KEY)
  prompt = f"rephrase this as an answer : ({question}, {ans})"
  response = chat.send_message(prompt)
  f_ans = response.text
  return f_ans
