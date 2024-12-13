document.addEventListener('DOMContentLoaded', function() {
    const settingsIcon = document.getElementById('settingsIcon');
    const settingsDropdown = document.getElementById('settingsDropdown');
    const fileInput = document.getElementById('file-upload');
    const fileInputName = document.getElementById('file-input-name');

    // Toggle settings dropdown
    settingsIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        settingsDropdown.style.display = settingsDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!settingsIcon.contains(event.target) && !settingsDropdown.contains(event.target)) {
            settingsDropdown.style.display = 'none';
        }
    });

    // Handle file input changes
    fileInput.addEventListener('change', function() {
        if (this.files && this.files.length > 0) {
            fileInputName.textContent = Array.from(this.files).map(file => file.name).join(', ');
        } else {
            fileInputName.textContent = 'No file chosen';
        }
    });
});