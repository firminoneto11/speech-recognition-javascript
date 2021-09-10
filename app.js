
// Script a ser vinculado assim que a página for carregada
document.addEventListener("DOMContentLoaded", _ => {
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

        // Finalizando a gravação e a interpretação de áudio
        reconhecimento.stop()

    })

    reconhecimento.addEventListener("result", event => {
        // Selecionando o elemento de output do texto
        const output = document.getElementById("laudo")

        // Cria um array com os valores do objeto 'event.results'
        let text = Array.from(event.results)

        // Mapeando cada elemento do array anterior para um novo array contendo apenas os elementos no indice 0
        text = text.map(result => result[0])

        // Mapeando cada elemento do array anterior para um novo array contento apenas os valores do atributo 'transcript'
        text = text.map(result => result.transcript)

        // Transformando o array resultante em uma string
        text = text.join("")

        // Inserindo a string final no elemento no html
        output.value = text
    })
})
