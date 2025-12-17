document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    const passwordInput = document.getElementById('password');
    const feedbackInput = document.querySelector('.validation-feedback');

    form.addEventListener('submit', function(event) {
        if (!validateForm()) {
            event.preventDefault();
        }
    });

    passwordInput.addEventListener('input', function() {
        validatePassword(passwordInput.value);
    });

    function validateForm() {
        let isValid = true;

        if (!form.checkValidity()) {
            isValid = false;
        }

        if (!validatePassword(passwordInput.value)) {
            isValid = false;
        }

        return isValid;
    }

    function validatePassword(password) {
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

        if (!passwordRegex.test(password)) {
            feedbackInput.textContent = "Password must be 8+ chars, contain 1 uppercase, 1 lowercase, and 1 number.";
            passwordInput.style.borderColor = '#ff3333';
            return false;
        } else {
            feedbackInput.textContent = "Password stength: Excellent";
            passwordInput.style.borderColor = '#777';
            return true;
        }
    }
});