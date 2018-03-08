import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Button } from 'protractor';

@Component({
    selector : 'sandbox',
    template : `
    <div class="container">
    <form (submit)="onSubmit(isEdit)">
        <div class="form-group">
        <label>Name:</label>
        <input type="text"
        class="form-control"
        [(ngModel)]="user.name"
        name="name">
        </div>
        <div class="form-group">
        <label>Email:</label>
        <input type="text"
        class="form-control"
        [(ngModel)]="user.email"
        name="email">
        </div>
        <div class="form-group">
        <label>Phone:</label>
        <input type="text"
        class="form-control"
        [(ngModel)]="user.phone"
        name="phone">
        </div>
        <input type="submit" value="Submit" class="btn btn-success">
    </form>
    <br>
    <div *ngFor="let user of users">
        <div class="well">
            <ul class="list-group">
                <li class="list-group-item">
                    Name:{{user.name}}
                </li>
                <li class="list-group-item">
                    Email:{{user.email}}
                </li>
                <li class="list-group-item">
                    Phone:{{user.phone}}
                </li>
            </ul>
            <br>
            <button class="btn btn-sm btn-primary" (click)="onEditClick(user)">
            Edit
            </button>
            <button class="btn btn-sm btn-danger" (click)="onDeleteClick(user.id)">
            Delete
            </button>
            <br><br>
        </div>
    </div>
    </div>
    `
})

export class SandboxComponent {
    users: any [];
    user = {
        id : '',
        name: '',
        email: '',
        phone: ''
    };
    isEdit = false;
    constructor(public dataservice: DataService) {
        this.dataservice.getUsers().subscribe(users => {
            // console.log(users);
            this.users = users;
        });
    }
    onSubmit(isEdit) {
        if(isEdit){
            this.dataservice.updateUser(this.user).subscribe(res => {
                for (let i = 0; i < this.users.length; i++){
                    if(this.users[i].id == this.user.id){
                        this.users.splice(i ,1);
                    }
                }
                this.users.unshift(this.user);
            });
        }else{
            this.dataservice.addUser(this.user).subscribe(user => {
                console.log(user);
                this.users.unshift(user);
                /*unshift is like push(), only that it adds the item to the top of the list unlike
                push which adds it as a last item
                */
            });
        }
    }
    onDeleteClick(id){
        this.dataservice.deleteUser(id).subscribe(res => {
            for (let i = 0; i < this.users.length; i++){
                if(this.users[i].id == id){
                    this.users.splice(i ,1);
                }
            }
        });
    }
    onEditClick(user){
        this.isEdit = true;
        this.user = user;
    }
}
