const submittedFields = {
    fname: '#submitted-fname',
    lname: '#submitted-lname',
    email: '#submitted-email',
    tel: '#submitted-tel',
    business: '#submitted-business',
    timestamp: '#submitted-timestamp'
};
const submission = new URLSearchParams(window.location.search);

Object.entries(submittedFields).forEach(([field, selector]) => {
    const output = document.querySelector(selector);
    const value = submission.get(field);

    if (field === 'timestamp' && value) {
        const date = new Date(value);
        output.textContent = Number.isNaN(date.getTime()) ? value : date.toLocaleString();
    } else {
        output.textContent = value || 'Not provided';
    }
});
