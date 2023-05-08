import { ChangeEvent, FC, useCallback, useMemo, useRef, useState } from 'react';
import './combo-box.css';
import { useOnClickOutside } from '../hooks/hooks';

export interface IComboBox {
  label: string;
  value: string;
}

type ComboBoxProps = {
  items?: IComboBox[]
}

const Icon = () => {
  return (
    <svg height="10" width="10" viewBox="0 0 20 20">
      <path fill="#444444" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const ComboBox: FC<ComboBoxProps> = ({items}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [arrowCounter, setArrowCounter] = useState<number>(-1);
  const elRef = useRef(null);
  useOnClickOutside(elRef, () => setShowDropdown(false));

  const handleInputClick = useCallback(() => {
    setShowDropdown(true);
  }, []);

  const onItemClick = useCallback((option: IComboBox) => {
    setSearchValue(option.value);
    setShowDropdown(false);
    setArrowCounter(-1);
  }, []);

  const isSelected = (option: IComboBox) => {
    if (!searchValue) {
      return false;
    }

    return searchValue === option.value;
  };

  const onSearch = useCallback((e: ChangeEvent) => {
    setSearchValue((e.target as HTMLInputElement).value);
  }, []);

  const options = useMemo(() => {
    if (!searchValue) {
      return items;
    }

    return items?.filter(
      (item) =>
        item.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  }, [items, searchValue]);

  // @ts-ignore
  const onInputBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setArrowCounter(-1);
    setShowDropdown(false);
  }, []);

  // @ts-ignore
  const onSearchInputKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    const key: string = e.key;

    switch (key) {
      case 'Enter':
        if (showDropdown && options) {
          onItemClick(options[arrowCounter]);
        }
        setShowDropdown(!showDropdown);
        break;
      case 'ArrowDown':
        if (showDropdown && options && arrowCounter < options.length - 1) {
          setArrowCounter((prev) => prev + 1)
        }
        break;
      case 'ArrowUp':
        if (showDropdown && options && arrowCounter > 0) {
          setArrowCounter((prev) => prev - 1);
        }
        break;
    }
  }, [showDropdown, arrowCounter]);

  return (
    <div ref={elRef} className="combo-box-container">
      <div onClick={handleInputClick}
           data-testid="comboBoxInput"
           className={`combo-box-input ${showDropdown ? 'open' : ''} ${searchValue ? 'selected' : ''}`}>
        <input onChange={onSearch}
               onBlur={onInputBlur}
               value={searchValue}
               data-testid="comboBoxSearchInput"
               placeholder="Choose a Fruit:" onKeyDown={onSearchInputKeyDown}
               role="combobox"
               aria-expanded={showDropdown}
               aria-controls="fruits"
               aria-autocomplete="list"
        />
        <Icon />
      </div>
      {showDropdown && (
        <div id="fruits"
             className="combo-box-menu"
             data-testid="comboBoxDropdown"
             aria-label="Fruits list"
             role="listbox">
          {options?.map((option, index) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.value}
              className={`combo-box-item ${isSelected(option) && "selected"} ${arrowCounter === index && "selected"}`}
              role="option"
              aria-selected={isSelected(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default ComboBox;
