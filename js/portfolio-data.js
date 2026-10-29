window.PORTFOLIO_DATA = {
    projects: [
        {
            title: 'Clínicas-escola em dados',
            category: 'dados',
            tags: ['Power BI', 'Power Query', 'DAX', 'Looker Studio', 'Excel', 'Python'],
            description: 'Um ano de atendimentos de uma rede de clínicas-escola (Odontologia, Fisioterapia, Psicologia e Nutrição) em Recife, Olinda e Jaboatão, com dados fictícios. Duas clínicas exportam do sistema e duas anotam em planilha: a mesma falta aparece escrita de cinco jeitos, há datas como texto, linhas duplicadas e prontuário em branco. Padronizei tudo com 16 regras em Python, cada correção registrada com arquivo, aba e linha, e provei linha a linha que a limpeza está certa. Os indicadores (faltas, ocupação da agenda, fila de espera e horas de prática dos alunos) estão no Power BI, com Power Query, modelo estrela e 24 medidas DAX conferidas contra o Python, e a mesma base está pronta para o Looker Studio. Achado principal: uma em cada cinco consultas termina em falta, e a falta se concentra na segunda de manhã e em quem esperou muito na fila. Na página, você digita como a recepção anotaria e vê a regra padronizar ao vivo.',
            image: 'assets/images/clinicas-escola-indicadores.jpg',
            link: 'https://diegosantiago1.github.io/clinicas-escola-indicadores/',
            repo: 'https://github.com/DiegoSantiago1/clinicas-escola-indicadores'
        },
        {
            title: 'AI Business Analyst — Vendas',
            category: 'dados backend frontend fullstack',
            tags: ['IA (LLM)', 'TypeScript', 'Node.js', 'PostgreSQL', 'Python', 'React', 'Docker'],
            description: 'Um analista de dados com IA para uma rede de concessionárias: o gerente pergunta em português e a IA consulta o banco PostgreSQL só para leitura, respondendo com números conferíveis, cada um com o SQL que o gerou. Métricas oficiais com SQL parametrizado, defesa em quatro camadas (o usuário da IA só pode ler) e avaliação automática com 36 perguntas de resposta conhecida, incluindo tentativas de ataque. Dados 100% fictícios, no mesmo modelo do Painel de Vendas. A página mostra conversas reais passo a passo e tem um botão para você mesmo perguntar à IA, ao vivo.',
            image: 'assets/images/ai-business-analyst.png',
            link: 'projetos/ai-business-analyst/',
            repo: 'https://github.com/DiegoSantiago1/ai-business-analyst'
        },
        {
            title: 'Lakehouse do Financiamento — EUA',
            category: 'dados',
            tags: ['PySpark', 'Delta Lake', 'Databricks', 'Python', 'Docker', 'GitHub Actions'],
            description: 'Dados reais e públicos do governo dos EUA (HMDA): 222,7 milhões de pedidos de financiamento imobiliário de 2018 a 2025, num lakehouse em PySpark e Delta Lake (bronze, silver e gold). Mostra onde a casa ficou mais cara em relação à renda, o que a alta dos juros de 2022 fez, quem tem o crédito negado e por quê, e quanto o próprio dado do governo muda entre as três versões que ele publica de cada ano. Cada número é conferido contra os totais oficiais, por estado e por banco, antes de ser publicado. As tabelas também têm catálogo (Hive local e Unity Catalog no Databricks), com o EXPLAIN mostrando que o filtro por ano lê só a pasta daquele ano. A página interativa abre no navegador; o código completo está no GitHub.',
            image: 'assets/images/us-mortgage-lakehouse.png',
            link: 'https://diegosantiago1.github.io/us-mortgage-lakehouse/',
            repo: 'https://github.com/DiegoSantiago1/us-mortgage-lakehouse'
        },
        {
            title: 'Pipeline das Bicicletas de Londres',
            category: 'dados',
            tags: ['Python', 'PostgreSQL', 'dbt', 'AWS', 'Terraform', 'GitHub Actions'],
            description: 'Dados reais e públicos das bicicletas de Londres (TfL Santander Cycles): onde as estações ficam vazias ou cheias, quando, e onde a operação deve agir primeiro. A coleta das cerca de 800 estações roda na AWS a cada 15 minutos (Lambda disparada pelo EventBridge, gravando o bruto intocado no S3), com toda a infraestrutura em Terraform e o GitHub entrando na AWS sem chave guardada (OIDC); 41 milhões de viagens entram por carga incremental, que não duplica nada se rodar duas vezes. As transformações são em dbt com testes, e a página se refaz sozinha todo dia, com mapa por hora, ranking e a saúde do próprio pipeline. O código completo está no GitHub.',
            image: 'assets/images/london-cycle-hire-pipeline.jpg',
            link: 'https://diegosantiago1.github.io/london-cycle-hire-pipeline/',
            repo: 'https://github.com/DiegoSantiago1/london-cycle-hire-pipeline'
        },
        {
            title: 'Customer Analytics — Varejo Online',
            category: 'dados',
            tags: ['PostgreSQL', 'SQL', 'Python', 'Power BI', 'Docker'],
            description: 'Dados reais e públicos de uma loja online do Reino Unido de presentes e utilidades, com muitos clientes lojistas: 1 milhão de linhas de vendas em dois anos. Respondi quem são os melhores clientes (segmentação RFM), quem está indo embora (churn), se a retenção melhora (coortes) e quanto cada cliente vale (CLV), e conferi cada resposta contra o que de fato aconteceu depois. SQL versionado no PostgreSQL, 280 testes e relatório no Power BI. A página interativa abre no navegador; o código completo está no GitHub.',
            image: 'assets/images/customer-analytics-online-retail.png',
            link: 'https://diegosantiago1.github.io/customer-analytics-online-retail/',
            repo: 'https://github.com/DiegoSantiago1/customer-analytics-online-retail'
        },
        {
            title: 'Painel de Vendas — Honda',
            category: 'dados backend frontend fullstack',
            tags: ['PostgreSQL', 'SQL', 'Node.js', 'TypeScript', 'Docker'],
            description: 'Projeto real, pedido no meu trabalho e em uso em algumas concessionárias Honda de Recife: acompanha vendas do dia, metas por loja, ranking de vendedores e mix de modelos. Esta é a versão reconstruída para o portfólio, com dados 100% fictícios. A demo roda no navegador; o banco PostgreSQL e a API REST completos estão no GitHub.',
            image: 'assets/images/painel-vendas-honda.png',
            link: 'projetos/painel-vendas/',
            repo: 'https://github.com/DiegoSantiago1/analise-vendas-concessionaria'
        },
        {
            title: 'Controle de Materiais e Cautela',
            category: 'dados backend fullstack',
            tags: ['PostgreSQL', 'SQL', 'Python', 'Power BI', 'TypeScript', 'Docker'],
            description: 'Projeto real: desenvolvi o sistema de controle de cautelas da seção de material em que trabalhei na Força Aérea, que segue em uso, e os relatórios de estoque apresentados nas reuniões com os superiores. Esta é a versão reconstruída para o portfólio, com dados 100% fictícios: banco PostgreSQL com histórico imutável, análises em SQL e Python, dois relatórios no Power BI e o sistema web de retirada e devolução com perfis de acesso. A demo roda no navegador; o código completo está no GitHub.',
            image: 'assets/images/controle-materiais-cautela.png',
            link: 'projetos/controle-materiais/',
            repo: 'https://github.com/DiegoSantiago1/controle-materiais-cautela',
            extra: { label: 'Ver os relatórios no Power BI', href: 'projetos/controle-materiais/powerbi/' }
        }
    ],
    achievements: [
        {
            provider: 'Porto Digital',
            accent: 'orange',
            items: [
                'Residência Tecnológica 2023.2',
                'Demoday Kick Off — 2º lugar em Inovação',
                'Projeto de sustentabilidade urbana em equipe multidisciplinar'
            ]
        }
    ],
    certificates: {
        devclub: [],
        cursoemvideo: [],
        outros: []
    }
};
