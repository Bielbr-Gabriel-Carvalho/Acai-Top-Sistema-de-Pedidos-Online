/* ═══════════════════════════════════════════════════
   AÇAÍ TOP — app.js
   Cardápio • Builder • Carrinho • LocalStorage • WhatsApp
═══════════════════════════════════════════════════ */

// ── FALLBACK (caso config.js não carregue) ───────────
if (typeof CONFIG === 'undefined') {
  window.CONFIG = {
    loja: { nome: 'Açaí Top', slogan: 'Sabor de verdade', emoji: '🍇' },
    whatsapp: '5585999999999',
    horario: { abertura: 10, fechamento: 22, mensagemFechado: 'Estamos fechados agora!' },
    entrega: { taxaFixa: 5.00, gratisMinimoR$: 40.00 },
  };
}

// ── DADOS ───────────────────────────────────────────
const SIZES = [
  { id: 's300', emoji: '🥣', label: '300ml', price: 12.00 },
  { id: 's500', emoji: '🍜', label: '500ml', price: 17.00 },
  { id: 's700', emoji: '🫕', label: '700ml', price: 22.00 },
];

const BASES = [
  { id: 'b1', emoji: '🍇', label: 'Açaí Puro', price: 0 },
  { id: 'b2', emoji: '🍓', label: 'Açaí com Morango', price: 1.00 },
  { id: 'b3', emoji: '🍌', label: 'Açaí com Banana', price: 1.00 },
  { id: 'b4', emoji: '🥥', label: 'Açaí com Coco', price: 1.50 },
];

const COMPLEMENTOS = [
  { id: 'c1',  emoji: '🍌', label: 'Banana',       price: 1.00 },
  { id: 'c2',  emoji: '🍓', label: 'Morango',      price: 1.50 },
  { id: 'c3',  emoji: '🥝', label: 'Kiwi',         price: 1.50 },
  { id: 'c4',  emoji: '🫐', label: 'Mirtilo',      price: 2.00 },
  { id: 'c5',  emoji: '🥜', label: 'Granola',      price: 1.00 },
  { id: 'c6',  emoji: '🫘', label: 'Amendoim',     price: 1.00 },
  { id: 'c7',  emoji: '🍫', label: 'Chocolate',    price: 1.50 },
  { id: 'c8',  emoji: '🥥', label: 'Coco Ralado',  price: 1.00 },
  { id: 'c9',  emoji: '🍯', label: 'Mel',          price: 0.50 },
  { id: 'c10', emoji: '🍦', label: 'Leite Cond.',  price: 0.50 },
];

const CALDAS = [
  { id: 'ca1', emoji: '🫐', label: 'Calda de Frutas Vermelhas', price: 1.00 },
  { id: 'ca2', emoji: '🍫', label: 'Calda de Chocolate',        price: 1.00 },
  { id: 'ca3', emoji: '🥛', label: 'Leite Condensado',          price: 0.50 },
  { id: 'ca4', emoji: '🍯', label: 'Mel',                       price: 0.50 },
];

const PAYMENT_OPTIONS = [
  { id: 'p1', emoji: '💵', label: 'Dinheiro', troco: true },
  { id: 'p2', emoji: '💳', label: 'Cartão Débito' },
  { id: 'p3', emoji: '💳', label: 'Cartão Crédito' },
  { id: 'p4', emoji: '📱', label: 'Pix' },
];

const MENU_ITEMS = [
  {
    id: 'm1', emoji: '🍓', name: 'Tradicional',
    desc: 'Açaí puro, banana e granola',
    toppings: ['banana', 'granola'],
    baseName: 'Açaí Puro',
    sizes: { s300: 12.00, s500: 17.00, s700: 22.00 }
  },
  {
    id: 'm2', emoji: '🍫', name: 'Choco Lover',
    desc: 'Açaí, calda de chocolate, granola e leite condensado',
    toppings: ['chocolate', 'granola', 'leite cond.'],
    baseName: 'Açaí Puro',
    sizes: { s300: 14.00, s500: 19.00, s700: 24.00 }
  },
  {
    id: 'm3', emoji: '🫐', name: 'Frutas Vermelhas',
    desc: 'Açaí com morango, mirtilo, kiwi e calda de frutas',
    toppings: ['morango', 'mirtilo', 'kiwi'],
    baseName: 'Açaí c/ Morango',
    sizes: { s300: 16.00, s500: 21.00, s700: 27.00 }
  },
  {
    id: 'm4', emoji: '🥥', name: 'Tropical',
    desc: 'Açaí com coco, banana, mel e coco ralado',
    toppings: ['banana', 'mel', 'coco'],
    baseName: 'Açaí c/ Coco',
    sizes: { s300: 14.00, s500: 19.00, s700: 24.00 }
  },
  {
    id: 'm5', emoji: '🥜', name: 'Proteico',
    desc: 'Açaí puro, granola, amendoim e mel',
    toppings: ['granola', 'amendoim', 'mel'],
    baseName: 'Açaí Puro',
    sizes: { s300: 13.00, s500: 18.00, s700: 23.00 }
  },
  {
    id: 'm6', emoji: '🌈', name: 'Premium',
    desc: 'Açaí, morango, banana, kiwi, calda de frutas e granola',
    toppings: ['morango', 'banana', 'kiwi', 'granola'],
    baseName: 'Açaí c/ Morango',
    sizes: { s300: 18.00, s500: 24.00, s700: 30.00 }
  },
];

// ── STATE ────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('acai_cart') || '[]');
let builderState = { sizeId: null, baseId: null, compls: [], caldas: [] };
let selectedPayment = null;

// ── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  renderBuilder();
  renderPaymentOptions();
  updateCartUI();
  initTabs();
  initHeroTopping();
});

function saveCart() {
  localStorage.setItem('acai_cart', JSON.stringify(cart));
}

// ── HERO ANIMATION ────────────────────────────────────
function initHeroTopping() {
  const emojis = ['🍓', '🍌', '🫐', '🥝', '🍫', '🥥'];
  let i = 0;
  const el = document.getElementById('heroToppings');
  el.textContent = emojis[0];
  setInterval(() => {
    i = (i + 1) % emojis.length;
    el.style.opacity = 0;
    setTimeout(() => { el.textContent = emojis[i]; el.style.opacity = 1; }, 200);
  }, 1800);
  el.style.transition = 'opacity .2s ease';
}

// ── TABS ─────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });
}

function switchTab(name) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === `tab-${name}`));
}

function scrollToMenu() {
  document.getElementById('menuAnchor').scrollIntoView({ behavior: 'smooth' });
}

// ── RENDER MENU ──────────────────────────────────────
function renderMenu() {
  const grid = document.getElementById('cardapioGrid');
  grid.innerHTML = MENU_ITEMS.map(item => {
    const defaultSize = 's300';
    return `
    <div class="menu-card" id="card-${item.id}">
      <div class="card-emoji">${item.emoji}</div>
      <div class="card-name">${item.name}</div>
      <div class="card-desc">${item.desc}</div>
      <div class="card-size-pills">
        ${Object.entries(item.sizes).map(([sKey, price], idx) => {
          const sizeLabel = SIZES.find(s => s.id === sKey)?.label || sKey;
          return `<span class="size-pill ${idx===0?'selected':''}" 
            data-item="${item.id}" data-size="${sKey}"
            onclick="selectCardSize('${item.id}','${sKey}',this)">
            ${sizeLabel} — R$ ${price.toFixed(2).replace('.',',')}
          </span>`;
        }).join('')}
      </div>
      <button class="btn-add-card" onclick="addMenuToCart('${item.id}')">+ Adicionar</button>
    </div>`;
  }).join('');
}

function selectCardSize(itemId, sizeId, el) {
  const card = document.getElementById(`card-${itemId}`);
  card.querySelectorAll('.size-pill').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  el.setAttribute('data-selected', 'true');
}

function getSelectedSizeForCard(itemId) {
  const card = document.getElementById(`card-${itemId}`);
  const active = card.querySelector('.size-pill.selected');
  return active ? active.dataset.size : 's300';
}

function addMenuToCart(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  const sizeId = getSelectedSizeForCard(itemId);
  const sizeInfo = SIZES.find(s => s.id === sizeId);
  const price = item.sizes[sizeId];

  const existing = cart.find(c => c.itemId === itemId && c.sizeId === sizeId && c.type === 'menu');
  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      id: Date.now(),
      type: 'menu',
      itemId,
      sizeId,
      emoji: item.emoji,
      name: `${item.name} (${sizeInfo.label})`,
      desc: item.desc,
      price,
      qty: 1
    });
  }
  saveCart();
  updateCartUI();
  showToast(`${item.emoji} ${item.name} adicionado!`);
}

// ── RENDER BUILDER ───────────────────────────────────
function renderBuilder() {
  // Sizes
  document.getElementById('sizeOptions').innerHTML = SIZES.map(s => `
    <div class="size-card" id="sz-${s.id}" onclick="selectSize('${s.id}')">
      <div class="size-emoji">${s.emoji}</div>
      <div class="size-label">${s.label}</div>
      <div class="size-price">R$ ${s.price.toFixed(2).replace('.',',')}</div>
    </div>`).join('');

  // Bases
  document.getElementById('baseOptions').innerHTML = BASES.map(b => `
    <button class="opt-btn" id="base-${b.id}" onclick="selectBase('${b.id}')">
      <span class="opt-emoji">${b.emoji}</span>
      <span class="opt-label">${b.label}</span>
      <span class="opt-price">${b.price > 0 ? '+R$ '+b.price.toFixed(2).replace('.',',') : 'incluso'}</span>
    </button>`).join('');

  // Complementos
  document.getElementById('complGrid').innerHTML = COMPLEMENTOS.map(c => `
    <button class="opt-btn" id="compl-${c.id}" onclick="toggleCompl('${c.id}')">
      <span class="opt-emoji">${c.emoji}</span>
      <span class="opt-label">${c.label}</span>
      <span class="opt-price">+R$ ${c.price.toFixed(2).replace('.',',')}</span>
    </button>`).join('');

  // Caldas
  document.getElementById('caldaGrid').innerHTML = CALDAS.map(c => `
    <button class="opt-btn" id="calda-${c.id}" onclick="toggleCalda('${c.id}')">
      <span class="opt-emoji">${c.emoji}</span>
      <span class="opt-label">${c.label}</span>
      <span class="opt-price">+R$ ${c.price.toFixed(2).replace('.',',')}</span>
    </button>`).join('');
}

function selectSize(id) {
  builderState.sizeId = id;
  SIZES.forEach(s => {
    document.getElementById(`sz-${s.id}`)?.classList.toggle('selected', s.id === id);
  });
  updateBuilderTotal();
}

function selectBase(id) {
  builderState.baseId = id;
  BASES.forEach(b => {
    document.getElementById(`base-${b.id}`)?.classList.toggle('selected', b.id === id);
  });
  updateBuilderTotal();
}

function toggleCompl(id) {
  const MAX = 5;
  const idx = builderState.compls.indexOf(id);
  if (idx > -1) {
    builderState.compls.splice(idx, 1);
    document.getElementById(`compl-${id}`)?.classList.remove('selected');
  } else {
    if (builderState.compls.length >= MAX) {
      showToast('Máximo de 5 complementos!');
      return;
    }
    builderState.compls.push(id);
    document.getElementById(`compl-${id}`)?.classList.add('selected');
  }
  updateBuilderTotal();
}

function toggleCalda(id) {
  const MAX = 2;
  const idx = builderState.caldas.indexOf(id);
  if (idx > -1) {
    builderState.caldas.splice(idx, 1);
    document.getElementById(`calda-${id}`)?.classList.remove('selected');
  } else {
    if (builderState.caldas.length >= MAX) {
      showToast('Máximo de 2 caldas!');
      return;
    }
    builderState.caldas.push(id);
    document.getElementById(`calda-${id}`)?.classList.add('selected');
  }
  updateBuilderTotal();
}

function calcBuilderTotal() {
  let total = 0;
  if (builderState.sizeId) total += SIZES.find(s => s.id === builderState.sizeId)?.price || 0;
  if (builderState.baseId) total += BASES.find(b => b.id === builderState.baseId)?.price || 0;
  builderState.compls.forEach(id => total += COMPLEMENTOS.find(c => c.id === id)?.price || 0);
  builderState.caldas.forEach(id => total += CALDAS.find(c => c.id === id)?.price || 0);
  return total;
}

function updateBuilderTotal() {
  const total = calcBuilderTotal();
  document.getElementById('builderTotal').textContent = `R$ ${total.toFixed(2).replace('.',',')}`;
}

function addBuilderToCart() {
  if (!builderState.sizeId) { showToast('Escolha um tamanho!'); return; }
  if (!builderState.baseId) { showToast('Escolha uma base!'); return; }

  const size = SIZES.find(s => s.id === builderState.sizeId);
  const base = BASES.find(b => b.id === builderState.baseId);
  const complNames = builderState.compls.map(id => COMPLEMENTOS.find(c => c.id === id)?.label).filter(Boolean);
  const caldaNames = builderState.caldas.map(id => CALDAS.find(c => c.id === id)?.label).filter(Boolean);

  const descParts = [base.label];
  if (complNames.length) descParts.push(complNames.join(', '));
  if (caldaNames.length) descParts.push(caldaNames.join(', '));

  cart.push({
    id: Date.now(),
    type: 'custom',
    emoji: '🎨',
    name: `Açaí Personalizado (${size.label})`,
    desc: descParts.join(' • '),
    price: calcBuilderTotal(),
    qty: 1,
    sizeId: builderState.sizeId,
  });

  saveCart();
  updateCartUI();
  resetBuilder();
  showToast('🎨 Açaí personalizado adicionado!');
  switchTab('carrinho');
}

function resetBuilder() {
  builderState = { sizeId: null, baseId: null, compls: [], caldas: [] };
  document.querySelectorAll('.size-card, .opt-btn').forEach(el => el.classList.remove('selected'));
  updateBuilderTotal();
}

// ── CART UI ──────────────────────────────────────────
function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = count;

  const empty = document.getElementById('cartEmpty');
  const items = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    empty.style.display = 'block';
    items.style.display = 'none';
    footer.style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  items.style.display = 'block';
  footer.style.display = 'block';

  items.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="ci-emoji">${item.emoji}</div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-desc">${item.desc}</div>
        <div class="ci-footer">
          <span class="ci-price">R$ ${(item.price * item.qty).toFixed(2).replace('.',',')}</span>
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="ci-qty">
              <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" onclick="changeQty(${item.id}, +1)">+</button>
            </div>
            <button class="ci-remove" onclick="removeItem(${item.id})" title="Remover">🗑️</button>
          </div>
        </div>
      </div>
    </div>`).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const { taxaFixa, gratisMinimoR$ } = CONFIG.entrega;
  const entregaGratis = subtotal >= gratisMinimoR$;
  const taxa = entregaGratis ? 0 : taxaFixa;
  const total = subtotal + taxa;

  // Linha de subtotal + entrega
  const entregaLabel = entregaGratis
    ? `<span style="color:var(--green);font-weight:800">🎉 Entrega grátis</span>`
    : `Entrega: <strong>R$ ${taxa.toFixed(2).replace('.',',')}</strong>`;

  document.getElementById('cartTotal').innerHTML = `R$ ${total.toFixed(2).replace('.',',')}`;

  // Injeta info de entrega antes da barra de total
  let entregaInfo = document.getElementById('entregaInfo');
  if (!entregaInfo) {
    entregaInfo = document.createElement('div');
    entregaInfo.id = 'entregaInfo';
    entregaInfo.className = 'entrega-info';
    const totalBar = document.querySelector('.cart-total-bar');
    if (totalBar) totalBar.parentNode.insertBefore(entregaInfo, totalBar);
  }

  const faltam = gratisMinimoR$ - subtotal;
  entregaInfo.innerHTML = entregaGratis
    ? `<p class="entrega-ok">🎉 Você ganhou entrega grátis!</p>`
    : `<p class="entrega-tip">Faltam <strong>R$ ${faltam.toFixed(2).replace('.',',')}</strong> para entrega grátis</p>`;
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
  showToast('Item removido.');
}

// ── PAYMENT ──────────────────────────────────────────
function renderPaymentOptions() {
  document.getElementById('paymentOptions').innerHTML = PAYMENT_OPTIONS.map(p => `
    <div class="pay-opt" id="pay-${p.id}" onclick="selectPayment('${p.id}')">
      <span class="pay-icon">${p.emoji}</span>
      <span class="pay-label">${p.label}</span>
    </div>`).join('');
}

function selectPayment(id) {
  selectedPayment = id;
  PAYMENT_OPTIONS.forEach(p => document.getElementById(`pay-${p.id}`)?.classList.remove('selected'));
  document.getElementById(`pay-${id}`)?.classList.add('selected');
  const opt = PAYMENT_OPTIONS.find(p => p.id === id);
  document.getElementById('trocoBlock').style.display = opt?.troco ? 'block' : 'none';
}

// ── WHATSAPP ─────────────────────────────────────────
function sendToWhatsApp() {
  if (cart.length === 0) { showToast('Seu carrinho está vazio!'); return; }

  const rua = document.getElementById('inputRua').value.trim();
  const bairro = document.getElementById('inputBairro').value.trim();
  const ref = document.getElementById('inputRef').value.trim();

  if (!rua || !bairro) {
    showToast('Preencha o endereço de entrega!');
    switchTab('carrinho');
    document.getElementById('inputRua').focus();
    return;
  }

  if (!selectedPayment) {
    showToast('Escolha a forma de pagamento!');
    return;
  }

  const payOpt = PAYMENT_OPTIONS.find(p => p.id === selectedPayment);
  const troco = document.getElementById('inputTroco')?.value;
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const { taxaFixa, gratisMinimoR$ } = CONFIG.entrega;
  const entregaGratis = subtotal >= gratisMinimoR$;
  const taxa = entregaGratis ? 0 : taxaFixa;
  const total = subtotal + taxa;

  let msg = `🍇 *PEDIDO — ${CONFIG.loja.nome.toUpperCase()}* 🍇\n\n`;
  msg += `📋 *Itens:*\n`;
  cart.forEach(item => {
    msg += `• ${item.emoji} ${item.name} x${item.qty} — R$ ${(item.price * item.qty).toFixed(2).replace('.',',')}\n`;
    if (item.desc) msg += `  _${item.desc}_\n`;
  });

  msg += `\n📦 *Subtotal:* R$ ${subtotal.toFixed(2).replace('.',',')}`;
  msg += `\n🛵 *Entrega:* ${entregaGratis ? 'Grátis 🎉' : 'R$ ' + taxa.toFixed(2).replace('.',',')}`;
  msg += `\n💰 *Total: R$ ${total.toFixed(2).replace('.',',')}*\n`;
  msg += `\n📍 *Endereço:*\n${rua}, ${bairro}`;
  if (ref) msg += `\nReferência: ${ref}`;

  msg += `\n\n💳 *Pagamento:* ${payOpt.label}`;
  if (payOpt.troco && troco) msg += ` (troco para R$ ${parseFloat(troco).toFixed(2).replace('.',',')})`;

  msg += `\n\n_Pedido enviado pelo site ${CONFIG.loja.nome}_ ${CONFIG.loja.emoji}`;

  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// ── TOAST ─────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── RECIBO DE IMPRESSÃO ────────────────────────────────
function imprimirRecibo() {
  if (cart.length === 0) { showToast('Carrinho vazio — nada para imprimir!'); return; }

  const rua    = document.getElementById('inputRua').value.trim();
  const bairro = document.getElementById('inputBairro').value.trim();
  const ref    = document.getElementById('inputRef').value.trim();
  const payOpt = PAYMENT_OPTIONS.find(p => p.id === selectedPayment);
  const troco  = document.getElementById('inputTroco')?.value;

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const { taxaFixa, gratisMinimoR$ } = CONFIG.entrega;
  const entregaGratis = subtotal >= gratisMinimoR$;
  const taxa  = entregaGratis ? 0 : taxaFixa;
  const total = subtotal + taxa;

  const agora = new Date();
  const dataHora = agora.toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  // Número sequencial salvo no LocalStorage
  let numPedido = parseInt(localStorage.getItem('acai_num_pedido') || '0') + 1;
  localStorage.setItem('acai_num_pedido', numPedido);
  const numFormatado = String(numPedido).padStart(4, '0'); // ex: 0001, 0042

  const itensHTML = cart.map(item => `
    <tr>
      <td>${item.emoji} ${item.name}</td>
      <td class="center">${item.qty}</td>
      <td class="right">R$ ${item.price.toFixed(2).replace('.',',')}</td>
      <td class="right"><strong>R$ ${(item.price * item.qty).toFixed(2).replace('.',',')}</strong></td>
    </tr>
    ${item.desc ? `<tr><td colspan="4" class="desc-row">${item.desc}</td></tr>` : ''}
  `).join('');

  const enderecoHTML = (rua || bairro)
    ? `<div class="bloco">
        <div class="bloco-titulo">📍 ENDEREÇO DE ENTREGA</div>
        ${rua ? `<div>${rua}</div>` : ''}
        ${bairro ? `<div>${bairro}</div>` : ''}
        ${ref ? `<div class="obs">Ref: ${ref}</div>` : ''}
       </div>`
    : '';

  const pagamentoHTML = payOpt
    ? `<div class="bloco">
        <div class="bloco-titulo">💳 PAGAMENTO</div>
        <div>${payOpt.label}${payOpt.troco && troco ? ` — troco para R$ ${parseFloat(troco).toFixed(2).replace('.',',')}` : ''}</div>
       </div>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <title>Recibo #${numFormatado} — ${CONFIG.loja.nome}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Nunito', sans-serif;
      font-size: 13px;
      color: #1A0F30;
      background: #fff;
      padding: 20px;
      max-width: 380px;
      margin: 0 auto;
    }

    /* ── CABEÇALHO ── */
    .cabecalho {
      text-align: center;
      border-bottom: 2px dashed #2D1B4E;
      padding-bottom: 14px;
      margin-bottom: 14px;
    }
    .loja-emoji { font-size: 32px; }
    .loja-nome  { font-size: 20px; font-weight: 900; color: #2D1B4E; }
    .loja-slogan { font-size: 11px; color: #7B4FC1; letter-spacing: 1px; text-transform: uppercase; }
    .pedido-num  { margin-top: 8px; font-size: 11px; color: #5A4070; }
    .pedido-num strong { font-size: 15px; color: #E91E8C; }

    /* ── TABELA DE ITENS ── */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 4px;
    }
    thead th {
      background: #2D1B4E;
      color: #fff;
      padding: 6px 8px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .5px;
    }
    thead th.center { text-align: center; }
    thead th.right  { text-align: right; }
    tbody td {
      padding: 7px 8px;
      border-bottom: 1px solid #E0D6F0;
      vertical-align: top;
    }
    tbody td.center { text-align: center; }
    tbody td.right  { text-align: right; }
    tbody tr:last-child td { border-bottom: none; }
    .desc-row {
      font-size: 11px;
      color: #7B4FC1;
      padding: 0 8px 8px;
      font-style: italic;
    }

    /* ── TOTAIS ── */
    .totais {
      border-top: 2px dashed #2D1B4E;
      padding-top: 10px;
      margin-bottom: 14px;
    }
    .linha-total {
      display: flex;
      justify-content: space-between;
      padding: 3px 0;
      font-size: 12px;
      color: #5A4070;
    }
    .linha-total.destaque {
      font-size: 15px;
      font-weight: 900;
      color: #2D1B4E;
      border-top: 1.5px solid #E0D6F0;
      margin-top: 6px;
      padding-top: 8px;
    }
    .linha-total.destaque span:last-child { color: #E91E8C; }
    .gratis { color: #25D366 !important; font-weight: 800; }

    /* ── BLOCOS DE INFO ── */
    .bloco {
      border: 1.5px solid #E0D6F0;
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 1.6;
    }
    .bloco-titulo {
      font-size: 10px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #7B4FC1;
      margin-bottom: 4px;
    }
    .obs { color: #9E8AB5; font-style: italic; }

    /* ── RODAPÉ ── */
    .rodape {
      text-align: center;
      margin-top: 16px;
      padding-top: 12px;
      border-top: 2px dashed #2D1B4E;
      font-size: 11px;
      color: #9E8AB5;
      line-height: 1.7;
    }
    .rodape strong { color: #E91E8C; font-size: 13px; }

    /* ── PRINT ── */
    @media print {
      body { padding: 0; }
      .no-print { display: none !important; }
    }

    /* ── BOTÃO (só na tela, some na impressão) ── */
    .btn-imprimir {
      display: block;
      width: 100%;
      margin-top: 16px;
      padding: 12px;
      background: #2D1B4E;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-family: 'Nunito', sans-serif;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
    }
    .btn-imprimir:hover { background: #4A2C7A; }
  </style>
</head>
<body>

  <div class="cabecalho">
    <div class="loja-emoji">${CONFIG.loja.emoji}</div>
    <div class="loja-nome">${CONFIG.loja.nome}</div>
    <div class="loja-slogan">${CONFIG.loja.slogan}</div>
    <div class="pedido-num">
      Pedido <strong>#${numFormatado}</strong> &nbsp;·&nbsp; ${dataHora}
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th class="center">Qtd</th>
        <th class="right">Unit.</th>
        <th class="right">Total</th>
      </tr>
    </thead>
    <tbody>
      ${itensHTML}
    </tbody>
  </table>

  <div class="totais">
    <div class="linha-total">
      <span>Subtotal</span>
      <span>R$ ${subtotal.toFixed(2).replace('.',',')}</span>
    </div>
    <div class="linha-total">
      <span>Entrega</span>
      <span class="${entregaGratis ? 'gratis' : ''}">
        ${entregaGratis ? 'Grátis ✓' : 'R$ ' + taxa.toFixed(2).replace('.',',')}
      </span>
    </div>
    <div class="linha-total destaque">
      <span>TOTAL</span>
      <span>R$ ${total.toFixed(2).replace('.',',')}</span>
    </div>
  </div>

  ${enderecoHTML}
  ${pagamentoHTML}

  <div class="rodape">
    <strong>Obrigado pela preferência! 🍇</strong><br/>
    ${CONFIG.loja.nome} · ${CONFIG.loja.cidade || ''}<br/>
    Guarde este recibo como comprovante do pedido.
  </div>

  <button class="btn-imprimir no-print" onclick="window.print()">
    🖨️ Imprimir / Salvar como PDF
  </button>

</body>
</html>`;

  const janela = window.open('', '_blank', 'width=480,height=700');
  janela.document.write(html);
  janela.document.close();
  janela.focus();
}
