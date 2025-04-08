import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const BarChartExample = () => {
  const data = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <View style={{marginTop: 20}}>
      <Text style={{ textAlign: "center", fontSize: 18, marginBottom: 10 }}>
        Graphique en Barres
      </Text>
      <BarChart
        data={data}
        width={screenWidth - 20}
        height={300}
        yAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: "#f3f3f3",
          backgroundGradientTo: "#f3f3f3",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(9, 115, 111, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 10,
          alignSelf: "center",
        }}
        fromZero
      />
    </View>
  );
};

export default BarChartExample;