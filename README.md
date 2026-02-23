# 🌌 WrappedMe — Real-Time Spotify Insights

**WrappedMe** adalah dashboard analitik musik berbasis **Next.js** yang memvisualisasikan data Spotify pengguna secara *real-time*. Aplikasi ini mengolah data dari **Spotify Web API** untuk menampilkan lagu, artis, dan album teratas serta estimasi waktu mendengarkan tanpa harus menunggu akhir tahun.

---

## 🚀 Fitur Utama

* **Secure Authentication**: Menggunakan **NextAuth.js** (OAuth 2.0) untuk login aman via akun Spotify.
* **Real-Time Data**: Mengambil tren musik terbaru langsung melalui **Node.js API Routes**.
* **Smart Algorithms**: Kalkulasi estimasi total menit mendengarkan berdasarkan data riwayat putar.
* **High Performance**: Optimasi pemuatan data secara paralel menggunakan `Promise.all`.
* **Dynamic UI**: Antarmuka modern dengan **Tailwind CSS** dan fitur animasi *typing effect*.

---

## 🛠️ Tech Stack

* **Frontend**: Next.js (App Router), React.js, Tailwind CSS.
* **Backend**: Node.js (Next.js API Routes).
* **Autentikasi**: NextAuth.js (Auth.js) dengan Spotify Provider.
* **Integrasi API**: Spotify Web API Node SDK.

---

## ⚙️ Cara Menjalankan Proyek

1.  **Install Dependensi**
    ```bash
    npm install
    ```

2.  **Konfigurasi `.env.local`**
    Dapatkan credentials di [Spotify Developer Dashboard](https://developer.spotify.com/).
    ```env
    SPOTIFY_CLIENT_ID=your_id
    SPOTIFY_CLIENT_SECRET=your_secret
    NEXTAUTH_SECRET=any_random_string
    NEXTAUTH_URL=http://localhost:3000
    ```

3.  **Run Development**
    ```bash
    npm run dev
    ```

---

## 💡 Technical Insights: Handling 401 Unauthorized

Proyek ini menangani tantangan teknis terkait masa berlaku token Spotify yang singkat dengan mengimplementasikan **Refresh Token Rotation** pada *server-side session*. Hal ini memastikan pengguna tetap terautentikasi secara aman tanpa perlu login ulang saat mengakses data.