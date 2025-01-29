document.addEventListener('DOMContentLoaded', function () {
    const settingsIcon = document.getElementById('settingsIcon');
    const dropdown = document.getElementById('settingsDropdown');
    const fileInput = document.getElementById('file-upload-1');
    const fileInputName = document.getElementById('file-input-name-1');
    const form = document.getElementById('cartaForm');
    const notification = document.getElementById('notification');

    if (!form) {
        console.error('Formulario no encontrado');
        return;
    }

    // Mostrar/ocultar dropdown
    settingsIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function (event) {
        if (!settingsIcon.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });

    // Mostrar nombre del archivo seleccionado
    fileInput.addEventListener('change', function () {
        const fileName = this.files[0]?.name || 'No archivo adjunto';
        fileInputName.textContent = fileName;
    });

    // Configurar el comportamiento para "otro" en opciones
    const tipoCartaRadios = document.querySelectorAll('input[name="tipo-carta"]');
    tipoCartaRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            const otherInput = document.getElementById('tipo-carta-otro-input');
            if (this.value === 'otro') {
                otherInput.style.display = 'block';
            } else {
                otherInput.style.display = 'none';
            }
        });
    });

    let alertTimeout;
    function showAlert(type, info) {
        const alert = document.getElementById('alert');
        const alertMessage = document.getElementById('alertMessage');
        const alertIcon = document.getElementById('alertIcon');
        // Clear any existing timeout
        clearTimeout(alertTimeout);
        // Set the alert message, type, and icon
        alert.className = `alert ${type} show`;
        // Set the appropriate icon
        switch(type) {
            case 'success':
                alertMessage.textContent = `La solicitud se ha enviado correctamente`;
                alertIcon.className = 'alert-icon fas fa-check-circle';
                break;
            case 'warning':
                alertIcon.className = 'alert-icon fas fa-exclamation-triangle';
                break;
            case 'error':
                alertMessage.textContent = `Error al enviar el reporte: ${info}`;
                alertIcon.className = 'alert-icon fas fa-times-circle';
                break;
            case 'info':
                alertIcon.className = 'alert-icon fas fa-info-circle';
                break;
        }
        
        // Automatically hide the alert after 5 seconds
        alertTimeout = setTimeout(() => {
            closeAlert();
        }, 5000);
    }
    
    function closeAlert() {
        const alert = document.getElementById('alert');
        alert.classList.remove('show');
    }   

    function setDefaultValue() {

        const tipoCarta = document.querySelectorAll('input[name="tipo-carta"]');
        tipoCarta.forEach(carta => {
            carta.checked = false;
        });

        const otherInput = document.getElementById('tipo-carta-otro');
        otherInput.value = '';
        otherInput.style.display = 'none';

        const detalle = document.getElementById('detalle');
        detalle.value = '';

        const correo = document.getElementById('correo');
        correo.value = '';

        const fileInput = document.getElementById('file-upload-1');
        const fileText = document.getElementById('file-input-name-1');
        fileInput.value = '';
        fileText.textContent = 'Seleccione un archivo';

    }   

    // Validación del formulario y creación de FormData
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const correo = document.getElementById('correo').value;
        const detalle = document.getElementById('detalle').value;
        const tipoCarta = document.querySelector('input[name="tipo-carta"]:checked'); // Buscar el radio seleccionado

        if (!tipoCarta) {
            alert('Debe seleccionar un tipo de carta');
            return;
        }

        const tipoCartaId = tipoCarta.dataset.id; // Obtener el data-id del radio seleccionado
        let cartaExtraordinaria;
        const archivo = fileInput.files[0];

        // Crear FormData
        const formData = new FormData();
        formData.append('tipo_carta', tipoCartaId); // Correo del usuario
        formData.append('email_envio', correo);
        formData.append('detalle_reporte', detalle);
        if (tipoCarta.value === 'otro') {
            cartaExtraordinaria = document.getElementById('tipo-carta-otro').value;
            formData.append('otro', cartaExtraordinaria);
        }
        formData.append('file', archivo);
        formData.append('tipo_reporte', 5);
        formData.append('tipo_documento', 3);
        
        // Aquí podrías implementar un fetch o axios para hacer el POST:
        fetch('/dhcoapp/bienestar-integral/guardar_reporte', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            showAlert('success', 'La solicitud se ha enviado correctamente');
            setDefaultValue();
        })
        .catch(error => {
            showAlert('error', 'Ocurrió un error al conectar con el servidor.', error.message);
            console.error('Error al enviar la solicitud:', error);
        }); 
    });
});
