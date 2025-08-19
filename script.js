const API_KEY = "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";

async function getHint() {
  const text = document.getElementById("sourceText").value;
  const question = document.getElementById("question").value;
  const output = document.getElementById("hintOutput");

  if (!text || !question) {
    output.innerHTML = "⚠️ Please provide both text and a question.";
    return;
  }

  output.innerHTML = "⏳ Thinking...";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. The user will provide text and a question. Do not give the answer. Instead, give a hint about where in the text they should look."
          },
          {
            role: "user",
            content: `Text: """${text}"""\n\nQuestion: ${question}`
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error) {
      output.innerHTML = "❌ Error: " + data.error.message;
    } else {
      const hint = data.choices[0].message.content;
      output.innerHTML = "💡 Hint: " + hint;
    }
  } catch (err) {
    console.error(err);
    output.innerHTML = "❌ Error: " + err.message;
  }
}
