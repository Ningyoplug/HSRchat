import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-chatbox-user',
    templateUrl: './chatbox-user.component.html',
    styleUrls: ['./chatbox-user.component.scss']
})
export class ChatboxUserComponent implements OnInit {

    @Input() user: any = {}

    constructor() { }

    ngOnInit(): void {
    }

}
