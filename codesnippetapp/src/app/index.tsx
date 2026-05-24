import { TodoProvider } from "@/context";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [todos, setTodos] = useState<any[]>([]);

  function createTodo(todo: any) {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  }
  function editTodo(id: any, todo: any) {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)),
    );
  }

  function deleteTodo(todo: any) {}
  function toggleComplete(id: any) {}

  return (
    <TodoProvider
      value={{ createTodo, deleteTodo, editTodo, todos, toggleComplete }}
    >
      <View style={styles.container}>
        <Text>Edit src/app/index.tsx to edit this screen.</Text>
      </View>
    </TodoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
