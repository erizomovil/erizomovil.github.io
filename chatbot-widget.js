(function() {
    let chatbox = document.createElement("div");
    chatbox.innerHTML = `
        <div id="chat-container" style="position:fixed;bottom:20px;right:20px;width:300px;height:400px;background:white;border-radius:10px;box-shadow:0px 0px 10px gray;display:flex;flex-direction:column;">
            <div id="chat-messages" style="flex:1;overflow:auto;padding:10px;"></div>
            <input id="chat-input" type="text" placeholder="Escribe un mensaje..." style="border:none;padding:10px;width:calc(100% - 20px);">
        </div>
    `;
    document.body.appendChild(chatbox);

    let input = document.getElementById("chat-input");
    let messages = document.getElementById("chat-messages");

    input.addEventListener("keypress", async function(event) {
        if (event.key === "Enter") {
            let msg = input.value;
            messages.innerHTML += `<div><b>Tú:</b> ${msg}</div>`;
            input.value = "";

            let response = await fetch("https://mi-chatbot-api.com/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: msg })
            });

            let data = await response.json();
            messages.innerHTML += `<div><b>Bot:</b> ${data.response}</div>`;
        }
    });
})();
