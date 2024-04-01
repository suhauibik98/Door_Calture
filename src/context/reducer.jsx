import  {STAGE_STATE} from './actions.jsx'

const reducer = (state , action)=>{
if(action.type === STAGE_STATE){
return {...state , S_value : false}
}

}


export default reducer
