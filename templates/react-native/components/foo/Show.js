import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView, View, Text } from 'react-native';
import { Card, ListItem, SocialIcon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Spinner from '../Spinner';
import { retrieve, reset } from '../../actions/{{{lc}}}/show';
import { del, loading, error } from '../../actions/{{{lc}}}/delete';
import { list } from '../../actions/{{{lc}}}/list';
import { Confirm } from '../Confirm';
import { delayRefresh } from '../../utils/helpers';

class Show extends Component {

  state = { showModal: false };

  componentDidMount() {
    this.props.retrieve(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.refresh !== this.props.refresh) {
      this.props.list();
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  remove() {
    this.setState({showModal: !this.state.showModal});
  }

  onAccept() {
    const {del, retrieved} = this.props;
    del(retrieved);
    this.setState({showModal: false});
    Actions.pop();
    delayRefresh();
  }

  onDecline() {
    this.setState({showModal: false});
  }

  static renderRow(title, value) {
    return (
        <ListItem
            subtitleStyle={ {color: 'black', fontSize: 16} }
            titleStyle={ {color: 'gray', fontSize: 16, paddingBottom: 10} }
            key={value}
            title={title}
            subtitle={Array.isArray(value) ? value.length.toString() : value}
            subtitleNumberOfLines={100}
        />
    );
  }

  actionButtons(id) {
    return (
        <View style={styles.actionStyle}>
          <SocialIcon
              iconSize={34}
              type='plus-circle'
              iconColor='#3faab4'
              onPress={() => Actions.{{{lc}}}Create()}
          />
          <SocialIcon
              iconSize={34}
              type='edit'
              iconColor='#3faab4'
              onPress={() => Actions.{{{lc}}}Update({id})}
          />
          <SocialIcon
              iconSize={34}
              type='minus-circle'
              iconColor='#3faab4'
              onPress={() => this.remove()}
          />
        </View>
    );
  }

  render() {

    if (this.props.loading) return <Spinner size="large"/>;

    const item = this.props.updated ? this.props.updated : this.props.retrieved;

    const {viewStyle, textStyleAlert } = styles;

    return (
        <View style={ {flex: 1} }>
          <ScrollView>
            {item &&
            <Card title="{{{title}}}">
                {Show.renderRow('id', item['@id'])}
{{#each fields}}
    {{#ifNotResource reference }}
                {Show.renderRow('{{{name}}}', item['{{{name}}}'])}
    {{/ifNotResource}}
{{/each}}
            </Card>
            }
            {this.props.deleteLoading && <View style={viewStyle}><Spinner size='large'/></View>}
            {this.props.deleteError && <View style={viewStyle}><Text style={textStyleAlert}>{this.props.deleteError}</Text></View>}
            {this.props.error && <View style={viewStyle}><Text style={textStyleAlert}>{this.props.error}</Text></View>}
          </ScrollView>
          {item && this.actionButtons(item['@id'])}
          <Confirm
              visible={this.state.showModal}
              onAccept={() => this.onAccept()}
              onDecline={() => this.onDecline()}
          >
            Are you sure you want to delete this?
          </Confirm>
        </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.{{{lc}}}.show.error,
    loading: state.{{{lc}}}.show.loading,
    retrieved: state.{{{lc}}}.show.retrieved,
    deleteError: state.{{{lc}}}.del.error,
    deleteLoading: state.{{{lc}}}.del.loading,
    deleted: state.{{{lc}}}.del.deleted,
    update: state.{{{lc}}}.update.updated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    retrieve: id => dispatch(retrieve(id)),
    list: page => dispatch(list(page)),
    del: item => dispatch(del(item)),
    reset: () => dispatch(reset()),
  };
};

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
  textStyleAlert: {
    color: 'red',
    textAlign: 'center',
  },
  actionStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
  }
};

Show.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  retrieved: PropTypes.object,
  retrieve: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  deleteError: PropTypes.string,
  deleteLoading: PropTypes.bool.isRequired,
  deleted: PropTypes.object,
  del: PropTypes.func.isRequired,
  showModal:PropTypes.bool,
  refresh:PropTypes.number,
  id:PropTypes.string,
  list: PropTypes.func.isRequired,
  updated: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
