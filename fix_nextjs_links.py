import os
import re

ROOT_DIR = "./"  # Update if needed

# Pattern to match <Link ...>...</Link>
LINK_TAG_REGEX = re.compile(r"(<Link\b[^>]*>)([\s\S]*?)(</Link>)", re.MULTILINE)

# Pattern to detect JSX tag (roughly)
JSX_TAG_PATTERN = re.compile(r"<[A-Za-z][^>/]*?>")

def has_multiple_children(inner):
    # Count top-level tags (excluding self-closing)
    tags = JSX_TAG_PATTERN.findall(inner)
    return len(tags) > 1

def already_wrapped(inner):
    # Checks if content already starts and ends with <span>
    return inner.strip().startswith("<span") and inner.strip().endswith("</span>")

def wrap_with_span(inner):
    stripped = inner.strip()
    return f"<span>\n{stripped}\n</span>"

def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        original = f.read()

    modified = False

    def replacer(match):
        nonlocal modified
        start_tag, inner, end_tag = match.groups()

        if has_multiple_children(inner) and not already_wrapped(inner):
            modified = True
            wrapped = wrap_with_span(inner)
            return f"{start_tag}{wrapped}{end_tag}"
        return match.group(0)

    updated = LINK_TAG_REGEX.sub(replacer, original)

    if modified:
        print(f"✅ Fixed: {filepath}")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(updated)
    else:
        print(f"⚠️ Skipped (no changes needed): {filepath}")

def walk_and_fix(root_dir):
    print(f"🔍 Scanning in: {os.path.abspath(root_dir)}\n")
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith((".jsx")):
                filepath = os.path.join(dirpath, filename)
                process_file(filepath)

if __name__ == "__main__":
    walk_and_fix(ROOT_DIR)
