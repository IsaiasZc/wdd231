const timestampField = document.querySelector('#timestamp');

if (timestampField) {
    timestampField.value = new Date().toISOString();
}

document.querySelectorAll('.membership-link').forEach((link) => {
    link.addEventListener('click', (event) => {
        const dialog = document.getElementById(link.dataset.dialog);

        if (dialog?.showModal) {
            event.preventDefault();
            dialog.showModal();
        }
    });
});

document.querySelectorAll('.membership-dialog').forEach((dialog) => {
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});
