import { ListItem, ListItemText } from "@material-ui/core";
import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";

interface Props extends RouteComponentProps<{}> {
  to: string;
  text: string;
}

class ListItemLink extends Component<Props, any> {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;

  render() {
    const { text } = this.props;
    return (
      <ListItem button component={this.renderLink}>
        <ListItemText primary={text} />
      </ListItem>
    );
  }
}

export default withRouter(ListItemLink);
