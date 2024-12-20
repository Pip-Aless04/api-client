export const init = (tables) => {
    const tableSwitcher = document.querySelector('.table-switcher');
    const currentTableSpan = document.getElementById('currentTable');

    // Función para reemplazar guiones bajos por espacios y poner la primera letra de cada palabra en mayúscula
    const formatTableName = (name) => {
        return name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    };

    // Crear los botones dinámicamente en base a las claves de las tablas
    Object.keys(tables).forEach(tableKey => {
        const btn = document.createElement('button1');
        btn.classList.add('btn');
        btn.dataset.table = tableKey;
        btn.textContent = formatTableName(tableKey);
        tableSwitcher.appendChild(btn);
    });

    const table = document.getElementById('dataTable');
    const tbody = table.querySelector('tbody');
    let currentTable = Object.keys(tables)[0]; // Toma el primer nombre de las tablas
    currentTableSpan.textContent = formatTableName(currentTable); // Actualiza el título de la tabla actual
    let sortColumn = null;
    let sortDirection = null;

    // Actualizar encabezados de la tabla
    function updateTableHeaders() {
        const headerRow = table.querySelector('thead tr');
        headerRow.innerHTML = '';

        const allKeys = new Set();
        tables[currentTable].forEach(row => {
            Object.keys(row).forEach(key => allKeys.add(key));
        });

        allKeys.forEach(key => {
            if (key === 'documento' || key === 'extension' || key === 'documento_id') return; // Omitir estas columnas

            const th = document.createElement('th');
            th.textContent = formatTableName(key); // Reemplaza guiones bajos en los headers
            th.dataset.sort = key;
            th.addEventListener('click', handleSort);
            headerRow.appendChild(th);
        });
    }

    // Actualizar filtros dinámicamente
    function updateFilterPlaceholders() {
        const filtersContainer = document.querySelector('.filters');
        filtersContainer.innerHTML = '';

        const allKeys = new Set();
        tables[currentTable].forEach(row => {
            Object.keys(row).forEach(key => allKeys.add(key));
        });

        allKeys.forEach(key => {
            if (key === 'documento' || key === 'extension' || key === 'documento_id') return; // Omitir estas columnas

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Filtrar por ${formatTableName(key)}`; // Reemplaza guiones bajos en el filtro
            input.className = 'filter-input';
            input.dataset.field = key;
            input.addEventListener('input', renderTable);
            filtersContainer.appendChild(input);
        });
    }

    // Renderizar la tabla con datos filtrados y ordenados
    function renderTable() {
        const filters = document.querySelectorAll('.filter-input');
        const filterValues = Array.from(filters).reduce((acc, filter) => {
            const value = filter.value.trim().toLowerCase();
            if (value) acc[filter.dataset.field] = value;
            return acc;
        }, {});

        let filteredData = tables[currentTable].filter(row =>
            Object.keys(filterValues).every(field =>
                (row[field] ?? '').toString().toLowerCase().includes(filterValues[field])
            )
        );

        if (sortColumn) {
            filteredData.sort((a, b) => {
                if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
                if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        tbody.innerHTML = filteredData.map(row =>
            `<tr>${Object.entries(row).map(([key, value]) => {
                if (key === 'documento' || key === 'extension' || key === 'documento_id') return ''; // Ignorar estas columnas
                if (key === 'nombre_documento') {
                    // Mostrar solo el enlace si hay archivo
                    return value 
                        ? `<td><a href="/dhcoapp/bienestar-integral/ver-archivo/${row.documento_id}" target="_blank">${value}</a></td>` 
                        : `<td>-</td>`;
                }
                return `<td>${value ?? '-'}</td>`;
            }).join('')}</tr>`
        ).join('');

        updateHeaderStyles();
    }

    // Estilos dinámicos para los encabezados
    function updateHeaderStyles() {
        document.querySelectorAll('th').forEach((th, index) => {
            const colors = ['--pops-teal', '--pops-red', '--pops-blue', '--pops-orange'];
            th.style.backgroundColor = `var(${colors[index % colors.length]})`;
        });
    }

    // Ordenar columnas
    function handleSort(event) {
        const column = event.target.dataset.sort;
        if (sortColumn === column) {
            sortDirection = sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc';
        } else {
            sortColumn = column;
            sortDirection = 'asc';
        }

        document.querySelectorAll('th').forEach(th => th.classList.remove('sort-asc', 'sort-desc'));
        if (sortDirection) {
            event.target.classList.add(`sort-${sortDirection}`);
        }

        renderTable();
    }

    // Descargar datos en formato CSV
    function downloadCSV() {
        const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
        const rows = Array.from(tbody.querySelectorAll('tr')).map(tr =>
            Array.from(tr.cells).map(cell => `"${cell.textContent}"`).join(',')
        );

        const csv = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${currentTable}_filtered_data.csv`;
        link.click();
    }

    // Descargar datos en formato Excel
    function downloadExcel() {
        const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
        const rows = Array.from(tbody.querySelectorAll('tr')).map(tr =>
            Array.from(tr.cells).map(cell => cell.textContent)
        );

        const data = [headers, ...rows];
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Filtered Data');
        XLSX.writeFile(wb, `${currentTable}_filtered_data.xlsx`);
    }

    // Cambiar entre tablas
    document.querySelectorAll('.table-switcher .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentTable = btn.dataset.table;
            currentTableSpan.textContent = formatTableName(currentTable); // Cambia el título cuando se cambia de tabla

            document.querySelectorAll('.table-switcher .btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            updateTableHeaders();
            updateFilterPlaceholders();
            renderTable();
        });
    });

    // Inicializar botones de descarga
    document.getElementById('downloadCsvBtn').addEventListener('click', downloadCSV);
    document.getElementById('downloadExcelBtn').addEventListener('click', downloadExcel);


    // Cambiar entre tablas
    document.querySelectorAll('.table-switcher .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentTable = btn.dataset.table;
            currentTableSpan.textContent = formatTableName(currentTable); // Cambia el título cuando se cambia de tabla

            document.querySelectorAll('.table-switcher .btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            updateTableHeaders();
            updateFilterPlaceholders();
            renderTable();
        });
    });

    // Inicializar tabla
    updateTableHeaders();
    updateFilterPlaceholders();
    renderTable();
};
