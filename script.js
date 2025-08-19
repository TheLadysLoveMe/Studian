document.getElementById("getHintBtn").addEventListener("click", () => {
  const text = document.getElementById("sourceText").value;
  const question = document.getElementById("question").value;
  const output = document.getElementById("hintOutput");

  if (!text || !question) {
    output.innerHTML = "⚠️ Please provide both text and a question.";
    return;
  }

  output.innerHTML = "⏳ Analyzing text...";

  try {
    // Use Compromise
    const nlpLib = window.nlp; // ensure we use window.nlp
    const doc = nlpLib(question);
    const keywords = [
      ...doc.nouns().out('array'),
      ...doc.verbs().out('array')
    ];

    const sentences = nlpLib(text).sentences().out('array');

    const hints = sentences.filter(sentence => {
      return keywords.some(kw => sentence.toLowerCase().includes(kw.toLowerCase()));
    });

    if (hints.length > 0) {
      output.innerHTML = `💡 Hint: Check these parts of your text: <ul>${hints.map(s => `<li>${s}</li>`).join('')}</ul>`;
    } else {
      output.innerHTML = "🤔 I couldn't find exact matches. Try looking at section titles, first sentences, or keywords.";
    }
  } catch (err) {
    output.innerHTML = "❌ Error: " + err.message;
    console.error(err);
  }
});
