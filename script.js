document.addEventListener('DOMContentLoaded', () => {

    const unlockScreen = document.getElementById('system-unlock-screen');
    const initBtn = document.getElementById('init-btn');
    const bgAudio = document.getElementById('ambient-audio');
    const audioToggle = document.getElementById('audio-toggle');
    
    let audioCtx; 

    initBtn.addEventListener('click', () => {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        if (bgAudio) {
            // Extremely faint volume (2%)
            bgAudio.volume = 0.02; 
            bgAudio.play().catch(e => console.log("Audio play prevented by browser:", e));
        }

        unlockScreen.style.opacity = '0';
        setTimeout(() => {
            unlockScreen.style.display = 'none';
        }, 400);

        const initialTitle = document.querySelector('.tab-pane.active .decode-text');
        if(initialTitle) scrambleText(initialTitle);
        
        playSound();
    });

    if (audioToggle && bgAudio) {
        audioToggle.addEventListener('click', (e) => {
            if (bgAudio.paused) {
                bgAudio.volume = 0.02;
                bgAudio.play();
                audioToggle.innerHTML = '<i class="fas fa-volume-up"></i> AUDIO_SYNC';
            } else {
                bgAudio.pause();
                audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i> MUTED';
            }
        });
    }

    function playSound() {
        if (!audioCtx) return; 
        
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); 
        oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime); 
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    }

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>";
    function scrambleText(element) {
        if(!element.dataset.value) {
            element.dataset.value = element.innerText;
        }
        
        let iterations = 0; 
        const originalText = element.dataset.value;
        
        const interval = setInterval(() => {
            element.innerText = originalText.split("").map((letter, index) => {
                if(index < iterations) {
                    return originalText[index];
                }
                return letters[Math.floor(Math.random() * letters.length)];
            }).join("");
            
            if(iterations >= originalText.length){ 
                clearInterval(interval);
            }
            iterations += 1 / 2; 
        }, 20);
    }

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            playSound(); 

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const activePane = document.getElementById(targetId);
            activePane.classList.add('active');
            
            const titleToScramble = activePane.querySelector('.decode-text');
            if(titleToScramble) {
                scrambleText(titleToScramble);
            }
        });
    });
});