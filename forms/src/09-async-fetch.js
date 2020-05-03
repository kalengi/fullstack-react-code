import React from 'react';
import isEmail from 'validator/lib/isEmail';

const Field = require('./08-field-component-field.js');
const CourseSelect = require('./09-course-select.js');

const content = document.createElement('div');
document.body.appendChild(content);

module.exports = class extends React.Component {
  static displayName = "09-async-fetch";

  state = {
    fields: {
      name: '',
      email: '',
      course: null,
      department: null,
    },
    fieldErrors: {},
    people: [],
  };

  onFormSubmit = (evt) => {
    const people = this.state.people;
    const person = this.state.fields;

    evt.preventDefault();

    if (!this.isFormDataValid()) return;

    this.setState({
      people: people.concat(person),
      fields: {
        name: '',
        email: '',
        course: null,
        department: null,
      },
    });
  };

  onInputChange = ({ name, value, error }) => {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({ fields, fieldErrors });
  };

  isFormDataValid = () => {
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if (!person.name) return false;
    if (!person.email) return false;
    if (!person.course) return false;
    if (!person.department) return false;
    if (errMessages.length) return false;

    return true;
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>

          <Field
            placeholder='Name'
            name='name'
            value={this.state.fields.name}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : 'Name Required')}
          />

          <br />

          <Field
            placeholder='Email'
            name='email'
            value={this.state.fields.email}
            onChange={this.onInputChange}
            validate={(val) => (isEmail(val) ? false : 'Invalid Email')}
          />

          <br />

          <CourseSelect
            department={this.state.fields.department}
            course={this.state.fields.course}
            onChange={this.onInputChange}
          />

          <br />

          <input type='submit' disabled={!this.isFormDataValid()} />
        </form>

        <div>
          <h3>People</h3>
          <ul>
            { this.state.people.map(({ name, email, department, course }, i) =>
              <li key={i}>{[ name, email, department, course ].join(' - ')}</li>
            ) }
          </ul>
        </div>
      </div>
    );
  }
};
