// ⚙️ Replace this key with your real OpenAI key (for demo only)
const API_KEY = "sk-your-real-api-key-here";  // ⚠️ Do NOT share it with anyone

// 🔹 Function to call OpenAI API
async function getAIResponse(prompt) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    if (data.error) {
      console.error(data.error);
      return "⚠️ Error: " + data.error.message;
    }

    return data.choices[0].message.content.trim();
  } catch (err) {
    console.error(err);
    return "⚠️ Network error. Please check your connection.";
  }
}

// 🔹 Add messages to chat box visually
function addMessageToChat(sender, text) {
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.className = sender;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 🔹 When user sends message
async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  addMessageToChat("user", message);
  input.value = "";

  // Show a "typing..." message
  const tempMsg = document.createElement("div");
  tempMsg.className = "bot";
  tempMsg.textContent = "🤖 Typing...";
  document.getElementById("chatBox").appendChild(tempMsg);

  // Get AI reply
  const reply = await getAIResponse(message);

  // Remove "typing..." and show actual reply
  tempMsg.remove();
  addMessageToChat("bot", reply);
}
