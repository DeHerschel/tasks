import AddTask from "./components/AddTask.js";
export default class View {
	constructor() {
		this.model = null;
        this.table = document.getElementById('table');
        this.addTaskForm = new AddTask();
        this.addTaskForm.onclick((title, description) => this.addTask(title, description))
	}
	setModel(model) { 
		this.model = model;
	}
    render() {
        const tasks = this.model.getTasks();
        tasks.forEach(task => this.createRow(task));
    }
	addTask(title, description) {
        const task = this.model.addTask(title, description);
        this.createRow(task);
    }
    removeTask(id) {
        this.model.removeTask(id);
        document.getElementById(id).remove();
    }
    toggleCompleted(id) {
        this.model.toggleCompleted(id);
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
		<button class="btn btn-primary mb-1">
		<i class="fa fa-pencil"></i>
		</button>
		</td>
		`;
        const compCheckbox = document.createElement('input');
        compCheckbox.type = 'checkbox';
        compCheckbox.checked = task.completed;
        compCheckbox.onclick = () => this.toggleCompleted(task.id);
        row.children[2].appendChild(compCheckbox);
		const removebtn = document.createElement('button');
		removebtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
		removebtn.innerHTML = '<i class="fa fa-trash"></i>';
		removebtn.onclick = () => this.removeTask(task.id);
		row.children[3].appendChild(removebtn);  
    }
}