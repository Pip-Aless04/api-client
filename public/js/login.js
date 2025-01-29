document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const ident = document.getElementById('ident').value;
    const password = document.getElementById('password').value;
    const button = document.getElementById('loginButton');
    const originalText = button.textContent;
    button.textContent = 'Iniciando sesión...';
    button.disabled = true;

    // Hacer la solicitud POST
    fetch('/dhcoapp/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ident,
            password
        }),
    })
    .then(response => {
        if (response.ok) {
            // Si la respuesta es exitosa, redirigir a otra página
            window.location.href = '/dhcoapp/inicio'; // Cambia '/dashboard' por la página a la que deseas redirigir
        } else {
            // Si la respuesta es un error
            console.log(response)
            alert(`Inicio de sesion fallido ${response}`);
            button.textContent = originalText;
            button.disabled = false;
        }
    })
    .catch(error => {
        // Manejar errores de la solicitud
        alert('An error occurred. Please try again later.');
        button.textContent = originalText;
        button.disabled = false;
    });
});

//olvido contraseña
document.getElementById('forgot-password').addEventListener('click', function() {
    window.location.href = '/dhcoapp/requestChangePassword';
});

// Animación para el logo al pasar el ratón
const logoSpans = document.querySelectorAll('.logo span');
logoSpans.forEach(span => {
    span.addEventListener('mouseover', () => {
        span.style.animation = 'none';
        setTimeout(() => {
            span.style.animation = '';
        }, 10);
    });
});
