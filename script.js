/**
 * XV Fátima - Invitación Digital (v7.5 REVELADO)
 * Refinement: Section 2 Narrative & Staggered Reveal
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. REFERENCIAS DEL CORE
    const sections = document.querySelectorAll('.snap-page');
    const bgVideo = document.getElementById('bg-video');
    const globalGarden = document.getElementById('global-garden');
    const goldField = document.getElementById('gold-field');
    const typingHero = document.getElementById('typing-text');
    const typingProtocol = document.getElementById('typing-protocol');

    // 2. GENERADOR DE POLVO DE ORO (35 particules)
    const particleCount = 35;
    goldField.innerHTML = "";
    for (let i = 0; i < particleCount; i++) {
        const dust = document.createElement('div');
        dust.className = 'gold-dust';
        const top = Math.random() * 60 + 20;
        const left = Math.random() * 80 + 10;
        dust.style.top = `${top}%`;
        dust.style.left = `${left}%`;
        const duration = Math.random() * 20 + 45;
        const delay = Math.random() * -60;
        dust.style.animationDuration = `${duration}s`;
        dust.style.animationDelay = `${delay}s`;
        const scale = Math.random() * 0.4 + 0.8;
        dust.style.transform = `scale(${scale})`;
        dust.style.opacity = Math.random() * 0.4 + 0.3;
        goldField.appendChild(dust);
    }

    // 3. MOTORES TYPING (v7.5)
    let heroTyped = false;
    let protoTyped = false;

    function startTyping(element, text, speed, callback) {
        let i = 0;
        element.textContent = "";
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

    // 4. INTERSECTION OBSERVER (Coreografía Maestras)
    const observerOptions = { threshold: 0.25 };
    const masterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Lógica Typing Hero
                if (entry.target.id === 'hero' && !heroTyped) {
                    heroTyped = true;
                    setTimeout(() => startTyping(typingHero, "CON ILUSIÓN CELEBRO", 120), 1000);
                }

                // Lógica Typing Protocol
                if (entry.target.id === 'protocol' && !protoTyped) {
                    protoTyped = true;
                    // Retraso aumentado v7.6 para esperar al revelado secuencial (post-Fátima)
                    setTimeout(() => startTyping(typingProtocol, "celebro este hermoso capítulo de mi vida rodeada del amor incondicional que siempre me ha guiado.", 100), 2800);
                }
            }

            // Lógica Background dinámica
            if (entry.target.id === 'hero') {
                if (entry.isIntersecting) {
                    bgVideo.style.opacity = "0.25";
                    globalGarden.style.opacity = "0";
                } else {
                    bgVideo.style.opacity = "0";
                    globalGarden.style.opacity = "1";
                }
            }
        });
    }, observerOptions);

    sections.forEach(s => masterObserver.observe(s));

    // 5. MOTOR DE CUENTA REGRESIVA
    const countdownDate = new Date("July 25, 2026 13:45:00").getTime();
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = d.toString().padStart(2, '0');
        document.getElementById('hours').textContent = h.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = m.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = s.toString().padStart(2, '0');
    };
    setInterval(updateCountdown, 1000);
    updateCountdown();
});

// ── Motor RSVP v8.2 (Modal + Webhook) ──
const modal = document.getElementById('rsvp-modal');
const btnOpen = document.getElementById('btn-open-rsvp');
const btnClose = document.getElementById('close-modal');
const formRsvp = document.getElementById('rsvp-form');
const successMsg = document.getElementById('rsvp-success');
const btnSubmit = document.getElementById('btn-submit-rsvp');

// Controladores de UI
if (btnOpen && modal) {
    btnOpen.addEventListener('click', () => modal.classList.remove('hidden'));

    btnClose.addEventListener('click', () => {
        modal.classList.add('hidden');
        // Resetear formulario tras animación de salida
        setTimeout(() => {
            successMsg.classList.add('hidden');
            formRsvp.style.display = 'block';
            btnSubmit.style.display = '';
            btnSubmit.textContent = 'ENVIAR CONFIRMACIÓN';
            formRsvp.reset();
        }, 300);
    });

    // Cerrar al hacer clic en el fondo del overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) btnClose.click();
    });
}

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
            nombre: document.getElementById('guest-name').value,
            acompanantes: document.getElementById('guest-companions').value,
            fecha: timestamp
        };

        try {
            // ⚠️  REEMPLAZA ESTA URL CON EL WEBHOOK REAL DE MAKE.COM
            const webhookUrl = "https://hook.us2.make.com/j2ci1dvlztafpdk62iduyl5wxnidmk73";

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
