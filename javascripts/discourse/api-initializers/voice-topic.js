import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "voice-topic-initializer",

  initialize() {
    withPluginApi("1.8.0", api => {
      console.log("VoiceTopic component loaded");

      document.addEventListener("click", event => {
        if (event.target.classList.contains("voice-topic-join-button")) {
          alert("Qui collegheremo la stanza vocale WebRTC basata sul topic ID!");
        }
      });
    });
  }
};
