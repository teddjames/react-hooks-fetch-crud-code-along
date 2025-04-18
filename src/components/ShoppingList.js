// src/components/ShoppingList.js
import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const controller = new AbortController(); // ✨
    fetch("http://localhost:4000/items", { signal: controller.signal }) // :contentReference[oaicite:0]{index=0}
      .then((r) => r.json())
      .then((items) => setItems(items)) // :contentReference[oaicite:1]{index=1}
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });
    return () => controller.abort(); // ✨
  }, []);

  function handleAddItem(newItem) {
    setItems((prev) => [...prev, newItem]); // :contentReference[oaicite:2]{index=2}
  }

  function handleUpdateItem(updatedItem) {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    ); // :contentReference[oaicite:3]{index=3}
  }

  function handleDeleteItem(deletedItem) {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== deletedItem.id)
    ); // :contentReference[oaicite:4]{index=4}
  }

  const itemsToDisplay = items.filter((item) =>
    selectedCategory === "All" ? true : item.category === selectedCategory
  );

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
