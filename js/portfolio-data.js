window.PORTFOLIO_DATA = {
    projects: [
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
            title: 'Pipeline das Bicicletas de Londres',
            category: 'dados',
            tags: ['Python', 'PostgreSQL', 'SQL', 'dbt', 'Docker', 'GitHub Actions'],
            description: 'Dados reais e públicos das bicicletas de Londres (TfL Santander Cycles): onde as estações ficam vazias ou cheias, quando, e onde a operação deve agir primeiro. Um pipeline coleta as cerca de 800 estações a cada 15 minutos e guarda o dado bruto intocado; 41 milhões de viagens entram por carga incremental, que não duplica nada se rodar duas vezes. As transformações são em dbt com testes, e a página se refaz sozinha todo dia, com mapa por hora, ranking e a saúde do próprio pipeline. O código completo está no GitHub.',
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
            repo: 'https://github.com/DiegoSantiago1/controle-materiais-cautela'
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
