import PropTypes from 'prop-types';
/* eslint no-underscore-dangle: [2, { "allow": ["_loading"] }] */
import React from 'react';
import CoreCourses from './api/core.json';
import ElectiveCourses from './api/electives.json';

const DepartmentCourses = {
  core: CoreCourses,
  electives: ElectiveCourses,
};

module.exports = class extends React.Component {
  static propTypes = {
    department: PropTypes.string,
    course: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    selectedDepartment: null,
    selectedCourse: null,
    coursesInDepartment: [],
    _loading: false,
  };

  componentWillReceiveProps(update) {
    this.setState({
      selectedDepartment: update.department,
      selectedCourse: update.course,
    });
  }

  onSelectDepartment = (evt) => {
    const selectedDepartment = evt.target.value;
    const selectedCourse = null;
    this.setState({ selectedDepartment, selectedCourse });
    this.props.onChange({ name: 'department', value: selectedDepartment });
    this.props.onChange({ name: 'course', value: selectedCourse });

    if (selectedDepartment) this.fetchCoursesForDepartment(selectedDepartment);
  };

  onSelectCourse = (evt) => {
    const selectedCourse = evt.target.value;
    this.setState({ selectedCourse });
    this.props.onChange({ name: 'course', value: selectedCourse });
  };

  fetchCoursesForDepartment = (selectedDepartment) => {
    this.setState({ _loading: true, coursesInDepartment: [] });
    apiFetchCoursesForDepartment(selectedDepartment).then((coursesInDepartment) => {
      this.setState({ _loading: false, coursesInDepartment: coursesInDepartment });
    });
  };

  renderDepartmentList = () => {
    return (
      <select
        onChange={this.onSelectDepartment}
        value={this.state.selectedDepartment || ''}
      >

        <option value=''>
          Which department?
        </option>
        <option value='core'>
          NodeSchool: CoreCourses
        </option>
        <option value='electives'>
          NodeSchool: ElectiveCourses
        </option>
      </select>
    );
  };

  renderCourseList = () => {
    if (this.state._loading) {
      return <img alt='loading' src='/img/loading.gif' />;
    }
    if (!this.state.selectedDepartment || !this.state.coursesInDepartment.length) return <span />;

    return (
      <select
        onChange={this.onSelectCourse}
        value={this.state.selectedCourse || ''}
      >

        { [
          <option value='' key='course-none'>
            Which course?
          </option>,

          ...this.state.coursesInDepartment.map((course, i) => (
            <option value={course} key={i}>
              {course}
            </option>
          )),
        ] }
      </select>
    );
  };

  render() {
    return (
      <div>
        { this.renderDepartmentList() }
        <br />
        { this.renderCourseList() }
      </div>
    );
  }
};

function apiFetchCoursesForDepartment(selectedDepartment) {
  return {
    then: function (callbackReceiveDepartmentCourses) {
      setTimeout(() => { callbackReceiveDepartmentCourses(DepartmentCourses[selectedDepartment]); }, 1000);
    },
  };
}
