document.addEventListener('DOMContentLoaded', function () {
    const settingsIcon = document.querySelector('.settings-icon');
    const dropdown = document.querySelector('.dropdown');
    const fileInput = document.getElementById('file-upload');
    const fileInputName = document.getElementById('file-input-name');
    const fileInputButton = document.querySelector('.file-input-button');

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

    // Formatear fecha como yyyy-mm-dd
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Simular clic en el input file al hacer clic en el botón
    fileInputButton.addEventListener('click', function () {
        fileInput.click();
    });

    // Mostrar nombre de los archivos seleccionados
    fileInput.addEventListener('change', function () {
        fileInputName.textContent = this.files.length > 0
            ? Array.from(this.files).map(file => file.name).join(', ')
            : 'No archivo adjunto';
    });

    function setDefaultValue() {
        const fechaInicio = document.getElementById('fecha_inicio');
        fechaInicio.value = '';

        const fechaFin = document.getElementById('fecha_fin');
        fechaFin.value = '';
        
        const observaciones = document.getElementById('observaciones');
        observaciones.value = '';

        const fileInput = document.getElementById('file-upload');
        const fileText = document.getElementById('file-input-name');
        fileInput.value = '';
        fileText.textContent = 'Seleccione un archivo';

        const fechaEnvioDoc = document.getElementById('fecha_documento');
        fechaEnvioDoc.value = null;
    }

    // Manejo del formulario
    document.getElementById('vacationForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const observaciones = document.getElementById('observaciones').value || '';
        const fechaInicioValue = document.getElementById('fecha_inicio').value;
        const fechaFinValue = document.getElementById('fecha_fin').value;
        const fechaDocValue = document.getElementById('fecha_documento').value;
        const fileInput = document.getElementById('file-upload');
        const file = fileInput.files[0];

        // Validación de fechas
        if (new Date(fechaInicioValue) > new Date(fechaFinValue)) {
            alert('La fecha de inicio no puede ser mayor que la fecha de fin.');
            return;
        }

        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }

        formData.append('fecha_inicio', fechaInicioValue);
        formData.append('fecha_fin', fechaFinValue);
        formData.append('detalle_reporte', observaciones);
        if (fechaDocValue !== '' && fechaDocValue !== null) {
            formData.append('fecha_envio_doc', fechaDocValue);
        }
        formData.append('tipo_documento', 5);
        formData.append('tipo_reporte', 2);

        fetch('/dhcoapp/bienestar-integral/guardar_reporte', {
            method: 'POST',
            body: formData
        })
        .then(async response => {
            if (!response.ok) {
                showAlert('error', await response.text());
                throw new Error(`Error en el servidor: ${errorText}`);
            }
            return response.json(); // Cambia a response.text() si el servidor no devuelve JSON.
        })
        .then(result => {
            showAlert('success');
            setDefaultValue();
        })
        .catch(error => {
            showAlert('error', error.message);
            console.error('Error al enviar la solicitud:', error.message);
        });
        
    });
});
