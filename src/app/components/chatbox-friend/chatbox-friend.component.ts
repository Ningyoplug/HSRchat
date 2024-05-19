import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-chatbox-friend',
    templateUrl: './chatbox-friend.component.html',
    styleUrls: ['./chatbox-friend.component.scss']
})
export class ChatboxFriendComponent implements OnInit {

    @Input() friend: any = {}

    constructor() { }

    ngOnInit(): void {
    }

}
