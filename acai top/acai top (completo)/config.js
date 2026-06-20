/* ════════════════════════════════════════════════════
   config.js — Personalize aqui sem mexer no app.js
════════════════════════════════════════════════════ */

const CONFIG = {
  // ── LOJA ──────────────────────────────────────────
  loja: {
    nome:    'Açaí Top',
    slogan:  'Sabor de verdade',
    emoji:   '🍇',
    cidade:  'Fortaleza, CE',
  },

  // ── WHATSAPP ───────────────────────────────────────
  // Coloque o número com DDI + DDD + número, SEM espaços ou símbolos
  // Exemplo: '5585999998888' = +55 (85) 9 9999-8888
  whatsapp: '5585999999999',

  // ── HORÁRIO DE FUNCIONAMENTO ──────────────────────
  horario: {
    abertura: 10,  // hora (24h)
    fechamento: 22,
    mensagemFechado: 'Estamos fechados agora. Abrimos às 10h! 🍇',
  },

  // ── TAXA DE ENTREGA ────────────────────────────────
  entrega: {
    taxaFixa: 5.00,         // R$ — use 0 para grátis
    gratisMinimoR$: 40.00,  // Entrega grátis acima desse valor
  },
};
