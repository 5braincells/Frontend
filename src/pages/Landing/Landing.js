import { useEffect, useState } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import axios from 'axios'

import './Landing.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import * as fab from '@fortawesome/free-brands-svg-icons'

function Landing() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const jwt = useSelector(state => state?.jwt?.jwt)
  const history = useHistory()

  const getData = async () => {
    try {
      await axios
        .get(process.env.REACT_APP_IP + '/generalData')
        .then(res => setData(res.data))
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const gotoCategories = e => {
    history.push('/categories')
  }

  const gotoRegister = e => {
    history.push('/register')
  }

  return (
    <div className='page-scroll-container'>
      {!isLoading ? (
        <div className='page-content'>
          <div>
            <h1 className='title-main'>Studyrooms</h1>
            <p className='title-slogan'>Hai pe Studyrooms!</p>
          </div>

          {jwt && (
            <div>
              <h4 className='text-act-now'>
                Ești deja conectat, poate dorești sa navighezi către Categorii.
              </h4>
              <div className='text-center'>
                <button
                  className='button button-green button-act-now'
                  onClick={gotoCategories}>
                  Categorii
                </button>
              </div>
            </div>
          )}

          <h1 className='heading'>Ce facem noi</h1>
          <Row>
            <Col sm={6} lg={3}>
              <div className='card card-people'>
                <div>
                  <img className='user-img' src='default-avatar.png' alt='' />
                </div>
                <div>
                  <h3>Conectăm elevii</h3>
                </div>
                <div>
                  Oferim un mediu sigur și primitor în care elevii se pot ajuta
                  reciproc.
                </div>
                <div className='bottom'></div>
              </div>
            </Col>
            <Col sm={6} lg={3}>
              <div className='card card-people'>
                <div>
                  <img className='user-img' src='default-avatar.png' alt='' />
                </div>
                <div>
                  <h3>Sporim performanțele</h3>
                </div>
                <div>
                  Prin intermediul platformei și al colaborării dintre elevi,
                  aceștia pot să-și îmbunătățească performanțele școlare.
                </div>
                <div className='bottom'></div>
              </div>
            </Col>
            <Col sm={6} lg={3}>
              <div className='card card-people'>
                <div>
                  <img className='user-img' src='default-avatar.png' alt='' />
                </div>
                <div>
                  <h3>Platformă națională</h3>
                </div>
                <div>
                  Indiferent de oraș sau liceu, elevii pot socializa fără
                  probleme.
                </div>
                <div className='bottom'></div>
              </div>
            </Col>
            <Col sm={6} lg={3}>
              <div className='card card-people'>
                <div>
                  <img className='user-img' src='default-avatar.png' alt='' />
                </div>
                <div>
                  <h3>Asigurăm confidențialitate</h3>
                </div>
                <div>
                  Prin intermediul tehinicilor moderne de securitate
                  cibernetică, asigurăm confidențialitatea totală pentru toți
                  utilizatorii platformei.
                </div>
                <div className='bottom'></div>
              </div>
            </Col>
          </Row>

          <h1 className='heading'>Feature-uri</h1>
          <Row>
            <Col sm={4}>
              <div className='card-fill'>
                <h2> Mesaje </h2>
                <p className='mt-auto mb-auto'>
                  Permitem utilizatorilor să trimită mesaje de tip text,
                  fișiere, gif-uri și poze.
                </p>
              </div>
            </Col>
            <Col sm={4}>
              <div className='card-fill'>
                <h2> Conferințe video </h2>
                <p className='mt-auto mb-auto'>
                  Elevii pot iniția conferințe video pentru o comunicare mai
                  interactivă și simplă.
                </p>
              </div>
            </Col>
            <Col sm={4}>
              <div className='card-fill'>
                <h2> Studyroom-uri custom </h2>
                <p className='mt-auto mb-auto'>
                  Oferim posibilitatea de a creea studyroom-uri custom pentru a
                  putea comunica cu un grup restrâns de persoane.
                </p>
              </div>
            </Col>
          </Row>

          <Row className='justify-content-center'>
            <Col md={4} className='mt-5'>
              <CountUp end={data.users} duration={3.75}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <p
                      ref={countUpRef}
                      className='ml-auto mr-auto text-center countdown-label'
                    />
                  </VisibilitySensor>
                )}
              </CountUp>
              <h3 className='ml-auto mr-auto text-center'>
                Utilizatori Înregistrați
              </h3>
            </Col>
            <Col md={4} className='mt-5'>
              <CountUp end={data.messages} duration={3.75}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <p
                      ref={countUpRef}
                      className='ml-auto mr-auto text-center countdown-label'
                    />
                  </VisibilitySensor>
                )}
              </CountUp>
              <h3 className='ml-auto mr-auto text-center'>
                Total Mesaje Trimise
              </h3>
            </Col>
          </Row>

          <h1 className='heading'>Echipa</h1>
          <Row className='justify-content-center'>
            <Col sm={6} md={4}>
              <div className='card card-people'>
                <div>
                  <img className='user-img' src='vlad.jpg' alt='Vlad' />
                </div>
                <div>
                  <h3>Vlad Cainamisir</h3>
                  <h5>Backend</h5>
                </div>
                <div>
                  Elev la Colegiul Național de Informatică “Tudor Vianu”
                  București
                </div>
                <div className='bottom'></div>
              </div>
            </Col>
            <Col sm={6} md={4}>
              <div className='card card-people'>
                <div>
                  <img className='user-img' src='default-avatar.png' alt='' />
                </div>
                <div>
                  <h3>Alex Mitreanu</h3>
                  <h5>Frontend</h5>
                </div>
                <div>
                  Elev la Liceul Teoretic de Inforamtică “Grigore Moisil” Iași
                </div>
                <div className='bottom'></div>
              </div>
            </Col>
            <Col sm={6} md={4}>
              <div className='card card-people'>
                <div>
                  <img className='user-img' src='radu.jpg' alt='' />
                </div>
                <div>
                  <h3>Radu Mîrzoca</h3>
                  <h5>UI/UX Designer</h5>
                </div>
                <div>
                  Elev la Liceul Teoretic de Inforamtică “Grigore Moisil”
                  Timișoara
                </div>
                <div className='bottom'></div>
              </div>
            </Col>
            <Col sm={6} md={4}>
              <div className='card card-people'>
                <div>
                  <img className='user-img' src='stefan.jpg' alt='' />
                </div>
                <div>
                  <h3>Ștefan Turcu</h3>
                  <h5>Mentor</h5>
                </div>
                <div>?</div>
                <div className='bottom'></div>
              </div>
            </Col>
          </Row>

          {!jwt && (
            <div>
              <h2 className='text-act-now'>
                Deci, ce crezi? Înregistrează-te astăzi!
              </h2>
              <div className='text-center'>
                <button
                  className='button button-green button-act-now'
                  onClick={gotoRegister}>
                  Înregistrează-te
                </button>
              </div>
            </div>
          )}

          <h1 className='heading'>Contactează-ne</h1>
          <div className='contacts'>
            <a href='mailto:academy@gmail.com'>
              <FontAwesomeIcon icon={fa.faEnvelope} />
              Trimite-ne un mail
            </a>
            <a href='https://instagram.com'>
              <FontAwesomeIcon icon={fab.faInstagram} />
              @studyrooms
            </a>
            <a href='https://facebook.com'>
              <FontAwesomeIcon icon={fab.faFacebook} />
              @studyrooms
            </a>
          </div>
        </div>
      ) : (
        <div className='loading-box'>
          <Spinner animation='border' />
        </div>
      )}
    </div>
  )
}

export default Landing
