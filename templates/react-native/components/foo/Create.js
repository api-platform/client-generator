import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './Form';
import { create, loading, error, reset } from '../../actions/{{{lc}}}/create';
import { Actions } from 'react-native-router-flux';
import { delayRefresh } from '../../utils/helpers';

class Create extends Component {

  componentWillUnmount() {
    this.props.reset();
  }

  onSubmit = values => {
    this.props.create(values);
    Actions.pop();
    delayRefresh();
  };

  render() {

    const {viewStyle, textStyle} = styles;

    return (
        <View>
          <ScrollView keyboardShouldPersistTaps='always'>
            {this.props.error && <View style={viewStyle}><Text
                style={textStyle}>{this.props.error}</Text></View>}
            <Form mySubmit={values => this.onSubmit(values)}/>
          </ScrollView>
        </View>
    );
  }
}

const mapStateToProps = state => {
  const {created, error, loading} = state.{{{lc}}}.create;
  return {created, error, loading};
};

const mapDispatchToProps = dispatch => ({
  create: values => dispatch(create(values)),
  reset: () => dispatch(reset()),
});

const styles = {
  viewStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
  textStyle: {
    color: 'red',
    textAlign: 'center',
  },
};

Create.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  created: PropTypes.object,
  create: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
