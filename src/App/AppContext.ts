import { Context, createContext } from 'react';

const defaultValue = { proMode: false, toggleProMode: () => null };
const AppContext: Context<{ proMode: boolean, toggleProMode: () => void }> = createContext(defaultValue);

export default AppContext;
