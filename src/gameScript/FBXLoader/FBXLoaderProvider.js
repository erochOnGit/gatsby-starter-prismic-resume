import React, { useState, useContext } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const FBXLoaderContext = React.createContext();

export function FBXLoaderProvider({ children }) {
  const [loader] = useState(new FBXLoader());
  return <FBXLoaderContext.Provider value={loader} children={children} />;
}

export function useFBXLoader() {
  const loader = useContext(FBXLoaderContext);
  return { loader };
}
