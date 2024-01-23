function validateFloatInput(input) {
    // Remove any non-numeric characters and allow only one decimal point
    input.value = input.value.replace(/[^0-9.]/g, '');

    // Ensure that there is only one decimal point
    if (input.value.split('.').length > 2) {
        input.value = input.value.slice(0, input.value.lastIndexOf('.'));
    }
}

function validateNumberInput(input) {
    // Remove any non-numeric characters
    input.value = input.value.replace(/[^0-9]/g, '');
}