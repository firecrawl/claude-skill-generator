"use client";

import { createContext, useContext, ReactNode } from "react";

type GithubStarCountContextType = {
  starCount: string;
};

const GithubStarCountContext = createContext<
  GithubStarCountContextType | undefined
>(undefined);

export function useGithubStarCount() {
  const context = useContext(GithubStarCountContext);

  if (!context) {
    throw new Error(
      "useGithubStarCount must be used within a GithubStarCountProvider",
    );
  }

  return context;
}

type GithubStarCountProviderProps = GithubStarCountContextType & {
  children: ReactNode;
};

export default function GithubStarCountProvider({
  children,
  starCount,
}: GithubStarCountProviderProps) {
  return (
    <GithubStarCountContext.Provider value={{ starCount }}>
      {children}
    </GithubStarCountContext.Provider>
  );
}
