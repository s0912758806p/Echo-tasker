import fs from 'fs-extra';
import moment from 'moment';

const filePath = 'src/styles/useless.scss';

// Ensure directory exists
fs.ensureDirSync('src/styles');

// Get formatted timestamp
const timestamp = moment().format('YYYYMMDD-HHmmss');
const className = `useless-${timestamp}`;

// Generate random color
const randomColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

// Generate random integer
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Generate random style properties
const margin = `${randomInt(0, 50)}px`;
const padding = `${randomInt(0, 30)}px`;
const borderRadius = `${randomInt(0, 20)}px`;
const fontSize = `${randomInt(12, 24)}px`;
const color = randomColor();
const backgroundColor = randomColor();

// Create complex CSS class
const content = `
/* Auto-generated at ${moment().format('YYYY-MM-DD HH:mm:ss')} */
.${className} {
  margin: ${margin};
  padding: ${padding};
  color: ${color};
  background-color: ${backgroundColor};
  border-radius: ${borderRadius};
  font-size: ${fontSize};
  box-shadow: ${randomInt(1, 5)}px ${randomInt(1, 5)}px ${randomInt(1, 10)}px rgba(0, 0, 0, 0.${randomInt(1, 9)});
  transition: all ${randomInt(2, 8)}00ms ease;
  
  &:hover {
    transform: scale(${(randomInt(105, 115) / 100).toFixed(2)});
  }
}
`;

fs.appendFileSync(filePath, content);
console.log(`Added class: ${className} at ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
console.log(`Style properties: color=${color}, background=${backgroundColor}, font size=${fontSize}`);
