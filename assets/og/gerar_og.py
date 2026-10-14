"""Gera assets/images/og-image.png (1200×630) a partir de assets/og/og-image.html.

Uso (com Playwright instalado):
    python assets/og/gerar_og.py
"""

from pathlib import Path

from playwright.sync_api import sync_playwright

PASTA = Path(__file__).resolve().parent
ORIGEM = PASTA / "og-image.html"
DESTINO = PASTA.parent / "images" / "og-image.png"

with sync_playwright() as p:
    navegador = p.chromium.launch()
    pagina = navegador.new_page(viewport={"width": 1200, "height": 630})
    pagina.goto(ORIGEM.as_uri(), wait_until="networkidle")
    pagina.evaluate("document.fonts.ready")
    pagina.screenshot(path=str(DESTINO))
    navegador.close()
print(f"{DESTINO.name}: {DESTINO.stat().st_size / 1024:.0f} KB")
