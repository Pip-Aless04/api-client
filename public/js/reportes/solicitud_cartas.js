document.addEventListener('DOMContentLoaded', function () {
    const settingsIcon = document.getElementById('settingsIcon');
    const dropdown = document.getElementById('settingsDropdown');
    const fileInput = document.getElementById('file-upload-1');
    const fileInputName = document.getElementById('file-input-name-1');
    const form = document.getElementById('cartaForm');

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

    // Validación del formulario y creación de FormData
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const correo = document.getElementById('correo').value;
        const detalle = document.getElementById('detalle').value;
        const tipoCarta = document.querySelector('input[name="tipo-carta"]:checked'); // Buscar el radio seleccionado

        if (!tipoCarta) {
            console.error('Debe seleccionar un tipo de carta');
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
            formData.append('ca_otro', cartaExtraordinaria);
        }
        formData.append('file', archivo);
        formData.append('tipo_reporte', 5);
        formData.append('tipo_documento', 3);
        // Mostrar datos en consola para depuración
        console.log('Datos a enviar (FormData):');
        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        // Aquí podrías implementar un fetch o axios para hacer el POST:
        fetch('/dhcoapp/bienestar-integral/guardar_reporte', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error
            ('Error al enviar el formulario:', error));
    });
});
