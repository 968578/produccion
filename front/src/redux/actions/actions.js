export const LOAD_ALL_LOTES = 'LOAD_ALL_LOTES'
export const LOAD_SHOW_LOTES = 'LOAD_SHOW_LOTES'
export const SEARCH_LOTE_NAME ='SEARCH_LOTE_NAME'
export const ONLY_PAROS = 'ONLY_PAROS'
export const ONLY_PREPARACION = 'ONLY_PREPARACION'
export const ONLY_CONFECCION = 'ONLY_CONFECCION' 







export const loadAllLotes=(payload)=>{
  return{
    type:LOAD_ALL_LOTES,
    payload
  }
}

export const loadShowLotes=(payload)=>{
  return{
    type:LOAD_SHOW_LOTES,
    payload,
    
  }
}

export const searchLoteName=(payload, name)=>{
  return{
    type:SEARCH_LOTE_NAME,
    payload,
    name
  }
}

export const onlyParos=(payload)=>{
  return{
    type:ONLY_PAROS,
    payload
  }

}

export const onlyPreparacion=(payload)=>{
  return{
    type:ONLY_PREPARACION,
    payload
  }
}

export const onlyConfeccion =(payload)=>{
  return{
    type:ONLY_CONFECCION,
    payload
  }
}