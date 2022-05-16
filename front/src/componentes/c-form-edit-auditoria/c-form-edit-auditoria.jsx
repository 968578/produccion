import { useEffect, useState } from "react"

import axios from 'axios'


// este componente era para editar una auditoria, pero es complejo ordenarla, asi que quedara en espera

const FormEditAuditoria = (props) => {

  console.log(props)

  const [countNoConformidades, setcountNoConformidades] = useState([])
  const [countFaltantes, setCountFaltantes] = useState([])
  const [countMedidas, setCountMedidas] = useState({
    superior: [],
    inferior: []
  })
  const [activeButon, setActiveButon] = useState(false)

  const [input, setInput] = useState({
    fecha_auditoria: '',
    auditor: '',
    composicion: '',
    unidades_muestra: '',
    muestra_fisica: '',
    tipo_revision: '',
    colaboradores_karibik: '',
    aprobado: '',
    no_conformidades: [],
    segundas: '',
    faltantes: [],
    faltantesTotal: '',
    primeras: '',
    medidas: [],
    cobros: {
      descripcion_cobros: '',
      cantidad_cobros: '',
      valor_cobros: ''
    }
  })


  // estados para el titulo columna de los inputs de las medidas superiores
  const [focusXXS, setFocusXXS] = useState(false)
  const [focusXS, setFocusXS] = useState(false)
  const [focusS, setFocusS] = useState(false)
  const [focusM, setFocusM] = useState(false)
  const [focusL, setFocusL] = useState(false)
  const [focusXL, setFocusXL] = useState(false)


  // estados para el titulo filas de los inputs de las medidas superiores
  const [focusPecho, setFocusPecho] = useState(false)
  const [focusSisa, setFocusSisa] = useState(false)
  const [focusRuedo, setFocusRuedo] = useState(false)
  const [focusLargoFrente, setFocusLargoFrente] = useState(false)
  const [focusLargoCostado, setFocusLargoCostado] = useState(false)
  const [focusLargoManga, setFocusLargoManga] = useState(false)
  const [focusCuello, setFocusCuello] = useState(false)
  const [focusPuno, setFocusPuno] = useState(false)

  const [focusPechoDespLava, setFocusPechoDespLava] = useState(false)
  const [focusSisaDespLava, setFocusSisaDespLava] = useState(false)
  const [focusRuedoDespLava, setFocusRuedoDespLava] = useState(false)
  const [focusLargoFrenteDespLava, setFocusLargoFrenteDespLava] = useState(false)
  const [focusLargoCostadoDespLava, setFocusLargoCostadoDespLava] = useState(false)
  const [focusLargoMangaDespLava, setFocusLargoMangaDespLava] = useState(false)
  const [focusCuelloDespLava, setFocusCuelloDespLava] = useState(false)
  const [focusPunoDespLava, setFocusPunoDespLava] = useState(false)


  //estados para manejar las medidas inferiore
  const [focus4, setFocus4] = useState(false)
  const [focus6, setFocus6] = useState(false)
  const [focus8, setFocus8] = useState(false)
  const [focus10, setFocus10] = useState(false)
  const [focus12, setFocus12] = useState(false)

  // estados para manejar las los tipos de medidas inferiores
  const [focusCintura, setFocusCintura] = useState(false)
  const [focusCadera, setFocusCadera] = useState(false)
  const [focusPierna, setFocusPierna] = useState(false)
  const [focusRodilla, setFocusRodilla] = useState(false)
  const [focusBota, setFocusBota] = useState(false)
  const [focusEntrepierna, setFocusEntrepierna] = useState(false)
  const [focusTiroDelantero, setFocusTiroDelantero] = useState(false)
  const [focusTiroPosterior, setFocusTiroPosterior] = useState(false)
  const [focusCinturaDespLava, setFocusCinturaDespLava] = useState(false)
  const [focusCaderaDespLava, setFocusCaderaDespLava] = useState(false)
  const [focusPiernaDespLava, setFocusPiernaDespLava] = useState(false)
  const [focusRodillaDespLava, setFocusRodillaDespLava] = useState(false)
  const [focusBotaDespLava, setFocusBotaDespLava] = useState(false)
  const [focusEntrepiernaDespLava, setFocusEntrepiernaDespLava] = useState(false)
  const [focusTiroDelanteroDespLava, setFocusTiroDelanteroDespLava] = useState(false)
  const [focusTiroPosteriorDespLava, setFocusTiroPosteriorDespLava] = useState(false)





  const onFocusInputSuperiores = (e) => {
    const { name } = e.target

    if (name.slice(0, 15) === 'pecho_desp_lava') {

      if (name.slice(15) === 'XXS') {
        setFocusPechoDespLava(true)
        return setFocusXXS(true)
      } else if (name.slice(15) === 'XS') {
        setFocusPechoDespLava(true)
        return setFocusXS(true)
      } else if (name.slice(15) === 'S') {
        setFocusPechoDespLava(true)
        return setFocusS(true)
      } else if (name.slice(15) === 'M') {
        setFocusPechoDespLava(true)
        return setFocusM(true)
      } else if (name.slice(15) === 'L') {
        setFocusPechoDespLava(true)
        return setFocusL(true)
      } else if (name.slice(15) === 'XL') {
        setFocusPechoDespLava(true)
        return setFocusXL(true)
      }

    } else if (name.slice(0, 14) === 'sisa_desp_lava') {

      if (name.slice(14) === 'XXS') {
        setFocusSisaDespLava(true)
        return setFocusXXS(true)
      } else if (name.slice(14) === 'XS') {
        setFocusSisaDespLava(true)
        return setFocusXS(true)
      } else if (name.slice(14) === 'S') {
        setFocusSisaDespLava(true)
        return setFocusS(true)
      } else if (name.slice(14) === 'M') {
        setFocusSisaDespLava(true)
        return setFocusM(true)
      } else if (name.slice(14) === 'L') {
        setFocusSisaDespLava(true)
        return setFocusL(true)
      } else if (name.slice(14) === 'XL') {
        setFocusSisaDespLava(true)
        return setFocusXL(true)
      }

    } else if (name.slice(0, 15) === 'ruedo_desp_lava') {

      if (name.slice(15) === 'XXS') {
        setFocusRuedoDespLava(true)
        return setFocusXXS(true)
      } else if (name.slice(15) === 'XS') {
        setFocusRuedoDespLava(true)
        return setFocusXS(true)
      } else if (name.slice(15) === 'S') {
        setFocusRuedoDespLava(true)
        return setFocusS(true)
      } else if (name.slice(15) === 'M') {
        setFocusRuedoDespLava(true)
        return setFocusM(true)
      } else if (name.slice(15) === 'L') {
        setFocusRuedoDespLava(true)
        return setFocusL(true)
      } else if (name.slice(15) === 'XL') {
        setFocusRuedoDespLava(true)
        return setFocusXL(true)
      }

    } else if (name.slice(0, 22) === 'largo_frente_desp_lava') {

      if (name.slice(22) === 'XXS') {
        setFocusLargoFrenteDespLava(true)
        return setFocusXXS(true)
      } else if (name.slice(22) === 'XS') {
        setFocusLargoFrenteDespLava(true)
        return setFocusXS(true)
      } else if (name.slice(22) === 'S') {
        setFocusLargoFrenteDespLava(true)
        return setFocusS(true)
      } else if (name.slice(22) === 'M') {
        setFocusLargoFrenteDespLava(true)
        return setFocusM(true)
      } else if (name.slice(22) === 'L') {
        setFocusLargoFrenteDespLava(true)
        return setFocusL(true)
      } else if (name.slice(22) === 'XL') {
        setFocusLargoFrenteDespLava(true)
        return setFocusXL(true)
      }

    } else if (name.slice(0, 23) === 'largo_costado_desp_lava') {

      if (name.slice(23) === 'XXS') {
        setFocusLargoCostadoDespLava(true)
        return setFocusXXS(true)
      } else if (name.slice(23) === 'XS') {
        setFocusLargoCostadoDespLava(true)
        return setFocusXS(true)
      } else if (name.slice(23) === 'S') {
        setFocusLargoCostadoDespLava(true)
        return setFocusS(true)
      } else if (name.slice(23) === 'M') {
        setFocusLargoCostadoDespLava(true)
        return setFocusM(true)
      } else if (name.slice(23) === 'L') {
        setFocusLargoCostadoDespLava(true)
        return setFocusL(true)
      } else if (name.slice(23) === 'XL') {
        setFocusLargoCostadoDespLava(true)
        return setFocusXL(true)
      }

    } else if (name.slice(0, 21) === 'largo_manga_desp_lava') {

      if (name.slice(21) === 'XXS') {
        setFocusLargoMangaDespLava(true)
        return setFocusXXS(true)
      } else if (name.slice(21) === 'XS') {
        setFocusLargoMangaDespLava(true)
        return setFocusXS(true)
      } else if (name.slice(21) === 'S') {
        setFocusLargoMangaDespLava(true)
        return setFocusS(true)
      } else if (name.slice(21) === 'M') {
        setFocusLargoMangaDespLava(true)
        return setFocusM(true)
      } else if (name.slice(21) === 'L') {
        setFocusLargoMangaDespLava(true)
        return setFocusL(true)
      } else if (name.slice(21) === 'XL') {
        setFocusLargoMangaDespLava(true)
        return setFocusXL(true)
      }

    } else if (name.slice(0, 16) === 'cuello_desp_lava') {

      if (name.slice(16) === 'XXS') {
        setFocusLargoMangaDespLava(true)
        return setFocusXXS(true)
      } else if (name.slice(16) === 'XS') {
        setFocusCuelloDespLava(true)
        return setFocusXS(true)
      } else if (name.slice(16) === 'S') {
        setFocusCuelloDespLava(true)
        return setFocusS(true)
      } else if (name.slice(16) === 'M') {
        setFocusCuelloDespLava(true)
        return setFocusM(true)
      } else if (name.slice(16) === 'L') {
        setFocusCuelloDespLava(true)
        return setFocusL(true)
      } else if (name.slice(16) === 'XL') {
        setFocusCuelloDespLava(true)
        return setFocusXL(true)
      }

    } else if (name.slice(0, 14) === 'puño_desp_lava') {

      if (name.slice(14) === 'XXS') {
        setFocusPunoDespLava(true)
        return setFocusXXS(true)
      } else if (name.slice(14) === 'XS') {
        setFocusPunoDespLava(true)
        return setFocusXS(true)
      } else if (name.slice(14) === 'S') {
        setFocusPunoDespLava(true)
        return setFocusS(true)
      } else if (name.slice(14) === 'M') {
        setFocusPunoDespLava(true)
        return setFocusM(true)
      } else if (name.slice(14) === 'L') {
        setFocusPunoDespLava(true)
        return setFocusL(true)
      } else if (name.slice(14) === 'XL') {
        setFocusPunoDespLava(true)
        return setFocusXL(true)
      }

    } else if (name.slice(0, 5) === 'pecho') {

      if (name.slice(5) === 'XXS') {
        setFocusPecho(true)
        return setFocusXXS(true)
      } else if (name.slice(5) === 'XS') {
        setFocusPecho(true)
        return setFocusXS(true)
      } else if (name.slice(5) === 'S') {
        setFocusPecho(true)
        return setFocusS(true)
      } else if (name.slice(5) === 'M') {
        setFocusPecho(true)
        return setFocusM(true)
      } else if (name.slice(5) === 'L') {
        setFocusPecho(true)
        return setFocusL(true)
      } else if (name.slice(5) === 'XL') {
        setFocusPecho(true)
        return setFocusXL(true)
      }

    } else if (name.slice(0, 4) === 'sisa') {

      if (name.slice(4) === 'XXS') {
        setFocusSisa(true)
        return setFocusXXS(true)
      } else if (name.slice(4) === 'XS') {
        setFocusSisa(true)
        return setFocusXS(true)
      } else if (name.slice(4) === 'S') {
        setFocusSisa(true)
        return setFocusS(true)
      } else if (name.slice(4) === 'M') {
        setFocusSisa(true)
        return setFocusM(true)
      } else if (name.slice(4) === 'L') {
        setFocusSisa(true)
        return setFocusL(true)
      } else if (name.slice(4) === 'XL') {
        setFocusSisa(true)
        return setFocusXL(true)
      }

    } else if (name.slice(0, 5) === 'ruedo') {

      if (name.slice(5) === 'XXS') {
        setFocusRuedo(true)
        return setFocusXXS(true)
      } else if (name.slice(5) === 'XS') {
        setFocusRuedo(true)
        return setFocusXS(true)
      } else if (name.slice(5) === 'S') {
        setFocusRuedo(true)
        return setFocusS(true)
      } else if (name.slice(5) === 'M') {
        setFocusRuedo(true)
        return setFocusM(true)
      } else if (name.slice(5) === 'L') {
        setFocusRuedo(true)
        return setFocusL(true)
      } else if (name.slice(5) === 'XL') {
        setFocusRuedo(true)
        return setFocusXL(true)
      }

    } else if (name.slice(0, 12) === 'largo_frente') {

      if (name.slice(12) === 'XXS') {
        setFocusLargoFrente(true)
        return setFocusXXS(true)
      } else if (name.slice(12) === 'XS') {
        setFocusLargoFrente(true)
        return setFocusXS(true)
      } else if (name.slice(12) === 'S') {
        setFocusLargoFrente(true)
        return setFocusS(true)
      } else if (name.slice(12) === 'M') {
        setFocusLargoFrente(true)
        return setFocusM(true)
      } else if (name.slice(12) === 'L') {
        setFocusLargoFrente(true)
        return setFocusL(true)
      } else if (name.slice(12) === 'XL') {
        setFocusLargoFrente(true)
        return setFocusXL(true)
      }

    } else if (name.slice(0, 13) === 'largo_costado') {

      if (name.slice(13) === 'XXS') {

        setFocusLargoCostado(true)
        return setFocusXXS(true)
      } else if (name.slice(13) === 'XS') {
        setFocusLargoCostado(true)
        return setFocusXS(true)
      } else if (name.slice(13) === 'S') {
        setFocusLargoCostado(true)
        return setFocusS(true)
      } else if (name.slice(13) === 'M') {
        setFocusLargoCostado(true)
        return setFocusM(true)
      } else if (name.slice(13) === 'L') {
        setFocusLargoCostado(true)
        return setFocusL(true)
      } else if (name.slice(13) === 'XL') {
        setFocusLargoCostado(true)
        return setFocusXL(true)
      }

    } else if (name.slice(0, 11) === 'largo_manga') {

      if (name.slice(11) === 'XXS') {
        
        setFocusLargoManga(true)
        return setFocusXXS(true)
      } else if (name.slice(11) === 'XS') {
        setFocusLargoManga(true)
        return setFocusXS(true)
      } else if (name.slice(11) === 'S') {
        setFocusLargoManga(true)
        return setFocusS(true)
      } else if (name.slice(11) === 'M') {
        setFocusLargoManga(true)
        return setFocusM(true)
      } else if (name.slice(11) === 'L') {
        setFocusLargoManga(true)
        return setFocusL(true)
      } else if (name.slice(11) === 'XL') {
        setFocusLargoManga(true)
        return setFocusXL(true)
      }

    } else if (name.slice(0, 6) === 'cuello') {

      if (name.slice(6) === 'XXS') {
        
        setFocusCuello(true)
        return setFocusXXS(true)
      } else if (name.slice(6) === 'XS') {
        setFocusCuello(true)
        return setFocusXS(true)
      } else if (name.slice(6) === 'S') {
        setFocusCuello(true)
        return setFocusS(true)
      } else if (name.slice(6) === 'M') {
        setFocusCuello(true)
        return setFocusM(true)
      } else if (name.slice(6) === 'L') {
        setFocusCuello(true)
        return setFocusL(true)
      } else if (name.slice(6) === 'XL') {
        setFocusCuello(true)
        return setFocusXL(true)
      }

    } else if (name.slice(0, 4) === 'puño') {

      if (name.slice(4) === 'XXS') {
        
        setFocusPuno(true)
        return setFocusXXS(true)
      } else if (name.slice(4) === 'XS') {
        setFocusPuno(true)
        return setFocusXS(true)
      } else if (name.slice(4) === 'S') {
        setFocusPuno(true)
        return setFocusS(true)
      } else if (name.slice(4) === 'M') {
        setFocusPuno(true)
        return setFocusM(true)
      } else if (name.slice(4) === 'L') {
        setFocusPuno(true)
        return setFocusL(true)
      } else if (name.slice(4) === 'XL') {
        setFocusPuno(true)
        return setFocusXL(true)
      }

    }
  }

  const onBlurInputSuperiores = (e) => {
    const { name } = e.target

    if (name.slice(0, 15) === 'pecho_desp_lava') {

      if (name.slice(15) === 'XXS') {
        setFocusPechoDespLava(false)
        return setFocusXXS(false)
      } else if (name.slice(15) === 'XS') {
        setFocusPechoDespLava(false)
        return setFocusXS(false)
      } else if (name.slice(15) === 'S') {
        setFocusPechoDespLava(false)
        return setFocusS(false)
      } else if (name.slice(15) === 'M') {
        setFocusPechoDespLava(false)
        return setFocusM(false)
      } else if (name.slice(15) === 'L') {
        setFocusPechoDespLava(false)
        return setFocusL(false)
      } else if (name.slice(15) === 'XL') {
        setFocusPechoDespLava(false)
        return setFocusXL(false)
      }

    } else if (name.slice(0, 14) === 'sisa_desp_lava') {

      if (name.slice(14) === 'XXS') {
        setFocusSisaDespLava(false)
        return setFocusXXS(false)
      } else if (name.slice(14) === 'XS') {
        setFocusSisaDespLava(false)
        return setFocusXS(false)
      } else if (name.slice(14) === 'S') {
        setFocusSisaDespLava(false)
        return setFocusS(false)
      } else if (name.slice(14) === 'M') {
        setFocusSisaDespLava(false)
        return setFocusM(false)
      } else if (name.slice(14) === 'L') {
        setFocusSisaDespLava(false)
        return setFocusL(false)
      } else if (name.slice(14) === 'XL') {
        setFocusSisaDespLava(false)
        return setFocusXL(false)
      }

    } else if (name.slice(0, 15) === 'ruedo_desp_lava') {

      if (name.slice(15) === 'XXS') {
        setFocusRuedoDespLava(false)
        return setFocusXXS(false)
      } else if (name.slice(15) === 'XS') {
        setFocusRuedoDespLava(false)
        return setFocusXS(false)
      } else if (name.slice(15) === 'S') {
        setFocusRuedoDespLava(false)
        return setFocusS(false)
      } else if (name.slice(15) === 'M') {
        setFocusRuedoDespLava(false)
        return setFocusM(false)
      } else if (name.slice(15) === 'L') {
        setFocusRuedoDespLava(false)
        return setFocusL(false)
      } else if (name.slice(15) === 'XL') {
        setFocusRuedoDespLava(false)
        return setFocusXL(false)
      }

    } else if (name.slice(0, 22) === 'largo_frente_desp_lava') {

      if (name.slice(22) === 'XXS') {
        setFocusLargoFrenteDespLava(false)
        return setFocusXXS(false)
      } else if (name.slice(22) === 'XS') {
        setFocusLargoFrenteDespLava(false)
        return setFocusXS(false)
      } else if (name.slice(22) === 'S') {
        setFocusLargoFrenteDespLava(false)
        return setFocusS(false)
      } else if (name.slice(22) === 'M') {
        setFocusLargoFrenteDespLava(false)
        return setFocusM(false)
      } else if (name.slice(22) === 'L') {
        setFocusLargoFrenteDespLava(false)
        return setFocusL(false)
      } else if (name.slice(22) === 'XL') {
        setFocusLargoFrenteDespLava(false)
        return setFocusXL(false)
      }

    } else if (name.slice(0, 23) === 'largo_costado_desp_lava') {

      if (name.slice(23) === 'XXS') {
        setFocusLargoCostadoDespLava(false)
        return setFocusXXS(false)
      } else if (name.slice(23) === 'XS') {
        setFocusLargoCostadoDespLava(false)
        return setFocusXS(false)
      } else if (name.slice(23) === 'S') {
        setFocusLargoCostadoDespLava(false)
        return setFocusS(false)
      } else if (name.slice(23) === 'M') {
        setFocusLargoCostadoDespLava(false)
        return setFocusM(false)
      } else if (name.slice(23) === 'L') {
        setFocusLargoCostadoDespLava(false)
        return setFocusL(false)
      } else if (name.slice(23) === 'XL') {
        setFocusLargoCostadoDespLava(false)
        return setFocusXL(false)
      }

    } else if (name.slice(0, 21) === 'largo_manga_desp_lava') {

      if (name.slice(21) === 'XXS') {
        setFocusLargoMangaDespLava(false)
        return setFocusXXS(false)
      } else if (name.slice(21) === 'XS') {
        setFocusLargoMangaDespLava(false)
        return setFocusXS(false)
      } else if (name.slice(21) === 'S') {
        setFocusLargoMangaDespLava(false)
        return setFocusS(false)
      } else if (name.slice(21) === 'M') {
        setFocusLargoMangaDespLava(false)
        return setFocusM(false)
      } else if (name.slice(21) === 'L') {
        setFocusLargoMangaDespLava(false)
        return setFocusL(false)
      } else if (name.slice(21) === 'XL') {
        setFocusLargoMangaDespLava(false)
        return setFocusXL(false)
      }

    } else if (name.slice(0, 16) === 'cuello_desp_lava') {

      if (name.slice(16) === 'XXS') {
        setFocusLargoMangaDespLava(false)
        return setFocusXXS(false)
      } else if (name.slice(16) === 'XS') {
        setFocusCuelloDespLava(false)
        return setFocusXS(false)
      } else if (name.slice(16) === 'S') {
        setFocusCuelloDespLava(false)
        return setFocusS(false)
      } else if (name.slice(16) === 'M') {
        setFocusCuelloDespLava(false)
        return setFocusM(false)
      } else if (name.slice(16) === 'L') {
        setFocusCuelloDespLava(false)
        return setFocusL(false)
      } else if (name.slice(16) === 'XL') {
        setFocusCuelloDespLava(false)
        return setFocusXL(false)
      }

    } else if (name.slice(0, 14) === 'puño_desp_lava') {

      if (name.slice(14) === 'XXS') {
        setFocusPunoDespLava(false)
        return setFocusXXS(false)
      } else if (name.slice(14) === 'XS') {
        setFocusPunoDespLava(false)
        return setFocusXS(false)
      } else if (name.slice(14) === 'S') {
        setFocusPunoDespLava(false)
        return setFocusS(false)
      } else if (name.slice(14) === 'M') {
        setFocusPunoDespLava(false)
        return setFocusM(false)
      } else if (name.slice(14) === 'L') {
        setFocusPunoDespLava(false)
        return setFocusL(false)
      } else if (name.slice(14) === 'XL') {
        setFocusPunoDespLava(false)
        return setFocusXL(false)
      }

    } else if (name.slice(0, 5) === 'pecho') {

      if (name.slice(5) === 'XXS') {
        setFocusPecho(false)
        return setFocusXXS(false)
      } else if (name.slice(5) === 'XS') {
        setFocusPecho(false)
        return setFocusXS(false)
      } else if (name.slice(5) === 'S') {
        setFocusPecho(false)
        return setFocusS(false)
      } else if (name.slice(5) === 'M') {
        setFocusPecho(false)
        return setFocusM(false)
      } else if (name.slice(5) === 'L') {
        setFocusPecho(false)
        return setFocusL(false)
      } else if (name.slice(5) === 'XL') {
        setFocusPecho(false)
        return setFocusXL(false)
      }

    } else if (name.slice(0, 4) === 'sisa') {

      if (name.slice(4) === 'XXS') {
        setFocusSisa(false)
        return setFocusXXS(false)
      } else if (name.slice(4) === 'XS') {
        setFocusSisa(false)
        return setFocusXS(false)
      } else if (name.slice(4) === 'S') {
        setFocusSisa(false)
        return setFocusS(false)
      } else if (name.slice(4) === 'M') {
        setFocusSisa(false)
        return setFocusM(false)
      } else if (name.slice(4) === 'L') {
        setFocusSisa(false)
        return setFocusL(false)
      } else if (name.slice(4) === 'XL') {
        setFocusSisa(false)
        return setFocusXL(false)
      }

    } else if (name.slice(0, 5) === 'ruedo') {

      if (name.slice(5) === 'XXS') {
        setFocusRuedo(false)
        return setFocusXXS(false)
      } else if (name.slice(5) === 'XS') {
        setFocusRuedo(false)
        return setFocusXS(false)
      } else if (name.slice(5) === 'S') {
        setFocusRuedo(false)
        return setFocusS(false)
      } else if (name.slice(5) === 'M') {
        setFocusRuedo(false)
        return setFocusM(false)
      } else if (name.slice(5) === 'L') {
        setFocusRuedo(false)
        return setFocusL(false)
      } else if (name.slice(5) === 'XL') {
        setFocusRuedo(false)
        return setFocusXL(false)
      }

    } else if (name.slice(0, 12) === 'largo_frente') {

      if (name.slice(12) === 'XXS') {
        setFocusLargoFrente(false)
        return setFocusXXS(false)
      } else if (name.slice(12) === 'XS') {
        setFocusLargoFrente(false)
        return setFocusXS(false)
      } else if (name.slice(12) === 'S') {
        setFocusLargoFrente(false)
        return setFocusS(false)
      } else if (name.slice(12) === 'M') {
        setFocusLargoFrente(false)
        return setFocusM(false)
      } else if (name.slice(12) === 'L') {
        setFocusLargoFrente(false)
        return setFocusL(false)
      } else if (name.slice(12) === 'XL') {
        setFocusLargoFrente(false)
        return setFocusXL(false)
      }

    } else if (name.slice(0, 13) === 'largo_costado') {

      if (name.slice(13) === 'XXS') {
        
        setFocusLargoCostado(false)
        return setFocusXXS(false)
      } else if (name.slice(13) === 'XS') {
        setFocusLargoCostado(false)
        return setFocusXS(false)
      } else if (name.slice(13) === 'S') {
        setFocusLargoCostado(false)
        return setFocusS(false)
      } else if (name.slice(13) === 'M') {
        setFocusLargoCostado(false)
        return setFocusM(false)
      } else if (name.slice(13) === 'L') {
        setFocusLargoCostado(false)
        return setFocusL(false)
      } else if (name.slice(13) === 'XL') {
        setFocusLargoCostado(false)
        return setFocusXL(false)
      }

    } else if (name.slice(0, 11) === 'largo_manga') {

      if (name.slice(11) === 'XXS') {
        
        setFocusLargoManga(false)
        return setFocusXXS(false)
      } else if (name.slice(11) === 'XS') {
        setFocusLargoManga(false)
        return setFocusXS(false)
      } else if (name.slice(11) === 'S') {
        setFocusLargoManga(false)
        return setFocusS(false)
      } else if (name.slice(11) === 'M') {
        setFocusLargoManga(false)
        return setFocusM(false)
      } else if (name.slice(11) === 'L') {
        setFocusLargoManga(false)
        return setFocusL(false)
      } else if (name.slice(11) === 'XL') {
        setFocusLargoManga(false)
        return setFocusXL(false)
      }

    } else if (name.slice(0, 6) === 'cuello') {

      if (name.slice(6) === 'XXS') {
        
        setFocusCuello(false)
        return setFocusXXS(false)
      } else if (name.slice(6) === 'XS') {
        setFocusCuello(false)
        return setFocusXS(false)
      } else if (name.slice(6) === 'S') {
        setFocusCuello(false)
        return setFocusS(false)
      } else if (name.slice(6) === 'M') {
        setFocusCuello(false)
        return setFocusM(false)
      } else if (name.slice(6) === 'L') {
        setFocusCuello(false)
        return setFocusL(false)
      } else if (name.slice(6) === 'XL') {
        setFocusCuello(false)
        return setFocusXL(false)
      }

    } else if (name.slice(0, 4) === 'puño') {

      if (name.slice(4) === 'XXS') {
        
        setFocusPuno(false)
        return setFocusXXS(false)
      } else if (name.slice(4) === 'XS') {
        setFocusPuno(false)
        return setFocusXS(false)
      } else if (name.slice(4) === 'S') {
        setFocusPuno(false)
        return setFocusS(false)
      } else if (name.slice(4) === 'M') {
        setFocusPuno(false)
        return setFocusM(false)
      } else if (name.slice(4) === 'L') {
        setFocusPuno(false)
        return setFocusL(false)
      } else if (name.slice(4) === 'XL') {
        setFocusPuno(false)
        return setFocusXL(false)
      }

    }


  }

  const onFocusInputInferiore = (e) => {
    const { name} = e.target

    if (name.slice(0, 15) === 'ruedo_desp_lava') {

      if (name.slice(15) === '4') {
        setFocusRuedoDespLava(true)
        return setFocus4(true)
      } else if (name.slice(15) === '6') {
        setFocusRuedoDespLava(true)
        return setFocus6(true)
      } else if (name.slice(15) === '8') {
        setFocusRuedoDespLava(true)
        return setFocus8(true)
      } else if (name.slice(15) === '10') {
        setFocusRuedoDespLava(true)
        return setFocus10(true)
      } else if (name.slice(15) === '12') {
        setFocusRuedoDespLava(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 17) === 'cintura_desp_lava') {

      if (name.slice(17) === '4') {
        setFocusCinturaDespLava(true)
        return setFocus4(true)
      } else if (name.slice(17) === '6') {
        setFocusCinturaDespLava(true)
        return setFocus6(true)
      } else if (name.slice(17) === '8') {
        setFocusCinturaDespLava(true)
        return setFocus8(true)
      } else if (name.slice(17) === '10') {
        setFocusCinturaDespLava(true)
        return setFocus10(true)
      } else if (name.slice(17) === '12') {
        setFocusCinturaDespLava(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 16) === 'cadera_desp_lava') {

      if (name.slice(16) === '4') {
        setFocusCaderaDespLava(true)
        return setFocus4(true)
      } else if (name.slice(16) === '6') {
        setFocusCaderaDespLava(true)
        return setFocus6(true)
      } else if (name.slice(16) === '8') {
        setFocusCaderaDespLava(true)
        return setFocus8(true)
      } else if (name.slice(16) === '10') {
        setFocusCaderaDespLava(true)
        return setFocus10(true)
      } else if (name.slice(16) === '12') {
        setFocusCaderaDespLava(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 16) === 'pierna_desp_lava') {

      if (name.slice(16) === '4') {
        setFocusPiernaDespLava(true)
        return setFocus4(true)
      } else if (name.slice(16) === '6') {
        setFocusPiernaDespLava(true)
        return setFocus6(true)
      } else if (name.slice(16) === '8') {
        setFocusPiernaDespLava(true)
        return setFocus8(true)
      } else if (name.slice(16) === '10') {
        setFocusPiernaDespLava(true)
        return setFocus10(true)
      } else if (name.slice(16) === '12') {
        setFocusPiernaDespLava(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 17) === 'rodilla_desp_lava') {

      if (name.slice(17) === '4') {
        setFocusRodillaDespLava(true)
        return setFocus4(true)
      } else if (name.slice(17) === '6') {
        setFocusRodillaDespLava(true)
        return setFocus6(true)
      } else if (name.slice(17) === '8') {
        setFocusRodillaDespLava(true)
        return setFocus8(true)
      } else if (name.slice(17) === '10') {
        setFocusRodillaDespLava(true)
        return setFocus10(true)
      } else if (name.slice(17) === '12') {
        setFocusRodillaDespLava(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 14) === 'bota_desp_lava') {

      if (name.slice(14) === '4') {
        setFocusBotaDespLava(true)
        return setFocus4(true)
      } else if (name.slice(14) === '6') {
        setFocusBotaDespLava(true)
        return setFocus6(true)
      } else if (name.slice(14) === '8') {
        setFocusBotaDespLava(true)
        return setFocus8(true)
      } else if (name.slice(14) === '10') {
        setFocusBotaDespLava(true)
        return setFocus10(true)
      } else if (name.slice(14) === '12') {
        setFocusBotaDespLava(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 23) === 'largo_costado_desp_lava') {

      if (name.slice(23) === '4') {
        setFocusLargoCostadoDespLava(true)
        return setFocus4(true)
      } else if (name.slice(23) === '6') {
        setFocusLargoCostadoDespLava(true)
        return setFocus6(true)
      } else if (name.slice(23) === '8') {
        setFocusLargoCostadoDespLava(true)
        return setFocus8(true)
      } else if (name.slice(23) === '10') {
        setFocusLargoCostadoDespLava(true)
        return setFocus10(true)
      } else if (name.slice(23) === '12') {
        setFocusLargoCostadoDespLava(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 21) === 'entrepierna_desp_lava') {

      if (name.slice(21) === '4') {
        setFocusEntrepiernaDespLava(true)
        return setFocus4(true)
      } else if (name.slice(21) === '6') {
        setFocusEntrepiernaDespLava(true)
        return setFocus6(true)
      } else if (name.slice(21) === '8') {
        setFocusEntrepiernaDespLava(true)
        return setFocus8(true)
      } else if (name.slice(21) === '10') {
        setFocusEntrepiernaDespLava(true)
        return setFocus10(true)
      } else if (name.slice(21) === '12') {
        setFocusEntrepiernaDespLava(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 24) === 'tiro_delantero_desp_lava') {

      if (name.slice(24) === '4') {
        setFocusTiroDelanteroDespLava(true)
        return setFocus4(true)
      } else if (name.slice(24) === '6') {
        setFocusTiroDelanteroDespLava(true)
        return setFocus6(true)
      } else if (name.slice(24) === '8') {
        setFocusTiroDelanteroDespLava(true)
        return setFocus8(true)
      } else if (name.slice(24) === '10') {
        setFocusTiroDelanteroDespLava(true)
        return setFocus10(true)
      } else if (name.slice(24) === '12') {
        setFocusTiroDelanteroDespLava(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 24) === 'tiro_posterior_desp_lava') {

      if (name.slice(24) === '4') {
        setFocusTiroPosteriorDespLava(true)
        return setFocus4(true)
      } else if (name.slice(24) === '6') {
        setFocusTiroPosteriorDespLava(true)
        return setFocus6(true)
      } else if (name.slice(24) === '8') {
        setFocusTiroPosteriorDespLava(true)
        return setFocus8(true)
      } else if (name.slice(24) === '10') {
        setFocusTiroPosteriorDespLava(true)
        return setFocus10(true)
      } else if (name.slice(24) === '12') {
        setFocusTiroPosteriorDespLava(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 5) === 'ruedo') {

      if (name.slice(5) === '4') {
        setFocusRuedo(true)
        return setFocus4(true)
      } else if (name.slice(5) === '6') {
        setFocusRuedo(true)
        return setFocus6(true)
      } else if (name.slice(5) === '8') {
        setFocusRuedo(true)
        return setFocus8(true)
      } else if (name.slice(5) === '10') {
        setFocusRuedo(true)
        return setFocus10(true)
      } else if (name.slice(5) === '12') {
        setFocusRuedo(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 7) === 'cintura') {

      if (name.slice(7) === '4') {
        setFocusCintura(true)
        return setFocus4(true)
      } else if (name.slice(7) === '6') {
        setFocusCintura(true)
        return setFocus6(true)
      } else if (name.slice(7) === '8') {
        setFocusCintura(true)
        return setFocus8(true)
      } else if (name.slice(7) === '10') {
        setFocusCintura(true)
        return setFocus10(true)
      } else if (name.slice(7) === '12') {
        setFocusCintura(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 6) === 'cadera') {

      if (name.slice(6) === '4') {
        setFocusCadera(true)
        return setFocus4(true)
      } else if (name.slice(6) === '6') {
        setFocusCadera(true)
        return setFocus6(true)
      } else if (name.slice(6) === '8') {
        setFocusCadera(true)
        return setFocus8(true)
      } else if (name.slice(6) === '10') {
        setFocusCadera(true)
        return setFocus10(true)
      } else if (name.slice(6) === '12') {
        setFocusCadera(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 6) === 'pierna') {

      if (name.slice(6) === '4') {
        setFocusPierna(true)
        return setFocus4(true)
      } else if (name.slice(6) === '6') {
        setFocusPierna(true)
        return setFocus6(true)
      } else if (name.slice(6) === '8') {
        setFocusPierna(true)
        return setFocus8(true)
      } else if (name.slice(6) === '10') {
        setFocusPierna(true)
        return setFocus10(true)
      } else if (name.slice(6) === '12') {
        setFocusPierna(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 7) === 'rodilla') {

      if (name.slice(7) === '4') {
        setFocusRodilla(true)
        return setFocus4(true)
      } else if (name.slice(7) === '6') {
        setFocusRodilla(true)
        return setFocus6(true)
      } else if (name.slice(7) === '8') {
        setFocusRodilla(true)
        return setFocus8(true)
      } else if (name.slice(7) === '10') {
        setFocusRodilla(true)
        return setFocus10(true)
      } else if (name.slice(7) === '12') {
        setFocusRodilla(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 4) === 'bota') {

      if (name.slice(4) === '4') {
        setFocusBota(true)
        return setFocus4(true)
      } else if (name.slice(4) === '6') {
        setFocusBota(true)
        return setFocus6(true)
      } else if (name.slice(4) === '8') {
        setFocusBota(true)
        return setFocus8(true)
      } else if (name.slice(4) === '10') {
        setFocusBota(true)
        return setFocus10(true)
      } else if (name.slice(4) === '12') {
        setFocusBota(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 13) === 'largo_costado') {

      if (name.slice(13) === '4') {
        setFocusLargoCostado(true)
        return setFocus4(true)
      } else if (name.slice(13) === '6') {
        setFocusLargoCostado(true)
        return setFocus6(true)
      } else if (name.slice(13) === '8') {
        setFocusLargoCostado(true)
        return setFocus8(true)
      } else if (name.slice(13) === '10') {
        setFocusLargoCostado(true)
        return setFocus10(true)
      } else if (name.slice(13) === '12') {
        setFocusLargoCostado(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 11) === 'entrepierna') {

      if (name.slice(11) === '4') {
        setFocusEntrepierna(true)
        return setFocus4(true)
      } else if (name.slice(11) === '6') {
        setFocusEntrepierna(true)
        return setFocus6(true)
      } else if (name.slice(11) === '8') {
        setFocusEntrepierna(true)
        return setFocus8(true)
      } else if (name.slice(11) === '10') {
        setFocusEntrepierna(true)
        return setFocus10(true)
      } else if (name.slice(11) === '12') {
        setFocusEntrepierna(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 14) === 'tiro_delantero') {

      if (name.slice(14) === '4') {
        setFocusTiroDelantero(true)
        return setFocus4(true)
      } else if (name.slice(14) === '6') {
        setFocusTiroDelantero(true)
        return setFocus6(true)
      } else if (name.slice(14) === '8') {
        setFocusTiroDelantero(true)
        return setFocus8(true)
      } else if (name.slice(14) === '10') {
        setFocusTiroDelantero(true)
        return setFocus10(true)
      } else if (name.slice(14) === '12') {
        setFocusTiroDelantero(true)
        return setFocus12(true)
      }

    } else if (name.slice(0, 14) === 'tiro_posterior') {

      if (name.slice(14) === '4') {
        setFocusTiroPosterior(true)
        return setFocus4(true)
      } else if (name.slice(14) === '6') {
        setFocusTiroPosterior(true)
        return setFocus6(true)
      } else if (name.slice(14) === '8') {
        setFocusTiroPosterior(true)
        return setFocus8(true)
      } else if (name.slice(14) === '10') {
        setFocusTiroPosterior(true)
        return setFocus10(true)
      } else if (name.slice(14) === '12') {
        setFocusTiroPosterior(true)
        return setFocus12(true)
      }

    }
  }


  const onBlurInputInferiores = (e) => {
    const { name, value } = e.target


    if (name.slice(0, 15) === 'ruedo_desp_lava') {

      if (name.slice(15) === '4') {
        setFocusRuedoDespLava(false)
        return setFocus4(false)
      } else if (name.slice(15) === '6') {
        setFocusRuedoDespLava(false)
        return setFocus6(false)
      } else if (name.slice(15) === '8') {
        setFocusRuedoDespLava(false)
        return setFocus8(false)
      } else if (name.slice(15) === '10') {
        setFocusRuedoDespLava(false)
        return setFocus10(false)
      } else if (name.slice(15) === '12') {
        setFocusRuedoDespLava(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 17) === 'cintura_desp_lava') {

      if (name.slice(17) === '4') {
        setFocusCinturaDespLava(false)
        return setFocus4(false)
      } else if (name.slice(17) === '6') {
        setFocusCinturaDespLava(false)
        return setFocus6(false)
      } else if (name.slice(17) === '8') {
        setFocusCinturaDespLava(false)
        return setFocus8(false)
      } else if (name.slice(17) === '10') {
        setFocusCinturaDespLava(false)
        return setFocus10(false)
      } else if (name.slice(17) === '12') {
        setFocusCinturaDespLava(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 16) === 'cadera_desp_lava') {

      if (name.slice(16) === '4') {
        setFocusCaderaDespLava(false)
        return setFocus4(false)
      } else if (name.slice(16) === '6') {
        setFocusCaderaDespLava(false)
        return setFocus6(false)
      } else if (name.slice(16) === '8') {
        setFocusCaderaDespLava(false)
        return setFocus8(false)
      } else if (name.slice(16) === '10') {
        setFocusCaderaDespLava(false)
        return setFocus10(false)
      } else if (name.slice(16) === '12') {
        setFocusCaderaDespLava(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 16) === 'pierna_desp_lava') {

      if (name.slice(16) === '4') {
        setFocusPiernaDespLava(false)
        return setFocus4(false)
      } else if (name.slice(16) === '6') {
        setFocusPiernaDespLava(false)
        return setFocus6(false)
      } else if (name.slice(16) === '8') {
        setFocusPiernaDespLava(false)
        return setFocus8(false)
      } else if (name.slice(16) === '10') {
        setFocusPiernaDespLava(false)
        return setFocus10(false)
      } else if (name.slice(16) === '12') {
        setFocusPiernaDespLava(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 17) === 'rodilla_desp_lava') {

      if (name.slice(17) === '4') {
        setFocusRodillaDespLava(false)
        return setFocus4(false)
      } else if (name.slice(17) === '6') {
        setFocusRodillaDespLava(false)
        return setFocus6(false)
      } else if (name.slice(17) === '8') {
        setFocusRodillaDespLava(false)
        return setFocus8(false)
      } else if (name.slice(17) === '10') {
        setFocusRodillaDespLava(false)
        return setFocus10(false)
      } else if (name.slice(17) === '12') {
        setFocusRodillaDespLava(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 14) === 'bota_desp_lava') {

      if (name.slice(14) === '4') {
        setFocusBotaDespLava(false)
        return setFocus4(false)
      } else if (name.slice(14) === '6') {
        setFocusBotaDespLava(false)
        return setFocus6(false)
      } else if (name.slice(14) === '8') {
        setFocusBotaDespLava(false)
        return setFocus8(false)
      } else if (name.slice(14) === '10') {
        setFocusBotaDespLava(false)
        return setFocus10(false)
      } else if (name.slice(14) === '12') {
        setFocusBotaDespLava(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 23) === 'largo_costado_desp_lava') {

      if (name.slice(23) === '4') {
        setFocusLargoCostadoDespLava(false)
        return setFocus4(false)
      } else if (name.slice(23) === '6') {
        setFocusLargoCostadoDespLava(false)
        return setFocus6(false)
      } else if (name.slice(23) === '8') {
        setFocusLargoCostadoDespLava(false)
        return setFocus8(false)
      } else if (name.slice(23) === '10') {
        setFocusLargoCostadoDespLava(false)
        return setFocus10(false)
      } else if (name.slice(23) === '12') {
        setFocusLargoCostadoDespLava(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 21) === 'entrepierna_desp_lava') {

      if (name.slice(21) === '4') {
        setFocusEntrepiernaDespLava(false)
        return setFocus4(false)
      } else if (name.slice(21) === '6') {
        setFocusEntrepiernaDespLava(false)
        return setFocus6(false)
      } else if (name.slice(21) === '8') {
        setFocusEntrepiernaDespLava(false)
        return setFocus8(false)
      } else if (name.slice(21) === '10') {
        setFocusEntrepiernaDespLava(false)
        return setFocus10(false)
      } else if (name.slice(21) === '12') {
        setFocusEntrepiernaDespLava(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 24) === 'tiro_delantero_desp_lava') {

      if (name.slice(24) === '4') {
        setFocusTiroDelanteroDespLava(false)
        return setFocus4(false)
      } else if (name.slice(24) === '6') {
        setFocusTiroDelanteroDespLava(false)
        return setFocus6(false)
      } else if (name.slice(24) === '8') {
        setFocusTiroDelanteroDespLava(false)
        return setFocus8(false)
      } else if (name.slice(24) === '10') {
        setFocusTiroDelanteroDespLava(false)
        return setFocus10(false)
      } else if (name.slice(24) === '12') {
        setFocusTiroDelanteroDespLava(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 24) === 'tiro_posterior_desp_lava') {

      if (name.slice(24) === '4') {
        setFocusTiroPosteriorDespLava(false)
        return setFocus4(false)
      } else if (name.slice(24) === '6') {
        setFocusTiroPosteriorDespLava(false)
        return setFocus6(false)
      } else if (name.slice(24) === '8') {
        setFocusTiroPosteriorDespLava(false)
        return setFocus8(false)
      } else if (name.slice(24) === '10') {
        setFocusTiroPosteriorDespLava(false)
        return setFocus10(false)
      } else if (name.slice(24) === '12') {
        setFocusTiroPosteriorDespLava(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 5) === 'ruedo') {

      if (name.slice(5) === '4') {
        setFocusRuedo(false)
        return setFocus4(false)
      } else if (name.slice(5) === '6') {
        setFocusRuedo(false)
        return setFocus6(false)
      } else if (name.slice(5) === '8') {
        setFocusRuedo(false)
        return setFocus8(false)
      } else if (name.slice(5) === '10') {
        setFocusRuedo(false)
        return setFocus10(false)
      } else if (name.slice(5) === '12') {
        setFocusRuedo(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 7) === 'cintura') {

      if (name.slice(7) === '4') {
        setFocusCintura(false)
        return setFocus4(false)
      } else if (name.slice(7) === '6') {
        setFocusCintura(false)
        return setFocus6(false)
      } else if (name.slice(7) === '8') {
        setFocusCintura(false)
        return setFocus8(false)
      } else if (name.slice(7) === '10') {
        setFocusCintura(false)
        return setFocus10(false)
      } else if (name.slice(7) === '12') {
        setFocusCintura(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 6) === 'cadera') {

      if (name.slice(6) === '4') {
        setFocusCadera(false)
        return setFocus4(false)
      } else if (name.slice(6) === '6') {
        setFocusCadera(false)
        return setFocus6(false)
      } else if (name.slice(6) === '8') {
        setFocusCadera(false)
        return setFocus8(false)
      } else if (name.slice(6) === '10') {
        setFocusCadera(false)
        return setFocus10(false)
      } else if (name.slice(6) === '12') {
        setFocusCadera(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 6) === 'pierna') {

      if (name.slice(6) === '4') {
        setFocusPierna(false)
        return setFocus4(false)
      } else if (name.slice(6) === '6') {
        setFocusPierna(false)
        return setFocus6(false)
      } else if (name.slice(6) === '8') {
        setFocusPierna(false)
        return setFocus8(false)
      } else if (name.slice(6) === '10') {
        setFocusPierna(false)
        return setFocus10(false)
      } else if (name.slice(6) === '12') {
        setFocusPierna(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 7) === 'rodilla') {

      if (name.slice(7) === '4') {
        setFocusRodilla(false)
        return setFocus4(false)
      } else if (name.slice(7) === '6') {
        setFocusRodilla(false)
        return setFocus6(false)
      } else if (name.slice(7) === '8') {
        setFocusRodilla(false)
        return setFocus8(false)
      } else if (name.slice(7) === '10') {
        setFocusRodilla(false)
        return setFocus10(false)
      } else if (name.slice(7) === '12') {
        setFocusRodilla(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 4) === 'bota') {

      if (name.slice(4) === '4') {
        setFocusBota(false)
        return setFocus4(false)
      } else if (name.slice(4) === '6') {
        setFocusBota(false)
        return setFocus6(false)
      } else if (name.slice(4) === '8') {
        setFocusBota(false)
        return setFocus8(false)
      } else if (name.slice(4) === '10') {
        setFocusBota(false)
        return setFocus10(false)
      } else if (name.slice(4) === '12') {
        setFocusBota(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 13) === 'largo_costado') {

      if (name.slice(13) === '4') {
        setFocusLargoCostado(false)
        return setFocus4(false)
      } else if (name.slice(13) === '6') {
        setFocusLargoCostado(false)
        return setFocus6(false)
      } else if (name.slice(13) === '8') {
        setFocusLargoCostado(false)
        return setFocus8(false)
      } else if (name.slice(13) === '10') {
        setFocusLargoCostado(false)
        return setFocus10(false)
      } else if (name.slice(13) === '12') {
        setFocusLargoCostado(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 11) === 'entrepierna') {

      if (name.slice(11) === '4') {
        setFocusEntrepierna(false)
        return setFocus4(false)
      } else if (name.slice(11) === '6') {
        setFocusEntrepierna(false)
        return setFocus6(false)
      } else if (name.slice(11) === '8') {
        setFocusEntrepierna(false)
        return setFocus8(false)
      } else if (name.slice(11) === '10') {
        setFocusEntrepierna(false)
        return setFocus10(false)
      } else if (name.slice(11) === '12') {
        setFocusEntrepierna(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 14) === 'tiro_delantero') {

      if (name.slice(14) === '4') {
        setFocusTiroDelantero(false)
        return setFocus4(false)
      } else if (name.slice(14) === '6') {
        setFocusTiroDelantero(false)
        return setFocus6(false)
      } else if (name.slice(14) === '8') {
        setFocusTiroDelantero(false)
        return setFocus8(false)
      } else if (name.slice(14) === '10') {
        setFocusTiroDelantero(false)
        return setFocus10(false)
      } else if (name.slice(14) === '12') {
        setFocusTiroDelantero(false)
        return setFocus12(false)
      }

    } else if (name.slice(0, 14) === 'tiro_posterior') {

      if (name.slice(14) === '4') {
        setFocusTiroPosterior(false)
        return setFocus4(false)
      } else if (name.slice(14) === '6') {
        setFocusTiroPosterior(false)
        return setFocus6(false)
      } else if (name.slice(14) === '8') {
        setFocusTiroPosterior(false)
        return setFocus8(false)
      } else if (name.slice(14) === '10') {
        setFocusTiroPosterior(false)
        return setFocus10(false)
      } else if (name.slice(14) === '12') {
        setFocusTiroPosterior(false)
        return setFocus12(false)
      }

    }
  }


  const addNoconformidades = (e) => {
    setcountNoConformidades([...countNoConformidades, 1])
    setInput({ ...input, no_conformidades: [...input.no_conformidades, { defecto: '', cantidad: '' }] })

    return setActiveButon(false)

  }

  const removeNoConformidades = () => {
    let countActual = countNoConformidades
    countActual.pop()
    setcountNoConformidades([...countActual])

    let arrayNoConformidades = [...input.no_conformidades]
    let arrayFaltantes = [...input.faltantes]
    arrayNoConformidades.pop()
    let values = { ...input }

    if (arrayNoConformidades[0] != undefined && Number(arrayNoConformidades[0].cantidad != NaN)) {
      const segundas = arrayNoConformidades.length > 1 ? arrayNoConformidades.reduce((acc, b) => {
        acc = acc + Number(b?.cantidad)
        return acc
      }, 0) :
        arrayNoConformidades.length === 1 ? Number(arrayNoConformidades[0].cantidad) : '';

      const faltantesTotal = input.faltantesTotal === '' ? 0 : input.faltantesTotal;
      const primeras = Number(props.data.unidades) - (Number(segundas) + faltantesTotal)

      setInput({
        ...input, no_conformidades: [...arrayNoConformidades],
        segundas,
        primeras
      })

      if (values.fecha_auditoria === "" || values.auditor === '' || values.composicion === '' || values.unidades_muestra === '' ||
        values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '') {
        return setActiveButon(false)
      }

      for (let i = 0; i < arrayNoConformidades.length; i++) {
        if (arrayNoConformidades[i].defecto === '' || arrayNoConformidades[i].cantidad === '') {

          return setActiveButon(false)
        }
      }

      for (let i = 0; i < arrayFaltantes.length; i++) {
        if (arrayFaltantes[i].talla === '' || arrayFaltantes[i].cantidad === '') {

          return setActiveButon(false)
        }
      }

      return setActiveButon(true)
    } else {
      const segundas = ''

      const faltantesTotal = input.faltantesTotal === '' ? 0 : input.faltantesTotal;
      const primeras = Number(props.data.unidades) - (Number(segundas) + faltantesTotal)

      setInput({
        ...input, no_conformidades: arrayNoConformidades,
        segundas,
        primeras
      })

      if (values.fecha_auditoria === "" || values.auditor === '' || values.composicion === '' || values.unidades_muestra === '' ||
        values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '') {
        return setActiveButon(false)
      }

      for (let i = 0; i < arrayNoConformidades.length; i++) {
        if (arrayNoConformidades[i].defecto === '' || arrayNoConformidades[i].cantidad === '') {

          return setActiveButon(false)
        }
      }

      for (let i = 0; i < arrayFaltantes.length; i++) {
        if (arrayFaltantes[i].talla === '' || arrayFaltantes[i].cantidad === '') {

          return setActiveButon(false)
        }
      }
      return setActiveButon(true)


    }

  }

  const addFaltantes = () => {
    setCountFaltantes([...countFaltantes, 1])
    setInput({ ...input, faltantes: [...input.faltantes, { talla: '', cantidad: '' }] })

    return setActiveButon(false)
  }

  const removeFaltantes = () => {
    let countActual = countFaltantes
    countActual.pop()
    setCountFaltantes([...countActual])

    let arrayFaltantes = [...input.faltantes]
    let arrayNoConformidades = [...input.no_conformidades]
    arrayFaltantes.pop()

    let values = { ...input }

    if (arrayFaltantes[0] != undefined && Number(arrayFaltantes[0].cantidad) != NaN) {
      const faltantesTotal = arrayFaltantes.length > 1 ? arrayFaltantes.reduce((acc, b) => {
        acc = acc + Number(b?.cantidad)
        return acc
      }, 0) :
        arrayFaltantes.length === 1 ? Number(arrayFaltantes[0].cantidad) : '';

      const segundas = input.segundas === '' ? 0 : input.segundas;

      const primeras = Number(props.data.unidades) - (Number(faltantesTotal) + segundas)

      setInput({
        ...input, faltantes: arrayFaltantes,
        faltantesTotal,
        primeras
      })
      console.log(arrayFaltantes)

      if (values.fecha_auditoria === "" || values.auditor === '' || values.composicion === '' || values.unidades_muestra === '' ||
        values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '') {
        return setActiveButon(false)
      }

      for (let i = 0; i < arrayFaltantes.length; i++) {
        if (arrayFaltantes[i].talla === '' || arrayFaltantes[i].cantidad === '') {

          return setActiveButon(false)
        }
      }

      for (let i = 0; i < arrayNoConformidades.length; i++) {
        if (arrayNoConformidades[i].defecto === '' || arrayNoConformidades[i].cantidad === '') {

          return setActiveButon(false)
        }
      }

      return setActiveButon(true)

    } else {
      const faltantesTotal = ''

      const segundas = input.segundas === '' ? 0 : input.segundas;
      const primeras = Number(props.data.unidades) - (Number(faltantesTotal) + segundas)

      setInput({
        ...input, faltantes: arrayFaltantes,
        faltantesTotal,
        primeras
      })

      if (values.fecha_auditoria === "" || values.auditor === '' || values.composicion === '' || values.unidades_muestra === '' ||
        values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '') {
        return setActiveButon(false)
      }

      for (let i = 0; i < arrayFaltantes.length; i++) {
        if (arrayFaltantes[i].talla === '' || arrayFaltantes[i].cantidad === '') {

          return setActiveButon(false)
        }
      }

      for (let i = 0; i < arrayNoConformidades.length; i++) {
        if (arrayNoConformidades[i].defecto === '' || arrayNoConformidades[i].cantidad === '') {

          return setActiveButon(false)
        }
      }
      return setActiveButon(true)

    }

  }

  const addMedidasSuperiores = () => {
    if (countMedidas.superior.length === 0) {
      setCountMedidas({
        superior: [1],
        inferior: []
      })
    }
    setInput({ ...input, medidas: [] })
  }

  const addMedidasInfeiores = () => {
    if (countMedidas.inferior.length === 0) {
      setCountMedidas({
        superior: [],
        inferior: [1]
      })
    }
    setInput({ ...input, medidas: [] })
  }

  const removeMedidas = () => {

    setCountMedidas({
      superior: [],
      inferior: []
    })

    setInput({ ...input, medidas: [] })
  }


  const changeInputNoconformidades = (e) => {

    const { value, name } = e.target
    let arrayNoConformidades = [...input.no_conformidades]
    let arrayFaltantes = [...input.faltantes]
    let values = { ...input }

    if (name.slice(0, 7) === 'defecto') {
      let newdefect = {}
      newdefect[name.slice(0, 7)] = value
      arrayNoConformidades[name.slice(7)] = { ...arrayNoConformidades[name.slice(7)], ...newdefect }

      setInput({ ...input, no_conformidades: [...arrayNoConformidades] })

      if (values.fecha_auditoria === "" || values.auditor === '' || values.composicion === '' || values.unidades_muestra === '' ||
        values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '') {
        return setActiveButon(false)
      }

      for (let i = 0; i < arrayNoConformidades.length; i++) {
        if (arrayNoConformidades[i].defecto === '' || arrayNoConformidades[i].cantidad === '') {

          return setActiveButon(false)
        }
      }

      for (let i = 0; i < arrayFaltantes.length; i++) {
        if (arrayFaltantes[i].talla === '' || arrayFaltantes[i].cantidad === '') {

          return setActiveButon(false)
        }
      }

      return setActiveButon(true)

    } else if (name.slice(0, 8) === 'cantidad') {

      const filtroNum = '1234567890.'
      for (let i = 0; i < value.length; i++) {
        if (filtroNum.indexOf(value[i]) === -1) {
          return document.getElementById(`cantidadD${name.slice(8)}`).value =
            input.no_conformidades[name.slice(8)]?.cantidad ? input.no_conformidades[name.slice(8)]?.cantidad : '';
        }
      }

      let newCantidad = {}
      newCantidad[name.slice(0, 8)] = value
      arrayNoConformidades[name.slice(8)] = { ...arrayNoConformidades[name.slice(8)], ...newCantidad }

      const segundas = arrayNoConformidades.length > 1 ? arrayNoConformidades.reduce((acc, b) => {
        if (Number(b?.cantidad)) {
          acc = acc + Number(b.cantidad)
        } else {
          acc = acc + 0
        }
        return acc
      }, 0) :
        arrayNoConformidades.length === 1 ? Number(arrayNoConformidades[0].cantidad) : '';

      const faltantesTotal = input.faltantesTotal === '' ? 0 : input.faltantesTotal
      const primeras = Number(props.data.unidades) - (Number(segundas) + faltantesTotal)

      setInput({
        ...input, no_conformidades: [...arrayNoConformidades],
        segundas,
        primeras
      })


      if (values.fecha_auditoria === "" || values.auditor === '' || values.composicion === '' || values.unidades_muestra === '' ||
        values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '') {
        return setActiveButon(false)
      }


      for (let i = 0; i < arrayNoConformidades.length; i++) {
        if (arrayNoConformidades[i].defecto === '' || arrayNoConformidades[i].cantidad === '') {

          return setActiveButon(false)
        }
      }

      for (let i = 0; i < arrayFaltantes.length; i++) {
        if (arrayFaltantes[i].talla === '' || arrayFaltantes[i].cantidad === '') {

          return setActiveButon(false)
        }
      }

      return setActiveButon(true)


    }
  }


  const changeInputFaltantes = (e) => {

    const { value, name } = e.target
    let arrayFaltantes = [...input.faltantes]
    let arrayNoConformidades = [...input.no_conformidades]
    let values = { ...input }

    if (name.slice(0, 5) === 'talla') {
      let newFalt = {}
      newFalt[name.slice(0, 5)] = value
      arrayFaltantes[name.slice(5)] = { ...arrayFaltantes[name.slice(5)], ...newFalt }

      setInput({ ...input, faltantes: [...arrayFaltantes] })

      if (values.fecha_auditoria === "" || values.auditor === '' || values.composicion === '' || values.unidades_muestra === '' ||
        values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '') {
          console.log(1,'aqui')
        return setActiveButon(false)
      }

      for (let i = 0; i < arrayFaltantes.length; i++) {
        if (arrayFaltantes[i].talla === '' || arrayFaltantes[i].cantidad === '') {
          console.log(1,'aqui')
          return setActiveButon(false)
        }
      }

      for (let i = 0; i < arrayNoConformidades.length; i++) {
        if (arrayNoConformidades[i].defecto === '' || arrayNoConformidades[i].cantidad === '') {
          console.log(1,'aqui')
          return setActiveButon(false)
        }
      }

      return setActiveButon(true)



    } else if (name.slice(0, 8) === 'cantidad') {

      const filtroNum = '1234567890.'
      for (let i = 0; i < value.length; i++) {
        if (filtroNum.indexOf(value[i]) === -1) {
          return document.getElementById(`cantidadF${name.slice(8)}`).value =
            input.faltantes[name.slice(8)]?.cantidad ? input.faltantes[name.slice(8)].cantidad : '';
        }
      }
      let newCantidad = {}
      newCantidad[name.slice(0, 8)] = value
      arrayFaltantes[name.slice(8)] = { ...arrayFaltantes[name.slice(8)], ...newCantidad }
      const faltantesTotal = arrayFaltantes.length > 1 ? arrayFaltantes.reduce((acc, b) => {
        if (Number(b?.cantidad)) {
          acc = acc + Number(b.cantidad)
        } else {
          acc = acc + 0
        }
        return acc
      }, 0) :
        arrayFaltantes.length === 1 ? Number(arrayFaltantes[0].cantidad) : '';

      const segundas = input.segundas === '' ? 0 : input.segundas
      const primeras = Number(props.data.unidades) - (Number(faltantesTotal) + segundas)

      setInput({
        ...input, faltantes: [...arrayFaltantes],
        faltantesTotal,
        primeras
      })

      if (values.fecha_auditoria === "" || values.auditor === '' || values.composicion === '' || values.unidades_muestra === '' ||
        values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '') {
          console.log(1,'aqui')
        return setActiveButon(false)
      }

      for (let i = 0; i < arrayFaltantes.length; i++) {
        if (arrayFaltantes[i].talla === '' || arrayFaltantes[i].cantidad === '') {
          console.log(1,'aqui')
          return setActiveButon(false)
        }
      }

      for (let i = 0; i < arrayNoConformidades.length; i++) {
        if (arrayNoConformidades[i].defecto === '' || arrayNoConformidades[i].cantidad === '') {
          console.log(1,'aqui')
          return setActiveButon(false)
        }
      }

      return setActiveButon(true)

    }
  }

  // esta funcion nos sirve para controlar los inputs de las medidas.
  const changeInputMedidasSupeiores = (e) => {

    const { name, value } = e.target
    let arrayMedidas = [...input.medidas]

    if (name.slice(0, 15) === 'pecho_desp_lava') {

      let newMedida = {
        tipo: name.slice(0, 15),
        talla: name.slice(15),
        medida: value
      }

      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 14) === 'sisa_desp_lava') {

      let newMedida = {
        tipo: name.slice(0, 14),
        talla: name.slice(14),
        medida: value
      }

      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]

      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 15) === 'ruedo_desp_lava') {

      let newMedida = {
        tipo: name.slice(0, 15),
        talla: name.slice(15),
        medida: value
      }
      
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]

      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 22) === 'largo_frente_desp_lava') {

      let newMedida = {
        tipo: name.slice(0, 22),
        talla: name.slice(22),
        medida: value
      }
      
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]

      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 23) === 'largo_costado_desp_lava') {

      let newMedida = {
        tipo: name.slice(0, 23),
        talla: name.slice(23),
        medida: value
      }

      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]

      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 21) === 'largo_manga_desp_lava') {

      let newMedida = {
        tipo: name.slice(0, 21),
        talla: name.slice(21),
        medida: value
      }
      
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]

      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 16) === 'cuello_desp_lava') {

      let newMedida = {
        tipo: name.slice(0, 16),
        talla: name.slice(16),
        medida: value
      }
      
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]

      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 14) === 'puño_desp_lava') {

      let newMedida = {
        tipo: name.slice(0, 14),
        talla: name.slice(14),
        medida: value
      }
      
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]

      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 5) === 'pecho') {

      let newMedida = {
        tipo: name.slice(0, 5),
        talla: name.slice(5),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 4) === 'sisa') {
      let newMedida = {
        tipo: name.slice(0, 4),
        talla: name.slice(4),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]

      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 5) === 'ruedo') {
      let newMedida = {
        tipo: name.slice(0, 5),
        talla: name.slice(5),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 12) === 'largo_frente') {

      let newMedida = {
        tipo: name.slice(0, 12),
        talla: name.slice(12),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 13) === 'largo_costado') {

      let newMedida = {
        tipo: name.slice(0, 13),
        talla: name.slice(13),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]

      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 11) === 'largo_manga') {

      let newMedida = {
        tipo: name.slice(0, 11),
        talla: name.slice(11),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]

      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 6) === 'cuello') {

      let newMedida = {
        tipo: name.slice(0, 6),
        talla: name.slice(6),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]

      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 4) === 'puño') {

      let newMedida = {
        tipo: name.slice(0, 4),
        talla: name.slice(4),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]

      setInput({ ...input, medidas: arrayMedidas })

    }
  }

  const changeInputMedidasInfeiores = (e) => {
    const { name, value } = e.target

    let arrayMedidas = input.medidas

    if (name.slice(0, 15) === 'ruedo_desp_lava') {
      let newMedida = {
        tipo: name.slice(0, 15),
        talla: name.slice(15),
        medida: value
      }
      
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]

      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 17) === 'cintura_desp_lava') {
      let newMedida = {
        tipo: name.slice(0, 17),
        talla: name.slice(17),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 16) === 'cadera_desp_lava') {
      let newMedida = {
        tipo: name.slice(0, 16),
        talla: name.slice(16),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 16) === 'pierna_desp_lava') {
      let newMedida = {
        tipo: name.slice(0, 16),
        talla: name.slice(16),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 17) === 'rodilla_desp_lava') {
      let newMedida = {
        tipo: name.slice(0, 17),
        talla: name.slice(17),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 14) === 'bota_desp_lava') {
      let newMedida = {
        tipo: name.slice(0, 14),
        talla: name.slice(14),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 23) === 'largo_costado_desp_lava') {
      let newMedida = {
        tipo: name.slice(0, 23),
        talla: name.slice(23),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 21) === 'entrepierna_desp_lava') {
      let newMedida = {
        tipo: name.slice(0, 21),
        talla: name.slice(21),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 24) === 'tiro_delantero_desp_lava') {
      let newMedida = {
        tipo: name.slice(0, 24),
        talla: name.slice(24),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 24) === 'tiro_posterior_desp_lava') {
      let newMedida = {
        tipo: name.slice(0, 24),
        talla: name.slice(24),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 5) === 'ruedo') {
      let newMedida = {
        tipo: name.slice(0, 5),
        talla: name.slice(5),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]

      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 7) === 'cintura') {
      let newMedida = {
        tipo: name.slice(0, 7),
        talla: name.slice(7),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 6) === 'cadera') {
      let newMedida = {
        tipo: name.slice(0, 6),
        talla: name.slice(6),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 6) === 'pierna') {
      let newMedida = {
        tipo: name.slice(0, 6),
        talla: name.slice(6),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 7) === 'rodilla') {
      let newMedida = {
        tipo: name.slice(0, 7),
        talla: name.slice(7),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 4) === 'bota') {
      let newMedida = {
        tipo: name.slice(0, 4),
        talla: name.slice(4),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 13) === 'largo_costado') {
      let newMedida = {
        tipo: name.slice(0, 13),
        talla: name.slice(13),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 11) === 'entrepierna') {
      let newMedida = {
        tipo: name.slice(0, 11),
        talla: name.slice(11),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 14) === 'tiro_delantero') {
      let newMedida = {
        tipo: name.slice(0, 14),
        talla: name.slice(14),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    } else if (name.slice(0, 14) === 'tiro_posterior') {
      let newMedida = {
        tipo: name.slice(0, 14),
        talla: name.slice(14),
        medida: value
      }
      for (let i = 0; i < arrayMedidas.length; i++) {
        if (arrayMedidas[i].talla === newMedida.talla && arrayMedidas[i].tipo === newMedida.tipo) {
          arrayMedidas[i] = newMedida
          return setInput({ ...input, medidas: arrayMedidas })
        }
      }
      arrayMedidas = [...arrayMedidas, newMedida]
      
      setInput({ ...input, medidas: arrayMedidas })

    }
  }

  const changeInput = (e) => {

    const { name, value } = e.target
    let values = { ...input }

    const filtroGeneral = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ abcdefghijklmnñopqrstuvwxyz1234567890,.'
    const filtroNum = '1234567890.'
    const filtroLetra = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ abcdefghijklmnñopqrstuvwxyz'

    switch (name) {

      case 'auditor':
        for (let i = 0; i < value.length; i++) {
          if (filtroLetra.indexOf(value[i]) === -1) {

            return document.getElementById('auditor').value = input.auditor
          }
        }
        break;

      case 'unidades_muestra':
        for (let i = 0; i < value.length; i++) {
          if (filtroNum.indexOf(value[i]) === -1) {

            return document.getElementById('unidades_muestra').value = input.unidades_muestra
          }
        }
        break;

      case "colaboradores_karibik":
        for (let i = 0; i < value.length; i++) {
          if (filtroNum.indexOf(value[i]) === -1) {

            return document.getElementById('colaboradores_karibik').value = input.colaboradores_karibik
          }
        }
        break;

      case 'descripcion_cobros':
        for (let i = 0; i < value.length; i++) {
          if (filtroGeneral.indexOf(value[i]) === -1) {

            return document.getElementById('descripcion_cobros').value = input.cobros.descripcion_cobros
          }
        }
        break;

      case 'cantidad_cobros':
        for (let i = 0; i < value.length; i++) {
          if (filtroNum.indexOf(value[i]) === -1) {

            return document.getElementById('cantidad_cobros').value = input.cobros.cantidad_cobros
          }
        }
        break;

      case 'valor_cobros':
        for (let i = 0; i < value.length; i++) {
          if (filtroNum.indexOf(value[i]) === -1) {

            return document.getElementById('valor_cobros').value = input.cobros.valor_cobros
          }
        }
        break;
    }

    if (name === 'descripcion_cobros' || name === 'cantidad_cobros' || name === 'valor_cobros') {
      return setInput({ ...input, cobros: { ...input.cobros, [name]: value } })
    }

    values = { ...values, [name]: value }
    setInput({ ...values })



    if (values.fecha_auditoria === "" || values.auditor === '' || values.composicion === '' || values.unidades_muestra === '' ||
      values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '' || values.aprobado === '') {
      console.log('aqui')
        return setActiveButon(false)
    }


      for (let i = 0; i < values.no_conformidades.length; i++) {

        if (values.no_conformidades[i].defecto === '' || values.no_conformidades[i].cantidad === '') {
          console.log('aqui')
          return setActiveButon(false)
        }
      }

      for (let i = 0; i < values.faltantes.length; i++) {

        if (values.faltantes[i].talla === '' || values.faltantes[i].cantidad === '') {
          console.log('aqui')
          return setActiveButon(false)
        }
      }

    
      return setActiveButon(true)
    


    // setActiveButon(true)

  }


  useEffect(() => {
    if (props.data.unidades !== undefined) {
      setInput({
        ...input,
        primeras: Number(props.data.unidades),
        op: props.data.op
      })
    }
  }, [props])

  useEffect(()=>{
    if(props.active === true){
      window.scrollTo({
        top:document.body.scrollHeight,
        behavior: 'smooth'
      });
    } else if(props.active === false){
      window.scrollTo({
        top:0,
        behavior: 'smooth'
      });
    }
  },[props.active])


  const submitAuditoria = () => {
    if(!activeButon){
      return
    }

    axios.post('http://localhost:3000/auditorias/insert', input)
      .then(r => console.log(r.data))
  }


  return (
    <div>
      {
        props.active &&
        <div>
          <h2>Formulario Auditorias</h2>
          <div className="containerFormAuditoria">
            <form  >

              <div className="containerTwoInputs">
                <div>
                  <label >Fecha Auditoria <br /> <input onChange={changeInput} type="date" name="fecha_auditoria" /></label>
                </div>
                <div>
                  <label >Auditor@ <br /> <input onChange={changeInput} type="text" name="auditor" id="auditor" /></label>
                </div>
              </div>

              <div className="containerTwoInputs">

                <div>
                  <label >Composicion <br /> <textarea onChange={changeInput} type="text" name="composicion" /></label>
                </div>
                <div>
                  <label >Unidades de Muestra <br /> <input onChange={changeInput} type="text" name="unidades_muestra" id="unidades_muestra" /></label>
                </div>

              </div>

              <div className="containerTwoInputs">

                <div>
                  <label >Muestra Fisica <br />
                    <select onChange={changeInput} name="muestra_fisica" >
                      <option value="">Escoge</option>
                      <option value="Si">Si</option>
                      <option value="No">No</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label >Tipo Revision <br />
                    <select onChange={changeInput} name="tipo_revision" >
                      <option value="">Escoge</option>
                      <option value="Premuestra">Premuestra</option>
                      <option value="Produccion">Produccion</option>
                    </select>
                  </label>
                </div>

              </div>

              <div className="containerTwoInputs">

                <div>
                  <label >Numero de Operarios<br /> <input onChange={changeInput} type="text" name="colaboradores_karibik" id="colaboradores_karibik" /></label>
                </div>
                <div>
                  <label >Aprobado<br />
                    <select onChange={changeInput} name="aprobado" >
                      <option value="">Escoge</option>
                      <option value="Si">Si</option>
                      <option value="No">No</option>
                    </select>
                  </label>
                </div>

              </div>

              <h2>No conformidades</h2>

              {
                countNoConformidades.length > 0 && countNoConformidades.map((e, i) =>

                  <div key={i}>
                    <div className="containerTwoInputs">
                      <div>
                        <label >Defecto en:<br />
                          <select onChange={changeInputNoconformidades} name={`defecto${i}`} >
                            <option value="">Escoge Defecto</option>
                            <option value="Tela">Tela</option>
                            <option value="Corte">Corte</option>
                            <option value="Bordado">Bordado</option>
                            <option value="Estampacion_localizada">Estampacion Localizada</option>
                            <option value="Confeccion">Confeccion</option>
                            <option value="Lavanderia">Lavanderia</option>
                            <option value="calzado">Calzado</option>
                            <option value="Accesorios">Accesorios</option>
                          </select>
                        </label>
                      </div>
                      <div>
                        <label >Cantidad<br /><input onChange={changeInputNoconformidades} type="text" name={`cantidad${i}`} id={`cantidadD${i}`} /></label>
                      </div>
                    </div>

                  </div>
                )
              }

              <div className="containerAddyRemove">
                <div onClick={addNoconformidades} className="butonAddCampo" >Agregar campo</div>
                <div onClick={removeNoConformidades} className="butonRemoveCampo" >Eliminar campo</div>
              </div>

              {
                input.segundas !== '' &&
                <div className="containerTwoInputs">
                  <div>
                    <label >Segundas Total</label> <br /> <p>{input.segundas}</p>
                  </div>
                </div>
              }



              <h2>Faltantes</h2>

              {
                countFaltantes.length > 0 && countFaltantes.map((e, i) =>
                  <div key={i} className="containerTwoInputs">
                    <div>
                      <label >Talla<br />
                        <select name={`talla${i}`} onChange={changeInputFaltantes}>
                          <option value="">Escoge Talla</option>
                          <option value="4">4</option>
                          <option value="6">6</option>
                          <option value="8">8</option>
                          <option value="10">10</option>
                          <option value="12">12</option>
                          <option value="XXS">XXS</option>
                          <option value="XS">XS</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                        </select>
                      </label>
                    </div>
                    <div>
                      <label >Cantidad <br /> <input id={`cantidadF${i}`} name={`cantidad${i}`} onChange={changeInputFaltantes} type="text" /></label>
                    </div>
                  </div>
                )
              }
              <div className="containerAddyRemove">
                <div onClick={addFaltantes} className="butonAddCampo" >Agregar campo</div>
                <div onClick={removeFaltantes} className="butonRemoveCampo" >Eliminar campo</div>
              </div>

              {
                input.faltantesTotal !== '' &&
                <div className="containerTwoInputs">
                  <div>
                    <label >Faltantes Total</label> <br /> <p>{input.faltantesTotal}</p>
                  </div>
                </div>
              }
              {
                input.primeras !== "" &&
                <div>
                  <div >Primeras Total</div >
                  <div>{input.primeras}</div>
                </div>
              }

              <h2>Medidas</h2>
              <div className="containerAddyRemove">
                <div onClick={addMedidasSuperiores} className="butonAddCampo" >Agregar Medidas Superior</div>
                <div onClick={addMedidasInfeiores} className="butonAddCampo" >Agregar Medida Inferior</div>
                <div onClick={removeMedidas} className="butonRemoveCampo" >Eliminar campo</div>
              </div>
              {
                countMedidas.superior.length > 0 && countMedidas.superior.map((e, i) =>
                  <div key={i}>

                    <p>Medidas Superiores</p>
                    <div className='containerFormSuperiores' >

                      <div className="containerRowSuperiores">
                        <div className="titleFila">Tallas</div>
                        <div className={focusXXS ? 'titleTalla focus' : 'titleTalla'} >XXS</div>
                        <div className={focusXS ? 'titleTalla focus' : 'titleTalla'}>XS</div>
                        <div className={focusS ? 'titleTalla focus' : 'titleTalla'}>S</div>
                        <div className={focusM ? 'titleTalla focus' : 'titleTalla'}>M</div>
                        <div className={focusL ? 'titleTalla focus' : 'titleTalla'}>L</div>
                        <div className={focusXL ? 'titleTalla focus' : 'titleTalla'}>XL</div>
                      </div>

                      <div className="containerRowSuperiores">
                        <div className={focusPecho ? 'titleFila focus' : 'titleFila'} id='pecho' >Pecho</div>
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="pechoXXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="pechoXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="pechoS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="pechoM" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="pechoL" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="pechoXL" type="number" />
                      </div>

                      <div className="containerRowSuperiores">
                        <div className={focusSisa ? 'titleFila focus' : "titleFila"}>Sisa</div>
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="sisaXXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="sisaXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="sisaS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="sisaM" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="sisaL" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="sisaXL" type="number" />
                      </div>

                      <div className="containerRowSuperiores">
                        <div className={focusRuedo ? 'titleFila focus' : "titleFila"}>Ruedo</div>
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="ruedoXXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="ruedoXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="ruedoS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="ruedoM" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="ruedoL" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="ruedoXL" type="number" />
                      </div>

                      <div className="containerRowSuperiores">
                        <div className={focusLargoFrente ? 'titleFila focus' : "titleFila"}>Largo Frente</div>
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_frenteXXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_frenteXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_frenteS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_frenteM" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_frenteL" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_frenteXL" type="number" />
                      </div>

                      <div className="containerRowSuperiores">
                        <div className={focusLargoCostado ? 'titleFila focus' : "titleFila"}>Largo Costado</div>
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_costadoXXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_costadoXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_costadoS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_costadoM" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_costadoL" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_costadoXL" type="number" />
                      </div>

                      <div className="containerRowSuperiores">
                        <div className={focusLargoManga ? 'titleFila focus' : "titleFila"}>Largo Manga</div>
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_mangaXXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_mangaXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_mangaS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_mangaM" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_mangaL" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_mangaXL" type="number" />
                      </div>

                      <div className="containerRowSuperiores">
                        <div className={focusCuello ? 'titleFila focus' : "titleFila"}>Cuello</div>
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="cuelloXXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="cuelloXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="cuelloS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="cuelloM" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="cuelloL" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="cuelloXL" type="number" />
                      </div>

                      <div className="containerRowSuperiores">
                        <div className={focusPuno ? "titleFila focus" : "titleFila"}>Puño</div>
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="puñoXXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="puñoXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="puñoS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="puñoM" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="puñoL" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="puñoXL" type="number" />
                      </div>

                      <div className="containerRowSuperiores">
                        <div className={focusPechoDespLava ? "titleFila focus" : "titleFila"}>Pecho Desp Lava</div>
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="pecho_desp_lavaXXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="pecho_desp_lavaXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="pecho_desp_lavaS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="pecho_desp_lavaM" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="pecho_desp_lavaL" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="pecho_desp_lavaXL" type="number" />
                      </div>

                      <div className="containerRowSuperiores">
                        <div className={focusSisaDespLava ? "titleFila focus" : "titleFila"}>Sisa Desp Lava</div>
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="sisa_desp_lavaXXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="sisa_desp_lavaXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="sisa_desp_lavaS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="sisa_desp_lavaM" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="sisa_desp_lavaL" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="sisa_desp_lavaXL" type="number" />
                      </div>

                      <div className="containerRowSuperiores">
                        <div className={focusRuedoDespLava ? "titleFila focus" : "titleFila"}>Ruedo Desp Lava</div>
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="ruedo_desp_lavaXXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="ruedo_desp_lavaXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="ruedo_desp_lavaS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="ruedo_desp_lavaM" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="ruedo_desp_lavaL" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="ruedo_desp_lavaXL" type="number" />
                      </div>

                      <div className="containerRowSuperiores">
                        <div className={focusLargoFrenteDespLava ? "titleFila focus" : "titleFila"}>Largo Frente Desp Lava</div>
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_frente_desp_lavaXXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_frente_desp_lavaXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_frente_desp_lavaS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_frente_desp_lavaM" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_frente_desp_lavaL" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_frente_desp_lavaXL" type="number" />
                      </div>

                      <div className="containerRowSuperiores">
                        <div className={focusLargoCostadoDespLava ? "titleFila focus" : "titleFila"}>Largo Costado Desp Lava</div>
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_costado_desp_lavaXXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_costado_desp_lavaXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_costado_desp_lavaS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_costado_desp_lavaM" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_costado_desp_lavaL" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_costado_desp_lavaXL" type="number" />
                      </div>

                      <div className="containerRowSuperiores">
                        <div className={focusLargoMangaDespLava ? "titleFila focus" : "titleFila"}>Largo Manga Desp Lava</div>
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_manga_desp_lavaXXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_manga_desp_lavaXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_manga_desp_lavaS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_manga_desp_lavaM" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_manga_desp_lavaL" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="largo_manga_desp_lavaXL" type="number" />
                      </div>

                      <div className="containerRowSuperiores">
                        <div className={focusCuelloDespLava ? "titleFila focus" : "titleFila"}>Cuello Desp Lava</div>
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="cuello_desp_lavaXXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="cuello_desp_lavaXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="cuello_desp_lavaS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="cuello_desp_lavaM" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="cuello_desp_lavaL" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="cuello_desp_lavaXL" type="number" />
                      </div>

                      <div className="containerRowSuperiores">
                        <div className={focusPunoDespLava ? "titleFila focus" : "titleFila"}>Puño Desp Lava</div>
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="puño_desp_lavaXXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="puño_desp_lavaXS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="puño_desp_lavaS" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="puño_desp_lavaM" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="puño_desp_lavaL" type="number" />
                        <input onFocus={onFocusInputSuperiores} onBlur={onBlurInputSuperiores} onChange={changeInputMedidasSupeiores} name="puño_desp_lavaXL" type="number" />
                      </div>

                    </div>

                  </div>

                )
              }

              {
                countMedidas.inferior.length > 0 && countMedidas.inferior.map((e, i) =>
                  <div key={i}>

                    <p>Medidas Inferiores</p>
                    <div className='containerFormInferiores' >

                      <div className="containerRowInferiores">
                        <div className="titleFila">Tallas</div>
                        <div className={focus4 ? "titleTalla focus" : "titleTalla"}>4</div>
                        <div className={focus6 ? "titleTalla focus" : "titleTalla"}>6</div>
                        <div className={focus8 ? "titleTalla focus" : "titleTalla"}>8</div>
                        <div className={focus10 ? "titleTalla focus" : "titleTalla"}>10</div>
                        <div className={focus12 ? "titleTalla focus" : "titleTalla"}>12</div>
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusRuedo ? "titleFila focus" : "titleFila"}>Ruedo</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="ruedo4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="ruedo6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="ruedo8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="ruedo10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="ruedo12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusCintura ? "titleFila focus" : "titleFila"}>Cintura</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cintura4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cintura6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cintura8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cintura10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cintura12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusCadera ? "titleFila focus" : "titleFila"}>Cadera</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cadera4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cadera6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cadera8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cadera10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cadera12" type="number" />
                      </div>


                      <div className="containerRowInferiores">
                        <div className={focusPierna ? "titleFila focus" : "titleFila"}>Pierna</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="pierna4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="pierna6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="pierna8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="pierna10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="pierna12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusRodilla ? "titleFila focus" : "titleFila"}>Rodilla</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="rodilla4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="rodilla6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="rodilla8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="rodilla10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="rodilla12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusBota ? "titleFila focus" : "titleFila"}>Bota</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="bota4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="bota6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="bota8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="bota10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="bota12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusLargoCostado ? "titleFila focus" : "titleFila"}>Largo Costado</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="largo_costado4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="largo_costado6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="largo_costado8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="largo_costado10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="largo_costado12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusEntrepierna ? "titleFila focus" : "titleFila"}>Entrepierna</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="entrepierna4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="entrepierna6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="entrepierna8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="entrepierna10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="entrepierna12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusTiroDelantero ? "titleFila focus" : "titleFila"}>Tiro Delantero</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_delantero4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_delantero6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_delantero8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_delantero10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_delantero12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusTiroPosterior ? "titleFila focus" : "titleFila"}>Tiro Posterior</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_posterior4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_posterior6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_posterior8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_posterior10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_posterior12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusRuedoDespLava ? "titleFila focus" : "titleFila"}>Ruedo Desp Lava</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="ruedo_desp_lava4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="ruedo_desp_lava6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="ruedo_desp_lava8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="ruedo_desp_lava10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="ruedo_desp_lava12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusCinturaDespLava ? "titleFila focus" : "titleFila"}>Cintura Desp Lava</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cintura_desp_lava4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cintura_desp_lava6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cintura_desp_lava8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cintura_desp_lava10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cintura_desp_lava12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusCaderaDespLava ? "titleFila focus" : "titleFila"}>Cadera Desp Lava</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cadera_desp_lava4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cadera_desp_lava6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cadera_desp_lava8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cadera_desp_lava10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="cadera_desp_lava12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusPiernaDespLava ? "titleFila focus" : "titleFila"}>Pierna Desp Lava</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="pierna_desp_lava4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="pierna_desp_lava6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="pierna_desp_lava8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="pierna_desp_lava10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="pierna_desp_lava12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusRodillaDespLava ? "titleFila focus" : "titleFila"}>Rodilla Desp Lava</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="rodilla_desp_lava4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="rodilla_desp_lava6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="rodilla_desp_lava8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="rodilla_desp_lava10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="rodilla_desp_lava12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusBotaDespLava ? "titleFila focus" : "titleFila"}>Bota Desp Lava</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="bota_desp_lava4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="bota_desp_lava6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="bota_desp_lava8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="bota_desp_lava10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="bota_desp_lava12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusLargoCostadoDespLava ? "titleFila focus" : "titleFila"}>Largo Costado Desp Lava</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="largo_costado_desp_lava4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="largo_costado_desp_lava6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="largo_costado_desp_lava8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="largo_costado_desp_lava10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="largo_costado_desp_lava12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusEntrepiernaDespLava ? "titleFila focus" : "titleFila"}>Entrepierna Desp Lava</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="entrepierna_desp_lava4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="entrepierna_desp_lava6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="entrepierna_desp_lava8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="entrepierna_desp_lava10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="entrepierna_desp_lava12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusTiroDelanteroDespLava ? "titleFila focus" : "titleFila"}>Tiro Delantero Desp Lava</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_delantero_desp_lava4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_delantero_desp_lava6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_delantero_desp_lava8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_delantero_desp_lava10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_delantero_desp_lava12" type="number" />
                      </div>

                      <div className="containerRowInferiores">
                        <div className={focusTiroPosteriorDespLava ? "titleFila focus" : "titleFila"}>Tiro Posterior Desp Lava</div>
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_posterior_desp_lava4" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_posterior_desp_lava6" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_posterior_desp_lava8" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_posterior_desp_lava10" type="number" />
                        <input onFocus={onFocusInputInferiore} onBlur={onBlurInputInferiores} onChange={changeInputMedidasInfeiores} name="tiro_posterior_desp_lava12" type="number" />
                      </div>
                    </div>


                  </div>
                )
              }


              <h2>Cobros</h2>
              <div className="containerTwoInputs">
                <div>
                  <label >Descripcion  <br /> <input onChange={changeInput} type="text" name="descripcion_cobros" id="descripcion_cobros" /></label>
                </div>
                <div>
                  <label >Cantidad  <br /> <input onChange={changeInput} type="text" name="cantidad_cobros" id="cantidad_cobros" /></label>
                </div>
                <div>
                  <label >Valor  <br /> <input onChange={changeInput} type="text" name="valor_cobros" id="valor_cobros" placeholder="$" /></label>
                  {
                      input.cobros.valor_cobros !== '' && <p className='helps'>{new Intl.NumberFormat().format(input.cobros.valor_cobros)}$</p>
                  }
                </div>
              </div>

              <div className={activeButon ? "buttonAuditoria" : "buttonAuditoriaNoActive"} onClick={submitAuditoria}>Agregar Auditoria</div>

            </form>
          </div>
        </div>
      }
    </div>
  )
}

export default FormEditAuditoria
