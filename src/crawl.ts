import csv from 'csvtojson';
import fs, { existsSync, mkdirSync } from 'fs';
import { startOfMonth, endOfMonth, subMonths, parse, isWithinInterval } from 'date-fns';
import path from 'path';

// types
import { ImmigrationRecordKeyEn, ImmigrationRecordKeyZh } from '../types/types';

const csvUrlEn =
  'https://www.immd.gov.hk/opendata/eng/transport/immigration_clearance/statistics_on_daily_passenger_traffic.csv';
const csvUrlZh =
  'https://www.immd.gov.hk/opendata/hkt/transport/immigration_clearance/statistics_on_daily_passenger_traffic.csv';
const directory = 'dist';
const fileName = 'crawl_{lang}.json';

if (!existsSync(directory)) {
  mkdirSync(directory, { recursive: true });
}

// Fetch the CSV file from the URL (En)
fetch(csvUrlEn)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch the CSV file');
    }
    return response.text();
  })
  .then((csvData) => {
    // Convert CSV data to JSON format
    csv()
      .fromString(csvData)
      .then((jsonObj) => {
        // Calculate the start date of last month and end date of this month
        const today = new Date();
        const lastMonthStart = startOfMonth(subMonths(today, 1));
        const thisMonthEnd = endOfMonth(today);

        // Filter records within the date range
        const filteredData = jsonObj.filter((record: ImmigrationRecordKeyEn) => {
          const recordDate = parse(record.Date, 'dd-MM-yyyy', new Date()); // 'dd-MM-yyyy' format
          return isWithinInterval(recordDate, { start: lastMonthStart, end: thisMonthEnd });
        });

        const jsonData = JSON.stringify(filteredData);

        // Write the filtered JSON data to a file
        fs.writeFileSync(path.join(directory, fileName.replace('{lang}', 'en')), jsonData);
      });
  })
  .catch((err) => {
    console.error('Error fetching CSV file:', err);
  });

// Fetch the CSV file from the URL (Zh)
fetch(csvUrlZh)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch the CSV file');
    }
    return response.text();
  })
  .then((csvData) => {
    // Convert CSV data to JSON format
    csv()
      .fromString(csvData)
      .then((jsonObj) => {
        // Calculate the start date of last month and end date of this month
        const today = new Date();
        const lastMonthStart = startOfMonth(subMonths(today, 1));
        const thisMonthEnd = endOfMonth(today);

        // Filter records within the date range
        const filteredData = jsonObj.filter((record: ImmigrationRecordKeyZh) => {
          const recordDate = parse(record.日期, 'dd-MM-yyyy', new Date()); // 'dd-MM-yyyy' format
          return isWithinInterval(recordDate, { start: lastMonthStart, end: thisMonthEnd });
        });

        const jsonData = JSON.stringify(filteredData);

        // Write the filtered JSON data to a file
        fs.writeFileSync(path.join(directory, fileName.replace('{lang}', 'zh')), jsonData);
      });
  })
  .catch((err) => {
    console.error('Error fetching CSV file:', err);
  });
