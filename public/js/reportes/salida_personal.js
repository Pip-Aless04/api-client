export function initSalidaPersonal(userSubordinados) {
    document.addEventListener('DOMContentLoaded', function () {
        const searchBar = document.getElementById('searchBar');
        const emailField = document.getElementById('correo');
        const paisField = document.getElementById('pais');
        const identField = document.getElementById('ident');
        const nameField = document.getElementById('name');
        const areaField = document.getElementById('area');
        const jefeField = document.getElementById('jefe');
        const puestoField = document.getElementById('puesto');
        const fileInput = document.getElementById('fileInput');
        const submitBtn = document.getElementById('submitBtn');
        const colaboradorForm = document.getElementById('colaboradorForm');

        // Almacenar datos de los subordinados
        const subordinados = userSubordinados.info;

        // Detectar cambios en el campo de búsqueda
        searchBar.addEventListener('change', function () {
            const selectedName = searchBar.value.trim();
            const matchedSubordinado = subordinados.find(sub => {
                const fullName = `${sub.nombre} ${sub.segundo_nombre} ${sub.primer_apellido} ${sub.segundo_apellido}`;
                return fullName.toLowerCase() === selectedName.toLowerCase();
            });

            if (matchedSubordinado) {
                // Llenar campos con los datos del colaborador seleccionado
                emailField.value = matchedSubordinado.email || '';
                paisField.value = matchedSubordinado.pais || '';
                identField.value = matchedSubordinado.identificacion || '';
                nameField.value = `${matchedSubordinado.nombre} ${matchedSubordinado.segundo_nombre} ${matchedSubordinado.primer_apellido} ${matchedSubordinado.segundo_apellido}` || '';
                areaField.value = matchedSubordinado.departamento || '';
                jefeField.value = matchedSubordinado.nombre_jefe || '';
                puestoField.value = matchedSubordinado.puesto || '';
            } else {
                // Si no hay coincidencia, limpiar los campos
                emailField.value = '';
                paisField.value = '';
                identField.value = '';
                nameField.value = '';
                areaField.value = '';
                jefeField.value = '';
                puestoField.value = '';
            }
        });

        // Manejo de archivos seleccionados
        fileInput.addEventListener('change', function () {
            const files = Array.from(fileInput.files);
            files.forEach(file => {
                console.log(`Archivo seleccionado: ${file.name} (${file.size} bytes)`);
            });
        });

        // Envío del formulario
        colaboradorForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Recopilar información
            const formData = new FormData();
            formData.append('email', emailField.value);
            formData.append('pais', paisField.value);
            formData.append('ident', identField.value);
            formData.append('name', nameField.value);
            formData.append('area', areaField.value);
            formData.append('jefe', jefeField.value);
            formData.append('puesto', puestoField.value);

            // Adjuntar archivos seleccionados
            Array.from(fileInput.files).forEach(file => {
                formData.append('files', file);
            });

            // Realizar el envío
            fetch('/api/submit-colaborador', {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al enviar los datos');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Formulario enviado correctamente:', data);
                    alert('Formulario enviado con éxito.');
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al enviar el formulario.');
                });
        });
    });
}
