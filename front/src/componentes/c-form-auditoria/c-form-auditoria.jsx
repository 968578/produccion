import { useEffect, useState } from "react"

import { AnimatePresence, motion } from "framer-motion"
import axios from 'axios'

import './c-form-auditoria.css'

const variantsFormAuditoria = {
  hidden: {
    y: 1000,
    transition: {
      duration: 1
    }
  },
  show: {
    y: 0,
    transition: {
      duration: 1
    }
  }
}

const variantsFormMedidas = {
  hidden: {
    y: -1000,
    transition: {
      duration: 0.7
    }
  },
  show: {
    y: 0,
    transition: {
      duration: 0.7
    }
  }
}

const variantsNoconformidadesFaltantes = {
  hidden: {
    y: -300,
    transition: {
      duration: 0.5
    }
  },
  show: {
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const variantsConfirmAddAuditoria = {
  hidden: {
    scale: 0
  },
  show: {
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
}


const FormAuditoria = (props) => {


  const [countNoConformidades, setcountNoConformidades] = useState([])
  const [countFaltantes, setCountFaltantes] = useState([])
  const [countMedidas, setCountMedidas] = useState({
    superior: [],
    inferior: []
  })
  const [activeButon, setActiveButon] = useState(false)
  const [confirmAddAuditoria, setConfirmAddAuditoria] = useState('')

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
    const { name } = e.target

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
        values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '' || values.aprobado === '') {
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
        values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '' || values.aprobado === '') {
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

      if (values.fecha_auditoria === "" || values.auditor === '' || values.composicion === '' || values.unidades_muestra === '' ||
        values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '' || values.aprobado === '') {
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
        values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '' || values.aprobado === '') {
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
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 500)
    }
    setInput({ ...input, medidas: [] })
  }


  const addMedidasInfeiores = () => {
    if (countMedidas.inferior.length === 0) {
      setCountMedidas({
        superior: [],
        inferior: [1]
      })
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 500)
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
        values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '' || values.aprobado === '') {
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
        values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '' || values.aprobado === '') {
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
        values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '' || values.aprobado === '') {

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
        values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === '' || values.aprobado === '') {

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

      return setActiveButon(false)
    }


    for (let i = 0; i < values.no_conformidades.length; i++) {

      if (values.no_conformidades[i].defecto === '' || values.no_conformidades[i].cantidad === '') {

        return setActiveButon(false)
      }
    }

    for (let i = 0; i < values.faltantes.length; i++) {

      if (values.faltantes[i].talla === '' || values.faltantes[i].cantidad === '') {

        return setActiveButon(false)
      }
    }

    return setActiveButon(true)

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

  useEffect(() => {
    if (props.active === true) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    } else if (props.active === false) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [props.active])


  const submitAuditoria = () => {
    if (!activeButon) {
      return
    }
    const token = window.localStorage.getItem('accessTokenAuditoria')
    axios.post(`${process.env.REACT_APP_API_URL}/auditorias/insert`, input, {
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
      .then(r => {
        setConfirmAddAuditoria(r.data.msj)
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });

        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
  }


  return (
    <div >
      <AnimatePresence>
        {
          props.active &&
          <motion.div exit='hidden' animate='show' initial='hidden' variants={variantsFormAuditoria} key='FormAuditoria' >
            <h2 className="titleFormAuditoria">Formulario Auditorias</h2>
            <div className="cancelEdit" >
              <div onClick={props.closeAudit} className="containerEliminar">
                <div>Cancelar</div>
                <div className="L"></div>
                <div className="X"></div>
              </div>
            </div>
            <div className="containerFormAuditoria">
              <form  >

                <div className="containerTwoInputsAudit">
                  <div className="inputIzquierdo">
                    <label className="titlesFormAuditoria" >Fecha Auditoria <span className='asterisco'>*</span><br /> <input onChange={changeInput} type="date" name="fecha_auditoria" /></label>
                  </div>
                  <div>
                    <label className="titlesFormAuditoria" >Auditor@ <span className='asterisco'>*</span><br /> <input onChange={changeInput} type="text" name="auditor" id="auditor" /></label>
                  </div>
                </div>

                <div className="containerTwoInputsAudit">

                  <div className="inputIzquierdo">
                    <label className="titlesFormAuditoria" >Composicion <span className='asterisco'>*</span><br /> <textarea className="composicionAuditoria" onChange={changeInput} type="text" name="composicion" /></label>
                  </div>
                  <div>
                    <label className="titlesFormAuditoria" >Tamaño de Muestra <span className='asterisco'>*</span><br /> <input onChange={changeInput} type="text" name="unidades_muestra" id="unidades_muestra" /></label>
                  </div>

                </div>

                <div className="containerTwoInputsAudit">

                  <div className="inputIzquierdo">
                    <label className="titlesFormAuditoria" >Muestra Fisica <span className='asterisco'>*</span><br />
                      <select onChange={changeInput} name="muestra_fisica" >
                        <option value="">Escoge</option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                      </select>
                    </label>
                  </div>
                  <div>
                    <label className="titlesFormAuditoria" >Tipo Revision <span className='asterisco'>*</span><br />
                      <select onChange={changeInput} name="tipo_revision" >
                        <option value="">Escoge</option>
                        <option value="Premuestra">Premuestra</option>
                        <option value="Produccion">Produccion</option>
                      </select>
                    </label>
                  </div>

                </div>

                <div className="containerTwoInputsAudit">

                  <div className="inputIzquierdo">
                    <label className="titlesFormAuditoria" >Numero de Operarios <span className='asterisco'>*</span><br /> <input onChange={changeInput} type="text" name="colaboradores_karibik" id="colaboradores_karibik" /></label>
                  </div>
                  <div>
                    <label className="titlesFormAuditoria" >Aprobado <span className='asterisco'>*</span><br />
                      <select onChange={changeInput} name="aprobado" >
                        <option value="">Escoge</option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                      </select>
                    </label>
                  </div>

                </div>

                <h2 className="titlePrimarioAuditoria">No conformidades</h2>
                <div className="c-AllNoconrmidades">
                  <AnimatePresence>
                    {
                      countNoConformidades.length > 0 && countNoConformidades.map((e, i) =>

                        <motion.div initial='hidden' animate='show' exit='hidden' variants={variantsNoconformidadesFaltantes} key={i}>
                          <div className="containerTwoInputsAudit">
                            <div className="inputIzquierdo">
                              <label className="titlesFormAuditoria" >Defecto en: <span className='asterisco'>*</span><br />
                                <select className="selectNoConformidades" onChange={changeInputNoconformidades} name={`defecto${i}`} >
                                  <option value="">Escoge Defecto</option>
                                  <option value="T001">T001 Tela con despistes, picas, rotos</option>
                                  <option value="T002">T002 Tela barrada</option>
                                  <option value="T003">T003 Tela mareada</option>
                                  <option value="T004">T004 Falla de aguja</option>
                                  <option value="T005">T005 Motas tejidas/marras</option>
                                  <option value="T006">T006 Pilling/neps</option>
                                  <option value="T007">T007 Reviente de lycra </option>
                                  <option value="T008">T008 Tejido contaminado</option>
                                  <option value="T009">T009 Manchas</option>
                                  <option value="T010">T010 Tela con mala solidez de color (migración, trasferencia de color, solidez frote)</option>
                                  <option value="T011">T011 Tonos desviados/mezclas de tonos </option>
                                  <option value="T012">T012 Problemas de resistencia al desgarre o la tension en la tela </option>
                                  <option value="T013">T013 Efecto fantasma en la sublimación</option>
                                  <option value="T014">T014 Irregularidad en tonos sublimados</option>
                                  <option value="T015">T015 Tela con viro</option>
                                  <option value="T016">T016 Tela con problemas de encogimiento</option>
                                  <option value="T017">T017 Tela con mal olor</option>
                                  <option value="T018">T018 Tela engolada</option>
                                  <option value="T019">T019 Trama desviada o con arco</option>
                                  <option value="CT001">CT001 Piezas asimétricas desde corte</option>
                                  <option value="CT002">CT002 Anchos diferentes de rollo a rollo </option>
                                  <option value="CT003">CT003 Rollos con faltante de tela (extendido)</option>
                                  <option value="CT004">CT004 Desperdicio fuera del promedio (consumo trazo vs consumo tela cortada)</option>
                                  <option value="CT005">CT005 Faltante de piezas en el trazo</option>
                                  <option value="CT006">CT006 Mezcla de tonos en el mismo lote </option>
                                  <option value="CT007">CT007 Piquetes profundos</option>
                                  <option value="CT008">CT008 Piquetes no realizados </option>
                                  <option value="CT009">CT009 Manchas por tinta de ticketiado</option>
                                  <option value="CT010">CT010 Piezas sucias o con manchas</option>
                                  <option value="CT011">CT011 Piezas mal ticketiadas </option>
                                  <option value="CT012">CT012 Validacion de encogimieto en el extendido</option>
                                  <option value="CT013">CT013 Formato de informe de corte de produccion, minitrazo y la OP  con informacion incorrecta.</option>
                                  <option value="CT014">CT014 Perforación del tejido por grapa</option>
                                  <option value="B001">B001 Hilo de color diferente</option>
                                  <option value="B002">B002 Tension de puntada inadecuado</option>
                                  <option value="B003">B003 Agujero por daño de aguja.</option>
                                  <option value="B004">B004 Piezas deformadas o desalineadas</option>
                                  <option value="B005">B005 Ubicación incorrecta de plantilla</option>
                                  <option value="B006">B006 Medidas incorrectas (Dimensiones del bordado)</option>
                                  <option value="B007">B007 Desuniformidad del bordado </option>
                                  <option value="B008">B008 Manchas</option>
                                  <option value="B009">B009 Contaminacion de hilo</option>
                                  <option value="B010">B010 Reviente de hilo</option>
                                  <option value="B011">B011 Diseño diferente</option>
                                  <option value="E001">E001 Estampado mal ubicado/torcido/inclinado</option>
                                  <option value="E002">E002 Diseño de estampado diferente</option>
                                  <option value="E003">E003 Estampado con tono incorrecto</option>
                                  <option value="E004">E004 Estampado con medidas incorrectas</option>
                                  <option value="E005">E005 Termofijado craquelado y/o quemado</option>
                                  <option value="E006">E006 Estampado con faltante de color</option>
                                  <option value="E007">E007 Estampado amarillento por la termofijación</option>
                                  <option value="E008">E008 Repíz</option>
                                  <option value="E009">E009 Paros de maquina</option>
                                  <option value="E010">E010 Tallones</option>
                                  <option value="E011">E011 Dibujo tapado</option>
                                  <option value="E012">E012 Contaminación /manchas</option>
                                  <option value="E013">E013 Encharques</option>
                                  <option value="E014">E014 Estampado con mala solidez (frote, migracion de color, cambio de color)</option>
                                  <option value="E015">E015 Estampado con estrías</option>
                                  <option value="E016">E016 Gofrado torcido / mal ubicado</option>
                                  <option value="E017">E017 Estampado descasado</option>
                                  <option value="E018">E018 Tela quemada por proceso de estampado</option>
                                  <option value="E019">E019 Pega en la tela</option>
                                  <option value="C001">C001 Apariencia de la prenda no conforme (sucia, con manchas, stikers)</option>
                                  <option value="C002">C002 Filete no esta parejo, abierto, safado o templado, desigual</option>
                                  <option value="C003">C003 Insumos incompletos</option>
                                  <option value="C004">C004 Costuras abiertas</option>
                                  <option value="C005">C005 Hilos sobrantes</option>
                                  <option value="C006">C006 Marquillas mal ubicadas</option>
                                  <option value="C007">C007 Hiladilla con problemas de solidez</option>
                                  <option value="C008">C008 Prenda sin hiladilla/suelta</option>
                                  <option value="C009">C009 Deslizamiento de costura</option>
                                  <option value="C010">C010 Cuello encintado o recogido, disparejo, sin asentar, validar si debe ir fusionado.</option>
                                  <option value="C011">C011 Mangas dispareja o con costuras abiertas</option>
                                  <option value="C012">C012 Botones desalineados </option>
                                  <option value="C013">C013 Problemas con la horma/ silueta </option>
                                  <option value="C014">C014 Mal olor en la prenda</option>
                                  <option value="C015">C015 Costura safada </option>
                                  <option value="C016">C016 Defectos de puntada</option>
                                  <option value="C017">C017 Mal alineamiento</option>
                                  <option value="C018">C018 Prendas asimétricas</option>
                                  <option value="C019">C019 Costura descasada</option>
                                  <option value="C020">C020 Costuras onduladas</option>
                                  <option value="C021">C021 Costura retenida</option>
                                  <option value="C022">C022 Ubicación costuras de remate incorrectos</option>
                                  <option value="C023">C023 Costuras torcidas </option>
                                  <option value="C024">C024 Color del hilo diferente a lo establecifo en la ficha </option>
                                  <option value="C025">C025 Picado por aguja</option>
                                  <option value="C026">C026 Costuras sin rematar</option>
                                  <option value="C027">C027 Pespunte irregular</option>
                                  <option value="C028">C028 Perdida de tensión en la costura</option>
                                  <option value="C029">C029 Tonalidad diferente en cuellos y puños</option>
                                  <option value="C030">C030 Medidas de la prenda incorrectas</option>
                                  <option value="C031">C031 Mancha de grasa de maquina</option>
                                  <option value="L001">L001 Tono parejo de rollos a rollo o dentro del mismo rollos </option>
                                  <option value="L002">L002 Mal olor en la prenda </option>
                                  <option value="L003">L003 Prendas afectadas por excesos de temeratura en proceso</option>
                                  <option value="L004">L004 Reviente de hilo</option>
                                  <option value="L005">L005 Manualidad diferente a la muestra fisica</option>
                                  <option value="L006">L006 Desgaste con ubicación equivocada</option>
                                  <option value="L007">L007 Ausencia de proceso (Definido en en la muestra)</option>
                                  <option value="L008">L008 raya de lavado</option>
                                  <option value="L009">L009 Manchas de grasa</option>
                                  <option value="L010">L010 Manchas de colorante</option>
                                  <option value="L011">L011 Manchas de hiploclorito</option>
                                  <option value="L012">L012 Rotos/picas ( no se detectan en confeccion pero se rompen en el lavado)</option>
                                  <option value="L013">L013 Rotos por rebabas en maquina </option>
                                  <option value="L014">L014 Rotos por saturacion de quimico</option>
                                  <option value="L015">L015 Lavado disparejo</option>
                                  <option value="L016">L016 Estrias ( tela mal almacenada, maquinas co sobrecargas)</option>
                                  <option value="L017">L017 Quemon por secadora</option>
                                  <option value="L018">L018 Insumos afectados por concentracion de quimicos</option>
                                  <option value="L019">L019 Medidas de la prenda incorrectas (tamaño de prenda conforme a la ficha tecnica)</option>
                                  <option value="L020">L020 Rotos inadecuados por motor tool fuerte o lija fuerte </option>
                                  <option value="L021">L021 Problemas de resistencia al desgarre en la tela </option>
                                  <option value="CL001">CL001 Exceso de Pegante</option>
                                  <option value="CL002">CL002 Medidas incorrectas según tabla</option>
                                  <option value="CL003">CL003 Asimetría de un zapato a otro</option>
                                  <option value="CL004">CL004 Hilos sueltos</option>
                                  <option value="CL005">CL005 Costuras abiertas/sueltas</option>
                                  <option value="CL006">CL006 Suela despegada</option>
                                  <option value="CL007">CL007 Suela deformada</option>
                                  <option value="CL008">CL008 Calzado no coincide con la muestra física</option>
                                  <option value="CL009">CL009 Marcado y etiquetado incorrecto </option>
                                  <option value="CL010">CL010 Despegados y/o Falta de pegante</option>
                                  <option value="CL011">CL011 Superficie con Manchas</option>
                                  <option value="CL012">CL012 Piezas partidas</option>
                                  <option value="CL013">CL013 Perforaciones</option>
                                  <option value="CL014">CL014 Suela pelada</option>
                                  <option value="CL015">CL015 Insumos y/o accesorios sueltos/despegados</option>
                                  <option value="CL016">CL016 Insumos y/o accesorios con óxido</option>
                                  <option value="CL017">CL017 Falta de Costura o descosido</option>
                                  <option value="CL018">CL018 Superficie pelada</option>
                                  <option value="CL019">CL019 Insumos y/o accesorios dañados</option>
                                  <option value="CL020">CL020 Terminación irregular</option>
                                  <option value="CL021">CL021 Mala solidez y/o Migra color en el textil</option>
                                  <option value="CL022">CL022 Cuero PU vencido</option>
                                  <option value="CL023">CL023 Superficie surcada (Rayada)</option>
                                  <option value="CL024">CL024 Capellada mal armada</option>
                                  <option value="CL025">CL025 Material con distinto color y textura </option>
                                  <option value="CL026">CL026 Etiqueta incorrecta/ despegada</option>
                                  <option value="CL027">CL027 Talla no corresponde entre el par</option>
                                  <option value="CL028">CL028 Talla no corresponde entre la medida</option>
                                  <option value="CL029">CL029 Presenta manchas y lama de humedad</option>
                                  <option value="CL030">CL030 Presenta rotos</option>
                                  <option value="CL031">CL031 Diferencia de tonalidad</option>
                                  <option value="CL032">CL032 Logos incorrectos (Tamaño, color, ubicación)</option>
                                  <option value="CL033">CL033 Puntillas internas</option>
                                  <option value="ACC001">ACC001 Medidas incorrectas</option>
                                  <option value="ACC002">ACC002 Material en mal estado</option>
                                  <option value="ACC003">ACC003 Cosidos o uniones mal pegadas</option>
                                  <option value="ACC004">ACC004 Hebillas, herrajes, taches en mal estado</option>
                                  <option value="ACC005">ACC005 Diseño diferente a la muestra fisica</option>
                                  <option value="ACC006">ACC006 Color diferente a la muestra fisica</option>
                                  <option value="ACC007">ACC007 Horma diferente a la muestra fisica</option>

                                </select>
                              </label>
                            </div>
                            <div>
                              <label className="titlesFormAuditoria" >Cantidad <span className='asterisco'>*</span><br /><input onChange={changeInputNoconformidades} type="text" name={`cantidad${i}`} id={`cantidadD${i}`} /></label>
                            </div>
                          </div>

                        </motion.div>
                      )
                    }
                  </AnimatePresence>
                </div>

                <div className="containerAddyRemove">
                  <div onClick={addNoconformidades} className="butonAddCampo" >Agregar campo</div>
                  <div onClick={removeNoConformidades} className="butonRemoveCampo" >Eliminar campo</div>
                </div>

                {
                  input.segundas !== '' &&
                  <div className="containerTwoInputsAudit">
                    <div>
                      <label className="titlesFormAuditoria" >Segundas Total</label> <br /> <p>{input.segundas}</p>
                    </div>
                  </div>
                }



                <h2 className="titlePrimarioAuditoria">Faltantes</h2>
                <div className="c-AllFaltantes">
                  <AnimatePresence>
                    {
                      countFaltantes.length > 0 && countFaltantes.map((e, i) =>
                        <motion.div initial='hidden' animate='show' exit='hidden' variants={variantsNoconformidadesFaltantes} key={i} className="containerTwoInputsAudit">
                          <div className="inputIzquierdo">
                            <label className="titlesFormAuditoria" >Talla <span className='asterisco'>*</span><br />
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
                                <option value="XL">XL</option>
                              </select>
                            </label>
                          </div>
                          <div>
                            <label className="titlesFormAuditoria" >Cantidad <span className='asterisco'>*</span><br /> <input id={`cantidadF${i}`} name={`cantidad${i}`} onChange={changeInputFaltantes} type="text" /></label>
                          </div>
                        </motion.div>
                      )
                    }
                  </AnimatePresence>
                </div>
                <div className="containerAddyRemove">
                  <div onClick={addFaltantes} className="butonAddCampo" >Agregar campo</div>
                  <div onClick={removeFaltantes} className="butonRemoveCampo" >Eliminar campo</div>
                </div>

                {
                  input.faltantesTotal !== '' &&
                  <div className="containerTwoInputsAudit">
                    <div>
                      <label className="titlesFormAuditoria" >Faltantes Total</label> <br /> <p>{input.faltantesTotal}</p>
                    </div>
                  </div>
                }
                {
                  input.primeras !== "" &&
                  <div >
                    <div className="titlesFormAuditoria" >
                      <label >Primeras Total: </label>
                    </div >
                    <div>{input.primeras}</div>
                  </div>
                }

                <h2 className="titlePrimarioAuditoria">Medidas</h2>
                <div className="containerAddyRemove">
                  <div onClick={addMedidasSuperiores} className="butonAddCampo" >Agregar Medidas Superior</div>
                  <div onClick={addMedidasInfeiores} className="butonAddCampo" >Agregar Medida Inferior</div>
                  <div onClick={removeMedidas} className="butonRemoveCampo" >Eliminar campo</div>
                </div>
                <div className="c-medidasSuperiores">
                  <AnimatePresence>
                    {
                      countMedidas.superior.length > 0 && countMedidas.superior.map((e, i) =>
                        <motion.div initial='hidden' animate='show' exit='hidden' variants={variantsFormMedidas} key={i}>

                          <p className="titlesFormAuditoria">Medidas Superiores</p>
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

                        </motion.div>

                      )
                    }
                  </AnimatePresence>
                </div>

                <div className="c-medidasInferiores">
                  <AnimatePresence>

                    {
                      countMedidas.inferior.length > 0 && countMedidas.inferior.map((e, i) =>
                        <motion.div initial='hidden' animate='show' exit='hidden' variants={variantsFormMedidas} key={i}>

                          <p className="titlesFormAuditoria">Medidas Inferiores</p>
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


                        </motion.div>
                      )
                    }
                  </AnimatePresence>
                </div>


                <h2 className="titlePrimarioAuditoria">Cobros</h2>
                <div className="containerTwoInputsAudit">
                  <div className="inputIzquierdo">
                    <label className="titlesFormAuditoria" >Descripcion  <br /> <input onChange={changeInput} type="text" name="descripcion_cobros" id="descripcion_cobros" /></label>
                  </div>
                  <div className="inputIzquierdo">
                    <label className="titlesFormAuditoria" >Cantidad  <br /> <input onChange={changeInput} type="text" name="cantidad_cobros" id="cantidad_cobros" /></label>
                  </div>
                  <div>
                    <label className="titlesFormAuditoria" >Valor  <br /> <input onChange={changeInput} type="text" name="valor_cobros" id="valor_cobros" placeholder="$" /></label>
                    {
                      input.cobros.valor_cobros !== '' && <p className='helps'>{new Intl.NumberFormat().format(input.cobros.valor_cobros)}$</p>
                    }
                  </div>
                </div>

                <div className={activeButon ? "buttonAuditoria" : "buttonAuditoriaNoActive"} onClick={submitAuditoria}>Agregar Auditoria</div>

              </form>
            </div>
          </motion.div>
        }
      </AnimatePresence>
      {
        confirmAddAuditoria !== '' && <motion.div animate='show' initial='hidden' variants={variantsConfirmAddAuditoria} className="confirmAddauditoria">{confirmAddAuditoria}</motion.div>
      }
    </div>
  )
}

export default FormAuditoria
