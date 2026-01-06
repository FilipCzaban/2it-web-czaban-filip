console.log('NeoBank app initialized');

const state = {
    isLoggedIn: false,
    user: {
        name: 'Jan Novák',
        balance: 125000.50
    },
    currentView: 'dashboard',
    authView: 'login', // 'login' or 'register'
    darkMode: localStorage.getItem('darkMode') === 'true',
    showLanding: true
};

// Premium SVG Icons
const icons = {
    home: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    payments: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`,
    history: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
    cards: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`,
    settings: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
    send: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`,
    scan: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>`,
    topup: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    arrowUpRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`,
    arrowDownLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="7" x2="7" y2="17"/><polyline points="17 17 7 17 7 7"/></svg>`,
    logout: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    lock: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    x: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`
};




function applyTheme() {
    if (state.darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function toggleDarkMode() {
    state.darkMode = !state.darkMode;
    localStorage.setItem('darkMode', state.darkMode);
    applyTheme();
    render();
}

// User Storage Helpers
function getUsers() {
    const users = localStorage.getItem('neoBankUsers');
    return users ? JSON.parse(users) : [];
}

function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('neoBankUsers', JSON.stringify(users));
}

function findUser(email) {
    const users = getUsers();
    return users.find(u => u.email === email);
}

function deleteUser(email) {
    let users = getUsers();
    users = users.filter(u => u.email !== email);
    localStorage.setItem('neoBankUsers', JSON.stringify(users));
}

function updateUser(updatedUser) {
    let users = getUsers();
    const index = users.findIndex(u => u.email === updatedUser.email);
    if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem('neoBankUsers', JSON.stringify(users));
    }
}

function renderModal(title, contentHTML) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.onclick = (e) => {
        if (e.target === modal) document.body.removeChild(modal);
    };

    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                ${icons.x || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'}
            </button>
            <h2 style="margin-bottom: 1.5rem; font-size: 1.5rem;">${title}</h2>
            ${contentHTML}
        </div>
    `;

    document.body.appendChild(modal);
}

function changePassword() {
    const content = `
        <div class="input-group">
            <label>Staré heslo</label>
            <div class="input-wrapper">
                <div class="input-icon">${icons.lock}</div>
                <input type="password" id="old-password" placeholder="Zadejte staré heslo">
            </div>
        </div>
        <div class="input-group">
            <label>Nové heslo</label>
            <div class="input-wrapper">
                <div class="input-icon">${icons.lock}</div>
                <input type="password" id="new-password" placeholder="Zadejte nové heslo (min. 8 znaků)">
            </div>
        </div>
        <div class="input-group">
            <label>Potvrzení nového hesla</label>
            <div class="input-wrapper">
                <div class="input-icon">${icons.lock}</div>
                <input type="password" id="confirm-new-password" placeholder="Potvrďte nové heslo">
            </div>
        </div>
        <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="window.handlePasswordChange(this)">Změnit heslo</button>
    `;
    renderModal('Změna hesla', content);
}

function handlePasswordChange(btn) {
    const oldPass = document.getElementById('old-password').value;
    const newPass = document.getElementById('new-password').value;
    const confirmPass = document.getElementById('confirm-new-password').value;

    if (oldPass !== state.user.password) {
        alert('Staré heslo není správné.');
        return;
    }

    if (newPass.length < 8) {
        alert('Nové heslo musí mít alespoň 8 znaků.');
        return;
    }

    if (newPass !== confirmPass) {
        alert('Nová hesla se neshodují.');
        return;
    }

    state.user.password = newPass;
    updateUser(state.user);
    alert('Heslo bylo úspěšně změněno.');
    document.querySelector('.modal-overlay').remove();
}

function findUserByAccountNumber(accountNumber) {
    const users = getUsers();
    return users.find(u => u.accountNumber === accountNumber);
}

function handlePayment(e) {
    e.preventDefault();
    const recipientAccount = document.getElementById('payment-recipient').value.trim();
    const amount = parseFloat(document.getElementById('payment-amount').value);
    const note = document.getElementById('payment-note').value.trim();

    if (!recipientAccount) {
        alert('Zadejte číslo účtu příjemce.');
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert('Zadejte platnou částku.');
        return;
    }

    if (amount > state.user.balance) {
        alert('Nedostatek finančních prostředků.');
        return;
    }

    const recipient = findUserByAccountNumber(recipientAccount);
    if (!recipient) {
        alert('Účet s tímto číslem neexistuje.');
        return;
    }

    if (recipient.email === state.user.email) {
        alert('Nemůžete poslat peníze sami sobě.');
        return;
    }

    // Process transaction
    // 1. Deduct from sender
    state.user.balance -= amount;
    const senderTransaction = {
        id: Date.now(),
        type: 'outgoing',
        amount: amount,
        date: new Date().toISOString(),
        description: recipient.name,
        note: note
    };
    state.user.transactions.unshift(senderTransaction);
    updateUser(state.user);

    // 2. Add to recipient
    recipient.balance += amount;
    const recipientTransaction = {
        id: Date.now() + 1,
        type: 'incoming',
        amount: amount,
        date: new Date().toISOString(),
        description: state.user.name,
        note: note
    };
    recipient.transactions.unshift(recipientTransaction);
    updateUser(recipient);

    alert(`Platba ${formatCurrency(amount)} pro ${recipient.name} byla úspěšně odeslána.`);
    window.navigateTo('dashboard');
}

function register() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const confirmPassword = document.getElementById('reg-confirm-password').value.trim();

    if (!name || !email || !password || !confirmPassword) {
        alert('Vyplňte prosím všechna pole.');
        return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Zadejte prosím platnou emailovou adresu.');
        return;
    }

    if (password.length < 8) {
        alert('Heslo musí mít alespoň 8 znaků.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Hesla se neshodují.');
        return;
    }

    if (findUser(email)) {
        alert('Uživatel s tímto emailem již existuje.');
        return;
    }

    const newUser = {
        name,
        email,
        password,
        balance: 0,
        savingsBalance: 0,
        accountNumber: generateAccountNumber(),
        transactions: []
    };

    saveUser(newUser);
    alert('Registrace úspěšná! Nyní se můžete přihlásit.');
    state.authView = 'login';
    render();
}

function generateAccountNumber() {
    // Generate random 10 digit number
    const randomPart = Math.floor(Math.random() * 9000000000) + 1000000000;
    return `${randomPart}/9999`;
}

function login() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    const user = findUser(email);

    if (user && user.password === password) {
        state.isLoggedIn = true;
        state.user = user;
        state.showLanding = false;
        render();
    } else {
        alert('Nesprávné přihlašovací údaje!');
    }
}

function logout() {
    state.isLoggedIn = false;
    state.currentView = 'dashboard';
    state.authView = 'login';
    state.showLanding = true;
    render();
}

function deleteAccount() {
    if (confirm('Opravdu chcete smazat svůj účet? Tato akce je nevratná.')) {
        deleteUser(state.user.email);
        logout();
    }
}

function navigateTo(view) {
    state.currentView = view;
    render();
}

function setAuthView(view) {
    state.authView = view;
    render();
}

function showLanding() {
    state.showLanding = true;
    render();
}

function showLogin() {
    state.showLanding = false;
    state.authView = 'login';
    render();
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Dobré ráno';
    if (hour < 18) return 'Dobré odpoledne';
    return 'Dobrý večer';
}

function render() {
    const app = document.getElementById('app');

    if (state.showLanding && !state.isLoggedIn) {
        renderLanding(app);
    } else if (!state.isLoggedIn) {
        if (state.authView === 'login') {
            renderLogin(app);
        } else {
            renderRegister(app);
        }
    } else {
        renderMainLayout(app);
    }
}

function renderLanding(container) {
    container.innerHTML = `
        <div class="landing-wrapper">
            <div class="landing-nav">
                <div class="logo">NeoBank</div>
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <button onclick="window.toggleDarkMode()" class="theme-toggle" style="position: static; margin-right: 10px;">
                        ${state.darkMode ?
            '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M4.93 4.93l1.41 1.41" /><path d="M17.66 17.66l1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M6.34 17.66l-1.41 1.41" /><path d="M19.07 4.93l-1.41 1.41" /></svg>' :
            '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>'
        }
                    </button>
                    <button class="btn btn-primary" onclick="window.showLogin()">Přihlásit se</button>
                </div>
            </div>

            <div class="landing-hero animate-fade-in">
                <h1 style="font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; background: linear-gradient(135deg, var(--primary-blue), var(--secondary-cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Bankovnictví<br>budoucnosti.
                </h1>
                <p style="font-size: 1.25rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.6;">
                    Bezpečné, rychlé a moderní. NeoBank přináší revoluci ve správě vašich financí s intuitivním designem a špičkovými technologiemi.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="btn btn-primary" style="padding: 16px 32px; font-size: 1.1rem;" onclick="window.showLogin()">Začít hned</button>
                    <button class="btn btn-outline" style="padding: 16px 32px; font-size: 1.1rem;">Dozvědět se více</button>
                </div>
            </div>

            <div class="landing-features">
                <div class="feature-card">
                    <div class="feature-icon">${icons.lock}</div>
                    <h3>Maximální bezpečnost</h3>
                    <p>Vaše finance jsou chráněny nejmodernějším šifrováním a dvoufázovým ověřením.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">${icons.send}</div>
                    <h3>Okamžité platby</h3>
                    <p>Posílejte peníze přátelům a rodině během vteřin, kdykoliv a kdekoliv.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">${icons.cards}</div>
                    <h3>Přehledné finance</h3>
                    <p>Mějte dokonalý přehled o svých výdajích díky chytrým statistikám a kategoriím.</p>
                </div>
            </div>
            
            <div class="login-bg-shape shape-1"></div>
            <div class="login-bg-shape shape-2"></div>
        </div>
    `;
}

function renderLogin(container) {
    container.innerHTML = `
        <div class="login-wrapper">
            <div class="login-bg-shape shape-1"></div>
            <div class="login-bg-shape shape-2"></div>
            
            <!-- Back Arrow -->
            <button onclick="window.showLanding()" class="back-arrow">
                ${icons.arrowLeft}
            </button>

            <!-- Theme Toggle -->
            <button onclick="window.toggleDarkMode()" class="theme-toggle">
                ${state.darkMode ?
            '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M4.93 4.93l1.41 1.41" /><path d="M17.66 17.66l1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M6.34 17.66l-1.41 1.41" /><path d="M19.07 4.93l-1.41 1.41" /></svg>' :
            '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>'
        }
            </button>

            <div class="login-card animate-fade-in">
                <div style="margin-bottom: 2rem;">
                    <div class="logo" style="font-size: 2.5rem; margin-bottom: 0.5rem;">NeoBank</div>
                    <div style="color: var(--text-muted);">Vítejte zpět</div>
                </div>

                <div class="input-group">
                    <label>Email</label>
                    <div class="input-wrapper">
                        <div class="input-icon">${icons.mail}</div>
                        <input type="email" id="login-email" placeholder="vas@email.cz" value="">
                    </div>
                </div>

                <div class="input-group" style="margin-bottom: 2rem;">
                    <label>Heslo</label>
                    <div class="input-wrapper">
                        <div class="input-icon">${icons.lock}</div>
                        <input type="password" id="login-password" placeholder="••••••••" value="">
                    </div>
                </div>

                <button class="btn btn-primary" style="width: 100%; padding: 18px; font-size: 1.1rem; display: flex; justify-content: center; align-items: center; gap: 10px;" onclick="window.login()">
                    <span>Přihlásit se</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>

                <div style="margin-top: 1.5rem; text-align: center; font-size: 0.95rem;">
                    <span style="color: var(--text-muted);">Nemáte účet?</span>
                    <button onclick="window.setAuthView('register')" style="background: none; border: none; color: var(--primary-blue); font-weight: 600; cursor: pointer; margin-left: 5px; font-family: inherit; font-size: inherit;">Zaregistrovat se</button>
                </div>

                <div style="margin-top: 2rem; color: var(--text-muted); font-size: 0.9rem; position: relative; z-index: 2;">
                    © 2025 NeoBank Group. Všechna práva vyhrazena.
                </div>
            </div>
        </div>
    `;
}

function renderRegister(container) {
    container.innerHTML = `
        <div class="login-wrapper">
            <div class="login-bg-shape shape-1"></div>
            <div class="login-bg-shape shape-2"></div>

            <!-- Back Arrow -->
            <button onclick="window.showLanding()" class="back-arrow">
                ${icons.arrowLeft}
            </button>

            <!-- Theme Toggle -->
            <button onclick="window.toggleDarkMode()" class="theme-toggle">
                ${state.darkMode ?
            '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M4.93 4.93l1.41 1.41" /><path d="M17.66 17.66l1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M6.34 17.66l-1.41 1.41" /><path d="M19.07 4.93l-1.41 1.41" /></svg>' :
            '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>'
        }
            </button>

            <div class="login-card animate-fade-in">
                <div style="margin-bottom: 2rem;">
                    <div class="logo" style="font-size: 2.5rem; margin-bottom: 0.5rem;">NeoBank</div>
                    <div style="color: var(--text-muted);">Vytvoření nového účtu</div>
                </div>

                <div class="input-group">
                    <label>Celé jméno</label>
                    <div class="input-wrapper">
                        <div class="input-icon">${icons.user}</div>
                        <input type="text" id="reg-name" placeholder="Jan Novák">
                    </div>
                </div>

                <div class="input-group">
                    <label>Email</label>
                    <div class="input-wrapper">
                        <div class="input-icon">${icons.mail}</div>
                        <input type="email" id="reg-email" placeholder="vas@email.cz">
                    </div>
                </div>

                <div class="input-group">
                    <label>Heslo</label>
                    <div class="input-wrapper">
                        <div class="input-icon">${icons.lock}</div>
                        <input type="password" id="reg-password" placeholder="••••••••">
                    </div>
                </div>

                <div class="input-group" style="margin-bottom: 1rem;">
                    <label>Potvrzení hesla</label>
                    <div class="input-wrapper">
                        <div class="input-icon">${icons.lock}</div>
                        <input type="password" id="reg-confirm-password" placeholder="••••••••">
                    </div>
                </div>
                
                <button class="btn btn-primary" style="width: 100%; padding: 18px; margin-top: 1.5rem; font-size: 1.1rem; display: flex; justify-content: center; align-items: center; gap: 10px;" onclick="window.register()">
                    <span>Vytvořit účet</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
                
                <div style="margin-top: 1.5rem; text-align: center; font-size: 0.95rem;">
                    <span style="color: var(--text-muted);">Již máte účet?</span>
                    <button onclick="window.setAuthView('login')" style="background: none; border: none; color: var(--primary-blue); font-weight: 600; cursor: pointer; margin-left: 5px; font-family: inherit; font-size: inherit;">Přihlásit se</button>
                </div>

                <div style="margin-top: 2rem; color: var(--text-muted); font-size: 0.9rem; position: relative; z-index: 2;">
                    © 2025 NeoBank Group. Všechna práva vyhrazena.
                </div>
            </div>
        </div>
    `;
}

function renderMainLayout(container) {
    container.innerHTML = `
        <div class="header">
            <div class="logo">NeoBank</div>
            <div style="display: flex; align-items: center; gap: 2rem;">
                <div style="text-align: right;">
                    <div style="font-weight: 600; font-size: 0.95rem;">${state.user.name}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">Osobní účet</div>
                </div>
                <button class="btn btn-outline" onclick="window.logout()" style="padding: 10px 20px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                    ${icons.logout} Odhlásit
                </button>
            </div>
        </div>
        <div class="main-layout">
            <div class="sidebar active">
                <div class="nav-item ${state.currentView === 'dashboard' ? 'active' : ''}" onclick="window.navigateTo('dashboard')">
                    ${icons.home} Přehled
                </div>
                <div class="nav-item ${state.currentView === 'payments' ? 'active' : ''}" onclick="window.navigateTo('payments')">
                    ${icons.payments} Platby
                </div>
                <div class="nav-item ${state.currentView === 'history' ? 'active' : ''}" onclick="window.navigateTo('history')">
                    ${icons.history} Historie
                </div>
                <div class="nav-item">
                    ${icons.cards} Karty
                </div>
                <div class="nav-item ${state.currentView === 'settings' ? 'active' : ''}" onclick="window.navigateTo('settings')">
                    ${icons.settings} Nastavení
                </div>
                <div style="margin-top: auto; padding: 24px; background: linear-gradient(135deg, #f8fafc, #eff6ff); border-radius: 16px; border: 1px solid #e2e8f0;">
                    <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">Potřebujete pomoc?</div>
                    <div style="font-weight: 700; color: var(--primary-blue); font-size: 1.1rem;">800 123 456</div>
                </div>
            </div>
            <div class="content" id="main-content">
                <!-- Content injected by renderDashboard/History/Payments/Settings -->
            </div>
        </div>
    `;

    // Update sidebar background for dark mode
    if (state.darkMode) {
        const helpBox = container.querySelector('.sidebar > div:last-child');
        if (helpBox) {
            helpBox.style.background = 'rgba(255,255,255,0.05)';
            helpBox.style.border = '1px solid rgba(255,255,255,0.1)';
        }
    }

    const content = document.getElementById('main-content');
    if (state.currentView === 'dashboard') renderDashboard(content);
    else if (state.currentView === 'payments') renderPayments(content);
    else if (state.currentView === 'history') renderHistory(content);
    else if (state.currentView === 'settings') renderSettings(content);
}

function renderSettings(content) {
    content.innerHTML = `
        <div class="animate-fade-in">
            <h2 style="margin-bottom: 2rem;">Nastavení</h2>
            
            <div class="card-premium" style="margin-bottom: 2rem;">
                <div style="display: flex; align-items: center; margin-bottom: 2rem;">
                    <div style="width: 80px; height: 80px; background: ${state.darkMode ? 'rgba(255,255,255,0.1)' : '#eff6ff'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: var(--primary-blue); margin-right: 1.5rem;">
                        ${state.user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <h3 style="margin-bottom: 4px;">${state.user.name}</h3>
                        <p style="color: var(--text-muted);">${state.user.email}</p>
                        <p style="color: var(--text-muted); font-size: 0.9rem; font-family: monospace; margin-top: 4px;">${state.user.accountNumber || ''}</p>
                    </div>
                </div>

                <div class="settings-section">
                    <h4 style="margin-bottom: 1rem; color: var(--text-muted); text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Zabezpečení</h4>
                    
                    <div class="settings-item">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 4px;">Změna hesla</div>
                            <div style="font-size: 0.9rem; color: var(--text-muted);">Poslední změna před 3 měsíci</div>
                        </div>
                        <button class="btn btn-outline" style="padding: 8px 16px;" onclick="window.changePassword()">Změnit</button>
                    </div>
                    
                    <div class="settings-item">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 4px;">Dvoufázové ověření</div>
                            <div style="font-size: 0.9rem; color: var(--text-muted);">Zvýšení bezpečnosti účtu</div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>

                <div class="settings-section" style="margin-bottom: 0;">
                    <h4 style="margin-bottom: 1rem; color: var(--text-muted); text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Aplikace</h4>
                    
                    <div class="settings-item">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 4px;">Tmavý režim</div>
                            <div style="font-size: 0.9rem; color: var(--text-muted);">Přepnout na tmavý vzhled</div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" ${state.darkMode ? 'checked' : ''} onchange="window.toggleDarkMode()">
                            <span class="slider"></span>
                        </label>
                    </div>
                    
                    <div class="settings-item">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 4px;">Notifikace</div>
                            <div style="font-size: 0.9rem; color: var(--text-muted);">Upozornění na platby a zprávy</div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="card-premium" style="border-color: rgba(239, 68, 68, 0.2);">
                <h3 style="color: #ef4444; margin-bottom: 1rem;">Nebezpečná zóna</h3>
                <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Smazání účtu je nevratná akce. Přijdete o všechna data a historii transakcí.</p>
                <button class="btn btn-outline" style="color: #ef4444; border-color: rgba(239, 68, 68, 0.3);" onclick="window.deleteAccount()">Smazat účet</button>
            </div>
        </div>
    `;
}

function renderDashboard(content) {
    content.innerHTML = `
        <div class="animate-fade-in">
            <div style="margin-bottom: 3rem;">
                <h2 style="margin-bottom: 0.5rem; font-size: 2rem;">${getGreeting()}, ${vocative(state.user.name.split(' ')[0])}</h2>
                <p style="color: var(--text-muted); font-size: 1.1rem;">Váš finanční přehled je aktuální.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 30px; margin-bottom: 4rem;">
                <!-- Main Account Card -->
                <div class="card-premium">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px;">
                        <div>
                            <div style="color: var(--text-muted); font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Běžný účet</div>
                            <div style="font-size: 1rem; color: var(--text-main); font-family: monospace;">${state.user.accountNumber || 'N/A'}</div>
                        </div>
                        <div style="background: ${state.darkMode ? 'rgba(5, 150, 105, 0.2)' : '#ecfdf5'}; color: ${state.darkMode ? '#34d399' : '#059669'}; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 700;">Aktivní</div>
                    </div>
                    <div style="font-size: 3rem; font-weight: 800; color: var(--text-main); margin-bottom: 8px; letter-spacing: -1.5px;">
                        ${formatCurrency(state.user.balance)}
                    </div>
                    <div style="font-size: 1rem; color: var(--text-muted);">Dostupný zůstatek</div>
                </div>

                <!-- Savings Account Card -->
                <div class="card-premium card-blue-gradient">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; position: relative; z-index: 1;">
                        <div>
                            <div style="opacity: 0.9; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Spořící účet</div>
                            <div style="font-size: 1rem; opacity: 1;">Spoření Plus</div>
                        </div>
                        <div style="background: rgba(255,255,255,0.25); backdrop-filter: blur(10px); padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 700;">4.5% p.a.</div>
                    </div>
                    <div style="font-size: 3rem; font-weight: 800; margin-bottom: 8px; letter-spacing: -1.5px; position: relative; z-index: 1;">
                        ${formatCurrency(state.user.savingsBalance || 0)}
                    </div>
                    <div style="font-size: 1rem; opacity: 0.9; position: relative; z-index: 1;">Celkový zůstatek</div>
                </div>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
                <h3>Rychlé akce</h3>
            </div>
            <div style="display: flex; gap: 20px; margin-bottom: 4rem;">
                <button class="btn btn-primary" onclick="window.navigateTo('payments')" style="display: flex; align-items: center; gap: 10px;">
                    ${icons.send} Nová platba
                </button>
                <button class="btn btn-outline" style="display: flex; align-items: center; gap: 10px;">
                    ${icons.scan} QR Platba
                </button>

            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem;">
                <h3>Poslední transakce</h3>
                <button class="btn btn-outline" style="padding: 8px 16px; font-size: 0.9rem;" onclick="window.navigateTo('history')">Zobrazit vše</button>
            </div>
            ${getTransactionsHTML(3)}
        </div>
    `;
}

function renderHistory(content) {
    content.innerHTML = `
        <div class="animate-fade-in">
            <h2 style="margin-bottom: 2rem;">Historie transakcí</h2>
            ${getTransactionsHTML(100)}
        </div>
    `;
}

function renderPayments(content) {
    content.innerHTML = `
        <div class="animate-fade-in payment-container">
            <h2 style="margin-bottom: 2rem; text-align: center;">Nová platba</h2>
            
            <form onsubmit="window.handlePayment(event)" class="payment-form-card">
                
                <!-- Amount Section -->
                <div class="payment-amount-wrapper">
                    <div class="payment-amount-label">Částka k odeslání</div>
                    <div class="payment-amount-input-group">
                        <input type="number" id="payment-amount" class="payment-amount-input" placeholder="0" step="0.01" min="0.01" required autofocus>
                        <span class="payment-currency">CZK</span>
                    </div>
                </div>

                <!-- Recipient Section -->
                <div class="payment-input-row">
                    <label class="payment-input-label">Číslo účtu příjemce</label>
                    <input type="text" id="payment-recipient" class="payment-input-field" placeholder="1234567890/9999" required>
                </div>

                <!-- Note Section -->
                <div class="payment-input-row">
                    <label class="payment-input-label">Zpráva pro příjemce (volitelné)</label>
                    <input type="text" id="payment-note" class="payment-input-field" placeholder="Např. Oběd, Nájem...">
                </div>

                <!-- Actions -->
                <div class="payment-actions">
                    <button type="button" class="btn btn-outline" onclick="window.navigateTo('dashboard')">Zrušit</button>
                    <button type="submit" class="btn btn-primary">Odeslat platbu</button>
                </div>
            </form>
        </div>
    `;
}

function getTransactionsHTML(limit) {
    if (!state.user.transactions || state.user.transactions.length === 0) {
        return `
            <div style="text-align: center; padding: 3rem; color: var(--text-muted); background: var(--surface-white); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
                <div style="margin-bottom: 1rem; opacity: 0.5;">${icons.history}</div>
                <p>Zatím nemáte žádné transakce.</p>
            </div>
        `;
    }

    const transactions = limit ? state.user.transactions.slice(0, limit) : state.user.transactions;

    return `
        <div class="transaction-list">
            ${transactions.map(t => `
                <div class="transaction-item">
                    <div style="display: flex; align-items: center;">
                        <div class="t-icon" style="background: ${t.type === 'incoming' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; color: ${t.type === 'incoming' ? '#10b981' : '#ef4444'};">
                            ${t.type === 'incoming' ? icons.arrowDownLeft : icons.arrowUpRight}
                        </div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 4px;">${t.description || (t.type === 'incoming' ? 'Příchozí platba' : 'Odchozí platba')}</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">${new Date(t.date).toLocaleDateString('cs-CZ')} ${t.note ? '• ' + t.note : ''}</div>
                        </div>
                    </div>
                    <div class="t-amount ${t.type === 'incoming' ? 'amount-positive' : 'amount-negative'}">
                        ${t.type === 'incoming' ? '+' : '-'}${formatCurrency(Math.abs(t.amount))}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('cs-CZ', {
        style: 'currency',
        currency: 'CZK',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function vocative(name) {
    if (!name) return '';
    const n = name.trim();
    // Simple heuristics for Czech vocative case (5. pád)
    // This is a simplified version and won't cover all edge cases

    if (n.endsWith('a')) return n.slice(0, -1) + 'o'; // Honza -> Honzo, Jana -> Jano
    if (n.endsWith('ie')) return n; // Marie -> Marie
    if (n.endsWith('e')) return n; // Libuše -> Libuše
    if (n.endsWith('i')) return n; // Jiří -> Jiří
    if (n.endsWith('o')) return n; // Ivo -> Ivo

    // Male names ending in consonants
    if (n.endsWith('n')) return n + 'e'; // Milan -> Milane, Martin -> Martine
    if (n.endsWith('m')) return n + 'e'; // Adam -> Adame
    if (n.endsWith('d')) return n + 'e'; // David -> Davide
    if (n.endsWith('t')) return n + 'e'; // Robert -> Roberte
    if (n.endsWith('p')) return n + 'e'; // Filip -> Filipe
    if (n.endsWith('b')) return n + 'e'; // Jakub -> Jakube
    if (n.endsWith('v')) return n + 'e'; // Václav -> Václave

    if (n.endsWith('r')) {
        if (n.endsWith('tr')) return n.slice(0, -1) + 'ře'; // Petr -> Petře
        return n + 'e'; // Libor -> Libore
    }

    if (n.endsWith('k')) {
        if (n.endsWith('ek')) return n.slice(0, -2) + 'ku'; // Marek -> Marku, Zdeněk -> Zdeňku
        return n + 'u'; // Patrik -> Patriku
    }

    if (n.endsWith('g')) return n + 'u'; // Oleg -> Olegu
    if (n.endsWith('h')) return n + 'u';

    if (n.endsWith('š') || n.endsWith('č') || n.endsWith('ř') || n.endsWith('ž') || n.endsWith('c') || n.endsWith('j')) {
        return n + 'i'; // Tomáš -> Tomáši, Matěj -> Matěji
    }

    if (n.endsWith('l')) {
        if (n.endsWith('el')) return n + 'i'; // Daniel -> Danieli (often also Daniele, but -i is common)
        return n + 'e'; // Michal -> Michale
    }

    return n; // Fallback
}

// Expose functions to window for onclick handlers
window.login = login;
window.register = register;
window.logout = logout;
window.navigateTo = navigateTo;
window.setAuthView = setAuthView;
window.toggleDarkMode = toggleDarkMode;
window.deleteAccount = deleteAccount;
window.handlePayment = handlePayment;
window.changePassword = changePassword;
window.handlePasswordChange = handlePasswordChange;
window.showLanding = showLanding;
window.showLogin = showLogin;

// Error handling
window.onerror = function (msg, url, line, col, error) {
    alert(`Error: ${msg} \nLine: ${line} \nCol: ${col} \nStack: ${error ? error.stack : 'N/A'} `);
    return false;
};

function initializeAdminUser() {
    const adminEmail = 'admin@seznam.cz';
    if (!findUser(adminEmail)) {
        const adminUser = {
            name: 'Admin User',
            email: adminEmail,
            password: 'admin',
            balance: 10000000,
            savingsBalance: 5000000,
            accountNumber: '1000000000/9999',
            transactions: []
        };
        saveUser(adminUser);
        console.log('Admin user initialized');
    }
}

function init() {
    try {
        initializeAdminUser();
        applyTheme();
        render();
    } catch (e) {
        alert('Init error: ' + e.message + '\n' + e.stack);
    }
}

window.onload = function () {
    init();
};
