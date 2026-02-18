import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "voice-topic-initializer",

  initialize() {
    withPluginApi("1.8.0", api => {
      console.log("VoiceTopic component loaded");

      document.addEventListener("click", event => {
        if (event.target.classList.contains("voice-topic-join-button")) {

          const topic = api.getCurrentTopic();
          if (!topic) {
            alert("Errore: impossibile trovare il topic ID.");
            return;
          }

          const topicId = topic.id;
          console.log("Topic ID:", topicId);

          // Qui apriremo la stanza vocale
          openVoiceRoom(topicId);
        }
      });

      function openVoiceRoom(topicId) {
        alert("Stanza vocale per topic ID: " + topicId);
      }
    });
  }
};
