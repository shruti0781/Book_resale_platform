// ⚙️ Replace this key with your real OpenAI key (for demo only)
const API_KEY = "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";  // ⚠️ Do NOT share it with anyone

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





// --- Toggle Chatbot ---
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotContainer = document.getElementById("chatbot-container");
const chatbotClose = document.getElementById("chatbot-close");

chatbotToggle.onclick = () => chatbotContainer.style.display = "flex";
chatbotClose.onclick = () => chatbotContainer.style.display = "none";

// --- Chatbot Send ---
const sendBtn = document.getElementById("chatbot-send");
const input = document.getElementById("chatbot-text");
const messages = document.getElementById("chatbot-messages");

async function sendMessage() {
  const userMsg = input.value.trim();
  if (!userMsg) return;
  
  // Add user message
  const userDiv = document.createElement("div");
  userDiv.textContent = "🧑‍💻 " + userMsg;
  messages.appendChild(userDiv);
  input.value = "";

  // Add loading...
  const loading = document.createElement("div");
  loading.textContent = "🤖 typing...";
  messages.appendChild(loading);
  messages.scrollTop = messages.scrollHeight;

  // Fetch AI reply (dummy for now)
  const AI_KEY = "sk-xxxxxx"; // your API key (only local use!)
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMsg }]
      })
    });
    const data = await response.json();
    loading.remove();

    const botDiv = document.createElement("div");
    botDiv.textContent = "🤖 " + (data.choices?.[0]?.message?.content || "Sorry, I couldn’t understand.");
    messages.appendChild(botDiv);
    messages.scrollTop = messages.scrollHeight;

  } catch (error) {
    loading.textContent = "⚠️ Error fetching response.";
  }
}

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
