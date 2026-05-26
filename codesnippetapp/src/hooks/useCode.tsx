import { CreateCodeSnippetContext } from "@/context";
import { useContext } from "react";

export const useCode = () => {
  return useContext(CreateCodeSnippetContext);
};
