import React, { Component } from 'react'
import { Container, Button } from 'reactstrap';
import DropdownList from 'react-widgets/lib/DropdownList';
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
import NotificationAlert from "react-notification-alert";
import Global from "../helper/Global";
import 'react-widgets/dist/css/react-widgets.css';

import CountyData from '../assets/countries.json';

import { withTranslation } from 'react-i18next';

class Contact extends Component {
    constructor (props) {
        super(props);
        this.state = {
            listStates: null,
            listCities: null,
            isCountry: false,
            isStates: false,
            selectedCountry: null, 
            selectedState: null,
            selectedCity: null,
        };
    }


    CountryList = () => {

        // Ülke listeme
        let country = [];
        CountyData.forEach(item => {
            country.push({
                "id": item.id,
                "name": item.name,
                "states": item.states.length
            });
        })

        return country;

    }

    setCountry = (e) => {

        // İkinci seçim ise, il ve ilçeleri kapatma
        if (this.state.isCountry !== false) {
            this.setState(
                {
                    isStates: false,
                    isCountry: false
                }
            )
        } else if (e.name) {

            this.setState(
                {
                    isStates: false,
                    selectedCountry: [e.name],
                    isCountry: e.states ? true : false
                },
                Global.Log("Country", e), // Seçilen ülke
                this.getStates(e)
            )
        }
    }

    getStates = (e) => {

        // Validasyon temizleme
        document.querySelector(".rw-widget-input").classList.remove("err") 
        document.querySelector(".county-invalid").style.display = "none"

        // İlleri listeleme
        let states = [];
        CountyData.forEach(statesFilter => {
            if (statesFilter.id === e.id) {
                states.push(statesFilter.states)
            }
        })

        this.setState({
            listStates: states[0] // İller listesi
        }
        )

    }

    getCities(e) { 
        // İlçeleri listeleme
        let cities = [];
        this.state.listStates.forEach(citiesFilter => {
            if (citiesFilter.id === e.id) {
                cities.push(citiesFilter.cities)
            }
        })

        this.setState({
            selectedState: e.name,
            listCities: cities[0],
            isStates: cities[0].length ? true : false
        })

    }

    setCities(e) {
        this.setState({ selectedCity: e.name })
    }


    contactFormSubmit = (event, errors, values) => {
        const { t } = this.props;

        if (!this.state.selectedCountry){ 
            document.querySelector(".rw-widget-input").classList.add("err") 
            document.querySelector(".county-invalid").style.display = "block"

        }else if (errors.length) {
            Global.Log("errors", errors)
        }
        else {

            document.querySelector(".rw-widget-input").classList.remove("err")
            document.querySelector(".county-invalid").style.display = "none"

            let formObject = [{
                "name": values.name,
                "email": values.email,
                "phone": values.telephone,
                "country": this.state.selectedCountry[0],
                "province": this.state.selectedState,
                "district": this.state.selectedCity,
                "message": values.message,
            }]

            Global.Log("İletişim Formu", formObject)
            this.notify("tr", "success", t('General.ConsoleLogForm'));
        }

    }



    render() {
        const { t } = this.props;
        return (
            <section>
                <Container>
                    <h1>{ t('Menu.Contact') }</h1>

                    <div className="text-block mb-4">
                        <h2>{ t('Home.H2') }</h2>
                        { t('Home.H2Text') }
                    </div>


                    <AvForm onSubmit={ this.contactFormSubmit } className="mb-5">
                        <AvField name="name"
                            label={ t('Contact.Form.Name') }
                            errorMessage={ t('Contact.Form.ErrNameText') }
                            placeholder={ t('Contact.Form.NameText') }
                            validate={ {
                                required: { value: true },
                                minLength: { value: 6 },
                                maxLength: { value: 16 }
                            } } required />

                        <AvField name="email"
                            label={ t('Contact.Form.Email') }
                            placeholder={ t('Contact.Form.EmailText') }
                            errorMessage={ t('Contact.Form.ErrEmailText') }
                            type="email" required />

                        <AvField name="telephone"
                            label={ t('Contact.Form.Phone') }
                            placeholder={ t('Contact.Form.PhoneText') }
                            errorMessage={ t('Contact.Form.ErrPhoneText') }
                            type="tel" required />

                        <div className="form-group">
                            <label htmlFor="country" className="">{ t('Contact.Form.Country') }</label>
                            <DropdownList
                                filter={ true }
                                data={ this.CountryList() }
                                value={ this.state.value }
                                textField="name"
                                defaultValue={ t('Contact.Form.SelectText') }
                                onChange={ e => this.setCountry(e) }
                                required />
                            <div className="invalid-feedback county-invalid" >{ t('Contact.Form.ErrCountry') }</div>
                        </div>

                        { this.state.isCountry &&
                            <div className="form-group">
                                <label htmlFor="state" className="">{ t('Contact.Form.Province') }</label>
                                <DropdownList
                                    filter={ true }
                                    data={ this.state.listStates }
                                    value={ this.state.value }
                                    defaultValue={ t('Contact.Form.SelectText') }
                                    textField="name"
                                    onChange={ e => this.getCities(e) }
                                />
                            </div>
                        }

                        { this.state.isStates &&
                            <div className="form-group">
                                <label htmlFor="cities" className="">{ t('Contact.Form.District') }</label>
                                <DropdownList
                                    filter={ true }
                                    data={ this.state.listCities }
                                    value={ this.state.value }
                                    defaultValue={ t('Contact.Form.SelectText') }
                                    onChange={ e => this.setCities(e) }
                                    textField="name"
                                />
                            </div>
                        }
                        <div className="form-group">
                            <label htmlFor="message" className="">{ t('Contact.Form.Mesaj') }</label>
                            <AvInput type="textarea" name="message" id="message" rows="6"
                                placeholder={ t('Contact.Form.MesajText') }
                                errorMessage={ t('Contact.Form.ErrMesajText') }
                                validate={ {
                                    required: { value: true },
                                    minLength: { value: 6 }
                                } } required />
                        </div>

                        <Button color="primary">{ t('Contact.Form.Button') }</Button>
                    </AvForm>

                    <div className="react-notification-alert-container">
                        <NotificationAlert ref="notificationAlert" />
                    </div>


                </Container>
            </section>
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


export default withTranslation()(Contact);
