// Hero section functionality
export class HeroController {
    constructor() {
        this.searchInput = document.querySelector('.search-input');
        this.searchBtn = document.querySelector('.search-btn');
        this.heroImage = document.querySelector('.hero-image');
        this.searchResults = null;
        this.searchData = this.initializeSearchData();
    }

    init() {
        this.setupSearch();
        this.setupParallax();
        this.setupSearchInteractions();
        this.createSearchResults();
    }

    initializeSearchData() {
        return {
            breeds: [
                {
                    name: 'Texel',
                    keywords: ['texel', 'carne', 'precoce', 'holanda', 'qualidade', 'magra', 'rustica'],
                    description: 'Raça holandesa de aptidão para carne, conhecida pela precocidade e qualidade da carne magra.',
                    url: 'racas.html#texel'
                },
                {
                    name: 'Corriedale',
                    keywords: ['corriedale', 'dupla aptidão', 'lã', 'carne', 'tradicional', 'nova zelândia'],
                    description: 'Raça de dupla aptidão, tradicional no RS, boa para carne e lã de qualidade.',
                    url: 'racas.html#corriedale'
                },
                {
                    name: 'Dorper',
                    keywords: ['dorper', 'deslanado', 'africa do sul', 'rustica', 'sem tosquia', 'resistente'],
                    description: 'Raça deslanada africana, não necessita tosquia, muito rústica e resistente.',
                    url: 'racas.html#dorper'
                },
                {
                    name: 'Romney Marsh',
                    keywords: ['romney', 'marsh', 'rustica', 'lã forte', 'inglaterra', 'longevidade'],
                    description: 'Raça inglesa muito rústica, produz lã forte para uso industrial.',
                    url: 'racas.html#romney'
                }
            ],
            vaccines: [
                {
                    name: 'Brucelose',
                    keywords: ['brucelose', 'aborto', 'infertilidade', 'obrigatória', 'fêmeas', 'dose única'],
                    description: 'Vacina obrigatória contra brucelose, previne abortos e infertilidade no rebanho.',
                    url: 'vacinas.html#brucelose'
                },
                {
                    name: 'Clostridioses',
                    keywords: ['clostridiose', 'clostridium', 'carbúnculo', 'gangrena', 'enterotoxemia', 'rim polposo'],
                    description: 'Vacina contra clostridioses, previne doenças fatais como carbúnculo e gangrena gasosa.',
                    url: 'vacinas.html#clostridioses'
                },
                {
                    name: 'Raiva',
                    keywords: ['raiva', 'zoonose', 'sistema nervoso', 'morcego', 'obrigatória', 'fatal'],
                    description: 'Vacina obrigatória contra raiva, doença viral fatal transmissível ao homem.',
                    url: 'vacinas.html#raiva'
                },
                {
                    name: 'Leptospirose',
                    keywords: ['leptospirose', 'leptospira', 'aborto', 'natimorto', 'renal', 'bacteriana'],
                    description: 'Vacina contra leptospirose, previne abortos, natimortos e problemas renais.',
                    url: 'vacinas.html#leptospirose'
                },
                {
                    name: 'Diarreia Neonatal',
                    keywords: ['diarreia', 'neonatal', 'cordeiros', 'recém-nascidos', 'desidratação', 'maternal'],
                    description: 'Vacina para prevenir diarreia em cordeiros recém-nascidos e desidratação.',
                    url: 'vacinas.html#diarreia'
                },
                {
                    name: 'Calendário de Vacinação',
                    keywords: ['calendário', 'cronograma', 'vacinação', 'programa sanitário', 'datas'],
                    description: 'Calendário completo de vacinação para ovinos no Rio Grande do Sul.',
                    url: 'vacinas.html'
                }
            ],
            tips: [
                {
                    name: 'Manejo Nutricional',
                    keywords: ['nutrição', 'alimentação', 'pasto', 'suplementação', 'creep feeding'],
                    description: 'Dicas sobre nutrição adequada, pastejo rotacionado e suplementação.',
                    url: '#manejo'
                },
                {
                    name: 'Controle Parasitário',
                    keywords: ['vermes', 'parasitas', 'vermifugo', 'coprológico', 'resistência'],
                    description: 'Estratégias para controle de verminoses e ectoparasitas.',
                    url: '#sanitario'
                },
                {
                    name: 'Manejo Reprodutivo',
                    keywords: ['reprodução', 'estação monta', 'prenhez', 'cordeiro', 'desmame'],
                    description: 'Técnicas para otimizar a reprodução e manejo de cordeiros.',
                    url: '#reproducao'
                },
                {
                    name: 'Manejo Sanitário',
                    keywords: ['sanitário', 'saúde', 'prevenção', 'higiene', 'quarentena', 'desinfecção'],
                    description: 'Programa de manejo sanitário integrado para manter o rebanho saudável.',
                    url: 'vacinas.html#management'
                }
            ]
        };
    }

    createSearchResults() {
        const searchResultsHTML = `
            <div class="search-results" id="searchResults">
                <div class="search-results-header">
                    <h3>Resultados da Pesquisa</h3>
                    <button class="close-search" aria-label="Fechar resultados">×</button>
                </div>
                <div class="search-results-content">
                    <div class="search-loading">
                        <div class="loading-spinner"></div>
                        <p>Analisando sua pesquisa com IA...</p>
                    </div>
                    <div class="search-results-list"></div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', searchResultsHTML);
        this.searchResults = document.getElementById('searchResults');
        
        // Close search results
        document.querySelector('.close-search').addEventListener('click', () => {
            this.closeSearchResults();
        });
        
        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.searchResults.classList.contains('active')) {
                this.closeSearchResults();
            }
        });
        
        // Close on outside click
        this.searchResults.addEventListener('click', (e) => {
            if (e.target === this.searchResults) {
                this.closeSearchResults();
            }
        });
    }

    async setupSearch() {
        const handleSearch = async () => {
            const searchTerm = this.searchInput.value.trim();
            if (searchTerm.length < 2) {
                return;
            }
            
            // Show loading state
            this.showSearchResults();
            this.showLoadingState();
            
            try {
                // Simulate AI processing delay
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // Perform AI-enhanced search
                const results = await this.performAISearch(searchTerm);
                
                // Display results
                this.displaySearchResults(results, searchTerm);
                
            } catch (error) {
                console.error('Search error:', error);
                this.displaySearchError();
            }
        };

        this.searchBtn.addEventListener('click', handleSearch);
        
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
        
        // Real-time search suggestions
        this.searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim();
            if (searchTerm.length >= 2) {
                this.debounce(() => this.showSearchSuggestions(searchTerm), 300);
            }
        });
    }

    async performAISearch(searchTerm) {
        try {
            // Use AI to analyze search intent and find relevant results
            const aiAnalysis = await websim.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: `Você é um assistente especializado em ovinocultura no Rio Grande do Sul. 
                        Analise a consulta do usuário e determine o que ele está procurando.
                        Responda em JSON com esta estrutura:
                        {
                            "intent": "breed|vaccine|tip|general",
                            "confidence": 0.0-1.0,
                            "keywords": ["palavra1", "palavra2"],
                            "suggestions": ["sugestão1", "sugestão2"]
                        }`
                    },
                    {
                        role: "user",
                        content: `Usuário pesquisou: "${searchTerm}"`
                    }
                ],
                json: true
            });
            
            const analysis = JSON.parse(aiAnalysis.content);
            
            // Perform search based on AI analysis
            const results = this.searchInData(searchTerm, analysis);
            
            return {
                query: searchTerm,
                analysis: analysis,
                results: results,
                total: results.length
            };
            
        } catch (error) {
            console.error('AI search error:', error);
            // Fallback to traditional search
            return this.performTraditionalSearch(searchTerm);
        }
    }

    performTraditionalSearch(searchTerm) {
        const results = this.searchInData(searchTerm, { keywords: [searchTerm.toLowerCase()] });
        return {
            query: searchTerm,
            results: results,
            total: results.length
        };
    }

    searchInData(searchTerm, analysis) {
        const searchWords = searchTerm.toLowerCase().split(' ');
        const allResults = [];
        
        // Search in breeds
        this.searchData.breeds.forEach(item => {
            const score = this.calculateRelevanceScore(item, searchWords, analysis.keywords || []);
            if (score > 0) {
                allResults.push({
                    ...item,
                    type: 'breed',
                    score: score,
                    category: 'Raça'
                });
            }
        });
        
        // Search in vaccines
        this.searchData.vaccines.forEach(item => {
            const score = this.calculateRelevanceScore(item, searchWords, analysis.keywords || []);
            if (score > 0) {
                allResults.push({
                    ...item,
                    type: 'vaccine',
                    score: score,
                    category: 'Vacina'
                });
            }
        });
        
        // Search in tips
        this.searchData.tips.forEach(item => {
            const score = this.calculateRelevanceScore(item, searchWords, analysis.keywords || []);
            if (score > 0) {
                allResults.push({
                    ...item,
                    type: 'tip',
                    score: score,
                    category: 'Dica'
                });
            }
        });
        
        // Sort by relevance score
        return allResults.sort((a, b) => b.score - a.score);
    }

    calculateRelevanceScore(item, searchWords, aiKeywords) {
        let score = 0;
        
        // Check name match
        const nameWords = item.name.toLowerCase().split(' ');
        searchWords.forEach(word => {
            if (nameWords.some(nameWord => nameWord.includes(word))) {
                score += 10;
            }
        });
        
        // Check keywords match
        searchWords.forEach(word => {
            if (item.keywords.some(keyword => keyword.includes(word))) {
                score += 8;
            }
        });
        
        // Check description match
        const descriptionWords = item.description.toLowerCase().split(' ');
        searchWords.forEach(word => {
            if (descriptionWords.some(descWord => descWord.includes(word))) {
                score += 5;
            }
        });
        
        // Boost score for AI-identified keywords
        aiKeywords.forEach(keyword => {
            if (item.keywords.includes(keyword)) {
                score += 15;
            }
        });
        
        return score;
    }

    showSearchResults() {
        this.searchResults.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeSearchResults() {
        this.searchResults.classList.remove('active');
        document.body.style.overflow = '';
    }

    showLoadingState() {
        const loading = this.searchResults.querySelector('.search-loading');
        const resultsList = this.searchResults.querySelector('.search-results-list');
        
        loading.style.display = 'block';
        resultsList.style.display = 'none';
    }

    displaySearchResults(searchData, searchTerm) {
        const loading = this.searchResults.querySelector('.search-loading');
        const resultsList = this.searchResults.querySelector('.search-results-list');
        
        loading.style.display = 'none';
        resultsList.style.display = 'block';
        
        if (searchData.results.length === 0) {
            resultsList.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h4>Nenhum resultado encontrado</h4>
                    <p>Não conseguimos encontrar resultados para sua pesquisa. Experimente termos diferentes ou mais gerais.</p>
                    <div class="search-suggestions">
                        <div class="suggestion-tag">texel</div>
                        <div class="suggestion-tag">vacina</div>
                        <div class="suggestion-tag">manejo</div>
                        <div class="suggestion-tag">corriedale</div>
                        <div class="suggestion-tag">nutrição</div>
                    </div>
                </div>
            `;
            
            // Add click handlers for suggestions
            document.querySelectorAll('.suggestion-tag').forEach(tag => {
                tag.addEventListener('click', () => {
                    this.searchInput.value = tag.textContent;
                    this.performSearch();
                });
            });
            
            return;
        }
        
        const resultsHTML = searchData.results.map((result, index) => `
            <div class="search-result-item" data-type="${result.type}" style="animation-delay: ${index * 0.1}s">
                <div class="result-header">
                    <div class="result-icon ${result.type}">
                        ${this.getResultIcon(result.type)}
                    </div>
                    <div class="result-category">${result.category}</div>
                </div>
                <h4 class="result-title">${this.highlightSearchTerm(result.name, searchTerm)}</h4>
                <p class="result-description">${this.highlightSearchTerm(result.description, searchTerm)}</p>
                <div class="result-footer">
                    <a href="${result.url}" class="result-link">Ver mais</a>
                </div>
            </div>
        `).join('');
        
        resultsList.innerHTML = `
            <div class="search-summary">
                <div class="search-summary-header">
                    <div class="search-icon">🔍</div>
                    <div>
                        <p>Encontrados <strong>${searchData.total}</strong> resultados para "<span class="search-query">${searchTerm}</span>"</p>
                    </div>
                </div>
                ${searchData.analysis && searchData.analysis.confidence > 0.7 ? 
                    `<div class="ai-insight">
                        <span class="ai-badge">IA</span>
                        <span>Detectamos que você está procurando por ${this.getIntentDescription(searchData.analysis.intent)}. Os resultados foram organizados por relevância.</span>
                    </div>` : ''
                }
            </div>
            <div class="search-results-grid">
                ${resultsHTML}
            </div>
        `;
        
        // Add click handlers for result items
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.tagName !== 'A') {
                    const link = item.querySelector('.result-link');
                    if (link) {
                        window.location.href = link.href;
                    }
                }
            });
        });
    }

    getIntentDescription(intent) {
        const descriptions = {
            breed: 'informações sobre raças',
            vaccine: 'calendário de vacinação',
            tip: 'dicas de manejo',
            general: 'informações gerais'
        };
        return descriptions[intent] || 'informações relevantes';
    }

    highlightSearchTerm(text, searchTerm) {
        const searchWords = searchTerm.toLowerCase().split(' ');
        let highlightedText = text;
        
        searchWords.forEach(word => {
            if (word.length > 2) {
                const regex = new RegExp(`(${word})`, 'gi');
                highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
            }
        });
        
        return highlightedText;
    }

    displaySearchError() {
        const loading = this.searchResults.querySelector('.search-loading');
        const resultsList = this.searchResults.querySelector('.search-results-list');
        
        loading.style.display = 'none';
        resultsList.style.display = 'block';
        
        resultsList.innerHTML = `
            <div class="search-error">
                <div class="error-icon">⚠️</div>
                <h4>Ops! Algo deu errado</h4>
                <p>Não foi possível processar sua pesquisa no momento. Verifique sua conexão e tente novamente.</p>
                <button class="retry-search">Tentar novamente</button>
            </div>
        `;
        
        document.querySelector('.retry-search').addEventListener('click', () => {
            this.closeSearchResults();
        });
    }

    showSearchSuggestions(searchTerm) {
        // Quick suggestions based on search term
        const suggestions = this.generateSuggestions(searchTerm);
        
        if (suggestions.length > 0) {
            // Could implement a dropdown with suggestions here
            console.log('Suggestions:', suggestions);
        }
    }

    generateSuggestions(searchTerm) {
        const allKeywords = [
            ...this.searchData.breeds.flatMap(b => b.keywords),
            ...this.searchData.vaccines.flatMap(v => v.keywords),
            ...this.searchData.tips.flatMap(t => t.keywords)
        ];
        
        return allKeywords
            .filter(keyword => keyword.includes(searchTerm.toLowerCase()))
            .slice(0, 5);
    }

    debounce(func, wait) {
        if (this.debounceTimer) clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(func, wait);
    }

    setupParallax() {
        // Parallax effect for hero image
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (this.heroImage) {
                const speed = 0.5;
                this.heroImage.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    }

    setupSearchInteractions() {
        // Enhanced search input interactions
        this.searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        this.searchInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    }

    getResultIcon(type) {
        const icons = {
            breed: '🐑',
            vaccine: '💉',
            tip: '💡'
        };
        return icons[type] || '📄';
    }

    async performSearch() {
        const searchTerm = this.searchInput.value.trim();
        if (searchTerm.length < 2) {
            return;
        }
        
        // Show loading state
        this.showSearchResults();
        this.showLoadingState();
        
        try {
            // Simulate AI processing delay
            await new Promise(resolve => setTimeout(resolve, 1200));
            
            // Perform AI-enhanced search
            const results = await this.performAISearch(searchTerm);
            
            // Display results
            this.displaySearchResults(results, searchTerm);
            
        } catch (error) {
            console.error('Search error:', error);
            this.displaySearchError();
        }
    }
}