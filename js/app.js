// SmartSupport Demo - Chat Functionality
// Professional customer service chat demo

// Chat state
let isTyping = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('SmartSupport demo loaded');
});

// Scroll to demo section
function scrollToDemo() {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Scroll to pricing
function scrollToPricing() {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    }
}

// Send message
function sendMessage() {
    const input = document.getElementById('userInput');
    if (!input || !input.value.trim() || isTyping) return;
    
    const userText = input.value.trim();
    input.value = '';
    
    // Add user message
    addMessage(userText, 'user');
    
    // Show typing indicator
    isTyping = true;
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.style.display = 'flex';
    }
    
    // Scroll to bottom
    scrollToBottom();
    
    // Simulate bot response after delay
    setTimeout(() => {
        if (typingIndicator) {
            typingIndicator.style.display = 'none';
        }
        isTyping = false;
        
        const botResponse = getBotResponse(userText);
        addMessage(botResponse, 'bot');
        scrollToBottom();
    }, 1000 + Math.random() * 1000);
}

// Send quick message
function sendQuickMessage(text) {
    const input = document.getElementById('userInput');
    if (input) {
        input.value = text;
        sendMessage();
    }
}

// Add message to chat
function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatarSvg = sender === 'bot' 
        ? '<svg width="18" height="18" viewBox="0 0 20 20" fill="#4f46e5"><circle cx="10" cy="7" r="4"/><path d="M3 19c0-4 3-7 7-7s7 3 7 7"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 20 20" fill="white"><circle cx="10" cy="7" r="4"/><path d="M3 19c0-4 3-7 7-7s7 3 7 7"/></svg>';
    
    const avatarClass = sender === 'bot' ? 'msg-avatar' : 'msg-avatar user-avatar';
    const avatarStyle = sender === 'user' ? 'background: #4f46e5;' : '';
    
    messageDiv.innerHTML = `
        <div class="${avatarClass}" style="${avatarStyle}">
            ${avatarSvg}
        </div>
        <div class="msg-bubble">
            <div class="msg-text">${escapeHtml(text)}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
}

// Get bot response based on user input
function getBotResponse(userText) {
    const text = userText.toLowerCase();
    
    if (text.includes('price') || text.includes('cost') || text.includes('plan')) {
        return "We offer 3 plans: Starter ($29/mo), Professional ($79/mo), and Enterprise ($199/mo). You can view details in the Pricing section above!";
    }
    
    if (text.includes('integrate') || text.includes('install') || text.includes('setup')) {
        return "Integration is simple! We have one-click installs for Shopify, WordPress, Wix, and 50+ platforms. Most setups take less than 5 minutes.";
    }
    
    if (text.includes('human') || text.includes('agent') || text.includes('person')) {
        return "I'm transferring you to a human agent. They'll be with you shortly. In the meantime, is there anything specific I can help with?";
    }
    
    if (text.includes('hour') || text.includes('time') || text.includes('available')) {
        return "Our team is available Monday-Friday, 9am-6pm EST. But our automated system handles messages 24/7!";
    }
    
    if (text.includes('language') || text.includes('translate')) {
        return "Yes! We support 50+ languages with automatic translation. Your customers can chat in their preferred language.";
    }
    
    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
        return "Hello! Great to meet you. I'm here to help with any questions about SmartSupport. What would you like to know?";
    }
    
    const genericResponses = [
        "That's a great question! Let me check with the team and get back to you shortly.",
        "I can help with that! Could you provide a bit more detail so I can give you the best answer?",
        "Thanks for reaching out! Our team typically handles this type of request within a few hours.",
        "I understand. Let me connect you with the right person on our team to help with this."
    ];
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}

// Handle enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Scroll chat to bottom
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Form submission
function submitForm(event) {
    event.preventDefault();
    alert('Thank you for your message! Our team will get back to you within 24 hours.');
    event.target.reset();
}
