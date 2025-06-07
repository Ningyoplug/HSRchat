import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import html2canvas from 'html2canvas';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    standalone: false
})
export class ChatComponent implements OnInit {

    newUpdateDate = "07/06/2025"
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
    stickersNumber: number = 353;
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
        icon: "assets/img/icons/Dan_Heng.png",
        sub: "For anything related to the data bank, come find me."
    }

    user: any = {
        name: "Stelle",
        icon: "assets/img/icons/Stelle_Harmony.png",
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
                "assets/img/icons/Dan_Heng.png",
                "assets/img/icons/Dan_Heng_Imbibitor_Lunae.png"
            ]
        },
        {
            name: "March 7th",
            versions: [
                "Default",
                "Hunt"
            ],
            icons: [
                "assets/img/icons/March_7th.png",
                "assets/img/icons/March_7th_Hunt.png"
            ]
        }
    ]


    customCharas: any[] = []

    charas: any = [
        {
            name: "Acheron",
            icon: "assets/img/icons/Acheron.png",
            sub: "Time for Departure"
        },
        {
            name: "Aglaea",
            icon: "assets/img/icons/Aglaea.png",
            sub: "See you at the baths"
        },
        {
            name: "Anaxa",
            icon: "assets/img/icons/Anaxa.png",
            sub: "Then let me ask you"
        },
        {
            name: "Anonymous",
            icon: "assets/img/anon-default.png",
            sub: null
        },
        {
            name: "Archer",
            icon: "assets/img/icons/Archer.png",
            sub: ""
        },
        {
            name: "Argenti",
            icon: "assets/img/icons/Argenti.png",
            sub: "I swear to a rose"
        },
        {
            name: "Arlan",
            icon: "assets/img/icons/Arlan.png",
            sub: "Peppy's emergency contact"
        },
        {
            name: "Asta",
            icon: "assets/img/icons/Asta.png",
            sub: "I shouldn't buy any more stuff..."
        },
        {
            name: "Aventurine",
            icon: "assets/img/icons/Aventurine.png",
            sub: "Always open to pull for your game account"
        },
        {
            name: "Bailu",
            icon: "assets/img/icons/Bailu.png",
            sub: "Drink more warm water and get fewer tempers!"
        },
        {
            name: "Black Swan",
            icon: "assets/img/icons/Black_Swan.png",
            sub: "Memories are soft amber"
        },
        {
            name: "Blade",
            icon: "assets/img/icons/Blade.png",
            sub: null
        },
        {
            name: "Boothill",
            icon: "assets/img/icons/Boothill.png",
            sub: "Pier Point Standard Heist (LFG 3/4)"
        },
        {
            name: "Bronya",
            icon: "assets/img/icons/Bronya.png",
            sub: "In a meeting"
        },
        {
            name: "Caelus",
            icon: "assets/img/icons/Caelus_Harmony.png",
            sub: null
        },
        {
            name: "Castorice",
            icon: "assets/img/icons/Castorice.png",
            sub: "Writing as we speak"
        },
        {
            name: "Cipher",
            icon: "assets/img/icons/Cipher.png",
            sub: "Show me the money!"
        },
        {
            name: "Clara",
            icon: "assets/img/icons/Clara.png",
            sub: "I want to go to a picnic with everyone (>▽<)"
        },
        {
            name: "Dan Heng",
            icon: "assets/img/icons/Dan_Heng.png",
            sub: "For anything related to the data bank, come find me."
        },
        {
            name: "Dr. Ratio",
            icon: "assets/img/icons/Dr_Ratio.png",
            sub: "\"There's no rush.\""
        },
        {
            name: "Feixiao",
            icon: "assets/img/icons/Feixiao.png",
            sub: "Itching for a fight"
        },
        {
            name: "Firefly",
            icon: "assets/img/icons/Firefly.png",
            sub: "I will find my dreams..."
        },
        {
            name: "Fugue",
            icon: "assets/img/icons/Fugue.png",
            sub: null
        },
        {
            name: "Fu Xuan",
            icon: "assets/img/icons/Fu_Xuan.png",
            sub: "I do not divine personal fortunes!"
        },
        {
            name: "Gallagher",
            icon: "assets/img/icons/Gallagher.png",
            sub: "Penaconian Dog"
        },
        {
            name: "Gepard",
            icon: "assets/img/icons/Gepard.png",
            sub: "Working, apologies for the slow response"
        },
        {
            name: "Guinaifen",
            icon: "assets/img/icons/Guinaifen.png",
            sub: "Not causing trouble, not fearing trouble, and no crazy challenges"
        },
        {
            name: "Hanya",
            icon: "assets/img/icons/Hanya.png",
            sub: "Engaging in oneiromancy, do not disturb."
        },
        {
            name: "Herta",
            icon: "assets/img/icons/Herta.png",
            sub: "This account is disabled | Business Contact: Asta"
        },
        {
            name: "Himeko",
            icon: "assets/img/icons/Himeko.png",
            sub: "I can survive without water, but coffee is my lifeblood"
        },
        {
            name: "Hook",
            icon: "assets/img/icons/Hook.png",
            sub: "Moles! Assemble at the Fight Club!"
        },
        {
            name: "Huohuo",
            icon: "assets/img/icons/Huohuo.png",
            sub: "Mr. Tail's \"Tail\""
        },
        {
            name: "Hyacine",
            icon: "assets/img/icons/Hyacine.png",
            sub: "The Twilight Courtyard, always by your side~"
        },
        {
            name: "Jade",
            icon: "assets/img/icons/Jade.png",
            sub: "You are always welcome to Bonajade Exchange."
        },
        {
            name: "Jiaoqiu",
            icon: "assets/img/icons/Jiaoqiu.png",
            sub: "There's no problem that a hot pot can't fix."
        },
        {
            name: "Jing Yuan",
            icon: "assets/img/icons/Jing_Yuan.png",
            sub: "I'm not at the Seat of Divine Foresight"
        },
        {
            name: "Jingliu",
            icon: "assets/img/icons/Jingliu.png",
            sub: null
        },
        {
            name: "Kafka",
            icon: "assets/img/icons/Kafka.png",
            sub: null
        },
        {
            name: "Lingsha",
            icon: "assets/img/icons/Lingsha.png",
            sub: "Don't get angry, don't get mad, you don't have the time to feel so bad"
        },
        {
            name: "Luka",
            icon: "assets/img/icons/Luka.png",
            sub: "No timely reply means I'm in training."
        },
        {
            name: "Luocha",
            icon: "assets/img/icons/Luocha.png",
            sub: "A simple traveling merchant"
        },
        {
            name: "Lynx",
            icon: "assets/img/icons/Lynx.png",
            sub: "The user you have messaged is currently unavailable"
        },
        {
            name: "March 7th",
            icon: "assets/img/icons/March_7th.png",
            sub: "Today is also March 7th~"
        },
        {
            name: "Misha",
            icon: "assets/img/icons/Misha.png",
            sub: "Keep it up! The new world is just ahead!"
        },
        {
            name: "Moze",
            icon: "assets/img/icons/Moze.png",
            sub: "No signature."
        },
        {
            name: "Mydei",
            icon: "assets/img/icons/Mydei.png",
            sub: "30% Training, 70% Diet"
        },
        {
            name: "Natasha",
            icon: "assets/img/icons/Natasha.png",
            sub: "Doing outpatient runs at the Robot Settlement. Check my availability before you visit"
        },
        {
            name: "Pela",
            icon: "assets/img/icons/Pela.png",
            sub: "Please include your name when providing information"
        },
        {
            name: "Phainon",
            icon: "assets/img/icons/Phainon.png",
            sub: "Praise the sun!"
        },
        {
            name: "Pom-Pom",
            icon: "assets/img/icons/Pom_Pom.png",
            sub: "Come to Pom-Pom for Trailblazing rewards!"
        },
        {
            name: "Qingque",
            icon: "assets/img/icons/Qingque.png",
            sub: "Go ahead and work, just don't interrupt my game"
        },
        {
            name: "Rappa",
            icon: "assets/img/icons/Rappa.png",
            sub: "Heart unmoved, evil pursued"
        },
        {
            name: "Robin",
            icon: "assets/img/icons/Robin.png",
            sub: "Let's share our wings with one another."
        },
        {
            name: "Ruan Mei",
            icon: "assets/img/icons/Ruan_Mei.png",
            sub: "Those are new cakes... Where did you get them?"
        },
        {
            name: "Saber",
            icon: "assets/img/icons/Saber.png",
            sub: ""
        },
        {
            name: "Sampo",
            icon: "assets/img/icons/Sampo.png",
            sub: "Certified ancient relic agent"
        },
        {
            name: "Screwllum",
            icon: "assets/img/icons/Screwllum.png",
            sub: "Looking forward to meeting every little insect again"
        },
        {
            name: "Seele",
            icon: "assets/img/icons/Seele.png",
            sub: "If you have anything to say, spill it!"
        },
        {
            name: "Serval",
            icon: "assets/img/icons/Serval.png",
            sub: "Lacking sleep and inspiration"
        },
        {
            name: "Silver Wolf",
            icon: "assets/img/icons/Silver_Wolf.png",
            sub: "Don't make a game if you don't know how to"
        },
        {
            name: "Sparkle",
            icon: "assets/img/icons/Sparkle.png",
            sub: null
        },
        {
            name: "Stelle",
            icon: "assets/img/icons/Stelle_Harmony.png",
            sub: null
        },
        {
            name: "Sunday",
            icon: "assets/img/icons/Sunday.png",
            sub: "♪ Listening to \"Had I Not Seen the Sun\""
        },
        {
            name: "Sushang",
            icon: "assets/img/icons/Sushang.png",
            sub: "What illness makes you sleepy as soon as you read a book?"
        },
        {
            name: "The Herta",
            icon: "assets/img/icons/The_Herta.png",
            sub: "It's me"
        },
        {
            name: "Tingyun",
            icon: "assets/img/icons/Tingyun.png",
            sub: "Let's talk it out and not fight~"
        },
        {
            name: "Topaz",
            icon: "assets/img/icons/Topaz.png",
            sub: "Off-site~ Call if important, otherwise text"
        },
        {
            name: "Tribbie",
            icon: "assets/img/icons/Tribbie.png",
            sub: "Tribbie is always available~"
        },
        {
            name: "Welt",
            icon: "assets/img/icons/Welt.png",
            sub: "Everyone on the Express, please constantly keep in touch"
        },
        {
            name: "Xueyi",
            icon: "assets/img/icons/Xueyi.png",
            sub: "In seclusion. Do not disturb."
        },
        {
            name: "Yanqing",
            icon: "assets/img/icons/Yanqing.png",
            sub: "Did the Artisanship Commission have new products today? No"
        },
        {
            name: "Yukong",
            icon: "assets/img/icons/Yukong.png",
            sub: "I wish to take to the skies once more..."
        },
        {
            name: "Yunli",
            icon: "assets/img/icons/Yunli.png",
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

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        if (localStorage.getItem("txtSize")) {
            this.settings.txtSize = true
            let size = localStorage.getItem("txtSize")!
            if (size.includes("rem")) {
                this.currentTxtSize = size.slice(0, size.length - 3)
            } else {
                this.currentTxtSize = size.slice(0, size.length - 2)
            }
        }
        if (localStorage.getItem("imgSize")) {
            this.settings.imgSize = true
            let size = localStorage.getItem("imgSize")!
            if (size.includes("rem")) {
                this.currentImgSize = size.slice(0, size.length - 3)
            } else {
                this.currentImgSize = size.slice(0, size.length - 2)
            }
        }

        this.settingTxtSize = new FormGroup({
            sizeNumber: new FormControl(this.currentTxtSize, Validators.required),
            sizeUnit: new FormControl("px", { nonNullable: true, validators: [Validators.required] })
        })

        this.settingImgSize = new FormGroup({
            sizeNumber: new FormControl(this.currentImgSize, Validators.required),
            sizeUnit: new FormControl("px", { nonNullable: true, validators: [Validators.required] })
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

        if (localStorage.getItem("March7th")) {
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

    logThis(e: any) {
        console.log(e)
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

    sanitize(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    saveImage() {
        const node = document.getElementById("chat-canvas")!;

        htmlToImage
            .toPng(node, { backgroundColor: "#D3D9DD" })
            .then((dataUrl) => {
                let link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'hsrchat.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((err) => {
                console.error('oops, something went wrong!', err);
            });
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
