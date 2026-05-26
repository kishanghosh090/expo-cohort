import { createContext } from "react";

export const CreateCodeSnippetContext = createContext({
  codeSnippet: [
    {
      id: 1,
      code: "todo message",
      isFav: false,
    },
  ],
  createCodeSnippet: (todo: any) => {},
  editCodeSnippet: (id: any, todo: any) => {},
  deleteCodeSnippet: (id: any) => {},
  toggleFav: (id: any) => {},
});

export const CreateCodeSnippetContextProvider = CreateCodeSnippetContext.Provider;
