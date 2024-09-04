import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ToolsHeaderListComponent } from '../tools-header-list/tools-header-list.component';

@Component({
  selector: 'app-list-container',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    ToolsHeaderListComponent
  ],
  templateUrl: './list-container.component.html',
  styleUrl: './list-container.component.scss'
})
export class ListContainerComponent implements OnInit {
   public task: Array<any> = [
    {
      id: '',
      titulo: 'teste2',
      descricao: '',
      dataCriacao: '',
      dataVencimento: '',
      status: 1,
      responsavel: 'Admin'
    },
    {
      id: '',
      titulo: 'teste3',
      descricao: '',
      dataCriacao: '',
      dataVencimento: '',
      status: 0,
      responsavel: 'Admin'
    },
    {
      id: '',
      titulo: 'teste4',
      descricao: '',
      dataCriacao: '',
      dataVencimento: '',
      status: 2,
      responsavel: 'Admin'
    }
   ];
   public selectUser: any = {};

  constructor(private readonly localStorage: LocalStorageService<any>)
   { }

  public ngOnInit(): void {
    this.task = this.localStorage.getItem('listTask');
    this.selectUser = this.localStorage.getItem('selectUser');
  }

   public handleCompleteTask(idTask: string): void {
    console.log('handleCompleteTask', idTask);

    const list = this.localStorage.getItem('listTask');

    const updateList = list.map((task: any) => {
      if(task.id !== idTask) return task;

      return {
        ...task,
        status: 2 // FIX ME - Change to use ENUM
      }
    });

    this.localStorage.setItem('listTask', updateList);
    this.task = updateList;
   }

   public handleEditTask(idTask: string): void {
    console.log('handleEditTask', idTask);

   }

   public handleDeleteTask(idTask: string): void {
    console.log('handleDeleteTask', idTask);

    console.log(this.selectUser);
    if(this.selectUser.role !== "admin") { // Change to ENUM
      console.log('Não é possivel deletar sem ser o Admin');
      return;
    }

    this.localStorage.removeItemArray('listTask', idTask);
   }

   public handleRegisterTask(newTasks: any) {
    // TODO: Implements method to register new tasks
    this.localStorage.addItemToArray('listTask', newTasks); // FIX Later, change to Enum
    this.task = this.localStorage.getItem('listTask');
   }
}
