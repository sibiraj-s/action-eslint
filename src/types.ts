export interface Inputs {
  token: string;
  annotations: boolean;
  eslintArgs: string[];
  rootDir: string;
  extensions: string[];
  ignoreFile: string;
  ignorePatterns: string[];
}

export type FileNamesList = string[];

export type File = {
  filename: string;
  status: string;
};
