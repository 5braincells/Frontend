import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Landing.css'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import * as fab from '@fortawesome/free-brands-svg-icons'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

function Landing() {
  const jwt = useSelector(state => state?.jwt?.jwt)

  const history = useHistory();

  const gotoCategories = e => {
    history.push('/categories')
  }

  const gotoRegister = e => {
    history.push('/register')
  }

  return (
    <div className='page-scroll-container'>
      <div className='page-content'>
        <div>
          <h1 className="title-main">
            Studyrooms
          </h1>
          <p className="title-slogan">
            * TODO: Insert good marketing slogan here *
          </p>
        </div>

        {jwt ? (
          <Row className='justify-content-center'>
            <Col md={12} lg={7} className='text-center-w1000'>
              <h2 className='text-act-now'>You're already logged in, you might want to go to the Categories.</h2>
            </Col>
            <Col md={12} lg={1} className='text-center'>
              <button className='button button-green button-act-now' onClick={gotoCategories}>
                Categories
              </button>
            </Col>
          </Row>
        ) : ''}
        
        <h1 className="heading">What we do</h1>
        <Row>
          <Col sm={6} lg={3}>
            <div className="card card-people">
              <div>
                <img className="user-img" src="default-avatar.png" alt=""/>
              </div>
              <div>
                <h3>John Doe</h3>
                <h5>Dummy</h5>
              </div>
              <div>
                Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. 
                Children me laughing we prospect answered followed. At it went is song that held help face. 
                Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address.
              </div>
              <div className="bottom"></div>
            </div>
          </Col>
          <Col sm={6} lg={3}>
            <div className="card card-people">
              <div>
                <img className="user-img" src="default-avatar.png" alt=""/>
              </div>
              <div>
                <h3>John Doe</h3>
                <h5>Dummy</h5>
              </div>
              <div>
                Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. 
                Children me laughing we prospect answered followed. At it went is song that held help face. 
                Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address.
              </div>
              <div className="bottom"></div>
            </div>
          </Col>
          <Col sm={6} lg={3}>
            <div className="card card-people">
              <div>
                <img className="user-img" src="default-avatar.png" alt=""/>
              </div>
              <div>
                <h3>John Doe</h3>
                <h5>Dummy</h5>
              </div>
              <div>
                Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. 
                Children me laughing we prospect answered followed. At it went is song that held help face. 
                Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address.
              </div>
              <div className="bottom"></div>
            </div>
          </Col>
          <Col sm={6} lg={3}>
            <div className="card card-people">
              <div>
                <img className="user-img" src="default-avatar.png" alt=""/>
              </div>
              <div>
                <h3>John Doe</h3>
                <h5>Dummy</h5>
              </div>
              <div>
                Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. 
                Children me laughing we prospect answered followed. At it went is song that held help face. 
                Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address.
              </div>
              <div className="bottom"></div>
            </div>
          </Col>
        </Row>
        
        <h1 className="heading">Features</h1>
        <Row>
          <Col sm={4}>
            <div className='card-fill'>
              <h2> Great for any student </h2>
              <p className="mt-auto mb-auto">
                We offer help for all high school students
              </p>
              <p className="mt-auto mb-auto">
                Users get categorized so they don't mix up
              </p>
              <p className="mt-auto mb-auto">
                Blah blah blah
              </p>
              <p className="mt-auto mb-auto">
                Another advantage idk ¯\_(ツ)_/¯
              </p>
            </div>
          </Col>
          <Col sm={4}>
            <div className='card-fill'>
              <h2> Great for any student </h2>
              <p className="mt-auto mb-auto">
                We offer help for all high school students
              </p>
              <p className="mt-auto mb-auto">
                Users get categorized so they don't mix up
              </p>
              <p className="mt-auto mb-auto">
                Blah blah blah
              </p>
              <p className="mt-auto mb-auto">
                Another advantage idk ¯\_(ツ)_/¯
              </p>
            </div>
          </Col>
          <Col sm={4}>
            <div className='card-fill'>
              <h2> Great for any student </h2>
              <p className="mt-auto mb-auto">
                We offer help for all high school students
              </p>
              <p className="mt-auto mb-auto">
                Users get categorized so they don't mix up
              </p>
              <p className="mt-auto mb-auto">
                Blah blah blah
              </p>
              <p className="mt-auto mb-auto">
                Another advantage idk ¯\_(ツ)_/¯
              </p>
            </div>
          </Col>
        </Row>
        
        <Row className='justify-content-center'>
          <Col md={4} className="mt-5">
            <CountUp end={2} duration={3.75}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <p ref={countUpRef} className="ml-auto mr-auto text-center countdown-label" />
                </VisibilitySensor>
              )}
            </CountUp>
            <h3 className="ml-auto mr-auto text-center">
              Registered Users
            </h3>
          </Col>
          <Col md={4} className="mt-5">
            <CountUp end={2} duration={3.75}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <p ref={countUpRef} className="ml-auto mr-auto text-center countdown-label" />
                </VisibilitySensor>
              )}
            </CountUp>
            <h3 className="ml-auto mr-auto text-center">
              Total Messages Sent
            </h3>
          </Col>
        </Row>

        <h1 className="heading">The Team</h1>
        <Row className='justify-content-center'>
          <Col sm={6} md={4}>
            <div className="card card-people">
              <div>
                <img className="user-img" src="default-avatar.png" alt=""/>
              </div>
              <div>
                <h3>John Doe</h3>
                <h5>Dummy</h5>
              </div>
              <div>
                Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. 
                Children me laughing we prospect answered followed. At it went is song that held help face. 
                Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address.
              </div>
              <div className="bottom"></div>
            </div>
          </Col>
          <Col sm={6} md={4}>
            <div className="card card-people">
              <div>
                <img className="user-img" src="default-avatar.png" alt=""/>
              </div>
              <div>
                <h3>John Doe</h3>
                <h5>Dummy</h5>
              </div>
              <div>
                Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. 
                Children me laughing we prospect answered followed. At it went is song that held help face. 
                Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address.
              </div>
              <div className="bottom"></div>
            </div>
          </Col>
          <Col sm={6} md={4}>
            <div className="card card-people">
              <div>
                <img className="user-img" src="default-avatar.png" alt=""/>
              </div>
              <div>
                <h3>John Doe</h3>
                <h5>Dummy</h5>
              </div>
              <div>
                Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. 
                Children me laughing we prospect answered followed. At it went is song that held help face. 
                Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address.
              </div>
              <div className="bottom"></div>
            </div>
          </Col>
          <Col sm={6} md={4}>
            <div className="card card-people">
              <div>
                <img className="user-img" src="default-avatar.png" alt=""/>
              </div>
              <div>
                <h3>John Doe</h3>
                <h5>Dummy</h5>
              </div>
              <div>
                Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. 
                Children me laughing we prospect answered followed. At it went is song that held help face. 
                Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address.
              </div>
              <div className="bottom"></div>
            </div>
          </Col>
          <Col sm={6} md={4}>
            <div className="card card-people">
              <div>
                <img className="user-img" src="default-avatar.png" alt=""/>
              </div>
              <div>
                <h3>John Doe</h3>
                <h5>Dummy</h5>
              </div>
              <div>
                Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. 
                Children me laughing we prospect answered followed. At it went is song that held help face. 
                Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address.
              </div>
              <div className="bottom"></div>
            </div>
          </Col>
        </Row>

        {jwt ? '' : (
          <Row className='justify-content-center mt-4'>
            <Col md={12} lg={5}>
              <h2 className='text-act-now text-center'>So, what do you think? Join us today!</h2>
            </Col>
            <Col md={12} lg={1} className='text-center'>
              <button className='button button-green button-act-now' onClick={gotoRegister}>
                Register
              </button>
            </Col>
          </Row>
        )}

        <h1 className="heading">Contact us</h1>
        <div class="contacts">
            <a href="mailto:academy@gmail.com">
              <FontAwesomeIcon icon={fa.faEnvelope} />
              Mail Us
            </a>
            <a href="https://instagram.com">
              <FontAwesomeIcon icon={fab.faInstagram} />
              @studyrooms
            </a>
            <a href="https://facebook.com">
              <FontAwesomeIcon icon={fab.faFacebook} />
              @studyrooms
            </a>
          </div>
      </div>
    </div>
  )
}

export default Landing
