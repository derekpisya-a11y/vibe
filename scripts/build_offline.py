"""Bundle the built Vite site into one HTML file for offline viewing."""

import base64
import mimetypes
import re
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
HTML = (DIST / "index.html").read_text(encoding="utf-8")


def data_url(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{encoded}"


def inline_resource(relative_path: str) -> str:
    file_path = DIST / relative_path
    if not file_path.is_file():
        raise FileNotFoundError(file_path)
    return data_url(file_path)


css_path = next((DIST / "assets").glob("index-*.css"))
js_path = next((DIST / "assets").glob("index-*.js"))
css = css_path.read_text(encoding="utf-8")
js = js_path.read_text(encoding="utf-8")

css = re.sub(
    r"/assets/([\w.-]+\.(?:woff2?|png|svg))",
    lambda match: inline_resource(f"assets/{match.group(1)}"),
    css,
)

for filename in ("m9-knife.png", "neverlose-logo.svg"):
    js = js.replace(f"/assets/{filename}", data_url(DIST / "assets" / filename))

HTML = re.sub(r'<script type="module" crossorigin src="/assets/[^\"]+"></script>',
              lambda _: f'<script type="module">{js}</script>', HTML, count=1)
HTML = re.sub(r'<link rel="stylesheet" crossorigin href="/assets/[^\"]+">',
              lambda _: f'<style>{css}</style>', HTML, count=1)
HTML = HTML.replace('<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
                    f'<link rel="icon" type="image/svg+xml" href="{data_url(DIST / "favicon.svg")}" />')

if 'src="/assets/' in HTML or 'href="/assets/' in HTML or 'url(/assets/' in HTML:
    raise RuntimeError("Offline bundle still references the development server")

output = ROOT / "neverlose-demo.html"
output.write_text(HTML, encoding="utf-8")
print(f"Created {output} ({output.stat().st_size:,} bytes)")

archive = ROOT / "neverlose-demo.zip"
with ZipFile(archive, "w", compression=ZIP_DEFLATED, compresslevel=9) as zip_file:
    zip_file.write(output, arcname=output.name)
print(f"Created {archive} ({archive.stat().st_size:,} bytes)")
