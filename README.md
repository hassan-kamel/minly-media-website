# minly-media-website

Social media website for uploading media content, viewing lists, and liking/unliking media content.

## Table Of Content

- [Features](#Features)
- [Project Eco System](#Project-Eco-System)
- [Installation](#Installation)
- [more](#more)

## 🧐 Features

| Feat                   | Authenticated User | Guest |
| :--------------------- | :----------------: | :---: |
| `Login - signup`       |         ❌         |  ✅   |
| `Viewing Latest posts` |         ✅         |  ✅   |
| `infinity scroll`      |         ✅         |  ✅   |
| `Create post`          |         ✅         |  ❌   |
| `Delete post`          |         ✅         |  ❌   |
| `Like / Dislike Post`  |         ✅         |  ❌   |

## 🌟 Project Eco System

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux-Toolkit](https://redux-toolkit.js.org/)
- [Axios](https://axios-http.com/)

## 🛠️ Installation

#### Clone Repository

```bash
  git clone https://github.com/hassan-kamel/minly-media-website.git
```

#### Install Dependencies Using <strong>`npm`</strong> Make Sure You Have Installed <strong>`Node.js` </strong>

```bash
 npm install
```

#### Run Project

```bash
 npm run dev
```

#### Congrats 🎉

```bash
  http://localhost:5173/
```

## 💥 more

### ⁉️ Want to change the base API url ?

[MinlyMediaAPI.ts](https://github.com/hassan-kamel/minly-media-website/blob/main/src/api/MinlyMediaAPI.ts)

### 🤮 Code Smell

- [postSlice.ts](https://github.com/hassan-kamel/minly-media-website/blob/main/src/store/features/postSlice.ts)
