export async function login(
  username: string,
  password: string,
): Promise<string> {
  const response = await fetch("https://localhost:3000/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login fehlgeschlagen");
  }

  const data = await response.json();
  const accessToken = data.access_token;
  const refreshToken = data.refresh_token;

  localStorage.setItem("token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);

  return accessToken;
}
