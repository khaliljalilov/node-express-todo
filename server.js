const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { title } = require("process");
const fsPromise = require("fs").promises;
const PORT = process.env.PORT || 3500;

// 1. CORS middleware (Hər yerdən gələn sorğuları qəbul etmək üçün)
app.use(cors());

// 2. Form və JSON datalarını oxumaq üçün middleware-lər
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 3. Statik faylları (Frontend hissəsini) təyin edirik
app.use(express.static(path.join(__dirname, "public")));

app.post("/add-task", async (req, res) => {
  try {
    const yazi = req.body.taskTitle;
    const read = JSON.parse(
      await fsPromise.readFile(
        path.join(__dirname, "data", "tasks.json"),
        "utf-8",
      ),
    );
    read.push({
      id: Date.now(),
      title: yazi
    });
    await fsPromise.writeFile(
      path.join(__dirname, "data", "tasks.json"),
      JSON.stringify(read, null, 2),
    );
    res.redirect("/");
  } catch (error) {
    res.status(500).send("xeta bas verdi");
    console.log(error);
  }
});
// 4. Əsas səhifə marşrutumuz (Route)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/api/tasks", async (req, res) => {
  try {
    const data = JSON.parse(
      await fsPromise.readFile(path.join(__dirname, "data", "tasks.json")),
    );
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});
app.delete('/api/tasks', async (req, res) => {
    try {
        const { taskId } = req.body;
        console.log("Frontend-dən gələn ID:", taskId); // Terminalda bunu yoxla!

        const fileData = await fs.readFile(filePath, 'utf8');
        let tasks = JSON.parse(fileData);

        // Həm string, həm də number ehtimalına qarşı tip toqquşmasının qarşısını alırıq:
        tasks = tasks.filter(task => String(task.id) !== String(taskId));

        await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
        res.status(200).json({ message: "Uğurla silindi!" });
    } catch (error) {
        console.error("DƏQİQ BACKEND XƏTASI:", error); // VS Code terminalına dərhal bax!
        res.status(500).json({ error: error.message });
    }
});
// Serveri dinləməyə başlayırıq
app.listen(PORT, () => console.log(`Serverimiz ${PORT} portunda canlıdır! 🚀`));
