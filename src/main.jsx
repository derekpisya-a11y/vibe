import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, ChevronDown, Crosshair, SlidersHorizontal, Layers3, Sparkles, X, Menu, Plus, Minus, ExternalLink, MoveUpRight, Command, Mouse, CirclePlay } from 'lucide-react';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import '@fontsource/manrope/latin-800.css';
import '@fontsource/manrope/cyrillic-400.css';
import '@fontsource/manrope/cyrillic-500.css';
import '@fontsource/manrope/cyrillic-600.css';
import '@fontsource/manrope/cyrillic-700.css';
import '@fontsource/manrope/cyrillic-800.css';
import '@fontsource/space-grotesk/latin-500.css';
import '@fontsource/space-grotesk/latin-700.css';
import './styles.css';

const officialUrl = 'https://neverlose.cc/';
const navItems = [ ['information', 'Информация'], ['features', 'Возможности'], ['community', 'Сообщество'], ['faq', 'FAQ'] ];
const gameContent = {
  cs2: { name: 'Counter-Strike 2', tag: 'НОВАЯ ГЛАВА', label: 'COUNTER-STRIKE 2', text: 'Новая эра Counter-Strike. Знакомый характер Neverlose.', detail: 'Узнай больше о версии для CS2, её возможностях и актуальных обновлениях на официальном сайте.' },
  csgo: { name: 'Counter-Strike: Global Offensive', tag: 'THE ORIGINAL', label: 'COUNTER-STRIKE: GO', text: 'Игра, с которой связана целая эпоха. Легенда остаётся.', detail: 'CS:GO — часть истории Neverlose. Информацию о доступности этой версии уточняй на официальном сайте.' }
};
const faqItems = [
  ['Что такое Neverlose?', 'Neverlose — проект программного обеспечения для Counter-Strike. Здесь собраны его визуальная концепция, направления и ссылки на официальный ресурс.'],
  ['Чем отличаются версии для CS2 и CS:GO?', 'CS2 и CS:GO — разные версии игры, поэтому их программное обеспечение и совместимость различаются. CS:GO представлен здесь как часть истории проекта; актуальную доступность версий нужно проверять на neverlose.cc.'],
  ['Где посмотреть актуальную информацию?', 'На официальном сайте neverlose.cc. Там можно проверить доступные продукты, новости, условия и ссылки на ресурсы сообщества.'],
  ['Это официальный сайт Neverlose?', 'Это независимый дизайн-концепт, посвящённый Neverlose. Он не связан с разработчиками проекта и не принимает платежи. Все названия и знаки принадлежат их владельцам.']
];

function Logo({ className = '' }) {
  return <img className={`nl-logo ${className}`} src="/assets/neverlose-logo.svg" alt="Neverlose" />;
}

function FAQ({ compact = false }) {
  const [openIndex, setOpenIndex] = useState(0);
  return <div className={`faq-list ${compact ? 'compact' : ''}`}>{faqItems.map(([question, answer], index) => <div className={`faq-item ${openIndex === index ? 'is-open' : ''}`} key={question}>
    <button aria-expanded={openIndex === index} aria-controls={`answer-${compact ? 'modal' : 'page'}-${index}`} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
      <span><small>0{index + 1}</small>{question}</span>{openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
    </button>
    <div id={`answer-${compact ? 'modal' : 'page'}-${index}`} className="faq-answer" hidden={openIndex !== index}><p>{answer}</p></div>
  </div>)}</div>;
}

function Modal({ type, game, onClose, returnFocus }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = returnFocus || document.activeElement;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; if (previousFocus?.isConnected) previousFocus.focus(); };
  }, []);
  const titles = { information: 'За именем Neverlose.', features: 'Всё решают детали.', community: 'На одной волне.', faq: 'Есть вопросы?', game: gameContent[game].name };
  return <dialog ref={dialogRef} className="info-dialog" aria-labelledby="dialog-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="dialog-inner">
      <button className="close-dialog icon-button" onClick={onClose} aria-label="Закрыть окно"><X size={23} /></button>
      <div className="eyebrow"><span className="tiny-star">✦</span> THE NEVERLOSE UNIVERSE</div>
      <h2 id="dialog-title">{titles[type]}</h2>
      {type === 'information' && <>
        <p className="dialog-lead">Знакомое имя. Собственный характер.</p>
        <p>Neverlose — проект программного обеспечения для Counter-Strike. В центре этого сайта — его узнаваемая айдентика, две главы Counter-Strike и внимание к индивидуальному стилю.</p>
        <div className="dialog-timeline"><div><span>01 / НАСЛЕДИЕ</span><h3>Counter-Strike: Global Offensive</h3><p>CS:GO — часть истории проекта и точка отсчёта для его сообщества.</p></div><div><span>02 / НОВАЯ ГЛАВА</span><h3>Counter-Strike 2</h3><p>Следующее поколение игры и отдельное направление Neverlose.</p></div></div>
        <h3>О создании проекта</h3><p>У каждой версии своя история. Материалы о команде, разработке Neverlose и актуальных релизах собраны на официальном ресурсе проекта.</p>
        <a className="text-link" href={officialUrl} target="_blank" rel="noreferrer">Официальный источник <ArrowUpRight size={17} /></a>
      </>}
      {type === 'features' && <><p className="dialog-lead">Три акцента вселенной Neverlose.</p><div className="modal-feature-list"><article><SlidersHorizontal /><div><h3>Индивидуальная настройка</h3><p>Профили и персональный подход к тому, как выглядит и ощущается игра.</p></div></article><article><Layers3 /><div><h3>Визуальный стиль</h3><p>От небольших акцентов до цельного оформления — детали формируют характер.</p></div></article><article><Command /><div><h3>Экосистема</h3><p>Материалы сообщества, документация и новости проекта в официальных ресурсах.</p></div></article></div><p className="small-note">Точный набор функций зависит от версии продукта. Проверяй текущие возможности на официальном сайте.</p><a className="button button-primary" href={officialUrl} target="_blank" rel="noreferrer">Посмотреть продукт <ArrowUpRight size={18} /></a></>}
      {type === 'community' && <><p className="dialog-lead">Игры объединяют. Детали делают нас разными.</p><p>Следи за обновлениями, находи материалы по настройке и открывай идеи других участников. Актуальные ссылки на площадки сообщества собраны на официальном сайте Neverlose.</p><div className="community-visual" aria-hidden="true"><span>YOU</span><span className="community-logo"><Logo /></span><span>US</span></div><a className="button button-primary" href={officialUrl} target="_blank" rel="noreferrer">Найти своё сообщество <ArrowUpRight size={18} /></a></>}
      {type === 'faq' && <FAQ compact />}
      {type === 'game' && <><span className="dialog-game-badge">{gameContent[game].tag}</span><p className="dialog-lead">{gameContent[game].text}</p><p>{gameContent[game].detail}</p><a className="button button-primary" href={officialUrl} target="_blank" rel="noreferrer">На официальный сайт <ArrowUpRight size={18} /></a></>}
    </div>
  </dialog>;
}

function App() {
  const [modal, setModal] = useState(null);
  const [game, setGame] = useState('cs2');
  const [menuOpen, setMenuOpen] = useState(false);
  const [knifePaused, setKnifePaused] = useState(false);
  const menuButtonRef = useRef(null);
  const returnFocusRef = useRef(null);
  const openModal = type => { returnFocusRef.current = menuOpen ? menuButtonRef.current : document.activeElement; setMenuOpen(false); setModal(type); };
  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = event => { if (event.key === 'Escape') { setMenuOpen(false); menuButtonRef.current?.focus(); } };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [menuOpen]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); } }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <>
    <a className="skip-link" href="#main">К содержимому</a>
    <header className="site-header">
      <a className="brand" href="#" aria-label="Neverlose — главная"><Logo /><span className="brand-divider" /><span className="brand-name">NEVERLOSE<span>BEYOND THE ORDINARY</span></span></a>
      <nav className="desktop-nav" aria-label="Главная навигация">{navItems.map(([id, label]) => <button key={id} onClick={() => openModal(id)}>{label}{id === 'information' && <ChevronDown size={12} />}</button>)}</nav>
      <a className="header-cta" href={officialUrl} target="_blank" rel="noreferrer">Официальный сайт <ArrowUpRight size={16} /></a>
      <button ref={menuButtonRef} className="mobile-menu-button icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} aria-controls="mobile-nav">{menuOpen ? <X /> : <Menu />}</button>
      {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Мобильная навигация">{navItems.map(([id, label]) => <button key={id} onClick={() => openModal(id)}>{label}<ArrowUpRight size={18}/></button>)}<a href={officialUrl} target="_blank" rel="noreferrer">Официальный сайт <ExternalLink size={18}/></a></nav>}
    </header>

    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" /><div className="hero-glow" aria-hidden="true" />
        <div className="hero-topline"><div className="edition"><span className="status-dot" /> A NEW LEVEL OF YOUR GAME</div><span className="hero-index">EST. IN COUNTER-STRIKE <span>®</span></span></div>
        <div className="hero-copy">
          <div className="eyebrow"><span className="short-line"/> ТВОЯ ИГРА. ТВОИ ПРАВИЛА.</div>
          <h1 id="hero-title">Win every<br/><span className="hero-title-bottom"><span className="purple-word">day</span> with <span className="hero-logo"><Logo /><span className="logo-period">.</span></span></span></h1>
          <p className="hero-description">Больше, чем просто игра.<br/>Твой стиль. Твой ритм. Твоя вселенная Neverlose.</p>
          <div className="hero-actions"><a className="button button-primary" href="#universe">Открыть вселенную <ArrowUpRight size={19} /></a><button className="button button-quiet" onClick={() => openModal('information')}><CirclePlay size={22} strokeWidth={1.35} /> О проекте</button></div>
          <div className="hero-games"><span>СОЗДАНО В МИРЕ</span><button onClick={() => { setGame('cs2'); openModal('game'); }}><Crosshair size={14} /> COUNTER-STRIKE 2</button><span className="game-divider"/><button onClick={() => { setGame('csgo'); openModal('game'); }}>CS:GO <ArrowUpRight size={12}/></button></div>
        </div>
        <div className={`knife-scene ${knifePaused ? 'paused' : ''}`}>
          <div className="orbital orbital-outer" aria-hidden="true" /><div className="orbital orbital-inner" aria-hidden="true" /><div className="orbital-core" aria-hidden="true" />
          <div className="scene-coordinate coordinate-top" aria-hidden="true">X: 0.781<br/>Y: 0.042</div>
          <div className="scene-plus plus-one" aria-hidden="true">+</div><div className="scene-plus plus-two" aria-hidden="true">+</div>
          <div className="knife-float" role="img" aria-label="Нож M9 Bayonet с фиолетовым клинком; на обратной стороне надпись NEVERLOSE">
            <div className="knife-spin">
              <div className="knife-face knife-face-front"><img className="knife-image" src="/assets/m9-knife.png" alt="" fetchPriority="high" /></div>
              <div className="knife-face knife-face-back">
                <img className="knife-image" src="/assets/m9-knife.png" alt="" />
                <span className="blade-signature" aria-hidden="true">NEVERLOSE</span>
              </div>
            </div>
          </div>
          <div className="knife-label"><span className="knife-label-line"/><div><span className="knife-rarity">★ M9 BAYONET</span><span className="knife-finish">Doppler <span>/</span> Phase 2</span></div><span className="finish-swatch"/></div>
          <button className="motion-toggle" onClick={() => setKnifePaused(!knifePaused)} aria-pressed={knifePaused} aria-label={knifePaused ? 'Включить анимацию ножа' : 'Приостановить анимацию ножа'}><span className={`motion-indicator ${knifePaused ? 'is-paused' : ''}`} /><span>{knifePaused ? 'ANIMATION PAUSED' : 'DESIGNED TO STAND OUT'}</span></button>
        </div>
        <div className="hero-bottom"><a href="#universe" className="scroll-cue"><Mouse size={17} strokeWidth={1.5}/><span>ЛИСТАЙ. ИССЛЕДУЙ. ВЫДЕЛЯЙСЯ.</span><ChevronDown size={15}/></a><span className="hero-bottom-right">NOT JUST A GAME. <span>A MINDSET.</span></span></div>
      </section>

      <div className="marquee" aria-hidden="true"><div>{Array.from({length: 4}, (_, i) => <React.Fragment key={i}><span>PLAY YOUR WAY</span><span className="marquee-star">✦</span><span className="marquee-outline">NEVER ORDINARY</span><span className="marquee-star">✦</span></React.Fragment>)}</div></div>

      <section id="universe" className="section universe-section">
        <div className="section-heading reveal"><div><div className="eyebrow"><span className="tiny-star">✦</span> 01 / THE EXPERIENCE</div><h2>Твоя игра.<br/><span className="muted-heading">На другом уровне.</span></h2></div><p>Когда каждая деталь на своём месте,<br/>остаётся только быть собой.</p></div>
        <div className="feature-grid">
          <button className="feature-card reveal" onClick={() => openModal('features')}><div className="card-top"><span className="feature-icon"><SlidersHorizontal size={21}/></span><span className="card-number">01 — PERSONAL</span><ArrowUpRight className="card-arrow" size={22}/></div><div className="mini-sliders" aria-hidden="true"><div><i/><b/></div><div><i/><b/></div><div><i/><b/></div></div><h3>По твоим правилам</h3><p>Индивидуальность начинается с настроек.<br/>Найди свой баланс в каждой детали.</p><span className="card-link">ТВОЙ ХАРАКТЕР. ТВОЙ ВЫБОР. <ArrowRight size={14}/></span></button>
          <button className="feature-card reveal" onClick={() => openModal('features')}><div className="card-top"><span className="feature-icon"><Layers3 size={21}/></span><span className="card-number">02 — VISUAL</span><ArrowUpRight className="card-arrow" size={22}/></div><div className="mini-layers" aria-hidden="true"><i/><i/><i/><span>NL</span></div><h3>Узнаваемый стиль</h3><p>Чистые формы. Точные акценты.<br/>Эстетика, которую ни с чем не спутать.</p><span className="card-link">ВНИМАНИЕ К КАЖДОМУ ПИКСЕЛЮ. <ArrowRight size={14}/></span></button>
          <button className="feature-card reveal" onClick={() => openModal('community')}><div className="card-top"><span className="feature-icon"><Sparkles size={21}/></span><span className="card-number">03 — TOGETHER</span><ArrowUpRight className="card-arrow" size={22}/></div><div className="mini-community" aria-hidden="true"><span>↗</span><span><Logo /></span><span><Sparkles size={21}/></span><i/><i/></div><h3>Своя вселенная</h3><p>Общие интересы. Разные взгляды.<br/>Место, где всегда есть что открыть.</p><span className="card-link">БОЛЬШЕ, ЧЕМ ОДИН ИГРОК. <ArrowRight size={14}/></span></button>
        </div>
      </section>

      <section className="section game-section reveal" aria-labelledby="game-title"><div className="game-panel"><div className="game-panel-art" aria-hidden="true"><div className="game-art-grid"/><div className="big-crosshair"><Crosshair strokeWidth={.45}/></div><span className="game-art-type">{game === 'cs2' ? 'CS2' : 'CS:GO'}</span><span className="game-art-caption">SAME DNA. NEW DIMENSION.</span></div><div className="game-panel-copy"><div className="eyebrow"><span className="tiny-star">✦</span> 02 / CHOOSE YOUR CHAPTER</div><h2 id="game-title">Две главы.<br/>Один характер.</h2><div className="game-tabs" role="tablist" aria-label="Выбрать игру">{['cs2','csgo'].map(id => <button key={id} id={`tab-${id}`} role="tab" aria-selected={game === id} aria-controls="game-description" tabIndex={game === id ? 0 : -1} onClick={() => setGame(id)} onKeyDown={event => { if (['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 'cs2' : event.key === 'End' ? 'csgo' : game === 'cs2' ? 'csgo' : 'cs2'; setGame(next); document.getElementById(`tab-${next}`)?.focus(); } }}>{id === 'cs2' ? 'Counter-Strike 2' : 'CS:GO'}{game === id && <span className="tab-dot"/>}</button>)}</div><div id="game-description" role="tabpanel" aria-labelledby={`tab-${game}`}><p className="game-description" key={game}>{gameContent[game].text}</p></div><button className="text-link" onClick={() => openModal('game')}>Об этой главе <ArrowUpRight size={19}/></button></div></div></section>

      <section className="section faq-section reveal"><div className="faq-heading"><div className="eyebrow"><span className="tiny-star">✦</span> 03 / GOOD TO KNOW</div><h2>Без лишних<br/><span className="muted-heading">вопросов.</span></h2><p>Главное о проекте —<br/>в нескольких ответах.</p></div><FAQ /></section>

      <section className="final-cta reveal"><div className="cta-orbit" aria-hidden="true"/><div className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</div><h2>Never ordinary.<br/><span>Always you.</span></h2><a className="button button-primary" href={officialUrl} target="_blank" rel="noreferrer">Открой Neverlose <ArrowUpRight size={19}/></a><span className="cta-side-note">PLAY IT YOUR WAY. ↗</span></section>
    </main>

    <footer className="site-footer"><a className="brand footer-brand" href="#" aria-label="Наверх"><Logo /><span className="brand-name">NEVERLOSE</span></a><p>Независимый дизайн-концепт.<br/>Товарные знаки принадлежат их владельцам.</p><button onClick={() => openModal('information')}>О проекте <ArrowUpRight size={14}/></button><a className="back-to-top" href="#">BACK TO TOP <MoveUpRight size={16}/></a></footer>
    {modal && <Modal type={modal} game={game} returnFocus={returnFocusRef.current} onClose={() => setModal(null)} />}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
