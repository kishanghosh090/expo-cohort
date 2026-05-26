// import { TodoProvider } from "@/context";
// import { useState } from "react";
// import { StyleSheet, Text } from "react-native";
// import SyntaxHighlighter from "react-native-syntax-highlighter";
// import { atomOneDark } from "react-syntax-highlighter/styles/hljs";
// export default function Index() {
//   const [todos, setTodos] = useState<any[]>([]);

//   function createTodo(todo: any) {
//     setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
//   }
//   function editTodo(id: any, todo: any) {
//     setTodos((prev) =>
//       prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)),
//     );
//   }

//   function deleteTodo(todo: any) {}
//   function toggleComplete(id: any) {}

//   return (
//     <TodoProvider
//       value={{ createTodo, deleteTodo, editTodo, todos, toggleComplete }}
//     >
//       <SyntaxHighlighter
//         language="javascript"
//         style={atomOneDark}
//         PreTag={Text}
//         CodeTag={Text}
//       >
//         console.log("hello world"); console.log("hello world");
//         console.log("helloworld"); console.log("hello world");
//         console.log("hello world"); console.log("hello world");
//       </SyntaxHighlighter>
//     </TodoProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
import React, { useState } from "react";
import { SafeAreaView, ScrollView, TextInput } from "react-native";

import SyntaxHighlighter from "react-native-syntax-highlighter";

import { atomOneDark } from "react-syntax-highlighter/styles/hljs";

export default function App() {
  const [code, setCode] = useState(
    `function hello() {
  console.log("Hello");
}`,
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextInput
        multiline
        value={code}
        onChangeText={setCode}
        style={{
          flex: 1,
          backgroundColor: "#111",
          color: "white",
          padding: 12,
          fontSize: 16,
          textAlignVertical: "top",
        }}
      />

      <ScrollView style={{ flex: 1 }}>
        <SyntaxHighlighter
          language="javascript"
          style={atomOneDark}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </ScrollView>
    </SafeAreaView>
  );
}
