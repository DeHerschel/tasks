import AddTask from "./components/AddTask.js";
import Modal from "./components/Modal.js";
import Filters from "./components/Filters.js";

export default class View {
		constructor() {
		this.model = null;
        this.table = document.getElementById('table');
        this.addTaskForm = new AddTask();
        this.addTaskForm.onclick((title, description) => this.addTask(title, description));
		this.modal = new Modal();
		this.modal.onclick((id, values) => this.editTask(id, values));
		this.filters = new Filters();
		this.filters.onclick((filters) => this.filter(filters))
	}
	setModel(model) { 
		this.model = model;
	}
	toggleCompleted(id) {
		this.model.toggleCompleted(id);
	}
	addTask(title, description) {
		const task = this.model.addTask(title, description);
        this.createRow(task);
    }
	editTask(id, values) {
		this.model.editTask(id, values);
		const row = document.getElementById(id);
		row.children[0].innerText = values.title;
		row.children[1].innerText = values.description;
		row.children[2].children[0].checked = values.completed;
	}
    removeTask(id) {
		this.model.removeTask(id);
        document.getElementById(id).remove();
    }
    createRow(task) {
		const row = table.insertRow();
		row.setAttribute('id', task.id);
		row.innerHTML = `
		<td> ${task.title} </td>
		<td> ${task.description} </td>
		<td class="text-center">
		
		</td>
		<td class="text-right">
		
		</td>
		`;
		const editbtn = document.createElement('button');
		editbtn.classList.add('btn', 'btn-primary', 'mb-1', 'ml-1');
		editbtn.innerHTML = '<i class="fa fa-pencil"></i>';
		editbtn.setAttribute('data-toggle', 'modal');
		editbtn.setAttribute('data-target', '#modal');
		editbtn.onclick = () => this.modal.setValues(task);
		row.children[3].appendChild(editbtn);  
		const removebtn = document.createElement('button');
		removebtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
		removebtn.innerHTML = '<i class="fa fa-trash"></i>';
		removebtn.onclick = () => this.removeTask(task.id);
		row.children[3].appendChild(removebtn);  
        const compCheckbox = document.createElement('input');
        compCheckbox.type = 'checkbox';
        compCheckbox.checked = task.completed;
        compCheckbox.onclick = () => this.toggleCompleted(task.id);
        row.children[2].appendChild(compCheckbox);
    }
	filter(filters) {
			const { type, words } = filters;
			const [, ...rows] = this.table.getElementsByTagName('tr');
			for (const row of rows) {
				const [title, description, completed] = row.children;
				let shouldHide = false;
				if (words) {
					shouldHide = !title.innerHTML.includes(words) && !description.innerHTML.includes(words);
				}
				const shouldBeCompleted = type === 'completed';
				const isCompleted = completed.children[0].checked;
				if (type && type !== 'all') {
					if (shouldBeCompleted !== isCompleted) {
						shouldHide = true;
					}
				}
				shouldHide ? row.classList.add('d-none') : row.classList.remove('d-none');
			}
	}
	render() {
		const tasks = this.model.getTasks();
		tasks.forEach(task => this.createRow(task));
	}
}