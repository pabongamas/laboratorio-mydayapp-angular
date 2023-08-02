import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Tarea } from './../../models/tareas.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  tareas: Tarea[] = [];
  nuevaTarea: string = '';
  idTarea = 0;
  @ViewChild('tareaInput', { static: true }) tareaInput!: ElementRef<HTMLInputElement>;
  @ViewChild('elemento') elemento!: ElementRef;
  constructor() {}

  ngOnInit(): void {}
  addTarea(event: any) {
    const nuevaTareaValue = this.tareaInput.nativeElement.value.trim();
    if (nuevaTareaValue !== '') {
      this.idTarea++;
      const nuevaTarea: Tarea = {
        id: this.idTarea,
        title: nuevaTareaValue,
        completed: false,
      };
      this.tareas.push(nuevaTarea);
      this.nuevaTarea = '';
      // Limpiar el input después de agregar la tarea
      this.tareaInput.nativeElement.value = '';
    }
  }
  completedOrPending(tarea:Tarea) {
    tarea.completed;
  }
  modeEdition(elementLi: HTMLElement){
    elementLi.classList.add('editing');
  }
}
