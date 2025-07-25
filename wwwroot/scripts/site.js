function InitializeTable() {
    // Initialize the table with the specified options
    $('#CounTable').DataTable({
        "paging": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "lengthChange": true,
        "pageLength": 10,
        "language": {
            "search": "Filter records:",
            "lengthMenu": "Show _MENU_ records per page",
            "info": "Showing _START_ to _END_ of _TOTAL_ records"
        }
    });
}
window.showDeleteModal = () => {
    const modalEl = document.getElementById('deleteModal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
};
window.showAlert = (message) => {
    alert(message);
};

// Shows a confirm box and returns true/false to .NET
window.showConfirm = (message) => {
    return confirm(message);
};
window.setupDropZone = (zoneId, inputId) => {
    const zone = document.getElementById(zoneId);
    const input = document.getElementById(inputId);

    zone.addEventListener('dragover', e => e.preventDefault());
    zone.addEventListener('drop', e => {
        e.preventDefault();
        if (!e.dataTransfer.files.length) return;

        input.files = e.dataTransfer.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
    });
};
window.getSelectedText = function (id) {
    const select = document.getElementById(id);
    return select.options[select.selectedIndex]?.text ?? '';
}

window.getSelectedLocationValues = () => {
    const getText = (id) => {
        const element = document.getElementById(id);
        return element.options[element.selectedIndex]?.text || '';
    };

    const getValue = (id) => {
        const element = document.getElementById(id);
        return element.value || '';
    };

    return {
        RegionId: getValue("region"),
        Region: getText("region"),
        ProvinceId: getValue("province"),
        Province: getText("province"),
        CityId: getValue("city"),
        City: getText("city"),
        BarangayId: getValue("barangay"),
        Barangay: getText("barangay")
    };
};