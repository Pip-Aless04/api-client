(() => {
    const $ = el => document.querySelector(el);

    const loginForm = $('#login-form');
    const notification = $('#notification');
    const loadingCircle = document.createElement('div');
    loadingCircle.classList.add('loading-circle');

    loginForm?.addEventListener('submit', e => {
        e.preventDefault();
        const ident = $('#ident').value;
        const clave = $('#password').value;

        // Muestra el círculo de carga
        notification.innerHTML = ''; 
        notification.appendChild(loadingCircle);
        loadingCircle.style.display = 'block'; 
        notification.style.display = 'block';

        fetch('http://localhost:3000/dhcoapp/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ident, clave })
        })
        .then(res => {
            loadingCircle.style.display = 'none'; // Oculta el círculo de carga
            if (res.ok){
                notification.className = 'notification success';
                notification.innerText = "Iniciando sesión...";
                setTimeout(() => {
                    window.location.href = '/dhcoapp/inicio';
                }, 2000);
            } else {
                notification.className = 'notification error';
                notification.innerText = "Usuario o contraseña incorrectos";
            }
        })
        .catch((e) => {
            console.error(e);
            loadingCircle.style.display = 'none';
            notification.className = 'notification error';
            notification.innerText = "Hubo un problema con el servidor";
        });
    });
})();
