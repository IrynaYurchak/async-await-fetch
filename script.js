let getID = id => document.getElementById(id);
let fNameRegExp = /^[a-zA-Z]{0,20}$/;
let sNameRegExp = /^[a-zA-Z]{0,20}$/;
let emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let passRegExp = /^\w{4,15}$/;

function validateForm() {
    let isFirstNameValid = fNameRegExp.test(getID('firstName').value);
    let isSecondNameValid = sNameRegExp.test(getID('secondName').value);
    let isEmailValid = emailRegExp.test(getID('email').value);
    let isPasswordValid = passRegExp.test(getID('password').value);

    let isFormValid = isFirstNameValid && isSecondNameValid && isEmailValid && isPasswordValid;
    getID('submitSignUp').disabled = !isFormValid;
}

getID('firstName').oninput = function () {
    let testFName = fNameRegExp.test(this.value);
    if (testFName) {
        this.style.border = '2px solid green';
    } else {
        this.style.border = '2px solid red';
    }
    validateForm();
}

getID('secondName').oninput = function () {
    let testSName = sNameRegExp.test(this.value);
    if (testSName) {
        this.style.border = '2px solid green';
    } else {
        this.style.border = '2px solid red';
    }
    validateForm();
}

getID('email').oninput = function () {
    let testEmail = emailRegExp.test(this.value);
    if (testEmail) {
        this.style.border = '2px solid green';
    } else {
        this.style.border = '2px solid red';
    }
    validateForm();
}

getID('password').oninput = function () {
    let testPass = passRegExp.test(this.value);
    if (testPass) {
        this.style.border = '2px solid green';
    } else {
        this.style.border = '2px solid red';
    }
    validateForm();
}

function storeUser() {
    let allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
    let user = {
        firstName: getID('firstName').value.trim(),
        secondName: getID('secondName').value.trim(),
        email: getID('email').value.trim(),
        password: getID('password').value.trim()
    };

    // Перевірка, чи всі поля заповнені
    if (user.firstName === '' || user.secondName === '' || user.email === '' || user.password === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Перевірка, чи існує вже користувач з такою електронною поштою
    if (allUsers.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
        document.querySelector('.existEmail').style.display = 'flex';
        getID('email').style.border = '2px solid red';
    } else {
        allUsers.push(user);
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        document.querySelector('.existEmail').style.display = 'none';
        resetFormFields();
    }
}

function resetFormFields() {
    ['firstName', 'secondName', 'email', 'password'].forEach(id => getID(id).value = '');
    document.querySelector('.existEmail').style.display = 'none';
    getID('email').style.border = '';
}

function resetFormFields() {
    ['firstName', 'secondName', 'email', 'password'].forEach(id => getID(id).value = '');
}

getID('submitSignUp').addEventListener('click', function (event) {
    event.preventDefault();
    storeUser();
});

getID('btn-signIn').addEventListener('click', function () {
    document.querySelector('.wrapperForm').style.display = 'none';
    document.querySelector('.signInForm').style.display = 'flex';
    document.querySelector('.formAccont').style.display = 'none';
    clearInputs();
});

getID('btn-signUp').addEventListener('click', function () {
    document.querySelector('.signInForm').style.display = 'none';
    document.querySelector('.wrapperForm').style.display = 'flex';
    document.querySelector('.formAccont').style.display = 'none';
    document.querySelector('.lSEmpty').style.display = 'none';
    document.querySelector('.error').style.display = 'none';
});

getID('submitSignIn').addEventListener('click', function (event) {
    event.preventDefault();

    const email = getID('signInEmail').value;
    const password = getID('signInPassword').value;

    // Перевірка чи 'allUsers' присутній у localStorage
    if (!localStorage.getItem('allUsers')) {
        document.querySelector('.lSEmpty').style.display = 'flex';
        document.querySelector('.error').style.display = 'none';  
        clearInputs();  
        return;
    }

    if (email.trim() === '' || password.trim() === '') {
        document.querySelector('.error').style.display = 'flex';  
        document.querySelector('.lSEmpty').style.display = 'none'; 
        return;
    }

    const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
    const user = allUsers.find(u => u.email === email && u.password === password);

    if (user) {
        document.querySelector('.signInForm').style.display = 'none';
        document.querySelector('.formAccont').style.display = 'flex';
        document.querySelector('.profileFirstName').textContent = `${user.firstName} ${user.secondName}`;
        document.querySelector('.profileEmail').textContent = user.email;
        document.querySelector('.error').style.display = 'none';
        document.querySelector('.lSEmpty').style.display = 'none';
    } else {
        document.querySelector('.error').style.display = 'flex';
        document.querySelector('.lSEmpty').style.display = 'none';
        clearInputs();  
    }
});

function clearInputs() {
    getID('signInEmail').value = '';
    getID('signInPassword').value = '';
}
getID('btn').addEventListener('click', function () {
    document.querySelector('.formAccont').style.display = 'none';
    document.querySelector('.signInForm').style.display = 'flex';
    clearInputs()
})