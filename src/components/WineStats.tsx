import React from 'react';
import { Table } from '@mantine/core';
import WineData from '../Wine-Data';

// Function to calculate the mean of Flavanoids for a given dataset
const calculateMean = (data: any[]) => {
  const sum = data.reduce((acc, wine) => acc + wine.Flavanoids, 0);
  return sum / data.length;
};

// Function to calculate the median of Flavanoids for a given dataset
const calculateMedian = (data: any[]) => {
  const sortedFlavanoids = data.map((wine) => wine.Flavanoids).sort((a, b) => a - b);
  const mid = Math.floor(sortedFlavanoids.length / 2);
  if (sortedFlavanoids.length % 2 === 0) {
    return (sortedFlavanoids[mid - 1] + sortedFlavanoids[mid]) / 2;
  } else {
    return sortedFlavanoids[mid];
  }
};

// Function to calculate the mode of Flavanoids for a given dataset
const calculateMode = (data: any[]) => {
  const countMap: { [key: number]: number } = {};
  data.forEach((wine) => {
    countMap[wine.Flavanoids] = (countMap[wine.Flavanoids] || 0) + 1;
  });
  let mode: number | undefined = undefined; // Initialize mode with a default value
  let maxCount = 0;
  Object.entries(countMap).forEach(([flavanoids, count]) => {
    if (count > maxCount) {
      mode = parseFloat(flavanoids);
      maxCount = count;
    }
  });
  return mode;
};

// WineStats component to display class-wise statistics of Flavanoids
const WineStats: React.FC = () => {
  // Determine the maximum alcohol value in the dataset
  const maxAlcohol = Math.max(...WineData.map(wine => wine.Alcohol));

  // Initialize class data array dynamically based on the maximum alcohol value
  const classData: any[][] = Array.from({ length: maxAlcohol }, () => []);

  // Grouping data by class
  WineData.forEach((wine) => {
    classData[wine.Alcohol - 1].push(wine);
  });

  // Generate class headers dynamically
  const classHeaders = Array.from({ length: maxAlcohol }, (_, index) => <Table.Th key={index}>Class {index + 1}</Table.Th>);

  const measures = ['Mean', 'Median', 'Mode']; // Measures to calculate

  // Generate rows for the table based on measures
  const rows = measures.map((measure) => (
    <Table.Tr key={measure}>
      <Table.Td>{`Flavanoids ${measure}`}</Table.Td>
      {/* Calculate the measure for each class and display */}
      {classData.map((classWines, index) => (
        <Table.Td key={index}>
          {measure === 'Mean'
            ? calculateMean(classWines).toFixed(2)
            : measure === 'Median'
            ? calculateMedian(classWines).toFixed(2)
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
          {classHeaders}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </div>
  );
};

export default WineStats;
