# Portfólio — Diego Santiago

Site estático pessoal construído com HTML, CSS, JavaScript e Tailwind CSS carregado por CDN.

## Executar localmente

Abra `index.html` no navegador ou sirva esta pasta com qualquer servidor estático. É necessário acesso à internet para carregar Tailwind, Google Fonts e Devicon.

## Preparar para publicação

Execute `powershell -ExecutionPolicy Bypass -File tools/build-site.ps1`. O comando cria uma pasta `dist/` somente com os arquivos necessários para o site e deixa `archive/` de fora. Configure seu provedor de hospedagem para publicar `dist/`.

## Estrutura

- `assets/images/`: imagens do site.
- `assets/documents/`: currículo e outros documentos para download.
- `assets/icons/`: ícones locais, incluindo o favicon.
- `css/`: estilos próprios que complementam o Tailwind.
- `js/portfolio-data.js`: dados dos projetos e das conquistas exibidos no site.
- `js/main.js`: renderização e comportamentos da interface.
- `archive/`: referência técnica da extração original; não é necessária para o funcionamento do portfólio.
- `tools/`: automações auxiliares.

## Atualizar conteúdo

1. Edite `js/portfolio-data.js` para incluir projetos publicados, links e tecnologias.
2. Coloque o currículo em `assets/documents/curriculo-diego-santiago.pdf`.
3. Atualize o link do currículo em `index.html` conforme indicado em `assets/documents/README.md`.
4. Antes de publicar, troque `https://SEU-DOMINIO-AQUI/` em `sitemap.xml` pelo domínio real.

## Formulário

O formulário usa `mailto:`: ele abre o cliente de e-mail configurado no dispositivo com a mensagem preenchida. Para envio sem cliente local, integre um serviço de formulários ou uma API própria.
