# Machine Vision Mini Project (machine-vision-mini-project)

Ini adalah sebuah project sederhana untuk memenuhi tugas seleksi Machine Vision. Dibuat dengan prinsip minimalis, sederhana dan secepat mungkin.

Demo yang ditunjukkan dalam project ini antara lain.

- Basic CRUD
- Routing
- Theming
- Error handling (berdasarkan: response server, koneksi internet, validasi data dan validasi input)

## Package yang Dipakai

Project ini dibangun dengan React (CRA), dengan beberapa library pembantu sebagai berikut.
- antd
- react-query
- react-router-dom
- axios
- styled-components

## Cara Menjalankan

Pertama-tama, clone project ini ke device Anda.

```
gt clone https://github.com/irvanherz/machine-vision-mini-project.git
```

Lalu masuk ke folder `machine-vision-mini-project`

```
cd machine-vision-mini-project
```

Buat file `.env` dari template `.env.template` yang sudah disertakan di repo.

```
cp .env.template .env
```

Tentukan kredensial APP_ID di file `.env`

```
REACT_APP_API_BASEURL=https://dummyapi.io
REACT_APP_API_APPID=#YOUR_APP_ID#
```

Jika sudah, maka Anda telah siap. Lanjutkan dengan instalasi dependensi.

```
npm install
```

Terakhir, jalankan project dengan perintah berikut.

```
npm start
```

## Demo

Tersedia juga live demo yang dapat diakses melalui link berikut ini.

[Demo](https://lovely-axolotl-539b49.netlify.app)

## Preview

![Home](https://i.imgur.com/sGlnIiq.png)

![manage Users](https://i.imgur.com/NWZGI5b.png)

![Manage Posts](https://i.imgur.com/cjAgZg5.png)