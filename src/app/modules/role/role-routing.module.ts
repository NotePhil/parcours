import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRoleComponent } from './new-role/new-role.component';
import { ListRolesComponent } from './list-roles/list-roles.component';

const routes= [
  {
    path: 'role-nouveau',
    title: 'Enregistrer un nouveau role',
    component: NewRoleComponent
  },
  {
    path: 'role-nouveau/:idRole',
    title: 'Modifier un role',
    component: NewRoleComponent
  },
  {
    path: 'list-roles',
    title: 'Recherche de roles',
    component: ListRolesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
