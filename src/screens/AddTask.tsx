import React, {Component} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import commonStyles from '../commonStyles';

type Props = {
  isVisible: boolean;
  onCancel: (event: NativeSyntheticEvent<any>) => void;
  onSave: Function;
};

export default class AddTask extends Component<Props> {
  state = {
    desc: '',
    estimateAt: new Date(),
    showDatePicker: false,
  };

  save = () => {
    const newTask = {
      ...this.state,
    };

    this.props.onSave(newTask);
    this.setState({...newTask});
  };

  getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={this.state.estimateAt}
        onChange={(_: any, date: any) =>
          this.setState({estimateAt: date, showDatePicker: false})
        }
        mode="date"
      />
    );

    const dateString = moment(this.state.estimateAt).format(
      'ddd, D [de] MMMM [de] YYYY',
    );

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => this.setState({showDatePicker: true})}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      );
    }
    return datePicker;
  };

  handleChangeText = (desc: string) => {
    const newState = {...this.state};
    newState.desc = desc;
    this.setState({desc: newState.desc});
  };

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType="slide">
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>

        <View style={styles.container}>
          <Text style={styles.header}>Nova Tarefa</Text>

          <TextInput
            style={styles.input}
            placeholder="Informe a descrição..."
            onChangeText={desc => this.handleChangeText(desc)}
            value={this.state.desc}
          />
          {this.getDatePicker()}

          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.btn}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={styles.btn}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    backgroundColor: '#FFF',
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    width: '90%',
    height: 40,
    margin: 15,
    marginLeft: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 6,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btn: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginLeft: 15,
  },
});
