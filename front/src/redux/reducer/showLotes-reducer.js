import{
  LOAD_SHOW_LOTES,
  SEARCH_LOTE_NAME,
  ONLY_PAROS,
  ONLY_PREPARACION,
  ONLY_CONFECCION
} from '../actions/actions'


const ShowLotes=(state= [], action )=>{
  
  switch(action.type){
    case LOAD_SHOW_LOTES: return [... action.payload];

    case SEARCH_LOTE_NAME: 
      return[
        ...action.payload.filter((e)=> e.op.includes(action.name))
      ];

    case ONLY_PAROS:
      return[
        ...action.payload.filter((e)=> e.estado === 'Paro')
      ];

    case ONLY_PREPARACION:
      return[
        ...action.payload.filter((e)=> e.estado === 'Preparacion')
      ]

    case ONLY_CONFECCION:
      return[
        ...action.payload.filter((e)=> e.estado === 'Confeccion')
      ]
    default: return state

  }
}

export default ShowLotes
