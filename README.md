
# 🍇 Açaí Top — Sistema de Pedidos Online

**Cardápio digital completo com carrinho de compras, montagem personalizada e envio de pedidos via WhatsApp.**

---

## 📋 Sobre o projeto

Sistema de pedidos online desenvolvido para açaiterias, com foco em experiência mobile. O cliente navega pelo cardápio, personaliza o próprio açaí, monta o pedido no carrinho e envia diretamente para o WhatsApp do estabelecimento — sem aplicativo, sem cadastro, sem complicação.

> Projeto desenvolvido como portfólio durante a graduação em Engenharia de Software (UniAteneu, 2026.1), aplicando conceitos de DOM, eventos, persistência de dados e integração com serviços externos.

---

## ✨ Funcionalidades

| Recurso | Descrição |
|---|---|
| 🍨 Cardápio online | 6 açaís prontos com seleção de tamanho e preço dinâmico |
| 🎨 Monte seu açaí | Escolha tamanho, base, até 5 complementos e 2 caldas |
| 🛒 Carrinho inteligente | Ajuste de quantidade, remoção e persistência via LocalStorage |
| 💰 Cálculo automático | Preços somados em tempo real conforme seleção |
| 🛵 Taxa de entrega | Entrega grátis acima de R$40, com barra de progresso |
| 💳 Formas de pagamento | Dinheiro (com campo de troco), cartão e Pix |
| 📍 Endereço de entrega | Campos de rua, bairro e ponto de referência |
| 📱 Envio via WhatsApp | Mensagem formatada com todos os detalhes do pedido |
| 📲 Design responsivo | Mobile-first, funciona em qualquer tela |

---

## 🎬 Fluxo do pedido

```
Cliente acessa o site
       ↓
Escolhe açaí pronto  ─── ou ───  Monta o próprio
       ↓                               ↓
   Adiciona ao carrinho ←─────────────┘
       ↓
Preenche endereço + pagamento
       ↓
Clica em "Enviar pelo WhatsApp"
       ↓
WhatsApp abre com mensagem pronta → Loja recebe o pedido
```

---

## 💬 Exemplo de mensagem gerada

```
🍇 PEDIDO — AÇAÍ TOP 🍇

📋 Itens:
• 🍓 Tradicional (500ml) x2 — R$ 34,00
  Açaí puro, banana e granola
• 🎨 Açaí Personalizado (300ml) x1 — R$ 17,50
  Açaí c/ Morango • Morango, Granola • Calda de Chocolate

📦 Subtotal: R$ 51,50
🛵 Entrega: R$ 5,00
💰 Total: R$ 56,50

📍 Endereço:
Rua das Flores, 123, Centro
Referência: Próximo ao mercado

💳 Pagamento: Dinheiro (troco para R$ 60,00)

Pedido enviado pelo site Açaí Top 🍇
```

---

## 🗂️ Estrutura do projeto

```
acai-top/
├── index.html   → estrutura e layout da página
├── style.css    → design visual, cores e responsividade
├── app.js       → lógica completa (cardápio, carrinho, WhatsApp)
└── config.js    → configurações da loja (número, preços, horário)
```

---

## 🚀 Como rodar localmente

Nenhuma instalação necessária. Basta:

```bash
# Clone o repositório
git clone https://github.com/SEU-USUARIO/acai-top.git

# Entre na pasta
cd acai-top

# Abra o index.html no navegador
# Ou use a extensão Live Server do VS Code
```

---

## ⚙️ Configuração

Abra o `config.js` e ajuste:

```js
const CONFIG = {
  loja: {
    nome:   'Açaí Top',         // nome exibido no site e no WhatsApp
    slogan: 'Sabor de verdade', // subtítulo no header
  },
  whatsapp: '5585999999999',    // ← DDI + DDD + número (sem símbolos)
  entrega: {
    taxaFixa:       5.00,       // taxa cobrada por entrega
    gratisMinimoR$: 40.00,      // valor mínimo para entrega grátis
  },
};
```

---

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura semântica com seções, nav e inputs acessíveis
- **CSS3** — variáveis customizadas, CSS Grid, Flexbox e animações
- **JavaScript ES6+** — manipulação de DOM, arrow functions, template literals, destructuring
- **LocalStorage API** — persistência do carrinho entre sessões
- **WhatsApp API (`wa.me`)** — geração de link com mensagem pré-formatada via `encodeURIComponent`

---

## 📚 Conceitos aplicados

- Separação de responsabilidades (HTML/CSS/JS em arquivos distintos)
- Estado da aplicação gerenciado em memória com JavaScript puro
- Renderização dinâmica de UI a partir de arrays de dados
- Validação de formulário antes de ações críticas
- Arquitetura de configuração externalizada (`config.js`)

---

## 👤 Autor

**Gabriel Carvalho** — Estudante de Engenharia de Software
