// Galeria dos relatórios Power BI. As imagens são as páginas exportadas do Power BI
// Desktop (Arquivo > Exportar > PDF); o .pbip de verdade está na pasta powerbi/ do projeto.
// Sem innerHTML: todo texto entra por textContent (a CSP e a regra da tela são as mesmas).

const RELATORIOS = {
  operacional: {
    pdf: "relatorio_operacional.pdf",
    paginas: [
      [
        "Estoque agora",
        "O que temos e o que está em alerta. Fotografia do momento da atualização.",
      ],
      ["Movimentações", "O que entrou e saiu, e quando. Use o período para comparar."],
      ["Posse e prazos", "Com quem está o material agora e quem está atrasado."],
      [
        "Equipamentistas",
        "Quem atende no balcão (equipamentistas e estoquistas) e em que horário.",
      ],
      ["Militares", "Quem mais retira e quem está com material vencido."],
      ["Manutenção", "O que está parado, há quanto tempo, e onde a avaria se concentra."],
    ],
  },
  analitico: {
    pdf: "relatorio_analitico.pdf",
    paginas: [
      ["Visão geral", "Os 12 meses de 01/09/2025 a 31/08/2026, as quatro perguntas num lugar só."],
      [
        "A1 Conferência da planilha",
        "Onde a planilha de carga não bate com o cadastro e o histórico.",
      ],
      ["A2 Cautela e atrasos", "Quem atrasa, em que material e em que setor."],
      ["A3 Uso e ociosidade", "O que fica parado na prateleira e o que falta na hora do pedido."],
      [
        "A4 Consumo e ruptura",
        "Escolha um material de consumo: o saldo dia a dia e quando faltou.",
      ],
    ],
  },
};

const estado = { relatorio: "operacional", pagina: 0 };
const $ = (id) => document.getElementById(id);
const imagem = (rel, i) => `img/${rel}-${i + 1}.webp`;

function lerEndereco() {
  const [rel, num] = location.hash.slice(1).split("-");
  if (RELATORIOS[rel]) {
    estado.relatorio = rel;
    const n = Number(num) - 1;
    estado.pagina = Number.isInteger(n) && n >= 0 && n < RELATORIOS[rel].paginas.length ? n : 0;
  }
}

function montarLista() {
  const { paginas } = RELATORIOS[estado.relatorio];
  $("paginas").replaceChildren(
    ...paginas.map(([titulo], i) => {
      const li = document.createElement("li");
      const botao = document.createElement("button");
      botao.type = "button";
      botao.className = "pagina-item";
      botao.dataset.indice = String(i);
      const mini = document.createElement("img");
      mini.src = imagem(estado.relatorio, i);
      mini.alt = "";
      mini.loading = "lazy";
      mini.width = 160;
      mini.height = 93;
      const nome = document.createElement("span");
      nome.textContent = titulo;
      botao.append(mini, nome);
      botao.addEventListener("click", () => irPara(i));
      li.append(botao);
      return li;
    }),
  );
}

function mostrar() {
  const rel = RELATORIOS[estado.relatorio];
  const [titulo, texto] = rel.paginas[estado.pagina];
  const src = imagem(estado.relatorio, estado.pagina);
  $("tela-imagem").src = src;
  $("tela-imagem").alt = `Página "${titulo}" do relatório ${estado.relatorio} no Power BI`;
  $("tela-link").href = src;
  $("tela-titulo").textContent = titulo;
  $("tela-texto").textContent = texto;
  $("tela-posicao").textContent = `Página ${estado.pagina + 1} de ${rel.paginas.length}`;
  $("baixar-pdf").href = rel.pdf;
  $("anterior").disabled = estado.pagina === 0;
  $("proxima").disabled = estado.pagina === rel.paginas.length - 1;
  for (const b of document.querySelectorAll(".relatorio")) {
    b.setAttribute("aria-selected", String(b.dataset.relatorio === estado.relatorio));
  }
  for (const b of document.querySelectorAll(".pagina-item")) {
    if (Number(b.dataset.indice) === estado.pagina) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  }
  history.replaceState(null, "", `#${estado.relatorio}-${estado.pagina + 1}`);
}

function irPara(i) {
  const total = RELATORIOS[estado.relatorio].paginas.length;
  estado.pagina = Math.max(0, Math.min(total - 1, i));
  mostrar();
}

function trocarRelatorio(rel) {
  if (rel === estado.relatorio) return;
  estado.relatorio = rel;
  estado.pagina = 0;
  montarLista();
  mostrar();
}

for (const b of document.querySelectorAll(".relatorio")) {
  b.addEventListener("click", () => trocarRelatorio(b.dataset.relatorio));
}
$("anterior").addEventListener("click", () => irPara(estado.pagina - 1));
$("proxima").addEventListener("click", () => irPara(estado.pagina + 1));
document.addEventListener("keydown", (e) => {
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === "ArrowLeft") irPara(estado.pagina - 1);
  if (e.key === "ArrowRight") irPara(estado.pagina + 1);
});

lerEndereco();
montarLista();
mostrar();
