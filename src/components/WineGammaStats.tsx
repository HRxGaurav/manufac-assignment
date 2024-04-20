import React from 'react';
import { Table } from '@mantine/core';
import WineData, { Wine } from './Wine-Data';

// Function to calculate Gamma property for each point of the dataset
const calculateGamma = (wine: Wine) => {
  return (wine.Ash * wine.Hue) / wine.Magnesium;
};

// Function to calculate mean of Gamma for a given dataset
const calculateMean = (data: Wine[]) => {
  const sum = data.reduce((acc, wine) => acc + calculateGamma(wine), 0);
  const mean = sum / data.length;
  return mean.toFixed(3);
};

// Function to calculate median of Gamma for a given dataset
const calculateMedian = (data: Wine[]) => {
  const sortedGamma = data.map((wine) => calculateGamma(wine)).sort((a, b) => a - b);
  const mid = Math.floor(sortedGamma.length / 2);
  if (sortedGamma.length % 2 === 0) {
    return ((sortedGamma[mid - 1] + sortedGamma[mid]) / 2).toFixed(3);
  } else {
    return sortedGamma[mid].toFixed(3);
  }
};

// Function to calculate mode of Gamma for a given dataset
const calculateMode = (data: Wine[]) => {
    let mode: number | undefined = undefined;
    const countMap: { [key: number]: number } = {};
    data.forEach((wine) => {
      const gamma = calculateGamma(wine);
      countMap[gamma] = (countMap[gamma] || 0) + 1;
    });
    let maxCount = 0;
    Object.entries(countMap).forEach(([gamma, count]) => {
      if (count > maxCount) {
        mode = parseFloat(gamma);
        maxCount = count;
      }
    });
    // Ensure mode is not 'undefined' and 'mode' is of type 'number' before calling 'toFixed()'
    return mode !== undefined ? (mode as number).toFixed(3) : undefined;
  };
  
  

const WineGammaStats: React.FC = () => {
  const maxAlcoholClass = Math.max(...WineData.map(wine => wine.Alcohol));
  const classData: Wine[][] = Array.from({ length: maxAlcoholClass }, () => []);

  // Grouping data by class
  WineData.forEach((wine) => {
    classData[wine.Alcohol - 1].push(wine);
  });

  const measures = ['Mean', 'Median', 'Mode']; // Measures to calculate

  // Generate headers for the table dynamically
  const tableHeaders = classData.map((_, index) => (
    <Table.Th key={index}>Class {index + 1}</Table.Th>
  ));

  // Generate rows for the table based on measures
  const rows = measures.map((measure) => (
    <Table.Tr key={measure}>
      <Table.Td>Gamma {measure}</Table.Td>
      {/* Calculate the measure for each class and display */}
      {classData.map((classWines, index) => (
        <Table.Td key={index}>
          {measure === 'Mean'
            ? calculateMean(classWines)
            : measure === 'Median'
            ? calculateMedian(classWines)
            : calculateMode(classWines)}
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <div style={{padding:"40px "}}>
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Measure</Table.Th>
          {tableHeaders}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </div>
  );
};

export default WineGammaStats;
