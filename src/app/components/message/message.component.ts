import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

    @Input() msg: any = {}
    @Input() friend: any = {}
    @Input() user: any = {}

    constructor() { }

    ngOnInit(): void {
    }

}
function ContentChild() {
    throw new Error('Function not implemented.');
}

