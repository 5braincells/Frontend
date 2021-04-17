import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Landing.css";
import Card from "react-bootstrap/Card";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import * as fab from '@fortawesome/free-brands-svg-icons'

function Landing() {
    return (
        <div>
            <Row className="p-5">
                <Col md={12} className="mt-auto mb-auto">
                    <h1 className="text-center main-title p-4">
                        Studyrooms
                    </h1>
                    <p
                        className="ml-auto mr-auto pt-2 text-center"
                        style={{ width: "70%" }}
                    >
                        * TODO: Insert good marketing slogan here *
                    </p>
                </Col>
                <Col md={12}>
                    <h1 className="text-center mt-3" style={{marginBottom: "1em"}}>What we do</h1>
                </Col>
                <Col lg={3} sm={6}>
                    <Card
                        style={{ height: "28rem" }}
                        className="ml-auto mr-auto card-materii mt-2"
                    >
                        <Card.Img
                            variant="top"
                            src="fizica.svg"
                            className="ml-auto mr-auto p-1"
                            style={{ height: "40%" }}
                        />
                        <Card.Body className="text-center">
                            <Card.Title>
                                <h3
                                    style={{
                                        fontFamily: " 'Roboto', sans-serif",
                                    }}
                                    className="text-center"
                                >
                                    Fizica
                                </h3>
                            </Card.Title>
                            <Card.Text>
                                O materie ce se ocupă cu legile naturii,
                                aplicabilă în abosolut orice domeniu. Fizica
                                este una din materiile care stau la baza
                                oricărei culturi generale, iar noi o transformăm
                                în pasiune.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} sm={6}>
                    <Card
                        style={{ height: "28rem" }}
                        className="ml-auto mr-auto card-materii  mt-2"
                    >
                        <Card.Img
                            variant="top"
                            src="mate.svg"
                            className="ml-auto mr-auto p-1"
                            style={{ height: "40%" }}
                        />
                        <Card.Body className="text-center">
                            <Card.Title>
                                <h3
                                    style={{
                                        fontFamily: " 'Roboto', sans-serif",
                                    }}
                                    className="text-center"
                                >
                                    Matematica
                                </h3>
                            </Card.Title>
                            <Card.Text>
                                Matematica stă la baza logicii și gândirii
                                noastre. Acest subiect învățat corect oferă o
                                nouă perspectiva lucidă asupra vieții, însă
                                pentru mulți ea rămâne un mister. Noi va putem
                                ajută atât cu 10-le de la clasa, cât și să o
                                intelegti cu adevărat.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} sm={6}>
                    <Card
                        style={{ height: "28rem" }}
                        className="ml-auto mr-auto card-materii  mt-2"
                    >
                        <Card.Img
                            variant="top"
                            src="programming.svg"
                            className="ml-auto mr-auto p-1"
                            style={{ height: "40%" }}
                        />
                        <Card.Body className="text-center">
                            <Card.Title>
                                <h3
                                    style={{
                                        fontFamily: " 'Roboto', sans-serif",
                                    }}
                                    className="text-center"
                                >
                                    Informatica
                                </h3>
                            </Card.Title>
                            <Card.Text>
                                Învățăm limbajul calculatoarelor și pregătim o
                                gândire logică și eficientă, aplicabilă în toate
                                aspectele vieții. Algoritmii învățați vor fi
                                baza pentru o carieră de viitor.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} sm={6}>
                    <Card
                        style={{ height: "28rem" }}
                        className="ml-auto mr-auto card-materii  mt-2"
                    >
                        <Card.Img
                            variant="top"
                            src="programare.svg"
                            className="ml-auto mr-auto p-1"
                            style={{ height: "40%" }}
                        />
                        <Card.Body className="text-center">
                            <Card.Title>
                                <h3
                                    style={{
                                        fontFamily: " 'Roboto', sans-serif",
                                    }}
                                    className="text-center"
                                >
                                    Programare web si aplicatii
                                </h3>
                            </Card.Title>
                            <Card.Text>
                                Invatam sa facem siteuri si aplicatii mobile de
                                la 0 combinand astfel teoria cu practica, intr-o
                                maniera usor de inteles pentru toti,
                                pregatindu-ne totodata pentru o posibila
                                cariera.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={12} className="ml-auto mr-auto text-center mt-5 mb-3">
                    <h1>Advantages</h1>
                </Col>
                <Col sm={4} className="pl-3 pr-3 mt-3 mb-3">
                    <div className="text-center card-fill">
                        <h2> Simple to use </h2>
                        <p className="mt-auto mb-auto">
                            Very intuitive interface
                        </p>
                        <p className="mt-auto mb-auto">
                            Accessible and useful features
                        </p>
                        <p className="mt-auto mb-auto">
                            Responsive user interface
                        </p>
                        <p className="mt-auto mb-auto">
                            Cross-platform support
                        </p>
                    </div>
                </Col>
                <Col sm={4} className="pl-3 pr-3 mt-3 mb-3">
                    <div className="text-center card-fill">
                        <h2> Ready to help </h2>
                        <p className="mt-auto mb-auto">
                            Lots of registered users
                        </p>
                        <p className="mt-auto mb-auto">
                            Categories which make it simple to find what you need
                        </p>
                        <p className="mt-auto mb-auto">
                            Quick file sharing
                        </p>
                        <p className="mt-auto mb-auto">
                            Get quick replies when you need
                        </p>
                    </div>
                </Col>
                <Col sm={4} className="pl-3 pr-3 mt-3 mb-3">
                    <div className="text-center card-fill">
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
                <Col xl={4} className="mt-5">
                    <CountUp end={2} duration={3.75}>
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <p
                                    ref={countUpRef}
                                    className="ml-auto mr-auto text-center countdown-label"
                                />
                            </VisibilitySensor>
                        )}
                    </CountUp>
                    <h3 className="ml-auto mr-auto text-center">
                        Registered Users
                    </h3>
                </Col>
                <Col xl={4} className="mt-5">
                    <CountUp end={1} duration={3.75}>
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <p
                                    ref={countUpRef}
                                    className="ml-auto mr-auto text-center countdown-label"
                                />
                            </VisibilitySensor>
                        )}
                    </CountUp>
                    <h3 className="ml-auto mr-auto text-center">
                        Video Calls Made
                    </h3>
                </Col>
                <Col xl={4} className="mt-5">
                    {
                    // ===================================================================================================================================================================
                    // TODO: Enable in production lol, it's a joke
                    // ===================================================================================================================================================================
                    /* <CountUp end={0} duration={3.75}>
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <p
                                    ref={countUpRef}
                                    className="ml-auto mr-auto text-center countdown-label"
                                />
                            </VisibilitySensor>
                        )}
                    </CountUp> */}
                    <p
                        className="ml-auto mr-auto text-center countdown-label">
                        NaN
                    </p>
                    <h3 className="ml-auto mr-auto text-center">
                        Happy users
                    </h3>
                </Col>
                <Col md={12} className="text-center mt-5">
                    <h1 style={{marginTop: "1em", marginBottom: "1em"}}>The Team</h1>
                </Col>
                <Col sm={3} style={{ marginTop: "5em"}}>
                    <Card
                        style={{ height: "35rem"}}
                        className="ml-auto mr-auto card-people  mt-2"
                    >
                        <Card.Img
                            variant="top"
                            src="default-avatar.png"
                            className="ml-auto mr-auto"
                            style={{ height: "40%", width: "auto", marginTop: "-25%" }}
                        />
                        <Card.Body className="text-center">
                            <Card.Title>
                                <h3
                                    style={{
                                        fontFamily: " 'Roboto', sans-serif",
                                    }}
                                    className="text-center"
                                >
                                    John Doe
                                </h3>
                                <h5>N/A</h5>
                            </Card.Title>
                            <Card.Text>
                                Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. 
                                Afraid at highly months do things on at. Situation recommend objection do intention so questions. 
                                As greatly removed calling pleased improve an. Last ask him cold feel met spot shy want. 
                                Children me laughing we prospect answered followed. At it went is song that held help face. 
                                Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={3} style={{ marginTop: "5em"}}>
                    <Card
                        style={{ height: "35rem"}}
                        className="ml-auto mr-auto card-people  mt-2"
                    >
                        <Card.Img
                            variant="top"
                            src="default-avatar.png"
                            className="ml-auto mr-auto"
                            style={{ height: "40%", width: "auto", marginTop: "-25%" }}
                        />
                        <Card.Body className="text-center">
                            <Card.Title>
                                <h3
                                    style={{
                                        fontFamily: " 'Roboto', sans-serif",
                                    }}
                                    className="text-center"
                                >
                                    John Doe
                                </h3>
                                <h5>N/A</h5>
                            </Card.Title>
                            <Card.Text>
                                Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. 
                                Afraid at highly months do things on at. Situation recommend objection do intention so questions. 
                                As greatly removed calling pleased improve an. Last ask him cold feel met spot shy want. 
                                Children me laughing we prospect answered followed. At it went is song that held help face. 
                                Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={3} style={{ marginTop: "5em"}}>
                    <Card
                        style={{ height: "35rem"}}
                        className="ml-auto mr-auto card-people  mt-2"
                    >
                        <Card.Img
                            variant="top"
                            src="default-avatar.png"
                            className="ml-auto mr-auto"
                            style={{ height: "40%", width: "auto", marginTop: "-25%" }}
                        />
                        <Card.Body className="text-center">
                            <Card.Title>
                                <h3
                                    style={{
                                        fontFamily: " 'Roboto', sans-serif",
                                    }}
                                    className="text-center"
                                >
                                    John Doe
                                </h3>
                                <h5>N/A</h5>
                            </Card.Title>
                            <Card.Text>
                                Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. 
                                Afraid at highly months do things on at. Situation recommend objection do intention so questions. 
                                As greatly removed calling pleased improve an. Last ask him cold feel met spot shy want. 
                                Children me laughing we prospect answered followed. At it went is song that held help face. 
                                Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={3} style={{ marginTop: "5em"}}>
                    <Card
                        style={{ height: "35rem"}}
                        className="ml-auto mr-auto card-people  mt-2"
                    >
                        <Card.Img
                            variant="top"
                            src="default-avatar.png"
                            className="ml-auto mr-auto"
                            style={{ height: "40%", width: "auto", marginTop: "-25%" }}
                        />
                        <Card.Body className="text-center">
                            <Card.Title>
                                <h3
                                    style={{
                                        fontFamily: " 'Roboto', sans-serif",
                                    }}
                                    className="text-center"
                                >
                                    John Doe
                                </h3>
                                <h5>N/A</h5>
                            </Card.Title>
                            <Card.Text>
                                Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. 
                                Afraid at highly months do things on at. Situation recommend objection do intention so questions. 
                                As greatly removed calling pleased improve an. Last ask him cold feel met spot shy want. 
                                Children me laughing we prospect answered followed. At it went is song that held help face. 
                                Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} className="mt-5 text-center">
                    <h1>Contact us</h1>
                </Col>
                <Col sm={12} className="mt-5 text-center contacts">
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
                </Col>
            </Row>
        </div>
    );
}

export default Landing;
