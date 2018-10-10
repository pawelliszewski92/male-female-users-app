import React from "react";
import Chart from "react-google-charts";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  chart: {
    paddingTop: theme.spacing.unit
  }
});

class PieChart extends React.Component {
  render() {
    const { data, classes, theme } = this.props;
    const pieOptions = {
      title: "",
      pieHole: 0.6,
      slices: [
        {
          color: theme.palette.secondary.dark
        },
        {
          color: theme.palette.primary.dark
        }
      ],
      legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
          color: "233238",
          fontSize: 14
        }
      },
      tooltip: {
        showColorCode: true
      },
      chartArea: {
        left: 0,
        top: "2%",
        width: "100%",
        height: "80%"
      }
    };

    return (
      <Paper>
        <Chart
          chartType="PieChart"
          data={data}
          options={pieOptions}
          graph_id="PieChart"
          width={"100%"}
          height={"400px"}
          legend_toggle
          className={classes.chart}
        />
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PieChart);
