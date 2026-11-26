# BLUFF

Браузерная многопользовательская карточная игра (2–5 игроков). Монорепозиторий: `client` (React + TS + Vite + Tailwind + Framer Motion) и `server` (Node + Express + Socket.IO).

## Статус
Этап 1 из 10: структура, дизайн-основа, экран регистрации, сервер с `/health`.
Не реализовано: обучение, меню, настройки, комнаты, игра, звук (этапы 2–8).

## Локальный запуск
```
npm run install:all
cp server/.env.example server/.env
cp client/.env.example client/.env
npm run dev:server   # http://localhost:3001
npm run dev:client   # http://localhost:5173
```

## Деплой на Render
1. Залей репозиторий на GitHub.
2. Render → New → Blueprint → выбери репозиторий (используется `render.yaml`).
3. В сервере задай `CLIENT_ORIGIN` = URL клиента; в клиенте `VITE_SERVER_URL` = URL сервера.
4. Мониторинг: `GET /health` (можно подключить внешний монитор). Бесплатный тариф Render усыпляет сервис после простоя; пинги это не гарантированно обходят — для постоянной работы нужен платный тариф.
