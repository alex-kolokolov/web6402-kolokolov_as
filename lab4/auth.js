class AuthSubmission {
    constructor(mode, data) {
        this.mode = mode;
        this.data = data;
    }

    print() {
        const registering = this.mode === 'register';
        console.group(registering ? 'Регистрация' : 'Вход');
        console.log('Логин:', this.data.login);
        console.log('Пароль:', this.data.password);
        if (registering) {
            console.log('Электронная почта:', this.data.email);
            console.log('Уровень игры:', this.data.level);
            console.log('Согласие на обработку данных:', this.data.consent ? 'Да' : 'Нет');
        }
        console.log('Объект формы:', this);
        console.groupEnd();
    }
}

const form = document.querySelector('#auth-form');
const modeSwitch = form.querySelector('.auth-form__switch');
const extraFields = form.querySelector('.auth-form__extra');
const submitButton = form.querySelector('.auth-form__submit');
const statusMessage = form.querySelector('.auth-form__status');

function updateMode() {
    const registering = form.elements.mode.value === 'register';
    extraFields.hidden = !registering;
    extraFields.disabled = !registering;
    form.elements.password.autocomplete = registering ? 'new-password' : 'current-password';
    submitButton.textContent = registering ? 'Зарегистрироваться' : 'Войти';
    statusMessage.textContent = '';
}

modeSwitch.addEventListener('change', () => {
    modeSwitch.classList.add('auth-form__switch--animated');
    updateMode();
});
updateMode();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = new FormData(form);
    const mode = fields.get('mode');
    if (mode !== 'login' && mode !== 'register') {
        statusMessage.textContent = 'Выберите вход или регистрацию.';
        return;
    }

    const data = {
        login: fields.get('login'),
        password: fields.get('password'),
    };
    if (mode === 'register') {
        data.email = fields.get('email');
        data.consent = fields.has('consent');
        data.level = fields.get('level');
    }
    const submission = new AuthSubmission(mode, data);
    submission.print();
    form.reset();
    form.elements.mode.value = mode;
    updateMode();
    statusMessage.textContent = 'Данные выведены в консоль браузера.';
});
