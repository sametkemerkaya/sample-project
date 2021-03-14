import { Button, NavItem, Modal, ModalHeader, ModalBody, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Label, Input } from 'reactstrap';
import NotificationAlert from "react-notification-alert";
import { toJS } from "mobx";
import Global from "../helper/Global";
import MainStore from '../store/MainStore';
import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';

class Login extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isLogin: toJS(MainStore.isLogin),
            modal: false,
            dummyVariable: {
                name: "Samet Kemerkaya",
                email: "demo@example.com",
                password: "abc123"
            },
            userForm: {
                name: "Samet Kemerkaya",
                email: "demo@example.com",
                password: "abc123",
                language: "en"
            }
        }
    }


    FormChange = (e) => {
        let userFormObj = this.state.userForm;
        userFormObj[e.target.name] = e.target.value;
        this.setState({ userForm: userFormObj });
    };

    LoginControl = (e) => {

        e.preventDefault();
        const { t } = this.props;
        let user = this.state.dummyVariable;
        let userForm = this.state.userForm;

        if (user.name !== userForm.name) {
            this.notify("tr", "danger", t('Contact.Form.ErrNameText'));
        }
        else if (user.email !== userForm.email) {
            this.notify("tr", "danger", t('Contact.Form.ErrEmailText'));
        }
        else if (user.password !== userForm.password) {
            this.notify("tr", "danger", t('Contact.Form.ErrPassText'));
        }
        else {
            Global.Login(userForm, this.loginOk)
        }
    }

    loginOk = () => {
        const { t } = this.props;
        let Msg = t('General.LoginMessage') + " " + this.state.dummyVariable.name
        this.notify("tr", "success", Msg)
        this.setState({ isLogin: true })
        this.modalToggle()
    }


    LogoutSubmit = (e) => {

        e.preventDefault();
        Global.Logout(this.logoutOk)

    }

    logoutOk = () => {
        const { t } = this.props;
        let Msg = t('General.LogoutMessage') + " " + this.state.dummyVariable.name
        this.notify("tr", "success", Msg)
        this.setState({ isLogin: false })
    }

    modalToggle = () => {
        this.setState(
            {
                modal: !this.state.modal,
                userForm: {
                    name: this.state.dummyVariable.name,
                    email: this.state.dummyVariable.email,
                    password: this.state.dummyVariable.password, 
                }
            }
        )  
    };

    render() {
        const { t } = this.props;
        let State = this.state;

        return (
            <>
                {toJS(State.isLogin) &&
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret> { State.dummyVariable.name } </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem><i className="fad fa-user"></i> { State.dummyVariable.email } </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={ this.LogoutSubmit }> <i className="fad fa-sign-out-alt"></i> { t('Menu.Logout') } </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                }

                {!toJS(State.isLogin) &&
                    <NavItem>
                        <Button onClick={ this.modalToggle } className="btn-login"><i className="fad fa-sign-in-alt"></i> { t('Menu.Login') }</Button>
                    </NavItem>
                }
                <Modal isOpen={ State.modal } toggle={ this.modalToggle } centered={ true }>
                    <div className="p-3">

                        <ModalHeader toggle={ this.modalToggle }> { t('Menu.Login') }</ModalHeader>

                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="name">{ t('Contact.Form.Name') } - { State.userForm.name }</Label>
                                    <Input type="text" name="name" id="name" value={ State.userForm.name } onChange={ this.FormChange } />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="email">{ t('Contact.Form.Email') } - { State.userForm.email }</Label>
                                    <Input type="email" name="email" id="email" value={ State.userForm.email } onChange={ this.FormChange } />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="password">{ t('Contact.Form.Password') } - { State.userForm.password }</Label>
                                    <Input type="password" name="password" id="password" value={ State.userForm.password } onChange={ this.FormChange } />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="language">{ t('Contact.Form.Lanquage') }</Label>
                                    <Input type="select" name="language" id="languageUser" onChange={ this.FormChange } >
                                        <option value="tr">Tr</option>
                                        <option value="en">En</option>
                                        <option value="es">Es</option>
                                    </Input>
                                </FormGroup>

                                <div className="text-center">
                                    <Button onClick={ this.LoginControl }>{ t('Contact.Form.Button') }</Button>
                                </div>

                            </Form>
                        </ModalBody>
                    </div>
                </Modal>

                <div className="react-notification-alert-container">
                    <NotificationAlert ref="notificationAlert" />
                </div>

            </>
        )
    }

    notify = (position, messageType, message) => {
        var type = messageType;
        var icon;
        switch (type) {
            case "primary":
                icon = "fad fa-quote-left";
                break;
            case "success":
                icon = "fad fa-shield-check";
                break;
            case "danger":
                icon = "fad fa-engine-warning";
                break;
            case "warning":
                icon = "fad fa-exclamation-square";
                break;
            case "info":
                icon = "fad fa-info-square";
                break;
            default:
                break;
        }
        var options;;
        options = {
            place: position,
            message: (
                <div>
                    { message }
                </div>
            ),
            type: messageType,
            icon: icon,
            closeButton: false,
            autoDismiss: 1
        };
        this.refs.notificationAlert.notificationAlert(options);
    };

}
export default withTranslation()(Login);