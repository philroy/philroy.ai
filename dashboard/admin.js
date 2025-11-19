const API = "https://YOUR-SERVER-IP:3001";

async function sendCmd() {
  const cmd = document.getElementById("cmd").value;

  const res = await fetch(`${API}/command`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ cmd })
  });

  const data = await res.json();
  document.getElementById("console").value += `> ${cmd}\n${data.response}\n`;
}

async function startServer() {
  await fetch(`${API}/start`, { headers: auth() });
}

async function stopServer() {
  await fetch(`${API}/stop`, { headers: auth() });
}

function auth() {
  return {
    "Authorization": "Bearer " + localStorage.getItem("token")
  };
}
