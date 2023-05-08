import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import ComboBox, { IComboBox } from './combo-box';

const options: IComboBox[] = [
  { label: 'Apple', value: 'Apple'},
  { label: 'Banana', value: 'Banana'}
];

afterEach(cleanup);

test('renders dropdown list with correct options', () => {
  render(<ComboBox items={options} />);
  fireEvent.click(screen.getByTestId('comboBoxInput'));
  const dropdownList = screen.getByTestId('comboBoxDropdown');
  expect(dropdownList.childNodes.length).toBe(options.length);
});

test('select second item in dropdown list', async () => {
  render(<ComboBox items={options} />);
  fireEvent.click(screen.getByTestId('comboBoxInput'));
  const dropdownList = screen.getByTestId('comboBoxDropdown');
  fireEvent.click(dropdownList.childNodes[1], {target: {role: 'option'}});
  const searchInput: HTMLInputElement = screen.getByTestId('comboBoxSearchInput');
  expect(searchInput.value).toBe('Banana');
});

test('hide dropdown on keydown Tab', () => {
  render(<ComboBox items={options} />);
  fireEvent.click(screen.getByTestId('comboBoxInput'));
  fireEvent.keyDown(screen.getByTestId('comboBoxSearchInput'), {key: 'Tab'});
  const dropdownList = screen.queryByTestId('comboBoxDropdown');
  expect(dropdownList).toBe(null);
});
