import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

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
