document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    const settingsIcon = document.querySelector('.settings-icon');
    const dropdown = document.querySelector('.dropdown');
    const tableRows = document.querySelectorAll('.pending-table tr[data-id]'); // Selecciona filas con data-id
    const filterForm = document.getElementById('filterForm');

    console.log(tableRows);

    // Navegación por las tarjetas
    cards.forEach(card => {
        card.addEventListener('click', function () {
            const page = this.dataset.page;
            window.location.href = `bienestar-integral/${page}`;	
        });
    });

    // Menú desplegable de configuración
    settingsIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function (event) {
        if (!settingsIcon.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });

    // Manejo de botones "Aceptar" y "Rechazar"
    tableRows.forEach(row => {
        const id = row.dataset.id;
        const currentStatus = row.dataset.estado; // Leer el estado actual desde data-estado
        const buttons = row.querySelectorAll('.action-buttons button');

        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const action = button.value; // 1 para aceptar, 0 para rechazar

                // Determinar el próximo estado según el actual y la acción
                let newStatus;
                if (action === '1') {
                    if (currentStatus === 'S') {
                        newStatus = 'P'; // De solicitado a pendiente
                    } else if (currentStatus === 'P') {
                        newStatus = 'A'; // De pendiente a aceptado
                    }
                } else if (action === '0') {
                    newStatus = 'D'; // Rechazado en cualquier estado
                }

                if (!newStatus) {
                    alert('Acción no válida para el estado actual');
                    return;
                }

                // Enviar la actualización al servidor
                fetch('http://localhost:3000/dhcoapp/bienestar-integral/aceptar_rechazar_vacaciones', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, estado: newStatus }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(`Pendiente actualizado a ${newStatus}:`, data);

                        // Actualizar visualmente el estado en la tabla o eliminar la fila
                        row.dataset.estado = newStatus; // Actualizar el estado en el atributo
                        if (newStatus === 'D' || newStatus === 'A' || newStatus === 'P') {
                            row.remove(); // Eliminar la fila si ya no es relevante
                        }
                    })
                    .catch(error => console.error('Error al actualizar el pendiente:', error));
            });
        });
    });
}); // Cierre del bloque DOMContentLoaded

