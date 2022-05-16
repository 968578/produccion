import{
  LOAD_ALL_LOTES
} from '../actions/actions'


const AllLotes=(state= [], action )=>{
  
  switch(action.type){
    case LOAD_ALL_LOTES: return [... action.payload]

    default: return state

  }
}

export default AllLotes
