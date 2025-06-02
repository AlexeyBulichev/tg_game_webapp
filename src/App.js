import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();

    const userData = tg.initDataUnsafe?.user;
    setUser(userData);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">🎮 Взрывные Котята</h1>

      {user ? (
        <div className="mt-4">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Имя:</strong> {user.first_name}</p>
          <p><strong>Username:</strong> @{user.username}</p>
        </div>
      ) : (
        <p>Загрузка данных Telegram...</p>
      )}
    </div>
  );
}