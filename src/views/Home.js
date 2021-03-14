import React, { Component } from 'react'
import { Container } from 'reactstrap';
import { withTranslation } from 'react-i18next';
 

class Home extends Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    render() {
        const { t } = this.props;
        return (
            <section>
                <Container>

                    <h1>{ t('Home.H1') }</h1> 

                    <div className="text-block">
                        <h2>{ t('Home.H2') }</h2>
                        { t('Home.H2Text') }
                    </div>

                    <div className="text-block">
                        <h3>{ t('Home.H3') }</h3>
                        { t('Home.H3Text') }
                    </div>

                    <div className="text-block">
                        <h4>{ t('Home.H4') }</h4>
                        { t('Home.H4Text') }
                    </div>
                    
                    <div className="text-block">
                        <h5>{ t('Home.H5') }</h5>
                        { t('Home.H5Text') }
                    </div>

                </Container>
            </section>
        )
    }
}
export default withTranslation()(Home)
 