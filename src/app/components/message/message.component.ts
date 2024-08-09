import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

    @Input() msg: any = {}
    @Input() msgId: number = 0
    @Input() settings: any
    @Output() sendIdBack = new EventEmitter<number>()

    constructor() { }

    ngOnInit(): void {
    }

    receiveIdBack(e: number) {
        this.sendIdBack.emit(e)
    }

}
