import React, { Component } from "react";
import { CssBaseline, Grid, withStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import EnhantedTable from "./components/enhancedTable";
import OnScreenMessage from "./components/onScreenMessage";
import PieChart from "./components/pieChart";
import { getUsers, deleteUser } from "./services/usersService";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  }
});

class App extends Component {
  state = {
    users: [],
    men: [],
    women: [],
    errorMessageOpen: false,
    errorMessage: "",
    chartData: [],
    rows: [
      {
        id: "name",
        label: "Name",
        numeric: false,
        disablePadding: true,
        padding: "none"
      },
      {
        id: "surname",
        label: "Surname",
        numeric: false,
        disablePadding: true,
        padding: "none"
      },
      {
        id: "dateOfBirth",
        label: "Date of birth",
        numeric: false,
        disablePadding: true,
        padding: "none"
      },
      {
        id: "avatar",
        label: "Avatar",
        content: user => <Avatar src={user.avatar} />,
        numeric: false,
        disablePadding: true,
        padding: "none"
      }
    ]
  };

  async componentDidMount() {
    const { data } = await getUsers();
    const usersPromises = data.map(async user => ({
      dateOfBirth: this.getDateOfBirth(user.pesel),
      ...user
    }));
    const users = await Promise.all(usersPromises);
    this.setState({ users });
    this.getMaleAndFemaleUsers(users);
  }

  handleDelete = async selected => {
    const users = this.state.users.filter(user => !selected.includes(user.id));
    this.setState({ users });
    this.getMaleAndFemaleUsers(users);

    try {
      await Promise.all(selected.map(async id => await deleteUser(id)));
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.setState({
          errorMessageOpen: true,
          errorMessage: "This content has already been deleted"
        });
    }
  };

  handleErrorClose = () => {
    this.setState({ errorMessageOpen: false, errorMessage: "" });
  };

  getDateOfBirth(peselNumber) {
    const pesel = peselNumber.split("").map(number => parseInt(number));

    let year = 1900 + pesel[0] * 10 + pesel[1];
    if (pesel[2] >= 2 && pesel[2] < 8) year += Math.floor(pesel[2] / 2) * 100;
    if (pesel[2] >= 8) year -= 100;

    let month = (pesel[2] % 2) * 10 + pesel[3];
    if (month < 10) month = `0${month}`;

    let day = pesel[4] * 10 + pesel[5];
    if (day < 10) day = `0${day}`;

    return `${day}.${month}.${year}`;
  }

  getUsersOfGender(data, array) {
    const users = [];
    data.map(
      user =>
        array.includes(parseInt(user.pesel.split("")[9])) && users.push(user)
    );
    return users;
  }

  getChartData(men, women) {
    return [["Women", "Men"], ["Women", women.length], ["Men", men.length]];
  }

  getMaleAndFemaleUsers = data => {
    const women = this.getUsersOfGender(data, [0, 2, 4, 6, 8]);
    const men = this.getUsersOfGender(data, [1, 3, 5, 7, 9]);
    const chartData = this.getChartData(men, women);
    this.setState({ men, women, chartData });
  };

  render() {
    const {
      errorMessage,
      errorMessageOpen,
      chartData,
      rows,
      men,
      women
    } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <OnScreenMessage
          variant="error"
          message={errorMessage}
          open={errorMessageOpen}
          onClose={this.handleErrorClose}
        />
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="flex-start"
          justify="space-evenly"
          className={classes.root}
        >
          <Grid item md={8}>
            <PieChart data={chartData} />
          </Grid>
          <Grid item sm={12} md={5}>
            <EnhantedTable
              tableLabel="WOMEN"
              rows={rows}
              data={women}
              onDelete={this.handleDelete}
              color="secondary"
            />
          </Grid>
          <Grid item sm={12} md={5}>
            <EnhantedTable
              tableLabel="MEN"
              rows={rows}
              data={men}
              onDelete={this.handleDelete}
              color="primary"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
