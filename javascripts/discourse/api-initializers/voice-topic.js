import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "voice-topic-initializer",

  initialize() {
    withPluginApi("1.8.0", api => {
      console.log("VoiceTopic component loaded");

      // Listener per il pulsante "Entra nella stanza vocale"
      document.addEventListener("click", event => {
        if (event.target.classList.contains("voice-topic-join-button")) {

          const topic = api.getCurrentTopic();
          if (!topic) {
            alert("Errore: impossibile trovare il topic ID.");
            return;
          }

          const topicId = topic.id;
          console.log("Topic ID:", topicId);

          openVoiceRoom(topicId);
        }
      });

      // ------------------------------
      // FUNZIONE: Apertura finestra modale
      // ------------------------------
      function openVoiceRoom(topicId) {
        const modal = document.createElement("div");
        modal.className = "voice-topic-modal";

        modal.innerHTML = `
          <div class="voice-topic-modal-content">
            <h3>Stanza vocale</h3>
            <p>Topic ID: ${topicId}</p>

            <button class="btn btn-primary" id="start-voice">
              Avvia microfono
            </button>

            <br><br>

            <button class="btn" id="close-voice">
              Chiudi
            </button>
          </div>
        `;

        document.body.appendChild(modal);

        document.getElementById("close-voice").onclick = () => modal.remove();

        // Avvio microfono
        document.getElementById("start-voice").onclick = () => {
          startMicrophone();
        };
      }

      // ------------------------------
      // FUNZIONE: Attiva microfono (WebRTC base)
      // ------------------------------
      async function startMicrophone() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          console.log("Microfono attivo:", stream);

          alert("Microfono attivato! Controlla la console per vedere lo stream audio.");

        } catch (error) {
          console.error("Errore microfono:", error);
          alert("Impossibile attivare il microfono.");
        }
      }
    });
  }
};
