document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('resetForm');
    const codeInputs = document.querySelectorAll('.code-input input');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const toggleButtons = document.querySelectorAll('.toggle-password');
    const errorMessage = document.getElementById('errorMessage');
    const resetButton = document.getElementById('resetButton');

    // Manejo del código de seguridad
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', function () {
            if (this.value.length === 1 && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
    });

    // Alternar visibilidad de contraseña
    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const input = this.previousElementSibling;
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            this.textContent = type === 'password' ? '👁️' : '🔒';
        });
    });

    // Manejo del envío del formulario
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        errorMessage.textContent = '';

        const code = Array.from(codeInputs).map(input => input.value).join('');
        const password = passwordInputs[0].value;
        const confirmPassword = passwordInputs[1].value;

        // Validaciones
        if (code.length !== 6) {
            showCustomAlert('Por favor, completa el código de seguridad', 'error');
            return;
        }

        if (password.length < 8) {
            showCustomAlert('La contraseña debe tener al menos 8 caracteres', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showCustomAlert('Las contraseñas no coinciden', 'error');
            return;
        }

        // Simulación de llamada a API
        resetButton.disabled = true;
        resetButton.textContent = 'Procesando...';

        fetch('/dhcoapp/auth/setNewPassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, password }),
        })
            .then(response => {
                if (response.ok) {
                    showCustomAlert('¡Contraseña cambiada exitosamente!', 'success');
                    window.location.href = '/dhcoapp';
                } else {
                    throw new Error('Error en el servidor');
                }
            })
            .catch(() => {
                showCustomAlert('Ocurrió un error. Inténtalo más tarde.', 'error');
            })
            .finally(() => {
                resetButton.disabled = false;
                resetButton.textContent = 'Cambiar contraseña';
            });
    });

    function showCustomAlert(message, type) {
        const alertElement = document.getElementById('customAlert');
        alertElement.textContent = message;
        alertElement.className = `custom-alert ${type}`;
        setTimeout(() => alertElement.classList.add('show'), 10);
        setTimeout(() => {
            alertElement.classList.remove('show');
            setTimeout(() => (alertElement.className = 'custom-alert'), 300);
        }, 3000);
    }
});
