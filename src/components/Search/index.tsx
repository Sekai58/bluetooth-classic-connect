import SVG from '../SVG';
import {theme} from '../../utils/theme';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

type StyledSearchProps = {
  backgroundColor?: keyof typeof theme.colors;
  borderColor?: keyof typeof theme.colors;
};
const StyledSearch = styled.View<StyledSearchProps>`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 44px;
  border-radius: 24px;
  border-color: ${({borderColor}: StyledSearchProps) =>
    borderColor ? theme.colors[borderColor] : theme.colors.white500};
  background-color: ${({backgroundColor}: StyledSearchProps) =>
    backgroundColor ? theme.colors[backgroundColor] : theme.colors.white500};
  border-width: ${(props: any) => (props.borderColor ? 1 : 0)}px;
`;
const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const StyledIcon = styled.View`
  position: absolute;
  top: 10px;
`;

const StyledTextInput = styled.TextInput<{width?: string}>`
  height: 100%;
  width: ${({width}) => width || '100%'};
  padding-left: 48px;
  padding-right: 48px;
  font-size: 14px;
  color: ${theme.colors.gray50};
`;

type SearchProps = {
  placeholder?: string;
  backgroundColor?: keyof typeof theme.colors;
  borderColor?: keyof typeof theme.colors;
  value?: string;
  onChangeText?: (text: string) => void;
  restProps?: any;
  onSubmitEditing?: () => void;
  textInputWidth?: string;
};

const SearchInput = ({
  placeholder = 'Search here',
  backgroundColor = 'white500',
  borderColor,
  value,
  onChangeText,
  restProps,
  onSubmitEditing,
  textInputWidth = '100%',
}: SearchProps) => {
  return (
    <SearchContainer>
      <StyledSearch backgroundColor={backgroundColor} borderColor={borderColor}>
        <StyledIcon style={{left: 12}}>
          <SVG
            source={'location'}
            color={theme.colors.blue300}
            width={20}
            height={20}
          />
        </StyledIcon>
        <StyledTextInput
          {...restProps}
          placeholderTextColor={theme.colors.gray300}
          placeholder={placeholder}
          inputMode="search"
          onSubmitEditing={onSubmitEditing}
          value={value}
          onChangeText={onChangeText}
          width={textInputWidth}
        />
        <StyledIcon style={{right: 14}}>
          <SVG
            source={'search'}
            color={theme.colors.gray200}
            width={20}
            height={20}
          />
        </StyledIcon>
      </StyledSearch>
    </SearchContainer>
  );
};

export default SearchInput;
