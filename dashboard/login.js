async function login() {
  const username = document.getElementById("user").value;
  const password = document.getElementById("pass").value;

  const res = await fetch("https://YOUR-SERVER-IP:3001/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("token", data.token);
    window.location.href = "admin.html";
  } else {
    document.getElementById("msg").innerText = "Invalid login";
  }
}
