import { fireEvent, render, screen } from '@testing-library/react';
import ComboBox, { IComboBox } from './combo-box';
import { wait } from '@testing-library/user-event/dist/utils';

const options: IComboBox[] = [
  { label: 'Apple', value: 'Apple'},
  { label: 'Banana', value: 'Banana'}
];

test('renders dropdown list with correct options', () => {
  render(<ComboBox items={options} />);
  fireEvent.click(screen.getByTestId('comboBoxInput'));
  const dropdownList = screen.getByTestId('comboBoxDropdown');
  expect(dropdownList.childNodes.length).toBe(options.length);
});

test('select second item in dropdown list', () => {
  render(<ComboBox items={options} />);
  fireEvent.click(screen.getByTestId('comboBoxInput'));
  const dropdownList = screen.getByTestId('comboBoxDropdown');
  fireEvent.click(dropdownList.childNodes[1]);
  const searchInput: HTMLInputElement = screen.getByTestId('comboBoxSearchInput');
  expect(searchInput.value).toBe('Banana');
});

test('stop render dropdown on search input blur', () => {
  render(<ComboBox items={options} />);
  fireEvent.click(screen.getByTestId('comboBoxInput'));
  fireEvent.blur(screen.getByTestId('comboBoxSearchInput'));
  const dropdownList = screen.queryByTestId('comboBoxDropdown');
  expect(dropdownList).toBe(null);
});
