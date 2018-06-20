import { Context, createContext } from 'react';

import { IAppState } from './App';

const AppContext: Context<IAppState> = createContext({ proMode: false });

export default AppContext;
