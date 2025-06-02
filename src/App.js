import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState("Проверка авторизации...");

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();

    const initData = tg.initData;
    const initUser = tg.initDataUnsafe?.user;

    // Показываем в UI
    setUser(initUser);

    // Отправляем initData на сервер
    fetch("http://localhost:8000/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ init_data: initData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setAuthStatus("✅ Авторизация пройдена");
          console.log("Проверка пройдена:", data.user);
        } else {
          setAuthStatus("❌ Авторизация не пройдена");
          console.warn("Ошибка проверки:", data.reason);
        }
      })
      .catch((err) => {
        setAuthStatus("🚫 Ошибка соединения с сервером");
        console.error(err);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">🎮 Взрывные Котята</h1>
      <p className="mt-2">{authStatus}</p>

      {user && (
        <div className="mt-4">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Имя:</strong> {user.first_name}</p>
          <p><strong>Username:</strong> @{user.username}</p>
        </div>
      )}
    </div>
  );
}
