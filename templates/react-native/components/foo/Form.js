import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { View } from 'react-native';
import {
  Input,
  Button,
} from 'react-native-elements';


class Form extends Component {

  renderField(data) {

    data.input.value = data.input.value.toString();

    let keyboard = data.type === "number" ? keyboard = "numeric" : keyboard = "default"

    return (
      <View>
        <Input
                   labeltStyle={ {color: 'gray', flex:1} }
                   {...data.input}
                   step={data.step}
                   required={data.required}
                   placeholder={data.placeholder}
                   id={`{{{lc}}}_${data.input.name}`}
                   errorMessage={data.meta.error}
                   keyboardType={keyboard}
                   label={data.input.name}
        />
      </View>
    );
  }

  intParser = (value) => {
    if(isNaN(value)) {
      value
    }
    else if(this.props.initialValues) {
      if ((isNaN(value)) && (typeof value === 'string')){
         value
      } else if(value) {
        return parseInt(value, 10)
      } else{
        value
      }
    } 
    else {
      return parseInt(value, 10)
    } 
    return value
  }

  render() {
    const {handleSubmit, mySubmit} = this.props;

    return (
      <View style={ {backgroundColor: 'white', paddingBottom: 20} }>
{{#each formFields}}
        <Field component={this.renderField} name="{{{name}}}" type="{{{type}}}"
          placeholder="{{{description}}}"{{#if required}} required={true}{{/if}} parse={this.intParser} value="" />
{{/each}}
        <Button buttonStyle={styles.button}
          title='SAVE'
          onPress={handleSubmit(mySubmit)}
        />
      </View>
    );
  }
}

const styles = {
  button: {
    flex: 1,
    backgroundColor: '#3faab4',
    borderRadius: 5,
    borderWidth: 0,
    borderColor: 'transparent',
    width: 300,
    height: 50,
    margin: 20,
  },
  placeholderStyle:{
    paddingRight:10
  }
};

export default reduxForm(
    {
      form: '{{{lc}}}',
      enableReinitialize: true, keepDirtyOnReinitialize: true,
    })(
    Form);
