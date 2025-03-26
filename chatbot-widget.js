(function() {
    // Crear el contenedor del chat
    let chatbox = document.createElement("div");
    chatbox.innerHTML = `
        <div id="chat-container" style="position:fixed;bottom:20px;right:20px;width:300px;height:400px;background:white;border-radius:10px;box-shadow:0px 0px 10px gray;display:none;flex;flex-direction:column;">
            <div id="chat-messages" style="flex:1;overflow:auto;padding:10px;border-bottom:1px solid #ccc;"></div>
            <input id="chat-input" type="text" placeholder="Escribe un mensaje..." style="border:none;padding:10px;width:calc(100% - 20px);box-sizing:border-box;">
        </div>
    `;
    document.body.appendChild(chatbox);

    // Crear el botón flotante
    let button = document.createElement("button");
    button.innerHTML = "💬 Chat";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.padding = "10px 20px";
    button.style.borderRadius = "50px";
    button.style.background = "#007bff";
    button.style.color = "white";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.style.zIndex = "9999"; // Asegura que el botón esté siempre visible

    // Mostrar/ocultar el chat al hacer clic en el botón
    button.onclick = function() {
        let chatContainer = document.getElementById("chat-container");
        // Cambiar visibilidad del chat al hacer clic
        if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
            chatContainer.style.display = "flex";  // Usar 'flex' para una disposición adecuada
        } else {
            chatContainer.style.display = "none";
        }
    };

    // Agregar el botón flotante al DOM
    document.body.appendChild(button);

    // Obtener el campo de entrada y los mensajes
    let input = document.getElementById("chat-input");
    let messages = document.getElementById("chat-messages");

    // Función para manejar el envío del mensaje
    input.addEventListener("keypress", async function(event) {
        if (event.key === "Enter") {
            let msg = input.value;
            if (!msg.trim()) return;  // Evitar mensajes vacíos

            // Mostrar el mensaje del usuario en el chat
            messages.innerHTML += `<div><b>Tú:</b> ${msg}</div>`;
            input.value = "";  // Limpiar el campo de entrada

            // Enviar el mensaje al chatbot (ajustar la URL a tu API de Vercel)
            let response = await fetch("https://chatbot-i69n7vwsk-erizomovils-projects.vercel.app/api/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: msg })
            });

            let data = await response.json();

            // Mostrar la respuesta del bot en el chat
            messages.innerHTML += `<div><b>Bot:</b> ${data.response}</div>`;
            // Asegurarse de que el chat se desplace hacia abajo cuando se agreguen nuevos mensajes
            messages.scrollTop = messages.scrollHeight;
        }
    });
})();
