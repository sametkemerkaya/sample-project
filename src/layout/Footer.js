import { Container, Nav, NavItem, NavLink} from 'reactstrap';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';


import { withTranslation } from 'react-i18next';
 
class Footer extends Component {
    constructor (props) {
        super(props)
        this.state={}
    }
    
    render() {
        const { t } = this.props;
        return (
            <footer>
                <Container>
                    <div className="d-flex">
                        <div className="logo-container"><img src={ logo } className="App-logo" alt="logo" /></div>

                        <Nav className="ml-auto align-items-center">
                            <NavItem>
                                <Link to="/" className="nav-link">{ t('Menu.Home') }</Link>
                            </NavItem>

                            <NavItem>
                                <Link to="/about/" className="nav-link">{ t('Menu.About') }</Link>
                            </NavItem>

                            <NavItem>
                                <Link to="/contact/" className="nav-link">{ t('Menu.Contact') }</Link>
                            </NavItem>

                            <NavItem>
                                <Link to="/abcde/" className="nav-link">{ t('Menu.PageNotFount') }</Link>
                            </NavItem>
                        </Nav>
                    </div>
                </Container>
            </footer>

        )
    }
}
 
export default withTranslation()(Footer)
