import React, { FormEvent } from "react";
import { Link } from "gatsby";

// Components
import Layout from "../../components/layout";
import SEO from "../../components/seo";

// Types
import { IForgotPasswordForm } from "./iforgot-password-form";
import { IFormField } from "../../types/iform-field";

class ForgotPassword extends React.Component<{}, IForgotPasswordForm> {
  constructor(props) {
    super(props);
    this.state = {
      formFields: {
        email: {
          name: 'email',
          value: ''
        }
      },
      submitted: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlurEvent = this.handleBlurEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Gets a property value of a form field given its name.
   * @param {string} formFieldName The name of the form field.
   * @param {string} [property=value] The property we want to retrieve from the form field by default set as value.
   * @returns {string}
   */
  getFormFieldProperty(formFieldName: string, property: keyof IFormField = 'value') {
    return this.state.formFields[formFieldName][property];
  }

  /**
   * Checks if a required form field is invalid given its name.
   * @param {string} formFieldName The name of the form field.
   * @returns {boolean} Returns true if the form has been submitted and the form field is still blank.
   */
  checkRequiredInvalid(formFieldName: string) {
    return this.state.submitted && this.getFormFieldProperty(formFieldName) === '';
  }

  /**
   * Checks if a form field of type email is invalid given its name.
   * @param {string} formFieldName The name of the form field.
   * @returns {boolean} Returns true if the form field is not already invalid, has been touched (focused on and then blurred), changed, and does not match the email regex pattern.
   */
  checkEmailInvalid(formFieldName: string) {
    return !this.checkRequiredInvalid(formFieldName) && this.getFormFieldProperty(formFieldName, 'touched') && this.getFormFieldProperty(formFieldName, 'changed') && !this.getFormFieldProperty(formFieldName).match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  }

  /**
   * Updates the form value in the state.
   * @param {React.FormEvent<HTMLInputElement>} event 
   */
  handleInputChange(event: React.FormEvent<HTMLInputElement>) {
    event.persist();
    const formField: string = event.currentTarget.id;
    const newFormFieldValue: string = event.currentTarget.value;
    this.setState((state: IForgotPasswordForm) => {
      return {
        ...state,
        formFields: {
          ...state.formFields,
          [formField]: {
            ...state.formFields[formField],
            changed: true,
            value: newFormFieldValue
          }
        }
      }
    });
  }

  /**
   * Updates the touch attribute for a form field.
   * @param {React.FocusEvent} event 
   */
  handleBlurEvent(event: React.FocusEvent) {
    event.persist();
    this.setState((state: IForgotPasswordForm) => {
      const formField: string = event.target.id;
      return {
        ...state,
        formFields: {
          ...state.formFields,
          [formField]: {
            ...state.formFields[formField],
            touched: true
          }
        }
      }
    });
  }

  /**
   * Signs the user up.
   * @param {React.FormEvent<HTMLFormElement>} event 
   */
  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.setState((state: IForgotPasswordForm) => {
      return {
        ...state,
        submitted: true
      }
    });
  }

  render() {
    return (
      <Layout>
        <SEO title="Forgot Password" />
        <div className="w-full max-w-sm mx-auto">
          <form className="auth-form" onSubmit={this.handleSubmit}>
            <div className="flex justify-center mb-6">
              <h1 className="text-2xl">Forgot Password</h1>
            </div>
            <div className="mb-6">
              <label htmlFor="email">
                Email
              </label>
              <input id="email" type="text" placeholder="Email" value={this.getFormFieldProperty('email')} onChange={this.handleInputChange} onBlur={this.handleBlurEvent} />
              <p className={`error-msg ${this.checkRequiredInvalid('email') || this.checkEmailInvalid('email') ? 'show' : ''}`}>
                { this.checkRequiredInvalid('email') ? 'This field is required.' : '' }
                { this.checkEmailInvalid('email') ? 'Please provide a valid email address.' : '' }
              </p>
            </div>
            <div className="flex justify-center mb-6">
              <button className="btn-primary w-full" type="submit">
                Submit recovery request
              </button>
            </div>
            <hr className="mb-6"/>
            <div className="flex justify-center">
              <Link to="/login" className="link">
                Back to log in
              </Link>
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}

export default ForgotPassword;