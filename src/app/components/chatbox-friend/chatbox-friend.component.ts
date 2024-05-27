import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-chatbox-friend',
    templateUrl: './chatbox-friend.component.html',
    styleUrls: ['./chatbox-friend.component.scss']
})
export class ChatboxFriendComponent implements OnInit {

    @Input() msg: any = {}
    @Input() msgId: number = 0
    @Output() sendIdBack = new EventEmitter<number>()

    constructor() { }

    ngOnInit(): void {
    }

    deleteMessage() {
        this.sendIdBack.emit(this.msgId)
    }

}
