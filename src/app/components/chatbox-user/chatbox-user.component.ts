import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-chatbox-user',
    templateUrl: './chatbox-user.component.html',
    styleUrls: ['./chatbox-user.component.scss']
})
export class ChatboxUserComponent implements OnInit {

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
