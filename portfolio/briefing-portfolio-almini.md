# BRIEFING — Portfólio Pessoal (Alexandre Polettini / @almini)

## 1. OBJETIVO
Portfólio pessoal one-page para apresentar a transição de carreira de Graphic 
Designer (25+ anos) para Front-End Developer. Público-alvo: recrutadores, 
empresas de tech e clientes freelance. Deve comunicar imediatamente a 
combinação rara: background sólido em design visual + código.

## 2. STACK LOCK (obrigatório, não sugestão)
- HTML5, CSS3, JavaScript puro (vanilla)
- Sem frameworks, sem build tools
- Google Fonts permitido (fonte condensada bold, tipo Anton ou Archivo Black)
- Scroll suave nativo (CSS scroll-behavior ou JS leve)

## 3. VISUAL BLUEPRINT (obrigatório, não sugestão)
- Fundo: #000000 (preto puro)
- Texto principal: #f0ece0 (off-white/cream)
- Tipografia: condensada bold, display/editorial, maiúsculas nos títulos, 
  tracking apertado, line-height ~0.85 nos títulos grandes
- Estética: minimalista, alto contraste, referência editorial (capa de 
  revista de moda/tech), sem gradientes, sem sombras suaves, sem elementos 
  decorativos extras
- Hero: foto do usuário (fundo transparente, fornecida em assets) posicionada 
  sobre texto empilhado em 4 linhas ("GRAPHIC / DESIGNER / AND / DEVELOPER"), 
  usando z-index para o corpo cortar as letras (foto na frente do texto)
  - Texto: position absolute, centralizado, font-size com clamp() para 
    responsividade fluida
  - Texto marcado aria-hidden="true" (decorativo); alt real vai na tag <img>
  - Foto: position absolute, ancorada embaixo, height baseado em vh

## 4. ASSETS (em 00-brief/assets/)
- foto-hero-transparente.png (foto do usuário, fundo transparente)
- layout-referencia.pdf (mockup de referência já aprovado)

## 5. ESTRUTURA / SEÇÕES (nesta ordem)

### Header (fixo)
- Esquerda: "alexandre polettini {@almini}"
- Direita: nav {work} {about} {contact}

### Hero (id="home")
- Texto grande: GRAPHIC / DESIGNER / AND / DEVELOPER (técnica descrita acima)
- Subtítulo: "I BUILD DIGITAL EXPERIENCES WITH DESIGN & CODE."
- Parágrafo: "Graphic designer with experience in visual identity and design 
  production. Currently directing this expertise towards Front-End 
  Development."
- Indicador de scroll: "{scroll to explore} ↓"

### {work}
Grid de 3 colunas (1 coluna em mobile), com estes 3 projetos reais 
(conteúdo final, não placeholder):

**01 — MANOS CAR**
Tags: BRAND IDENTITY / ART DIRECTION / DIGITAL DESIGN
Descrição: "Complete brand identity for a high-end automotive rental 
service. Visual direction encompasses digital and print materials."

**02 — LUCY**
Tags: BRANDING / DIGITAL
Descrição: "Brand design and digital experience for an innovative tech 
startup. Focus on simplicity and modern aesthetics."

**03 — LO IKEWAI**
Tags: BRAND DESIGN
Descrição: "Brand identity development for a sustainable lifestyle brand. 
Emphasis on minimalist and editorial approach."

(Imagens dos projetos: usar as disponíveis nos assets; se faltar imagem de 
algum projeto, marcar claramente como pendente — nunca gerar placeholder 
genérico)

### {about}
Texto centralizado, largura máx ~600px:
"Graphic designer with experience in visual identity, art direction, graphic 
production, and prepress. Today I'm expanding this experience towards 
Front-End Development, bringing together design and technology to create 
simple, functional, and visually strong digital experiences."

Bloco tech stack: html css javascript react git figma

### {contact}
- Título grande: "LET'S MAKE SOMETHING GOOD."
- CTA: "{contact me} →" (link mailto)
- Rodapé: GITHUB / LINKEDIN / EMAIL

## 6. COMPORTAMENTO TÉCNICO
- Totalmente responsivo, atenção especial ao hero (clamp() no font-size, 
  testar em telas < 480px)
- Performance: lazy loading nas imagens do work
- HTML semântico real (headings reais, nunca genéricos tipo "Section 1")
- Código limpo e comentado

## 7. REFERÊNCIA DE ESTILO (não gerar cor/conteúdo a partir daqui)
Portfólio anterior: https://alminidev.github.io/ 
(usar apenas como referência de estrutura/tom, conteúdo já está definido 
acima)
