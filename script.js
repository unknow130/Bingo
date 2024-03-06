//CUANDO LO ACABE MODICIAR PARA FUTURAS AMPLIACIONES
carton = []
let comprobar = []
let tamanioBombo = 50
let tamanioCarton = 32

function colocarBolas() {
    let divBombo = $("#bolasDisponibles")
    if (divBombo.find(".bola").length == 0) {
        for (let i = 0; i < tamanioBombo; i++) {
            let contenidoHtml = "<div class='bola'><p>" + (i + 1) + "</p></div>"
            divBombo.eq(0).append(contenidoHtml)
            $("#btnJugar").css("visibility", "visible")
        }
    }
}

function jugar() {
    let divCarton = $("#carton")
    if (divCarton.eq(0).find("div").length == 0) {
        for (let i = 0; i < tamanioCarton; i++) {
            let divBomboNumeroBolas = $("#bolasDisponibles div").length
            let random = Math.trunc(Math.random() * divBomboNumeroBolas + 1)
            while (carton.includes(random)) {
                random = Math.trunc(Math.random() * divBomboNumeroBolas + 1)
            }
            carton[i] = random
            divCarton.append("<div class='bola'><p>" + carton[i] + "</p></div>")
        }
    }
    else {
        //Accedemos al bombo
        let divBombo = $("#bolasDisponibles")
        //Accedemos a todas las bolas del bombo
        let bolasBombo = divBombo.find("div")
        //Cojemos una bola aleatoria en funcion del numero de bolas que tenemos disponibles
        let random = Math.trunc(Math.random() * bolasBombo.length)

        //Aqui guardamos la bola que hemos seleccionado
        let bolaSeleccionada = bolasBombo.eq(random)
        //La eliminamos del bombo
        bolaSeleccionada.remove()

        //Accedemos a la bola bingo
        $("#bolaSacada").html(bolaSeleccionada.text())

        //Accedemos al div carton para tachar la bola si la tenemos


        for (let i = 0; i < divCarton.find("div").length; i++) {
            let bolasCarton = divCarton.find("div").eq(i).find("p").text()
            if (bolasCarton == bolaSeleccionada.text()) {
                divCarton.eq(0).find("div").eq(i).css("background-color", "blue")
                divCarton.eq(0).find("div").eq(i).append("<div id='equis'><img src='images/equis.png' alt=''></div>")
            }
        }
    }

    comprobarLinea()
}

function comprobarLinea() {
    //Indicamos numero de columnas del carton
    let numeroColumnasCarton = 4
    //Un contador para saber si hacemos linea
    let linea = 0
    let aciertos = 0
    let aciertosCarton = 0
    //Ahora recorreremos el carton preguntando si tenemos linea comprobando bola x bola
    let divCarton = $("#carton").find(".bola")

    for (let i = 0; i < divCarton.length; i++) {
        let comprobarBola = divCarton.eq(i).attr("style")

        if (linea < Math.trunc(i / numeroColumnasCarton)) {
            aciertos = 0
            linea++
        }
        if (comprobarBola == "background-color: blue;") {
            aciertos++
            aciertosCarton++
        }
        if (aciertos == 4 && comprobar[linea] == false || aciertos == 4 && comprobar[linea] == null) {
            alert("Linea en la fila" + linea)
            comprobar[linea] = true 
        }
        if (aciertosCarton == divCarton.length) {
            alert("BINGOOOOOOOOOOOOOOoo")
        }
        
    }

}