import React, { FC, createContext, useContext } from 'react';
import { useURLParams } from '../utils/url';

type CodeContextType = {
  code: string;
  updateCode: (source: string) => void;
};
const CodeContext = createContext<CodeContextType>({} as CodeContextType);

export const CodeContextProvider: FC = ({ children }) => {
  const [code, setCode] = useURLParams(
    'code',
    `interface Home {
    resident: { name: string; age: number };
  }
  /**
   * internal interface with one member
   */
  
  interface Internal {
    /**
     * string type member
     */
  
    m: string;
  }
  /**
   * interface extending another one
   */
  
  export interface Bear extends Internal, Home {
    /**
     * boolean type member
     */
  
    honey: boolean;
  }`,
  );
  return (
    <CodeContext.Provider
      value={{
        code,
        updateCode: (source) => {
          setCode(source);
        },
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};

export const useCodeContext = (): CodeContextType => useContext(CodeContext);
