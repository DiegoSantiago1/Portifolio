"""Gera a capa do LinkedIn (capa-linkedin.png) a partir de capa.html.

1584×396 é o tamanho recomendado pelo LinkedIn; a imagem sai em 2x (3168×792) para não
ficar embaçada em telas de alta densidade.

Uso (com Playwright instalado):
    python assets/linkedin/gerar_capa.py
"""

from pathlib import Path

from playwright.sync_api import sync_playwright

PASTA = Path(__file__).resolve().parent
ORIGEM = PASTA / "capa.html"
DESTINO = PASTA / "capa-linkedin.png"

with sync_playwright() as p:
    navegador = p.chromium.launch()
    pagina = navegador.new_page(viewport={"width": 1584, "height": 396}, device_scale_factor=2)
    pagina.goto(ORIGEM.as_uri(), wait_until="networkidle")
    pagina.evaluate("document.fonts.ready")
    pagina.screenshot(path=str(DESTINO))
    navegador.close()
print(f"{DESTINO.name}: {DESTINO.stat().st_size / 1024:.0f} KB")
