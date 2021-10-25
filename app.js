
// Script a ser vinculado assim que a página for carregada
document.addEventListener("DOMContentLoaded", _ => {

    let ACTIVATED_BY_USER = false

    // Selecionando alguns elementos da interface
    const gravar = document.getElementById("gravar")
    const parar = document.getElementById("parar")

    // Marcando o botão parar desabilitado
    parar.setAttribute("disabled", "disabled")
    parar.classList.add("disabled")

    // Instanciando o objeto da classe SpeechRecognition
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const reconhecimento = new window.SpeechRecognition()
    reconhecimento.lang = "pt-br"
    reconhecimento.continuous = true
    reconhecimento.interimResults = true

    // Vinculando uma função callback no botão "Gravar" para o evento click
    gravar.addEventListener("click", _ => {
        // Alterando o status do botão e informando ao usuário que o microfone está gravando
        if (parar.disabled) {
            parar.removeAttribute("disabled")
        }
        if (parar.className === "button disabled") {
            parar.classList.remove("disabled")
        }

        // Desabilitando o botão para impedir que uma nova gravação seja realizada
        if (!gravar.disabled) {
            gravar.setAttribute("disabled", "disabled")
        }
        if (gravar.className === "button") {
            gravar.classList.add("disabled")
        }

        gravar.firstChild.innerHTML = "  Gravando..."

        // Capturando o audio
        reconhecimento.start()

    })

    // Vinculando uma função callback no botão "Parar" para o evento click
    parar.addEventListener("click", _ => {
        // Voltando ao status inicial
        gravar.firstChild.innerHTML = "  Gravar"
        if (!parar.disabled) {
            parar.setAttribute("disabled", "disabled")
        }
        if (parar.className !== "button disabled") {
            parar.classList.add("disabled")
        }

        // Habilitando o botão para que uma nova gravação seja realizada
        if (gravar.disabled) {
            gravar.removeAttribute("disabled")
        }
        if (gravar.className === "button disabled") {
            gravar.classList.remove("disabled")
        }

        // Alterando o valor da variável global para que ela não dispare outra chamada à api do web recg
        ACTIVATED_BY_USER = true

        // Finalizando a gravação e a interpretação de áudio
        reconhecimento.stop()

    })

    reconhecimento.addEventListener("result", event => {
        // Selecionando o elemento de output do texto
        const output = document.getElementById("laudo")

        // Cria um array com os valores do objeto 'event.results'
        let text = Array.from(event.results)

        // Mapeando cada elemento do array anterior para um novo array contendo apenas os elementos no indice 0 e em
        // seguida mapeando cada elemento do array anterior para um novo array contento apenas os valores do atributo 
        // 'transcript'.
        text = text.map(result => result[0]).map(result => result.transcript)

        // text = text.map(result => result.transcript)

        // Transformando o array resultante em uma string
        text = text.join("")

        // Inserindo a string final no elemento no html
        output.value = text
    })

    reconhecimento.addEventListener("end", _ => {
        // Verificando se o evento foi disparado pelo usuário
        if (ACTIVATED_BY_USER) {
            // Finalizando o processo de transcrição e resetando o estado da variável global
            ACTIVATED_BY_USER = false
            reconhecimento.stop()
        }
        else {
            const output = document.getElementById("laudo")
            output.value.length > 0 ? output.value += '.\n' : null
            reconhecimento.start()
        }        
        // ACTIVATED_BY_USER ? reconhecimento.stop() : reconhecimento.start()
    })
})
