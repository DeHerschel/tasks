document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const table = document.getElementById('table');
    const alert = document.getElementById('alert');
    const addbtn = document.getElementById('add');
    let id = 1;
    function removeTask(id) {
        return document.getElementById(id).remove();
    }
    addbtn.onclick = () => {
        if (title.value === '' || description.value === '') {
            alert.classList.remove('d-none');
            alert.innerText = "Title and description are required";
        }
    
        alert.classList.add('d-none');
        const row = table.insertRow();
        row.setAttribute('id', id++);
        row.innerHTML = `
        <td> ${title.value} </td>
        <td> ${description.value} </td>
        <td class="text-center">
        <input type="checkbox">
        </td>
        <td class="text-right">
        <button class="btn btn-primary mb-1">
        <i class="fa fa-pencil"></i>
        </button>
        </td>
        `;
        const removebtn = document.createElement('button');
        removebtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removebtn.innerHTML = '<i class="fa fa-trash"></i>';
        removebtn.onclick = (e) => removeTask(row.getAttribute('id'));
        row.children[3].appendChild(removebtn);  
    }
});