import { Container, Collapse, Navbar, NavbarToggler, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import MainStore from '../store/MainStore';
import Global from '../helper/Global';
import React, { Component} from 'react'; 
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import logo from '../logo.svg';

import { withTranslation } from 'react-i18next';
 

class Header extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isOpen: false,
            toggle: false, 
        }
        }
    
    toggle = () => this.setState({ isOpen: !this.state.isOpen});
     
    render() {
   
        const { t } = this.props;

        return (
            <header>
                <Navbar color="light" light expand="md" className={ this.state.isOpen ? "mobile-open" : "mobile-close" }>
                    <Container> 
                            <Link to="/" className="navbar-brand"><img src={ logo } className="App-logo" alt="logo" /></Link> 

                        <NavbarToggler onClick={ this.toggle } className={ this.state.isOpen ? "open" : "close" } />

                        <Collapse isOpen={ this.state.isOpen } navbar>


                            <Nav className="ml-auto align-items-center" navbar>

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


                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>{ MainStore.currentLanguage }</DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem onClick={ () => Global.ChangeLang('tr') }>Tr</DropdownItem>
                                        <DropdownItem onClick={ () => Global.ChangeLang('en') }>En</DropdownItem>
                                        <DropdownItem onClick={ () => Global.ChangeLang('es') }>Es</DropdownItem> 
                                    </DropdownMenu>
                                </UncontrolledDropdown>

                                <Login />
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>

            </header>

        )
    }
}
export default withTranslation()(Header);
 
