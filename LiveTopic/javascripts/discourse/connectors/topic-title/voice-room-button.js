import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", api => {
  api.onPageChange((url, title) => {
    if (!url.includes("/t/")) return;

    const joinButton = document.querySelector(".voice-topic-join-button");
    if (!joinButton) return;

    joinButton.addEventListener("click", () => {
      const ws = new WebSocket("wss://voice.discussioni.com:8443");

      ws.onopen = () => {
        ws.send(JSON.stringify({
          room: window.location.pathname,
          type: "join",
          payload: "hello"
        }));
      };
    });
  });
});
