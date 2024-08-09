import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-chatbox-user',
    templateUrl: './chatbox-user.component.html',
    styleUrls: ['./chatbox-user.component.scss']
})
export class ChatboxUserComponent implements OnInit {

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
