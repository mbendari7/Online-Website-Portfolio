# 👨‍💻 Mahmoud Bendari | Computer Engineering Portfolio

![Portfolio Preview](setup.jpg)

> A highly interactive, terminal-themed online portfolio built with **HTML5, CSS3, and Vanilla JavaScript**. Designed to showcase my skills in **Linux, Embedded Systems, and Low-Level Engineering** to potential employers.

🔗 **Live Portfolio:** [https://mahmoudbendari.com/) *(Hosted on IONOS)*

---

## 🚀 Purpose & Theme

This project serves as my professional digital resume and engineering portfolio. The design mimics a live Linux desktop environment to reflect my technical focus. It moves beyond a static webpage by incorporating interactive system behaviors that engineering leads and technical recruiters will recognize.

**Core Design Philosophy:**
* **Terminal-First:** A fully functional CLI is the primary navigation tool for power users.
* **System Realism:** Features like boot sequences, memory dumps, and sensor readings simulate a real operating system.
* **Hardware Focus:** The visual aesthetic (PCB background, dark mode) aligns with my work in embedded systems and computer engineering.

---

## ⚡ Features & Engineering "Easter Eggs"

### 🖥️ Interactive CLI Terminal
A draggable, fully functional terminal window allows users to navigate the site using commands.
* **Try typing:** `help`, `about`, `skills`, `contact`, or `clear`.
* **Hardware Simulation:**
    * `sensors`: Displays simulated real-time hardware stats (Voltage rails, CPU temp, Fan speed).
    * `hexdump`: Simulates a raw memory dump of the current page process.
    * `ping`: Simulates a network connectivity test to Google DNS.
    * `man resume`: Opens the PDF resume in a new tab (Manual page style).
* **Tab Autocomplete:** Supports `[TAB]` key to autocomplete commands.
* **Command History:** Use `[UP]` and `[DOWN]` arrows to cycle through previous commands.

### ⌨️ Vim Navigation Support
For power users who prefer keyboard-only navigation:
* Press **`j`** to scroll down.
* Press **`k`** to scroll up.
* *Includes a visual indicator in the system bar when Vim mode is active.*

### 🟢 Matrix Background Addition
* **Command:** Type `matrix` in the terminal to toggle a full-screen, rain-code animation using the HTML5 Canvas API.

### 🔧 Visual System Design
* **PCB/Breadboard Theme:** The background features a dot-grid pattern mimicking an engineering prototyping board.
* **System Polybar:** A fixed bottom status bar displaying:
    * **Real-time Clock**
    * **Live IP Address Detection** (Fetches visitor's public IP via API)
    * **CPU Usage Simulation**

---

## 🌐 Hosting & Deployment (IONOS)

This portfolio is hosted professionally using **IONOS** to ensure a dedicated, branded online presence.

* **Domain:** Custom domain configured via **IONOS DNS** settings.
* **Hosting:** Static file hosting on IONOS web servers (Apache/Nginx).
* **Deployment Workflow:** Files (`index.html`, `style.css`, `script.js`) are uploaded directly to the web space via SFTP for production.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Custom Variables, Flexbox/Grid), JavaScript (ES6+).
* **Assets:** FontAwesome (Icons), Google Fonts (Consolas/Monospace).
* **Infrastructure:** IONOS Web Hosting.

---

## 📂 Project Structure

```bash
.
├── index.html       # Main DOM structure & Boot Screen logic
├── style.css        # PCB Theme, Terminal styling, & Animations
├── script.js        # CLI Logic, Vim bindings, Matrix Canvas, & IP Fetch
├── profile.jpg      # Profile & Favicon asset
├── setup.jpg        # Workspace photography
├── hardware.png     # Hardware/Soldering photography
└── Resume.pdf       # Professional CV
