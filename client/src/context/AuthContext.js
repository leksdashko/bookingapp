import { useReducer } from "react";
import { createContext } from "react";

const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem("user")) || null,
	loading: false,
	error: null
}

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
	switch(action.type){
		case "LOGIN_START":
			return {
				user: null,
				loading: false,
				error: null
			};
		case "LOGIN_SUCCESS":
			return {
				user: action.payload,
				loading: false,
				error: null
			}
		case "LOGIN_FAILURE":
			return {
				user: null,
				loading: true,
				error: action.payload
			}
		case "LOGOUT":
			return INITIAL_STATE;
		default:
			return state;
	}
}

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);


	return (
		<AuthContext.Provider value={{user: state.user, loading: state.loading, options: state.error, dispatch}}>
			{children}
		</AuthContext.Provider>
	);
}