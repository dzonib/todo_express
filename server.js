const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let items = [
  { id: 1, name: "item1", quantity: 123 },
  { id: 2, name: "item2", quantity: 4 },
  { id: 3, name: "item3", quantity: 87 },
  { id: 4, name: "item4", quantity: 59 } 
];

app.get("/items/get-items", (req, res) => {
  res.json(items);
});

app.get("/items/get-item", (req, res) => {
  const item = items.find(item => item.id === req.body.id);

  res.json(item);
});

app.post("/items/add-item", (req, res) => {
  const { id, name, quantity } = req.body;
  items = [...items, { id, name, quantity }];

  res.json(items);
});

app.put("/items/update-item", (req, res) => {
  const { id, name, quantity } = req.body;
  items = items.map(item => {
    if (item.id === id) {
      return { id, name, quantity };
    }

    return item;
  });

  res.json(items);
});

app.delete("/items/remove-item/:id", (req, res) => {
  const id = Number(req.params.id)
  items = items.filter(item => item.id !== id);

  res.json(items);
});

app.listen(5000, () => console.log(`server running on http://localhost:5000`));
