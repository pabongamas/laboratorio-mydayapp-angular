import { Component ,Input, Output, EventEmitter} from '@angular/core';
import { Tarea } from 'src/app/models/tareas.model';
import {TaskServicesService} from './../../services/task-services.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  editing: boolean = false;
  @Input() index: number = -1;
  @Input() task: Tarea = {
    id: -1,
    title: '',
    completed: false
  }
  @Output() updateTasks: EventEmitter<any> = new EventEmitter();
  constructor(
    private taskService:TaskServicesService
  ) {}

  removeTask(){
    this.taskService.removeTask(this.index);
  }
  toggleTask(){
    this.taskService.completedTask(this.index);
  }
  cancelEdition() {
    this.editing = false;
  }
  updateTitle(){
    this.taskService.editTaskTitle(this.index, this.task.title);
    this.editing = false;
  }
}
