import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native'; //moduller import ettik

const max_bim_Value = '25';
const min_bim_Value = '18.5';
class bmi_calculator extends Component {
  state = {
    height: '',
    weight: '',
    bmi: '',
    bmiResult: '',

    max_bmi_weight: '',
    min_bmi_weight: '',
    status: '',
  };

  handleHeight = (text) => {
    this.setState({ height: text });
  };
  handleWeight = (text) => {
    this.setState({ weight: text });
  };

  calculate = (height, weight) => {
    let result =
      (parseFloat(weight) * 10000) / (parseFloat(height) * parseFloat(height));

    result = result.toFixed(2);

    this.setState({ bmi: result });

    let max_bmi =
      (parseFloat(max_bim_Value) / 10000) *
      (parseFloat(height) * parseFloat(height));

    this.setState({ max_bmi_weight: max_bmi });

    let min_bmi =
      (parseFloat(min_bim_Value) / 10000) *
      (parseFloat(height) * parseFloat(height));

    this.setState({ min_bmi_weight: min_bmi });

    if (result < 18.5) {
      this.setState({ bmiResult: 'Underweight' });

      setTimeout(() => {
        this.setState({
          status:
            'You need to gain at least ' +
            parseFloat(this.state.min_bmi_weight - this.state.weight).toFixed(
              2
            ) +
            ' kg.',
        });
      }, 1000);
    } else if (result >= 18.5 && result < 25) {
      this.setState({ bmiResult: 'Normal weight' });

      setTimeout(() => {
        this.setState({ status: 'KEEP IT UP !! YOU ARE FITT' });
      }, 1000);
    } else if (result >= 25 && result < 30) {
      this.setState({ bmiResult: 'Overweight' });

      setTimeout(() => {
        this.setState({
          status:
            'You need to lose at least ' +
            parseFloat(this.state.weight - this.state.max_bmi_weight).toFixed(
              2
            ) +
            ' kg.',
        });
      }, 1000);
    } else if (result >= 30) {
      this.setState({ bmiResult: 'Obese' });

      setTimeout(() => {
        this.setState({
          status:
            'You need to lose at least ' +
            parseFloat(this.state.weight - this.state.max_bmi_weight).toFixed(
              2
            ) +
            ' kg.',
        });
      }, 1000);
    } else {
      alert('Incorrect Input!');
      this.setState({ bmiResult: '' });
      this.setState({ bmi: '' });
      this.setState({ status: '' });
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('./assets/fitnessapp.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.container}>
          <Text style={styles.title}>BMI Calculator </Text>

          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="#00A2FF"
            networkActivityIndicatorVisible={true}
          />

          <Text style={styles.text_label}>Height</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Height (Cm)"
            placeholderTextColor="white"
            onChangeText={this.handleHeight}
          />

          <Text style={styles.text_label}>Weight</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Weight (Kg)"
            placeholderTextColor="white"
            onChangeText={this.handleWeight}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() =>
              this.calculate(this.state.height, this.state.weight)
            }>
            <Text style={styles.submitButtonText}> Calculate</Text>
          </TouchableOpacity>

          <Text style={styles.output}>{this.state.bmi}</Text>

          <Text style={styles.resultText}>{this.state.bmiResult}</Text>

          <Text style={styles.status}>{this.state.status}</Text>
        </View>
      </ImageBackground>
    );
  }
}
export default bmi_calculator;
const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    width: 245,
    height: 40,
    borderWidth: 1,
    padding: 10,
    color: 'white',
    borderStyle: 'solid',
    borderColor: 'white',
    borderRadius: 6,
  },
  submitButton: {
    backgroundColor: '#00A2FF',
    padding: 10,
    margin: 15,
    height: 40,
    borderRadius: 6,
  },
  submitButtonText: {
    textAlign: 'center',
    color: 'white',

    fontSize: 18,
  },
  output: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
  },
  title: {
    paddingTop: 30,
    paddingBottom: 15,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  resultText: {
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
  },
  text_label: {
    marginLeft: 15,
    color: 'white',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  status: {
    paddingTop: 20,
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
});
