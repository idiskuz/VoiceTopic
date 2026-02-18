import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", api => {
  api.onPageChange(() => {
    const title = document.querySelector(".fancy-title");
    if (!title) return;

    if (!document.querySelector(".voice-topic-join-button")) {
      const btn = document.createElement("button");
      btn.className = "btn btn-primary voice-topic-join-button";
      btn.innerText = "🎙️ Entra nella stanza vocale";

      title.insertAdjacentElement("afterend", btn);

      btn.addEventListener("click", () => {
        const ws = new WebSocket("wss://voice.discussioni.com:8443");
        ws.onopen = () => {
          ws.send(JSON.stringify({
            room: window.location.pathname,
            type: "join",
            payload: "hello"
          }));
        };
      });
    }
  });
});
