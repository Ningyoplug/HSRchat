import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    standalone: false
})
export class ChatComponent implements OnInit {

    newUpdateDate = "23/02/2025"
    switchCheck: boolean = false;
    actionCheck: boolean = false;
    photoCheck: boolean = false;
    questCheck: boolean = false;
    dialogueCheck: boolean = false;
    stickerCheck: boolean = false;
    saveCheck: boolean = false;
    stickersLoaded: boolean = false;
    savesLoaded: boolean = false;
    customCharaCheck: boolean = false;
    groupChat: boolean = false;
    placeholder: string = "Type message here...";
    largeScreen: boolean = false;
    newChangelog: boolean = false;
    checked: boolean = false;
    allSaves: any[] = [];
    charaName: any;
    stickersNumber: number = 305;
    uploadedImg: string = ""

    quest: any = {
        name: null,
        type: null,
        state: null
    }

    options: any = {
        option1: null,
        option2: null,
        option3: null
    }

    settings: any = {
        txtSize: false,
        imgSize: false
    }

    friend: any = {
        name: "Dan Heng",
        icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/1/1a/Character_Dan_Heng_Icon.png",
        sub: "For anything related to the data bank, come find me."
    }

    user: any = {
        name: "Stelle",
        icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/7/7b/Character_Stelle_%28Harmony%29_Icon.png",
        sub: null
    }

    gc: any = {
        name: null,
        sub: null
    }

    cc: any = {
        name: null,
        icon: null,
        sub: null
    }

    charaVersions: any = [
        {
            name: "Stelle",
            versions: [
                "Destruction",
                "Preservation",
                "Harmony",
                "Remembrance"
            ],
            icons: [
                "assets/img/icons/Stelle_Destruction.png",
                "assets/img/icons/Stelle_Preservation.png",
                "assets/img/icons/Stelle_Harmony.png",
                "assets/img/icons/Stelle_Remembrance.png"
            ]
        },
        {
            name: "Caelus",
            versions: [
                "Destruction",
                "Preservation",
                "Harmony",
                "Remembrance"
            ],
            icons: [
                "assets/img/icons/Caelus_Destruction.png",
                "assets/img/icons/Caelus_Preservation.png",
                "assets/img/icons/Caelus_Harmony.png",
                "assets/img/icons/Caelus_Remembrance.png"
            ]
        },
        {
            name: "Dan Heng",
            versions: [
                "Default",
                "Imbibitor Lunae"
            ],
            icons: [
                "https://static.wikia.nocookie.net/houkai-star-rail/images/1/1a/Character_Dan_Heng_Icon.png/",
                "https://static.wikia.nocookie.net/houkai-star-rail/images/2/2a/Character_Dan_Heng_%E2%80%A2_Imbibitor_Lunae_Icon.png"
            ]
        },
        {
            name: "March 7th",
            versions: [
                "Default",
                "Hunt"
            ],
            icons: [
                "https://static.wikia.nocookie.net/houkai-star-rail/images/d/d3/Character_March_7th_Icon.png",
                "https://static.wikia.nocookie.net/houkai-star-rail/images/7/7b/Character_March_7th_%28The_Hunt%29_Icon.png"
            ]
        }
    ]


    customCharas: any[] = []

    charas: any = [
        {
            name: "Acheron",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/2/24/Character_Acheron_Icon.png",
            sub: "Time for Departure"
        },
        {
            name: "Aglaea",
            icon: "https://sr.yatta.moe/hsr/assets/UI/avatar/round/1402.png",
            sub: "See you at the baths"
        },
        {
            name: "Anonymous",
            icon: "assets/img/anon-default.png",
            sub: null
        },
        {
            name: "Argenti",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/c/c0/Character_Argenti_Icon.png",
            sub: "I swear to a rose"
        },
        {
            name: "Arlan",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/a/a9/Character_Arlan_Icon.png",
            sub: "Peppy's emergency contact"
        },
        {
            name: "Asta",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/9/9f/Character_Asta_Icon.png",
            sub: "I shouldn't buy any more stuff..."
        },
        {
            name: "Aventurine",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/d/da/Character_Aventurine_Icon.png",
            sub: "Always open to pull for your game account"
        },
        {
            name: "Bailu",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/4/47/Character_Bailu_Icon.png",
            sub: "Drink more warm water and get fewer tempers!"
        },
        {
            name: "Black Swan",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/9/90/Character_Black_Swan_Icon.png",
            sub: "Memories are soft amber"
        },
        {
            name: "Blade",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/9/90/Character_Blade_Icon.png",
            sub: null
        },
        {
            name: "Boothill",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/7/78/Character_Boothill_Icon.png",
            sub: "Pier Point Standard Heist (LFG 3/4)"
        },
        {
            name: "Bronya",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/0/0f/Character_Bronya_Icon.png",
            sub: "In a meeting"
        },
        {
            name: "Caelus",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/2/27/Character_Caelus_%28Harmony%29_Icon.png",
            sub: null
        },
        {
            name: "Castorice",
            icon: "https://sr.yatta.moe/hsr/assets/UI/avatar/round/1407.png",
            sub: null
        },
        {
            name: "Clara",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/a/a4/Character_Clara_Icon.png",
            sub: "I want to go to a picnic with everyone (>▽<)"
        },
        {
            name: "Dan Heng",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/1/1a/Character_Dan_Heng_Icon.png",
            sub: "For anything related to the data bank, come find me."
        },
        {
            name: "Dr. Ratio",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/4/47/Character_Dr._Ratio_Icon.png",
            sub: "\"There's no rush.\""
        },
        {
            name: "Feixiao",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/7/75/Character_Feixiao_Icon.png",
            sub: "Itching for a fight"
        },
        {
            name: "Firefly",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/9/9e/Character_Firefly_Icon.png",
            sub: "I will find my dreams..."
        },
        {
            name: "Fugue",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/c/c0/Character_Fugue_Icon.png",
            sub: ""
        },
        {
            name: "Fu Xuan",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/1/1a/Character_Fu_Xuan_Icon.png",
            sub: "I do not divine personal fortunes!"
        },
        {
            name: "Gallagher",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/1/12/Character_Gallagher_Icon.png",
            sub: "Penaconian Dog"
        },
        {
            name: "Gepard",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/7/75/Character_Gepard_Icon.png",
            sub: "Working, apologies for the slow response"
        },
        {
            name: "Guinaifen",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/9/98/Character_Guinaifen_Icon.png",
            sub: "Not causing trouble, not fearing trouble, and no crazy challenges"
        },
        {
            name: "Hanya",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/9/99/Character_Hanya_Icon.png",
            sub: "Engaging in oneiromancy, do not disturb."
        },
        {
            name: "Herta",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/b/bf/Character_Herta_Icon.png",
            sub: "This account is disabled | Business Contact: Asta"
        },
        {
            name: "Himeko",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/0/00/Character_Himeko_Icon.png",
            sub: "I can survive without water, but coffee is my lifeblood"
        },
        {
            name: "Hook",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/d/d5/Character_Hook_Icon.png",
            sub: "Moles! Assemble at the Fight Club!"
        },
        {
            name: "Huohuo",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/6/68/Character_Huohuo_Icon.png",
            sub: "Mr. Tail's \"Tail\""
        },
        {
            name: "Jade",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/f/fd/Character_Jade_Icon.png",
            sub: "You are always welcome to Bonajade Exchange."
        },
        {
            name: "Jiaoqiu",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/4/48/Character_Jiaoqiu_Icon.png",
            sub: "There's no problem that a hot pot can't fix."
        },
        {
            name: "Jing Yuan",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/8/88/Character_Jing_Yuan_Icon.png",
            sub: "I'm not at the Seat of Divine Foresight"
        },
        {
            name: "Jingliu",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/f/f9/Character_Jingliu_Icon.png",
            sub: null
        },
        {
            name: "Kafka",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/8/8c/Character_Kafka_Icon.png",
            sub: null
        },
        {
            name: "Lingsha",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/a/ab/Character_Lingsha_Icon.png",
            sub: "Don't get angry, don't get mad, you don't have the time to feel so bad"
        },
        {
            name: "Luka",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/c/c7/Character_Luka_Icon.png",
            sub: "No timely reply means I'm in training."
        },
        {
            name: "Luocha",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/2/20/Character_Luocha_Icon.png",
            sub: "A simple traveling merchant"
        },
        {
            name: "Lynx",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/6/6c/Character_Lynx_Icon.png",
            sub: "The user you have messaged is currently unavailable"
        },
        {
            name: "March 7th",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/d/d3/Character_March_7th_Icon.png",
            sub: "Today is also March 7th~"
        },
        {
            name: "Misha",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/4/4d/Character_Misha_Icon.png",
            sub: "Keep it up! The new world is just ahead!"
        },
        {
            name: "Moze",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/2/25/Character_Moze_Icon.png",
            sub: "No signature."
        },
        {
            name: "Mydei",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/8/89/Character_Mydei_Icon.png",
            sub: null
        },
        {
            name: "Natasha",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/6/61/Character_Natasha_Icon.png",
            sub: "Doing outpatient runs at the Robot Settlement. Check my availability before you visit"
        },
        {
            name: "Pela",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/c/c2/Character_Pela_Icon.png",
            sub: "Please include your name when providing information"
        },
        {
            name: "Pom-Pom",
            icon: "https://i2.wp.com/genshinbuilds.aipurrjects.com/hsr/avatar/round/UI_Message_Contacts_Pam.png",
            sub: "Come to Pom-Pom for Trailblazing rewards!"
        },
        {
            name: "Qingque",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/2/2e/Character_Qingque_Icon.png",
            sub: "Go ahead and work, just don't interrupt my game"
        },
        {
            name: "Rappa",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/8/84/Character_Rappa_Icon.png",
            sub: "Heart unmoved, evil pursued"
        },
        {
            name: "Robin",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/7/72/Character_Robin_Icon.png",
            sub: "Let's share our wings with one another."
        },
        {
            name: "Ruan Mei",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/1/16/Character_Ruan_Mei_Icon.png",
            sub: "Those are new cakes... Where did you get them?"
        },
        {
            name: "Sampo",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/5/53/Character_Sampo_Icon.png",
            sub: "Certified ancient relic agent"
        },
        {
            name: "Seele",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/9/9a/Character_Seele_Icon.png",
            sub: "If you have anything to say, spill it!"
        },
        {
            name: "Serval",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/7/7c/Character_Serval_Icon.png",
            sub: "Lacking sleep and inspiration"
        },
        {
            name: "Silver Wolf",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/a/a3/Character_Silver_Wolf_Icon.png",
            sub: "Don't make a game if you don't know how to"
        },
        {
            name: "Sparkle",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/6/6b/Character_Sparkle_Icon.png",
            sub: null
        },
        {
            name: "Stelle",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/7/7b/Character_Stelle_%28Harmony%29_Icon.png",
            sub: null
        },
        {
            name: "Sunday",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/3/38/Character_Sunday_Icon.png",
            sub: ""
        },
        {
            name: "Sushang",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/9/97/Character_Sushang_Icon.png",
            sub: "What illness makes you sleepy as soon as you read a book?"
        },
        {
            name: "The Herta",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/3/39/Character_The_Herta_Icon.png",
            sub: "It's me"
        },
        {
            name: "Tingyun",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/4/4f/Character_Tingyun_Icon.png",
            sub: "Let's talk it out and not fight~"
        },
        {
            name: "Topaz",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/8/89/Character_Topaz_%26_Numby_Icon.png",
            sub: "Off-site~ Call if important, otherwise text"
        },
        {
            name: "Tribbie",
            icon: "https://sr.yatta.moe/hsr/assets/UI/avatar/round/1403.png",
            sub: "Tribbie is always available~"
        },
        {
            name: "Welt",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/1/11/Character_Welt_Icon.png",
            sub: "Everyone on the Express, please constantly keep in touch"
        },
        {
            name: "Xueyi",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/2/23/Character_Xueyi_Icon.png",
            sub: "In seclusion. Do not disturb."
        },
        {
            name: "Yanqing",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/5/57/Character_Yanqing_Icon.png",
            sub: "Did the Artisanship Commission have new products today? No"
        },
        {
            name: "Yukong",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/3/32/Character_Yukong_Icon.png",
            sub: "I wish to take to the skies once more..."
        },
        {
            name: "Yunli",
            icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/4/43/Character_Yunli_Icon.png",
            sub: "(´・ω・`) Fight?"
        }
    ]

    settingTxtSize!: FormGroup
    settingImgSize!: FormGroup
    currentTxtSize: string = "";
    currentImgSize: string = "";

    newMsg!: FormGroup
    msg: any = ""
    messages: any = []
    stickers: any = []

    constructor(private sanitizer:DomSanitizer) { }

    ngOnInit(): void {
        if (localStorage.getItem("txtSize")) {
            this.settings.txtSize = true
            let size = localStorage.getItem("txtSize")!
            if (size.includes("rem")) {
                this.currentTxtSize = size.slice(0, size.length-3)
            } else {
                this.currentTxtSize = size.slice(0, size.length-2)
            }
        }
        if (localStorage.getItem("imgSize")) {
            this.settings.imgSize = true
            let size = localStorage.getItem("imgSize")!
            if (size.includes("rem")) {
                this.currentImgSize = size.slice(0, size.length-3)
            } else {
                this.currentImgSize = size.slice(0, size.length-2)
            }
        }

        this.settingTxtSize = new FormGroup({
            sizeNumber: new FormControl(this.currentTxtSize, Validators.required),
            sizeUnit: new FormControl("px", {nonNullable: true, validators: [Validators.required]})
        })

        this.settingImgSize = new FormGroup({
            sizeNumber: new FormControl(this.currentImgSize, Validators.required),
            sizeUnit: new FormControl("px", {nonNullable: true, validators: [Validators.required]})
        })

        this.newMsg = new FormGroup({
            textbox: new FormControl(null, Validators.required)
        })

        if (localStorage.getItem("cc")) {
            let ccList = localStorage.getItem("cc")!
            let parsed = JSON.parse(ccList)

            this.customCharas = parsed
        }

        if (localStorage.getItem("nc") != (this.newUpdateDate + "checked")) {
            localStorage.setItem("nc", this.newUpdateDate);
        }
        if (localStorage.getItem("nc") == this.newUpdateDate) {
            this.newChangelog = true
        }

        if (localStorage.getItem("Stelle")) {
            let chosenIcon = localStorage.getItem("Stelle")
            for (let i = 0; i < this.charas.length; i++) {
                let nameWithoutSpaces = this.charas[i].name.replace(/\s+/g, '');
                if (nameWithoutSpaces == "Stelle") {
                    this.charas[i].icon = chosenIcon
                }
            }
            if (this.friend.name == "Stelle") {
                this.friend.icon = chosenIcon
            } else if (this.user.name == "Stelle") {
                this.user.icon = chosenIcon
            }
        }
        if (localStorage.getItem("Caelus")) {
            let chosenIcon = localStorage.getItem("Caelus")
            for (let i = 0; i < this.charas.length; i++) {
                let nameWithoutSpaces = this.charas[i].name.replace(/\s+/g, '');
                if (nameWithoutSpaces == "Caelus") {
                    this.charas[i].icon = chosenIcon
                }
            }
            if (this.friend.name == "Caelus") {
                this.friend.icon = chosenIcon
            } else if (this.user.name == "Caelus") {
                this.user.icon = chosenIcon
            }
        }

        if (localStorage.getItem("DanHeng")) {
            let chosenIcon = localStorage.getItem("DanHeng")
            for (let i = 0; i < this.charas.length; i++) {
                let nameWithoutSpaces = this.charas[i].name.replace(/\s+/g, '');
                if (nameWithoutSpaces == "DanHeng") {
                    this.charas[i].icon = chosenIcon
                }
            }
            if (this.friend.name == "Dan Heng") {
                this.friend.icon = chosenIcon
            } else if (this.user.name == "Dan Heng") {
                this.user.icon = chosenIcon
            }
        }

        if (localStorage.getItem("March7th") ) {
            let chosenIcon = localStorage.getItem("March7th")
            for (let i = 0; i < this.charas.length; i++) {
                let nameWithoutSpaces = this.charas[i].name.replace(/\s+/g, '');
                if (nameWithoutSpaces == "March7th") {
                    this.charas[i].icon = chosenIcon
                }
            }
            if (this.friend.name == "March 7th") {
                this.friend.icon = chosenIcon
            } else if (this.user.name == "March 7th") {
                this.user.icon = chosenIcon
            }
        }
    }

    findName(name: string) {
        if (this.charaVersions.some((e: { name: string; }) => e.name === name)) {
            return true
        } else {
            return false
        }
    }

    findElement(e: any) {
        for (let i = 0; i < this.charaVersions.length; i++) {
            if (this.charaVersions[i].name == e) {
                return this.charaVersions[i]
            }
        }
    }

    // Check if the changelog has been updated
    isNewUpdate() {
        if (localStorage.getItem("nc") == this.newUpdateDate) {
            localStorage.setItem("nc", this.newUpdateDate + "checked")
            this.newChangelog = false
        }
    }

    getUploadedImg() {
        let uploadedPicViewer: any = document.getElementById("uploadedPic");
        let uploadedImage: any = document.getElementById("uploadImage");

        this.uploadedImg = URL.createObjectURL(uploadedImage.files[0]);
        uploadedPicViewer.src = this.uploadedImg;
    }

    getStickers() {
        if (!this.stickersLoaded) {
            for (let i = 0; i < this.stickersNumber; i++) {
                this.stickers.push("assets/img/stickers/sticker_" + i + ".png")
            }
            this.stickersLoaded = true
        } else { return }
    }

    getSaves() {
        if (!this.savesLoaded && localStorage.getItem("saves")) {
            let parsed = JSON.parse(localStorage.getItem("saves")!)
            this.allSaves = parsed
        } else { return }
    }

    addSave() {
        this.allSaves.push(this.messages)
        localStorage.setItem("saves", JSON.stringify(this.allSaves))
    }

    saveSettingTxtSize() {
        let size = this.settingTxtSize.value.sizeNumber + this.settingTxtSize.value.sizeUnit
        localStorage.setItem("txtSize", size)
        console.log(localStorage.getItem("txtSize"));
    }

    saveSettingImgSize() {
        let size = this.settingImgSize.value.sizeNumber + this.settingImgSize.value.sizeUnit
        localStorage.setItem("imgSize", size)
    }

    saveCharaVersion(name: any, icon: any) {
        let nameWithoutSpaces = name.replace(/\s+/g, '');
        localStorage.setItem(nameWithoutSpaces, icon)

        if (this.friend.name == name) {
            this.friend.icon = icon
        } else if (this.user.name == name) {
            this.user.icon = icon
        }
    }

    resetSetting(e: any) {
        localStorage.removeItem(e)
        if (e == "txtSize") {
            this.settingTxtSize.reset()
        } else {
            this.settingImgSize.reset()
        }
    }

    selectSave(save: string) {
        this.saveCheck = true
        this.onSubmit(save)
    }

    selectSticker(sticker: string) {
        this.stickerCheck = true
        this.onSubmit(sticker)
    }

    selectChara(ch: any) {
        if (!this.switchCheck) {
            this.friend = ch;
        } else { this.user = ch }
    }

    selectCustom(cc: any) {
        let chara = cc
        if (chara.sub == "1") {
            chara.sub = null;
        }
        if (!this.switchCheck) {
            this.friend = chara;
        } else { this.user = chara }
    }

    onSwitchChecked() {
        if (!this.switchCheck) {
            this.switchCheck = true
        } else { this.switchCheck = false }
    }

    onActionChecked() {
        if (!this.actionCheck) {
            this.actionCheck = true
            this.placeholder = "Type an action here..."
        } else {
            this.actionCheck = false
            this.placeholder = "Type message here..."
        }
        this.checked = !this.checked
    }

    onPhotoChecked() {
        if (!this.photoCheck) {
            this.photoCheck = true
            this.placeholder = "Paste a photo url here..."
        } else {
            this.photoCheck = false
            this.placeholder = "Type message here..."
        }
        this.checked = !this.checked
    }

    onQuestChecked() {
        if (!this.questCheck) {
            this.questCheck = true
            this.quest = {
                name: null,
                type: null,
                state: null
            }
            document.documentElement.style.setProperty('--questColor', '#53AABE');
            this.placeholder = "Type the quest name here..."
        } else {
            this.questCheck = false
            this.placeholder = "Type message here..."
        }
        this.checked = !this.checked
    }

    onDialogueChecked() {
        if (!this.dialogueCheck) {
            this.dialogueCheck = true
            this.options = {
                option1: null,
                option2: null,
                option3: null
            }
            this.placeholder = "First dialogue option..."
        } else {
            this.dialogueCheck = false
            this.placeholder = "Type message here..."
        }
        this.checked = !this.checked
    }

    setGroupChat() {
        if (!this.gc.name) {
            this.groupChat = true
            this.placeholder = "Type the group chat name here..."
        }
        this.checked = true
    }

    setCustomChara() {
        if (!this.cc.name) {
            this.customCharaCheck = true
            this.placeholder = "Type custom character name here..."
        }
    }

    deleteMessage(id: number) {
        this.messages.splice(id, 1)
    }

    editMessage(msg: any) {
        let newMessage = msg[0]
        let id = msg[1]

        this.messages.splice(id, 1, newMessage)
    }

    deleteSave(id: number) {
        this.allSaves.splice(id, 1)
        localStorage.setItem("saves", JSON.stringify(this.allSaves))
    }

    deleteCc(id: number) {
        this.customCharas.splice(id, 1)
        localStorage.setItem("cc", JSON.stringify(this.customCharas));
    }

    sanitize(url:string){
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    onSubmit(e?: string) {
        let chara: any
        let isUserRn: boolean
        let isAction: boolean
        let isPhoto: boolean
        let textInput = this.newMsg.value.textbox

        // NAMING A GROUP CHAT
        // if gc doesn't have a name yet, name it
        if (this.groupChat && !this.gc.name) {
            this.placeholder = "Type the group chat subtitle here..."
            this.gc.name = textInput
            this.newMsg.reset()
            return;
            // if gc doesn't have a subtitle yet, name it
        } else if (this.groupChat && this.gc.name && !this.gc.sub) {
            this.placeholder = "Type message here..."
            this.gc.sub = textInput
            this.newMsg.reset()
            this.groupChat = false
            this.checked = false
            return;
        }

        // NAMING A CUSTOM CHARACTER
        // if cc doesn't have a name yet, name it
        if (this.customCharaCheck && !this.cc.name) {
            this.placeholder = "Type character subtitle (or skip)..."
            this.cc.name = textInput
            this.newMsg.reset()
            return;
            // if cc doesn't have a subtitle yet, name it
        } else if (this.customCharaCheck && this.cc.name && !this.cc.sub) {
            this.placeholder = "Paste character icon URL (or skip)..."
            if (!textInput) {
                this.cc.sub = "1"
            } else {
                this.cc.sub = textInput
            }
            this.newMsg.reset()
            return;
            // if cc doesn't have an icon yet, add it
        } else if (this.customCharaCheck && this.cc.sub && !this.cc.icon) {
            if (!textInput) {
                this.cc.icon = "assets/img/anon-default.png"
            } else { this.cc.icon = textInput }
            this.placeholder = "Type message here..."
            this.newMsg.reset()
            this.customCharaCheck = false

            this.customCharas.push(this.cc)
            this.selectCustom(this.cc)

            // save to localstorage
            if (localStorage.getItem("cc")) {
                let stringifiedArray = localStorage.getItem("cc")!
                let parsedArray = JSON.parse(stringifiedArray)

                parsedArray.push(this.cc)
                localStorage.setItem("cc", JSON.stringify(parsedArray));
            } else {
                let array = []
                array.push(this.cc)
                localStorage.setItem("cc", JSON.stringify(array));
            }

            this.cc = {
                name: null,
                icon: null,
                sub: null
            }
            return;
        }

        // NAMING A QUEST
        // if quest doesn't have a name yet, set one
        if (this.questCheck && !this.quest.name) {
            this.placeholder = "Quest state: 'accepted' or 'completed'?"
            this.quest.name = textInput
            this.newMsg.reset()
            return;
            // if quest doesn't have a state yet, set one
        } else if (this.questCheck && this.quest.name && !this.quest.state) {
            // so that the answer isn't case sensitive
            let accepted = "accepted".localeCompare(textInput, undefined, { sensitivity: 'accent' });
            let completed = "completed".localeCompare(textInput, undefined, { sensitivity: 'accent' });

            this.placeholder = "Quest color: 'blue' or 'purple'?"
            if (accepted == 0) {
                this.quest.state = "Accepted Mission"
            } else if (completed == 0) {
                this.quest.state = "Mission completed"
            } else {
                this.placeholder = "Invalid answer. 'accepted' or 'completed'?"
            }
            this.newMsg.reset()
            return;
            // if quest doesn't have a type yet, set one
        } else if (this.questCheck && this.quest.state && !this.quest.type) {
            // so that the answer isn't case sensitive
            let blue = "blue".localeCompare(textInput, undefined, { sensitivity: 'accent' });
            let purple = "purple".localeCompare(textInput, undefined, { sensitivity: 'accent' });

            this.placeholder = "Type message here..."
            if (blue == 0) {
                this.quest.type = "assets/img/symbols/quest-icon-adventure.png"
            } else if (purple == 0) {
                this.quest.type = "assets/img/symbols/quest-icon-companion.png"
                document.documentElement.style.setProperty('--questColor', '#B886ED');
            } else {
                this.placeholder = "Invalid answer. 'blue' or 'purple'?"
            }
            this.newMsg.reset()
            return;
        }

        // NAMING DIALOGUE OPTIONS
        // if dialogue doesn't have a first option yet, set one
        if (this.dialogueCheck && !this.options.option1) {
            this.placeholder = "Second dialogue option (optional)..."
            if (textInput) {
                this.options.option1 = textInput
            } else {
                this.placeholder = "Answer can't be empty!"
            }
            this.newMsg.reset()
            return;
            // if dialogue doesn't have a second option yet, set one
        } else if (this.dialogueCheck && this.options.option1 && (this.options.option2 == null)) {
            this.placeholder = "Third dialogue option (optional)..."
            if (textInput) {
                this.options.option2 = textInput
            } else {
                this.options.option2 = ""
            }
            this.newMsg.reset()
            return;
            // if dialogue doesn't have a third option yet, set one
        } else if (this.dialogueCheck && (this.options.option2 != null) && (this.options.option3 == null)) {
            this.placeholder = "Type message here..."
            if (textInput) {
                this.options.option3 = textInput
            } else {
                this.options.option3 = ""
            }
            this.newMsg.reset()
            return;
        }

        // Friend or User switch
        if (!this.switchCheck) {
            chara = this.friend
            isUserRn = false
        } else {
            chara = this.user
            isUserRn = true
        }

        // (To optimize later)
        if (!this.actionCheck) {
            isAction = false
        } else { isAction = true }

        if (!this.photoCheck) {
            isPhoto = false
        } else { isPhoto = true }

        if (!this.stickerCheck) {
            this.msg = textInput
        } else {
            this.msg = e
        }

        if (isPhoto && !textInput) {
            this.msg = this.uploadedImg;
        }

        if (this.saveCheck) {
            this.messages = ""
            this.messages = e
            this.saveCheck = false
        }

        this.messages.push({
            sentBy: chara,
            text: this.msg,
            isUser: isUserRn,
            isAction: isAction,
            isPhoto: isPhoto,
            isSticker: this.stickerCheck
        })

        this.stickerCheck = false
        this.newMsg.reset()

        // Reset photo upload
        let uploadedPicViewer: any = document.getElementById("uploadedPic")
        uploadedPicViewer.src = ""
        let fileUpload = <HTMLInputElement>document.getElementById("uploadImage")
        fileUpload.value = ""
    }

}
