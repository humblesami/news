import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor() { }
    get message(): string {
        return 'Hello World!';
    }
}