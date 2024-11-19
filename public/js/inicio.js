document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    const settingsIcon = document.querySelector('.settings-icon');
    const dropdown = document.querySelector('.dropdown');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            const page = this.dataset.page;
            alert(`Navigating to ${page} page`);
            // Here you would typically use window.location.href to navigate to the actual page
        });
    });

    settingsIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function(event) {
        if (!settingsIcon.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });

    const logoutBtn = document.querySelector(".settings-menu a:nth-child(3)");
    logoutBtn.addEventListener("click", function() {
        window.location.href = "/dhcoapp/auth/logout";
    });
});