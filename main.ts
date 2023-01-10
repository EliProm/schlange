input.onButtonPressed(Button.A, function () {
    Richt = Richt - 1
    if (Richt < 0) {
        Richt += 4
    }
})
function fDx (Richtung: number) {
    if (Richtung == 0) {
        Erg = 0
    }
    if (Richtung == 1) {
        Erg = 1
    }
    if (Richtung == 2) {
        Erg = 0
    }
    if (Richtung == 3) {
        Erg = -1
    }
    return Erg
}
function fDy (Richtung: number) {
    if (Richtung == 0) {
        Erg = -1
    }
    if (Richtung == 1) {
        Erg = 0
    }
    if (Richtung == 2) {
        Erg = 1
    }
    if (Richtung == 3) {
        Erg = 0
    }
    return Erg
}
input.onButtonPressed(Button.B, function () {
    Richt = Richt + 1
    if (Richt > 3) {
        Richt += -4
    }
})
function xyneu (xyalt: number, Dxy: number) {
    Erg = xyalt + Dxy
    while (Erg < 0) {
        Erg += 5
    }
    while (Erg > 4) {
        Erg += -5
    }
    return Erg
}
let Erg = 0
let Richt = 0
let Posx = 2
let Posy = 2
let xlist = [Posx]
let ylist = [Posy]
Richt = 0
let len = 3
let kollision = 0
let speed = 500
let time = 0
loops.everyInterval(1000, function () {
    if (kollision == 0) {
        time += 1
    }
})
loops.everyInterval(2000, function () {
    if (kollision == 0) {
        len += 1
    }
})
loops.everyInterval(2000, function () {
    speed = speed * 0.95
})
basic.forever(function () {
    while (kollision == 0) {
        led.plotBrightness(Posx, Posy, 126)
        Posx = xyneu(Posx, fDx(Richt))
        Posy = xyneu(Posy, fDy(Richt))
        xlist.unshift(Posx)
        ylist.unshift(Posy)
        if (led.point(Posx, Posy)) {
            kollision = 1
            music.playTone(262, music.beat(BeatFraction.Whole))
        }
        led.plot(Posx, Posy)
        music.playTone(262, music.beat(BeatFraction.Sixteenth))
        if (xlist.length > len) {
            led.unplot(xlist.pop(), ylist.pop())
        }
        basic.pause(speed)
    }
    if (kollision == 1) {
        basic.showIcon(IconNames.No)
        music.startMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.ForeverInBackground)
        basic.pause(100)
        basic.showNumber(time)
        basic.pause(1000)
    }
})
