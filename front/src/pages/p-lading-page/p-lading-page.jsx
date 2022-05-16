import { useState } from 'react'

import { motion } from 'framer-motion'

import './p-lading-page.css'

import LoginAdmin from '../../componentes/c-login-admin/c-login-admin'
import LoginAuditoria from '../../componentes/c-login-auditoria/c-login-auditoria'
import LoginConfeccionista from '../../componentes/c-login-confeccionista/c-login-confeccionista'
import LoginCedi from '../../componentes/c-login-cedi/c-login-cedi'


const variantsH1 = {
  hidden: {
    scale: 0
  },
  show: {
    scale: 1,
    transition: {
      duration: 5,
      ease: 'easeInOut',
      stiffness: 100,
      damping:10,
      type: 'spring',
    }
  }
}

const variantSubtitles = {
  hidden: {
    scale: 0
  },
  show:i=> ({
    scale: 1,
    transition: {
      type: 'spring',
      delay: i * 0.2
    },
  }),
  hover:{
    scale:1.1,
    transition:{
      duration:0.1
    },
  },
  tap:{
    scale:0.9,
  
  }
}


const LadingPage = () => {

  const [activeLoginAdmin, setActiveLoginAdmin] = useState(false)
  const [activeLoginAuditoria, setActiveLoginAuditoria] = useState(false)
  const [activeLoginConfe, setActiveLoginConfe] = useState(false)
  const [activeLoginCedi, setActiveLoginCedi] = useState(false)

  const activarLoginAdmin = () => {
    setActiveLoginAdmin(!activeLoginAdmin)
    setActiveLoginAuditoria(false)
    setActiveLoginConfe(false)
    setActiveLoginCedi(false)
    if (window.localStorage.getItem('accessTokenAdmin')) {
      window.location.href = '/home-admin'
    }

  }

  const activarLoginAuditoria = () => {
    setActiveLoginAuditoria(!activeLoginAuditoria)
    setActiveLoginAdmin(false)
    setActiveLoginConfe(false)
    setActiveLoginCedi(false)
    if (window.localStorage.getItem('accessTokenAuditoria')) {
      window.location.href = '/home-auditoria'
    }

  }
  const activarLoginConfe = () => {
    setActiveLoginConfe(!activeLoginConfe)
    setActiveLoginAuditoria(false)
    setActiveLoginAdmin(false)
    setActiveLoginCedi(false)
    if (window.localStorage.getItem('accessTokenConfeccionista')) {
      window.location.href = '/home-confeccionista'
    }
  }

  const activarLoginCedi = () => {
    setActiveLoginCedi(!activeLoginCedi)
    setActiveLoginAuditoria(false)
    setActiveLoginAdmin(false)
    setActiveLoginConfe(false)
    if(window.localStorage.getItem('accessTokenCedi')){
      window.location.href= '/home-cedi'
    }

  }


  return (
    <div>
      <div className='c-ladingPage'>
        <motion.h1 initial='hidden' animate='show' variants={variantsH1} >Control de Lotes Karibik</motion.h1>

        <div className='c-sections'>
          <div className='c-mayorSection'>
            <motion.div whileTap='tap' whileHover='hover' custom={1} onClick={activarLoginAdmin} initial='hidden' animate='show' variants={variantSubtitles} className="c-section">
              <h4>Administracion</h4>
            </motion.div>

            <LoginAdmin active={activeLoginAdmin} />
          </div>

          <div className='c-mayorSection'>
            <motion.div whileTap='tap' whileHover='hover' custom={2} onClick={activarLoginAuditoria} initial='hidden' animate='show' delay={0.2} variants={variantSubtitles} className="c-section">
              <h4>Auditoria</h4>
            </motion.div>
            <LoginAuditoria active={activeLoginAuditoria} />
          </div>

          <div className='c-mayorSection'>
            <motion.div whileTap='tap' whileHover='hover' custom={3} onClick={activarLoginConfe} initial='hidden' animate='show' delay={0.2} variants={variantSubtitles} className="c-section">
              <h4>Confeccionista</h4>
            </motion.div>
            <LoginConfeccionista active={activeLoginConfe} />
          </div>

          <div className='c-mayorSection'>
            <motion.div whileTap='tap' whileHover='hover' custom={4} onClick={activarLoginCedi} initial='hidden' animate='show' delay={0.2} variants={variantSubtitles} className="c-section">
              <h4>CEDI</h4>
            </motion.div>
            <LoginCedi active={activeLoginCedi} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default LadingPage
