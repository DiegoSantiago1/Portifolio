"""Gera curriculo-diego-santiago.pdf a partir de curriculo.html (Chromium via Playwright).

Uso (com Playwright instalado):
    python assets/documents/gerar_curriculo.py
"""

from pathlib import Path

from playwright.sync_api import sync_playwright

PASTA = Path(__file__).resolve().parent
ORIGEM = PASTA / "curriculo.html"
DESTINO = PASTA / "curriculo-diego-santiago.pdf"

with sync_playwright() as p:
    navegador = p.chromium.launch()
    pagina = navegador.new_page()
    pagina.goto(ORIGEM.as_uri(), wait_until="networkidle")
    pagina.evaluate("document.fonts.ready")
    pagina.pdf(path=str(DESTINO), format="A4", print_background=True, prefer_css_page_size=True)
    navegador.close()
print(f"{DESTINO.name}: {DESTINO.stat().st_size / 1024:.0f} KB")
