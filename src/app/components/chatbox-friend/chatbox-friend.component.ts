import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-chatbox-friend',
    templateUrl: './chatbox-friend.component.html',
    styleUrls: ['./chatbox-friend.component.scss']
})
export class ChatboxFriendComponent implements OnInit {

    @Input() msg: any = {}
    @Input() msgId: number = 0
    @Input() settings: any
    @Output() sendIdBack = new EventEmitter<number>()

    txtSize: string = ""
    imgSize: string = ""

    constructor() { }

    ngOnInit(): void {
        if(this.settings.txtSize) {
            this.txtSize = localStorage.getItem("txtSize")!
        }
        if(this.settings.imgSize) {
            this.imgSize = localStorage.getItem("imgSize")!
        }
    }

    deleteMessage() {
        this.sendIdBack.emit(this.msgId)
    }

}
