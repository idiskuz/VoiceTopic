import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", api => {
  api.onPageChange((url, title) => {
    if (!url.includes("/t/")) return;

    const joinButton = document.querySelector(".voice-topic-join-button");
    if (!joinButton) return;

    joinButton.addEventListener("click", () => {
      console.log("Apertura WebSocket...");

      const ws = new WebSocket("wss://voice.discussioni.com:8443");

      ws.onopen = () => {
        console.log("WebSocket aperto!");

        // Handshake iniziale obbligatorio
        ws.send(
          JSON.stringify({
            room: window.location.pathname, // stanza = URL del topic
            type: "join",
            payload: "hello"
          })
        );
      };

      ws.onmessage = event => {
        console.log("Messaggio ricevuto:", event.data);
      };

      ws.onerror = error => {
        console.error("Errore WebSocket:", error);
      };

      ws.onclose = event => {
        console.warn("WebSocket chiuso:", event.code, event.reason);
      };
    });
  });
});
