document.addEventListener('DOMContentLoaded', () => {

    // --- 0. BOOT SEQUENCE ---
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    const bootMessages = [
        "[  OK  ] Initializing Kernel...",
        "[  OK  ] Loading CPU: Mahmoud Bendari (Engineer)",
        "[  OK  ] Mounting filesystem: /portfolio/assets",
        "[  OK  ] Starting Network Manager...",
        "[  OK  ] Loading Module: C++ Compiler",
        "[  OK  ] Loading Module: Arduino Serial",
        "[  OK  ] Loading Module: Kali Linux Tools",
        "[  OK  ] Starting Digital Fixers Service...",
        "[  OK  ] System Ready."
    ];
    let msgIndex = 0;
    function runBootSequence() {
        if (msgIndex < bootMessages.length) {
            const line = document.createElement('div');
            line.className = 'boot-msg';
            line.innerHTML = bootMessages[msgIndex].replace('[  OK  ]', '<span class="boot-ok">[  OK  ]</span>');
            bootText.appendChild(line);
            msgIndex++;
            setTimeout(runBootSequence, Math.random() * 150 + 50);
        } else {
            setTimeout(() => {
                bootScreen.style.transition = "opacity 0.5s ease";
                bootScreen.style.opacity = "0";
                setTimeout(() => { bootScreen.style.display = "none"; }, 500);
            }, 600);
        }
    }
    runBootSequence();

    // --- 1. IP FETCH ---
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipDisplay = document.querySelector('.status-item i.fa-network-wired').parentNode;
            ipDisplay.innerHTML = `<i class="fas fa-network-wired"></i> IP: ${data.ip}`;
        })
        .catch(error => console.log('Network error:', error));

    // --- 2. MENU & THEME ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileMenu) { mobileMenu.addEventListener('click', () => { navMenu.classList.toggle('active'); }); }

    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    const body = document.body;
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
        else { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
    });

    // --- 3. VIM MODE & SCROLL ---
    const vimIndicator = document.getElementById('vim-mode');
    document.addEventListener('keydown', (e) => {
        const activeElement = document.activeElement;
        if (activeElement.id === 'cli-input') return;
        if (e.key === 'j') { window.scrollBy({ top: 100, behavior: 'smooth' }); showVimIndicator(); }
        else if (e.key === 'k') { window.scrollBy({ top: -100, behavior: 'smooth' }); showVimIndicator(); }
    });
    let vimTimeout;
    function showVimIndicator() {
        if (vimIndicator) { vimIndicator.style.display = 'inline'; clearTimeout(vimTimeout); vimTimeout = setTimeout(() => { vimIndicator.style.display = 'none'; }, 2000); }
    }

    // --- 4. TYPEWRITER ---
    const typewriterElement = document.querySelector('.typewriter');
    const words = JSON.parse(typewriterElement.getAttribute('data-text'));
    let wordIndex = 0; let charIndex = 0; let isDeleting = false; let typeSpeed = 100;
    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) { typewriterElement.textContent = currentWord.substring(0, charIndex - 1); charIndex--; typeSpeed = 50; }
        else { typewriterElement.textContent = currentWord.substring(0, charIndex + 1); charIndex++; typeSpeed = 100; }
        if (!isDeleting && charIndex === currentWord.length) { isDeleting = true; typeSpeed = 2000; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 500; }
        setTimeout(type, typeSpeed);
    }
    type();

    // --- 5. SCROLL OBSERVER ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.style.opacity = "1"; entry.target.style.transform = "translateY(0)"; } });
    }, { threshold: 0.1 });
    const animateElements = document.querySelectorAll('.project-card, .about-text, .terminal-card, .skills-wrapper, .hero-text, .hero-img');
    animateElements.forEach(el => { el.style.opacity = "0"; el.style.transform = "translateY(20px)"; el.style.transition = "all 0.6s ease-out"; observer.observe(el); });

    // --- 6. SYSTEM CLOCK ---
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        const clockElement = document.getElementById('clock');
        if (clockElement) clockElement.innerText = timeString;
    }
    setInterval(updateClock, 1000); updateClock();

    // --- 7. INTERACTIVE CLI ---
    const cliInput = document.getElementById('cli-input');
    const cliBody = document.getElementById('cli-body');
    const cliTerminal = document.getElementById('cli-terminal');

    if (cliInput) {
        cliInput.addEventListener('keydown', function (e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const currentText = cliInput.value.trim();
                const commands = ['help', 'about', 'skills', 'github', 'linkedin', 'contact', 'clear', 'resume', 'man resume', 'ping', 'sensors', 'hexdump', 'matrix'];
                const match = commands.find(cmd => cmd.startsWith(currentText));
                if (match) cliInput.value = match;
            }
        });

        cliInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const command = cliInput.value.trim().toLowerCase();
                const historyLine = document.createElement('div');
                historyLine.classList.add('output-line');
                historyLine.innerHTML = `<span class="prompt">root@portfolio:~$</span> ${command}`;
                cliBody.insertBefore(historyLine, cliInput.parentElement.parentElement.lastElementChild);

                let responseHTML = '';
                switch (command) {
                    case 'help': responseHTML = `Available commands:<br>- <span class="cmd-highlight">about</span><br>- <span class="cmd-highlight">skills</span><br>- <span class="cmd-highlight">sensors</span><br>- <span class="cmd-highlight">hexdump</span><br>- <span class="cmd-highlight">matrix</span><br>- <span class="cmd-highlight">github</span><br>- <span class="cmd-highlight">linkedin</span><br>- <span class="cmd-highlight">resume</span><br>- <span class="cmd-highlight">ping</span><br>- <span class="cmd-highlight">clear</span>`; break;
                    case 'about': responseHTML = "Computer Engineering student specializing in embedded systems & security."; break;
                    case 'skills': responseHTML = "C, C++, Python, Kali Linux, Wireshark, Metasploit."; break;
                    case 'github': responseHTML = "Opening GitHub..."; window.open('https://github.com/mbendari7', '_blank'); break;
                    case 'linkedin': responseHTML = "Opening LinkedIn..."; window.open('https://www.linkedin.com/in/mbendari', '_blank'); break;
                    case 'resume': case 'man resume': responseHTML = "Opening Resume manual page..."; window.open('Resume - Mahmoud Bendari.pdf', '_blank'); break;
                    case 'contact': responseHTML = "Email: mbendari25@gmail.com"; break;
                    case 'clear': const outputs = cliBody.querySelectorAll('.output-line, .response-line'); outputs.forEach(el => el.remove()); cliInput.value = ''; return;

                    case 'sensors': responseHTML = `[+] SYSTEM SENSORS:<br>- CPU_TEMP: <span style="color:var(--accent);">42°C</span> (Normal)<br>- V_CORE:   <span style="color:var(--accent);">1.35V</span><br>- 5V_RAIL:  <span style="color:var(--accent);">5.02V</span><br>- 3.3V_RAIL:<span style="color:var(--accent);">3.31V</span><br>- FAN_SPEED:<span style="color:var(--accent);">1200 RPM</span>`; break;
                    case 'hexdump': responseHTML = `<div style="font-family: monospace; font-size: 0.8rem; opacity: 0.8;">00000000  7f 45 4c 46 02 01 01 00  00 00 00 00 00 00 00 00  |.ELF............|<br>00000010  03 00 3e 00 01 00 00 00  60 60 00 00 00 00 00 00  |..>.....\`\`......|<br>00000020  40 00 00 00 00 00 00 00  d0 1d 02 00 00 00 00 00  |@...............|<br><span style="color:var(--accent);">[+] Memory Read Complete.</span></div>`; break;
                    case 'matrix': const status = window.toggleMatrix(); responseHTML = `<span style="color: #0f0; font-weight: bold;">${status}</span>`; break;

                    case 'ping': case 'ping google.com':
                        const pingStart = document.createElement('div'); pingStart.classList.add('response-line'); pingStart.innerHTML = "PING google.com (142.250.190.46): 56 data bytes"; cliBody.insertBefore(pingStart, cliInput.parentElement.parentElement.lastElementChild);
                        let count = 0; const maxPings = 4;
                        const interval = setInterval(() => {
                            count++; const time = Math.floor(Math.random() * 20) + 10;
                            const packet = document.createElement('div'); packet.classList.add('response-line');
                            packet.innerHTML = `64 bytes from 142.250.190.46: icmp_seq=${count} ttl=114 time=${time} ms`;
                            cliBody.insertBefore(packet, cliInput.parentElement.parentElement.lastElementChild); cliBody.scrollTop = cliBody.scrollHeight;
                            if (count >= maxPings) { clearInterval(interval); const summary = document.createElement('div'); summary.classList.add('response-line'); summary.innerHTML = `<br>--- google.com ping statistics ---<br>${maxPings} packets transmitted, ${maxPings} packets received, 0.0% packet loss`; cliBody.insertBefore(summary, cliInput.parentElement.parentElement.lastElementChild); cliBody.scrollTop = cliBody.scrollHeight; }
                        }, 800); cliInput.value = ''; return;
                    case '': break;
                    default: responseHTML = `bash: ${command}: command not found`;
                }

                if (responseHTML) {
                    const responseDiv = document.createElement('div'); responseDiv.classList.add('response-line'); responseDiv.innerHTML = responseHTML; cliBody.insertBefore(responseDiv, cliInput.parentElement.parentElement.lastElementChild);
                }
                cliInput.value = ''; cliBody.scrollTop = cliBody.scrollHeight;
            }
        });
    }

    // CLI Controls
    function resetTerminalPosition() { cliTerminal.style.top = ''; cliTerminal.style.left = ''; cliTerminal.style.bottom = '50px'; cliTerminal.style.right = '20px'; }
    window.minimizeCLI = function () { resetTerminalPosition(); cliTerminal.classList.toggle('minimized'); }
    window.closeCLI = function () { resetTerminalPosition(); cliTerminal.classList.add('closed'); }
    window.toggleCLI = function () {
        if (cliTerminal.classList.contains('closed') || cliTerminal.classList.contains('minimized')) { cliTerminal.classList.remove('closed'); cliTerminal.classList.remove('minimized'); }
        else { resetTerminalPosition(); cliTerminal.classList.add('minimized'); }
    }

    // Drag Logic
    const header = document.getElementById('cli-header');
    let isDragging = false; let startX, startY, initialLeft, initialTop;
    if (header) {
        header.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('dot')) return;
            isDragging = true; startX = e.clientX; startY = e.clientY;
            const rect = cliTerminal.getBoundingClientRect(); initialLeft = rect.left; initialTop = rect.top;
            cliTerminal.classList.add('dragging');
        });
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX; const dy = e.clientY - startY;
            cliTerminal.style.bottom = 'auto'; cliTerminal.style.right = 'auto';
            cliTerminal.style.left = `${initialLeft + dx}px`; cliTerminal.style.top = `${initialTop + dy}px`;
        });
        document.addEventListener('mouseup', () => { isDragging = false; cliTerminal.classList.remove('dragging'); });
    }

    // --- 8. MATRIX RAIN EFFECT ---
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';
    const charArray = chars.split('');
    const fontSize = 14; const columns = canvas.width / fontSize;
    const drops = []; for (let i = 0; i < columns; i++) { drops[i] = 1; }
    let matrixInterval; let isMatrixRunning = false;

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0'; ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) { drops[i] = 0; }
            drops[i]++;
        }
    }
    window.toggleMatrix = function () {
        if (isMatrixRunning) { clearInterval(matrixInterval); canvas.style.display = 'none'; isMatrixRunning = false; return "Matrix Mode: DEACTIVATED"; }
        else { canvas.style.display = 'block'; matrixInterval = setInterval(drawMatrix, 50); isMatrixRunning = true; return "Matrix Mode: ACTIVATED (Follow the white rabbit...)"; }
    }
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

    // --- 9. HACKER TEXT SCRAMBLE ---
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    document.querySelectorAll(".hacker-text").forEach(target => {
        target.dataset.value = target.innerText;
        target.addEventListener("mouseover", event => {
            let iterations = 0; const originalText = event.target.dataset.value;
            const interval = setInterval(() => {
                event.target.innerText = originalText.split("").map((letter, index) => {
                    if (index < iterations) return originalText[index];
                    return letters[Math.floor(Math.random() * 26)];
                }).join("");
                if (iterations >= originalText.length) { clearInterval(interval); }
                iterations += 1 / 3;
            }, 30);
        });
    });
});