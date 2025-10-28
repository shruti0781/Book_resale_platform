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

  // 🔑 Your API key (for demo use only!)
  const API_KEY = "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";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
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
