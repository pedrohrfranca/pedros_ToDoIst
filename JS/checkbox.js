// CHECKBOX

document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('change', function (e) {
        if (e.target.classList.contains('checkbox')) {
            const task = e.target.parentElement;
            const list = task.parentElement;

            if (e.target.checked) {
                task.classList.add('riscado');
                list.appendChild(task);
            } else {
                task.classList.remove('riscado');
            }
        }
    });
});