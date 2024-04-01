import React, {
  useContext,
  createContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import reducer from "./reducer";
import { STAGE_STATE } from "./actions";

const useProvider = createContext();

const InitialValue = {
  S_value: true,
};

export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitialValue);
  const [isSelected, setIsSelected] = useState(null);

  const handelToStage = () => {
    // dispatch({type : STAGE_STATE})
    setIsSelected(false);
    console.log("Stage");
  };
  const handelToGroup = () => {
    // dispatch({type : STAGE_STATE})
    setIsSelected(true);
    console.log("group");
  };

  //   useEffect(() => {
  //     if (isSelected !== null) {
  //       if (isSelected) handelToGroup();
  //       else handelToStage();
  //     }

  //     console.log(isSelected);
  //   }, [isSelected]);

  const valueToSend = {
    ...state,
    isSelected,
    setIsSelected,
    handelToGroup,
    handelToStage,
  };
  return (
    <useProvider.Provider value={valueToSend}>{children}</useProvider.Provider>
  );
};

export const CustumHook = () => {
  return useContext(useProvider);
};

// /* eslint-disable react-hooks/rules-of-hooks */
// import React, {
//     createContext,
//     useContext,
//     useEffect,
//     useReducer,
//     useState,
//   } from "react";
//   import reducer from "./reducer";
//   import { STAGE_STATE } from "./actions.jsx";

//   const CreateContext = createContext();
//   const InitialValue = {
//     S_value: false,
//   };

//   export const AppContext = ({ children }) => {
//     const [stats, dispatch] = useReducer(reducer, InitialValue);

//     const handelToStage = () => {
//       dispatch({ type: STAGE_STATE });
//     };

//     const valueToSend = {
//       ...stats,
//       handelToStage,
//     };
//     return (
//       <appContext.Provider value={valueToSend}>{children}</appContext.Provider>
//     );
//   };

//   export const CustemContext = () => {
//     return useContext(CreateContext);
//   };
// //
