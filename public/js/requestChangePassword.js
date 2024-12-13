document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const ident = document.getElementById('ident').value;
    console.log(ident);
    const button = document.getElementById('loginButton');
    const originalText = button.textContent;
    button.textContent = 'Signing in...';
    button.disabled = true;

    // Hacer la solicitud POST con la identificación
    fetch('http://localhost:3000/dhcoapp/auth/requestPasswordReset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ident: ident
        }),
    })
    .then(response => {
        if (response.ok) {
            // Si la respuesta es exitosa, redirigir a otra página
            window.location.href = 'resetPassword'; // Cambia '/request-password-change' por la página a la que deseas redirigir
        } else {
            // Si la respuesta es un error
            alert(response);
            console.log(response);
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
