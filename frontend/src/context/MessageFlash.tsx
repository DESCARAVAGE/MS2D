import React, { ReactNode, createContext, useEffect, useState } from "react";

type MessageFlashContextType = {
    messageFlash: "success" | "error" | null;
    messageFlashText: string | null;
    success: (text: string) => void;
    error: (text: string) => void;
    clear: () => void;
  };

const STATES = {
    SUCCESS: "success",
    ERROR: "error"
} as const;

const MessageFlashContext = createContext<MessageFlashContextType>({
    messageFlash: null,
    messageFlashText: null,
    success: () => {},
    error: () => {},
    clear: () => {},
});

const MessageFlashProvider = ({ children }: { children: ReactNode }) => {
    const [messageFlash, setMessageFlash] = useState<"success" | "error" | null>(null);
    const [messageFlashText, setMessageFlashText] = useState<string | null>(null);

    useEffect(() => {
        if (messageFlash) {
            const timer = setTimeout(() => {
                clear();
            }, 3000); // Disappear after 3s
            return () => clearTimeout(timer);
        }
    }, [messageFlash]);

    const success = (text: string) => {
        window.scroll(0, 0);
        setMessageFlash(STATES.SUCCESS);
        setMessageFlashText(text);
    };

    const error = (text: string) => {
        window.scroll(0, 0);
        setMessageFlash(STATES.ERROR);
        setMessageFlashText(text);
    };

    const clear = () => {
        setMessageFlash(null);
        setMessageFlashText(null);
    };

    return (
        <MessageFlashContext.Provider value={{
            success,
            error,
            clear,
            messageFlash,
            messageFlashText,
        }}
        >
          {children}
        </MessageFlashContext.Provider>
    );
};

export { MessageFlashProvider };
export default MessageFlashContext;