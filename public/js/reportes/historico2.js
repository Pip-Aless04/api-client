export default function initializeTable(mockData) {
    let currentData = [...mockData];
    let currentSort = { key: null, direction: 'asc' };

    const tableBody = document.querySelector('#dataTable tbody');
    const searchInput = document.getElementById('search');
    const roleFilter = document.getElementById('roleFilter');
    const tableHeaders = document.querySelectorAll('#dataTable th');

    function renderTable() {
        tableBody.innerHTML = '';
        currentData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.role}</td>
                <td><span class="status-badge status-${item.status.toLowerCase()}">${item.status}</span></td>
                <td>${item.joinedDate}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function sortData(key) {
        currentSort.direction = currentSort.key === key 
            ? (currentSort.direction === 'asc' ? 'desc' : 'asc') 
            : 'asc';
        currentSort.key = key;

        currentData.sort((a, b) => {
            if (a[key] < b[key]) return currentSort.direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return currentSort.direction === 'asc' ? 1 : -1;
            return 0;
        });

        renderTable();
        updateSortIcons();
    }

    function updateSortIcons() {
        tableHeaders.forEach(th => {
            const key = th.getAttribute('data-sort');
            const icon = th.querySelector('.sort-icon');
            if (key === currentSort.key) {
                icon.textContent = currentSort.direction === 'asc' ? '▲' : '▼';
            } else {
                icon.textContent = '↕';
            }
        });
    }

    function filterData() {
        const searchTerm = searchInput.value.toLowerCase();
        const roleValue = roleFilter.value;

        currentData = mockData.filter(item => {
            const matchesSearch = Object.values(item).some(val => 
                val.toString().toLowerCase().includes(searchTerm)
            );
            const matchesRole = roleValue === 'all' || item.role === roleValue;
            return matchesSearch && matchesRole;
        });

        if (currentSort.key) {
            sortData(currentSort.key);
        } else {
            renderTable();
        }
    }

    searchInput.addEventListener('input', filterData);
    roleFilter.addEventListener('change', filterData);

    tableHeaders.forEach(th => {
        th.addEventListener('click', () => {
            const key = th.getAttribute('data-sort');
            sortData(key);
        });
    });

    // Initial render
    renderTable();
}
