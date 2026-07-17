/**
 * XV Fátima · Invitación Digital (v9.1 PREMIUM)
 * - "Cómo llegar" (chip + FAB derecho) → scroll a la sección de sedes
 * - Reveals POR ELEMENTO que re-animan al entrar/salir del viewport
 * - Flores atenuadas en la sección de logística (el contenido gana)
 * - Countdown blindado: al llegar a cero muestra estado final y se detiene
 * - Webhook Make.com INTACTO
 */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. REFERENCIAS DEL CORE ──
    const sections = document.querySelectorAll('.snap-page');
    const bgVideo = document.getElementById('bg-video');
    const globalGarden = document.getElementById('global-garden');
    const goldField = document.getElementById('gold-field');
    const typingHero = document.getElementById('typing-text');
    const typingProtocol = document.getElementById('typing-protocol');
    const heroName = document.getElementById('hero-name');
    const countdownBox = document.getElementById('countdown');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── 2. DANZA POR LETRA: "Fátima" ──
    if (heroName && !reducedMotion) {
        const text = heroName.textContent;
        heroName.textContent = '';
        [...text].forEach((ch, i) => {
            const span = document.createElement('span');
            span.className = 'lt';
            span.style.setProperty('--i', i);
            span.textContent = ch;
            heroName.appendChild(span);
        });
    }

    // ── 3. POLVO DE ORO (motor optimizado gama media) ──
    const particleCount = reducedMotion ? 0 : 18;
    goldField.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (let i = 0; i < particleCount; i++) {
        const dust = document.createElement('div');
        dust.className = 'gold-dust';
        dust.style.top = `${Math.random() * 60 + 20}%`;
        dust.style.left = `${Math.random() * 80 + 10}%`;
        dust.style.setProperty('--dur', `${Math.random() * 20 + 45}s`);
        dust.style.setProperty('--delay', `${Math.random() * -60}s`);
        dust.style.setProperty('--sc', (Math.random() * 0.4 + 0.8).toFixed(2));
        dust.style.opacity = (Math.random() * 0.4 + 0.3).toFixed(2);
        frag.appendChild(dust);
    }
    goldField.appendChild(frag);

    // Pausa animaciones cuando la pestaña no es visible
    document.addEventListener('visibilitychange', () => {
        document.body.classList.toggle('paused', document.hidden);
    });

    // ── 4. MOTOR TYPING ──
    let heroTyped = false;
    let protoTyped = false;

    function startTyping(element, text, speed, callback) {
        if (reducedMotion) {
            element.textContent = text;
            if (callback) callback();
            return;
        }
        let i = 0;
        element.textContent = '';
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    // ── 5. OBSERVER DE SECCIONES (Coreografía Maestra, re-animable) ──
    const masterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Re-anima al entrar Y al volver a entrar
            entry.target.classList.toggle('is-visible', entry.isIntersecting);

            if (entry.isIntersecting) {
                if (entry.target.id === 'hero' && !heroTyped) {
                    heroTyped = true;
                    setTimeout(() => startTyping(typingHero, 'CON ILUSIÓN CELEBRO', 120), 1000);
                }

                if (entry.target.id === 'protocol' && !protoTyped) {
                    protoTyped = true;
                    setTimeout(() => startTyping(
                        typingProtocol,
                        'celebro este hermoso capítulo de mi vida rodeada del amor incondicional que siempre me ha guiado.',
                        100
                    ), 2800);
                }
            }

            // Fondo dinámico + FABs
            if (entry.target.id === 'hero') {
                if (entry.isIntersecting) {
                    bgVideo.style.opacity = '0.25';
                    globalGarden.style.opacity = '0';
                    document.body.classList.remove('fabs-on');
                } else {
                    bgVideo.style.opacity = '0';
                    globalGarden.style.opacity = '1';
                    document.body.classList.add('fabs-on');
                }
            }

            // Flores atenuadas mientras se ve la logística
            if (entry.target.id === 'logistics') {
                document.body.classList.toggle('dim-garden', entry.isIntersecting);
            }
        });
    }, { threshold: 0.25 });

    sections.forEach(s => masterObserver.observe(s));

    // ── 6. OBSERVER DE ELEMENTOS [data-rv] (animación por texto/div/imagen) ──
    const rvObserver = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            en.target.classList.toggle('rv-in', en.isIntersecting);
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('[data-rv]').forEach(el => rvObserver.observe(el));

    // ── 7. "CÓMO LLEGAR" → scroll a la sección de sedes (son 2 ubicaciones) ──
    const logistics = document.getElementById('logistics');
    const goToLogistics = (e) => {
        e.preventDefault();
        logistics.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    };
    const chipMaps = document.getElementById('chip-como-llegar');
    const fabMaps = document.getElementById('fab-maps');
    if (chipMaps) chipMaps.addEventListener('click', goToLogistics);
    if (fabMaps) fabMaps.addEventListener('click', goToLogistics);

    // ── 8. CUENTA REGRESIVA BLINDADA ──
    // Al llegar a cero: muestra el estado final UNA vez y detiene el interval.
    // Nada de contadores ascendentes infinitos comiéndose la batería.
    const countdownDate = new Date('July 25, 2026 13:45:00').getTime();
    const el = {
        d: document.getElementById('days'),
        h: document.getElementById('hours'),
        m: document.getElementById('minutes'),
        s: document.getElementById('seconds')
    };
    let countdownTimer = null;
    let countdownDone = false;

    const finishCountdown = () => {
        if (countdownDone) return;
        countdownDone = true;
        if (countdownTimer) clearInterval(countdownTimer);
        countdownBox.innerHTML = '<span class="countdown-final">✧ ¡HOY ES EL GRAN DÍA! ✧</span>';
    };

    const updateCountdown = () => {
        const distance = countdownDate - Date.now();

        if (distance <= 0) {
            finishCountdown();
            return;
        }

        el.d.textContent = String(Math.floor(distance / 86400000)).padStart(2, '0');
        el.h.textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, '0');
        el.m.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, '0');
        el.s.textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, '0');
    };

    updateCountdown();
    if (!countdownDone) {
        countdownTimer = setInterval(updateCountdown, 1000);
    }
});

// ═══════════ GESTOR GENÉRICO DE MODALES (bottom-sheet) ═══════════
function bindModal(overlayId, openBtnId, closeBtnId, onClose) {
    const overlay = document.getElementById(overlayId);
    const btnOpen = document.getElementById(openBtnId);
    const btnClose = document.getElementById(closeBtnId);
    if (!overlay || !btnClose) return null;

    const open = () => overlay.classList.remove('hidden');
    const close = () => {
        overlay.classList.add('hidden');
        if (onClose) setTimeout(onClose, 350);
    };

    if (btnOpen) btnOpen.addEventListener('click', open);
    btnClose.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });

    return { open, close };
}

// Modal Indicaciones (FAB izquierdo · info_icon.png)
bindModal('info-modal', 'fab-info', 'close-info');

// ── Motor RSVP (Modal + Webhook Make.com) ──
const formRsvp = document.getElementById('rsvp-form');
const successMsg = document.getElementById('rsvp-success');
const btnSubmit = document.getElementById('btn-submit-rsvp');

bindModal('rsvp-modal', 'btn-open-rsvp', 'close-modal', () => {
    successMsg.classList.add('hidden');
    formRsvp.style.display = 'block';
    btnSubmit.style.display = '';
    btnSubmit.disabled = false;
    btnSubmit.textContent = 'ENVIAR CONFIRMACIÓN';
    formRsvp.reset();
});

// Cerrar modales con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(m => {
        const closer = m.querySelector('.close-btn');
        if (closer) closer.click();
    });
});

// Transmisión de Datos al Webhook
if (formRsvp) {
    formRsvp.addEventListener('submit', async (e) => {
        e.preventDefault();
        btnSubmit.textContent = 'ENVIANDO...';
        btnSubmit.disabled = true;

        // Captura de fecha local formateada (Ej: 29/03/2026, 4:30 PM)
        const timestamp = new Date().toLocaleString('es-MX', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: true
        });

        const data = {
            nombre: document.getElementById('guest-name').value.trim(),
            acompanantes: document.getElementById('guest-companions').value,
            fecha: timestamp
        };

        try {
            const webhookUrl = 'https://hook.us2.make.com/j2ci1dvlztafpdk62iduyl5wxnidmk73';

            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            formRsvp.style.display = 'none';
            successMsg.classList.remove('hidden');
        } catch (error) {
            btnSubmit.textContent = 'ERROR. INTENTA DE NUEVO.';
            console.error('RSVP Webhook error:', error);
        } finally {
            btnSubmit.disabled = false;
            if (!successMsg.classList.contains('hidden')) {
                btnSubmit.style.display = 'none';
            }
        }
    });
}
