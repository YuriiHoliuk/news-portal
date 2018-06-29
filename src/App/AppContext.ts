import { Context, createContext } from 'react';

const defaultValue = { proMode: false };
const AppContext: Context<{ proMode: boolean }> = createContext(defaultValue);

export default AppContext;
