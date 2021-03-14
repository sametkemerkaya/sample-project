import { Container } from 'reactstrap';
import notFoundIcon from '../assets/img/404-not-found.svg'
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class Page404 extends Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    render() {
        const { t } = this.props;
        return (
            <section>
                <Container>
                    <div className="row text-center">
                        <div className="col not-found">
                            <img src={ notFoundIcon } alt={ t('PageNotFound.Title') } />
                            <h3>{ t('PageNotFound.Title') }</h3>
                        </div>
                    </div>
                </Container>
            </section>
        )
    }
}
export default withTranslation()(Page404)
