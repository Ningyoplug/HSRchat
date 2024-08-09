import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    @Output() sendEditBack = new EventEmitter<object>()

    editForm!: FormGroup

    txtSize: string = ""
    imgSize: string = ""
    isEditing: boolean = false

    constructor() { }

    ngOnInit(): void {
        if(this.settings.txtSize) {
            this.txtSize = localStorage.getItem("txtSize")!
        }
        if(this.settings.imgSize) {
            this.imgSize = localStorage.getItem("imgSize")!
        }

        this.editForm = new FormGroup({
            editedMsg: new FormControl(this.msg.text, Validators.required)
        })
    }

    deleteMessage() {
        this.sendIdBack.emit(this.msgId)
    }

    editMessage() {
        this.isEditing = true
    }

    saveEdit() {
        this.msg.text = this.editForm.value.editedMsg
        this.isEditing = false

        let msgToEdit = [ this.msg, this.msgId ]
        console.log(msgToEdit);
        this.sendEditBack.emit(msgToEdit)
    }

}
