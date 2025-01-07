import React, { createContext, useState } from 'react';

export const MenuContext = createContext();

const MenuProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    return (
        <MenuContext.Provider value={{ open, setOpen }}>
            {children}
        </MenuContext.Provider>
    )
}

export default MenuProvider;