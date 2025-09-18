import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs";

export type CallOpenAIParams = Omit<ChatCompletionCreateParamsBase, "model"> &
  Partial<Pick<ChatCompletionCreateParamsBase, "model">>;

export enum ChatRoles {
  System = "system",
  User = "user",
  Assistant = "assistant",
  Tool = "tool",
  Function = "function",
}
