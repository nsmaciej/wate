import json
import re
from datetime import datetime

import requests


def get_text(url: str) -> str:
    r = requests.get(url)
    r.raise_for_status()
    return r.text


# Find the Wordle script file.
html = get_text("https://www.nytimes.com/games/wordle/index.html")
script_path = re.search(r"main\.\w+\.js", html)[0]
script = get_text(f"https://www.nytimes.com/games/wordle/{script_path}")

# Extract the word lists, the shorter one is solutions.
word_lists = [json.loads(x) for x in re.findall(r'\[(?:"\w{5}",?)+]', script)]
word_lists.sort(key=len)
solutions, words = word_lists

# Write the json
retrieved = datetime.utcnow().isoformat(timespec="seconds") + "Z"
dictionary = {"solutions": solutions, "words": words, "retrieved": retrieved}
with open("static/dictionary-en.json", "w") as fd:
    json.dump(dictionary, fd, indent=2)
