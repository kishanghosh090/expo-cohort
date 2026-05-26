import { createContext } from "react";

export const CreateCodeSnippetContext = createContext({
  codeSnippet: [
    {
      id: 1,
      color: "#212121",
      title: "this is ref",
      lang: "javascript",
      code: "console.log('hello from kishan')",
      isFav: false,
      createdAt: Date.now().toLocaleString(),
      updatedAt: Date.now().toLocaleString(),
    },
  ],
  createCodeSnippet: (code: any) => {},
  editCodeSnippet: (id: any, code: any) => {},
  deleteCodeSnippet: (id: any) => {},
  toggleFav: (id: any) => {},
});

export const CreateCodeSnippetContextProvider =
  CreateCodeSnippetContext.Provider;
