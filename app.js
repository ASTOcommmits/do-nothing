// Button That Does Nothing - JavaScript
class DoNothingButton {
    constructor() {
        this.data = {
            buttonTexts: [
                "DO NOT PRESS",
                "This Button Does Nothing",
                "USELESS BUTTON",
                "DON'T CLICK ME",
                "ABSOLUTELY POINTLESS",
                "WASTE OF TIME BUTTON",
                "SERIOUSLY, DON'T PRESS",
                "100% USELESS",
                "DANGER: DOES NOTHING"
            ],
            warnings: [
                "⚠️ WARNING: This button serves no purpose whatsoever",
                "🚨 CAUTION: Pressing this button will accomplish nothing",
                "⛔ DANGER: Extremely useless button ahead",
                "❌ NOTICE: This button is completely pointless",
                "🔴 ALERT: You have been warned about this button's uselessness"
            ],
            milestoneMessages: {
                "1": "Congratulations! You've officially done nothing.",
                "10": "10 clicks of pure nothingness. Well done?",
                "25": "25 clicks! You're really committed to this whole 'doing nothing' thing.",
                "50": "50 clicks! Halfway to... absolutely nothing.",
                "100": "100 clicks! You've reached a new level of pointlessness.",
                "200": "200 clicks! This is getting concerning...",
                "500": "500 clicks! You might have a problem.",
                "1000": "1000 clicks! Congratulations, you've mastered the art of doing nothing."
            }
        };

        this.clickCount = 0;
        this.currentWarningIndex = 0;
        this.currentButtonTextIndex = 0;
        this.milestoneTimeout = null;

        // Initialize after a small delay to ensure DOM is ready
        setTimeout(() => {
            this.init();
        }, 100);
    }

    init() {
        console.log('Initializing DoNothingButton...');
        this.loadClickCount();
        this.bindEvents();
        this.startWarningRotation();
        this.updateClickDisplay();
        this.animateStats();
        console.log('DoNothingButton initialized. Current click count:', this.clickCount);
    }

    bindEvents() {
        const button = document.getElementById('doNothingBtn');
        console.log('Button element found:', !!button);
        
        if (button) {
            button.addEventListener('click', (e) => {
                console.log('Button click event triggered');
                this.handleButtonClick(e);
            });
            
            // Add keyboard support
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    console.log('Button keyboard event triggered');
                    this.handleButtonClick(e);
                }
            });
        } else {
            console.error('Button element not found!');
        }
    }

    handleButtonClick(event) {
        console.log('handleButtonClick called - current count:', this.clickCount);
        
        // Increment counter
        this.clickCount++;
        console.log('Button clicked! New count:', this.clickCount);
        
        // Save and update display immediately
        this.saveClickCount();
        this.updateClickDisplay();

        // Add visual feedback
        this.addClickAnimation(event.target);

        // Check for milestones
        this.checkMilestone();

        // Occasionally change button text
        if (this.clickCount > 0 && this.clickCount % 15 === 0) {
            this.changeButtonText();
        }

        // Add some satisfying audio feedback (if supported)
        this.playClickSound();

        // Vibrate on mobile (if supported)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        // Log the useless action
        console.log(`Click #${this.clickCount}: Successfully accomplished nothing.`);
    }

    addClickAnimation(button) {
        // Remove existing animation classes
        button.classList.remove('clicked', 'milestone-reached');
        
        // Trigger reflow to ensure class removal
        button.offsetHeight;
        
        // Add click animation
        button.classList.add('clicked');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 300);
    }

    checkMilestone() {
        const milestoneMessage = this.data.milestoneMessages[this.clickCount.toString()];
        console.log('Checking milestone for count:', this.clickCount, 'Message:', milestoneMessage);
        
        if (milestoneMessage) {
            this.showMilestoneMessage(milestoneMessage);
            this.addMilestoneAnimation();
        }
    }

    showMilestoneMessage(message) {
        console.log('Showing milestone message:', message);
        const milestoneEl = document.getElementById('milestoneMessage');
        const milestoneTextEl = document.getElementById('milestoneText');
        
        console.log('Milestone elements found:', !!milestoneEl, !!milestoneTextEl);
        
        if (milestoneEl && milestoneTextEl) {
            milestoneTextEl.textContent = message;
            milestoneEl.classList.remove('hidden');
            
            // Clear existing timeout
            if (this.milestoneTimeout) {
                clearTimeout(this.milestoneTimeout);
            }
            
            // Hide milestone message after 5 seconds
            this.milestoneTimeout = setTimeout(() => {
                milestoneEl.classList.add('hidden');
            }, 5000);
        }
    }

    addMilestoneAnimation() {
        const button = document.getElementById('doNothingBtn');
        if (button) {
            button.classList.add('milestone-reached');
            setTimeout(() => {
                button.classList.remove('milestone-reached');
            }, 800);
        }
    }

    changeButtonText() {
        const button = document.getElementById('doNothingBtn');
        if (button) {
            this.currentButtonTextIndex = (this.currentButtonTextIndex + 1) % this.data.buttonTexts.length;
            button.textContent = this.data.buttonTexts[this.currentButtonTextIndex];
        }
    }

    startWarningRotation() {
        // Rotate warnings every 8 seconds
        setInterval(() => {
            this.rotateWarning();
        }, 8000);
    }

    rotateWarning() {
        const warningEl = document.getElementById('warningText');
        if (warningEl) {
            this.currentWarningIndex = (this.currentWarningIndex + 1) % this.data.warnings.length;
            
            // Add fade transition
            warningEl.style.transition = 'opacity 0.2s ease-in-out';
            warningEl.style.opacity = '0';
            
            setTimeout(() => {
                warningEl.textContent = this.data.warnings[this.currentWarningIndex];
                warningEl.style.opacity = '1';
            }, 200);
        }
    }

    updateClickDisplay() {
        console.log('updateClickDisplay called with count:', this.clickCount);
        
        // Try to find the element
        const clickCountEl = document.getElementById('clickCount');
        console.log('Click count element found:', !!clickCountEl);
        
        if (clickCountEl) {
            // Update the text content
            const displayValue = this.clickCount.toLocaleString();
            clickCountEl.textContent = displayValue;
            console.log('Click count display updated to:', displayValue);
            
            // Add a subtle animation to the counter
            clickCountEl.style.transform = 'scale(1.2)';
            clickCountEl.style.transition = 'transform 0.15s ease-out, color 0.15s ease-out';
            clickCountEl.style.color = 'var(--color-primary)';
            
            setTimeout(() => {
                clickCountEl.style.transform = 'scale(1)';
            }, 150);
        } else {
            console.error('Click count element (#clickCount) not found!');
            // Try to find it by other means
            const allSpans = document.querySelectorAll('span');
            console.log('All spans found:', allSpans.length);
            allSpans.forEach((span, index) => {
                console.log(`Span ${index}:`, span.id, span.textContent);
            });
        }
    }

    animateStats() {
        // Animate the global stats to make them feel "live"
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach((stat, index) => {
            if (index === 0) { // Total clicks stat
                setInterval(() => {
                    const currentValue = parseInt(stat.textContent.replace(/,/g, ''));
                    const increment = Math.floor(Math.random() * 10) + 1;
                    stat.textContent = (currentValue + increment).toLocaleString();
                }, 3000 + Math.random() * 2000);
            }
        });
    }

    playClickSound() {
        // Create a subtle audio context for click feedback
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            // Audio not supported or blocked, fail silently
            console.log('Audio feedback not available');
        }
    }

    loadClickCount() {
        // Note: We can't use localStorage in the sandbox, so we'll simulate it
        const stored = this.getStoredValue('doNothingClickCount');
        this.clickCount = stored ? parseInt(stored) : 0;
        console.log('Loaded click count from storage:', this.clickCount);
    }

    saveClickCount() {
        // Simulate localStorage
        this.setStoredValue('doNothingClickCount', this.clickCount.toString());
        console.log('Saved click count to storage:', this.clickCount);
    }

    // Simulate localStorage methods since we can't use real localStorage
    getStoredValue(key) {
        if (!window.simulatedStorage) {
            window.simulatedStorage = {};
        }
        return window.simulatedStorage[key];
    }

    setStoredValue(key, value) {
        if (!window.simulatedStorage) {
            window.simulatedStorage = {};
        }
        window.simulatedStorage[key] = value;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, waiting for full initialization...');
    
    // Wait a bit more to ensure everything is ready
    setTimeout(() => {
        console.log('Creating DoNothingButton instance...');
        const app = new DoNothingButton();
        
        // Store reference globally for debugging
        window.doNothingApp = app;
        
        // Add some Easter eggs to the console
        console.log('%cButton That Does Nothing v1.0', 'color: #ff4757; font-weight: bold; font-size: 16px;');
        console.log('%cCongratulations! You\'ve loaded a completely useless application.', 'color: #626c71; font-style: italic;');
        console.log('%cFeatures:', 'color: #218e8c; font-weight: bold;');
        console.log('• ✅ Does nothing');
        console.log('• ✅ Accomplishes nothing');  
        console.log('• ✅ Produces no meaningful output');
        console.log('• ✅ Wastes your time efficiently');
        console.log('%cClick the button to experience the full range of nothingness!', 'color: #ff4757;');
        
        // Add a fun console command
        window.resetButton = () => {
            app.clickCount = 0;
            app.updateClickDisplay();
            app.setStoredValue('doNothingClickCount', '0');
            console.log('Button reset! You can now start doing nothing all over again.');
        };
        
        console.log('%cType resetButton() to reset your progress and start doing nothing from scratch!', 'color: #218e8c; font-style: italic;');
    }, 200);
});

// Add some window-level functions for fun
window.doNothing = () => {
    console.log('You called doNothing() and it did exactly what you expected: nothing.');
    return null;
};

window.accomplishNothing = () => {
    console.log('Mission accomplished: Nothing achieved successfully.');
    return undefined;
};

window.wasteTime = (seconds = 1) => {
    console.log(`Wasting ${seconds} seconds for you...`);
    setTimeout(() => {
        console.log('Time successfully wasted. Hope you\'re satisfied.');
    }, seconds * 1000);
};

// Export for potential testing (though what would we test?)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DoNothingButton;
}