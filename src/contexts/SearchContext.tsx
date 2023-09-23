"use client";

import React, { createContext, useState } from "react";

type SearchContextType = {
  search: string;
  setSearch: (search: string) => void;
};

export const SearchContext = createContext({} as SearchContextType);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState<string>("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
