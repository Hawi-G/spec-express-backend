import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

interface User {
  id: number;
  name: string;
}

let users: User[] = [];


app.get("/users", (req: Request, res: Response) => {
  res.json(users);
});


app.get("/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});


app.post("/users", (req: Request, res: Response) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Name required" });
  }

  const newUser: User = {
    id: users.length + 1,
    name: req.body.name
  };

  users.push(newUser);
  res.status(201).json(newUser);
});


app.put("/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name || user.name;

  res.json(user);
});


app.delete("/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);

  res.json({ message: "User deleted" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});