document.addEventListener('DOMContentLoaded', function () {
    const settingsIcon = document.getElementById('settingsIcon');
    const dropdown = document.getElementById('settingsDropdown');
    const fileInput = document.getElementById('file-upload-1');
    const fileInputName = document.getElementById('file-input-name-1');
    const form = document.getElementById('trasladoForm');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    const notificationIcon = document.getElementById('notification-icon');

    if (!form) {
        console.error('Formulario no encontrado');
        return;
    }

    settingsIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function (event) {
        if (!settingsIcon.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });

    fileInput.addEventListener('change', function () {
        const fileName = this.files[0]?.name || 'No archivo adjunto';
        fileInputName.textContent = fileName;
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
        const colaboradorInput = document.querySelector('#colaborador');
        colaboradorInput.value = '';

        const departamentoActual = document.getElementById('depto-actual');
        departamentoActual.value = '';

        const departamentoTraslado = document.getElementById('depto');
        departamentoTraslado.value = '';   

        const fechaTraslado = document.getElementById('date');
        fechaTraslado.value = '';

        const motivoTraslado = document.getElementById('detalle');
        motivoTraslado.value = '';

        const fileInput = document.getElementById('file-upload-1');
        const fileText = document.getElementById('file-input-name-1');
        fileInput.value = '';
        fileText.textContent = 'Seleccione un archivo';
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const colaborador = document.getElementById('colaborador').value;
        const colaboradorId = (() => {
            const colaboradorNombre = colaborador; // Toma el valor ingresado en el input
            const options = document.querySelectorAll('#colaboradoresList option'); // Asegúrate de tener el ID correcto
            for (const option of options) {
                if (option.value === colaboradorNombre) {
                    return option.dataset.id; // Devuelve el data-id del colaborador seleccionado
                }
            }
            return null; // Retorna null si no encuentra una coincidencia
        })();
        const date = document.getElementById('date').value;
        const depto = document.getElementById('depto').value;
        const deptoId = (() => {
            const deptoNombre = depto; // Toma el valor ingresado en el input
            const options = document.querySelectorAll('#deptosList option'); // Asegúrate de tener el ID correcto
            for (const option of options) {
                if (option.value === deptoNombre) {
                    return option.dataset.id; // Devuelve el data-id del colaborador seleccionado
                }
            }
            return null; // Retorna null si no encuentra una coincidencia
        })();
        const detalle = document.getElementById('detalle').value;
        const archivo = fileInput.files[0];

        if (!colaboradorId || !date || !deptoId || !detalle) {
            showAlert(false, 'Todos los campos son obligatorios');
            return;
        }

        const formData = new FormData();
        formData.append('col_id_aplica', colaboradorId);
        formData.append('fecha_inicio', date);
        formData.append('depto_traslado', deptoId);
        formData.append('motivo_traslado', detalle);
        formData.append('file', archivo);
        formData.append('tipo_reporte', 3);
        formData.append('tipo_documento', 3);

        // Aquí podrías implementar un fetch o axios para hacer el POST:
        fetch('/dhcoapp/bienestar-integral/guardar_reporte', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                showAlert('error', `Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
                throw new Error(`Error en la respuesta del servidor`);
            }
            return response.json();
        })
        .then(data => {
            showAlert('success', 'Reporte enviado exitosamente');	
            setDefaultValue();
        })
        .catch(error => {
            console.error('Error al enviar el formulario:', error);
            showAlert('error', `Error al enviar el reporte: ${error.message}`);
        }); 
    });
});

