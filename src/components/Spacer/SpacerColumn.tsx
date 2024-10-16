import React from 'react';
import {View} from 'react-native';

import {theme} from '../../utils/theme';

export type SpacerProps = {
  size: number;
  backgroundColor?: keyof typeof theme.colors;
};

export const SpacerColumn: React.FC<SpacerProps> = ({
  size,
  backgroundColor,
}) => (
  <View
    style={{
      height: 8 * size,
      backgroundColor: `${
        backgroundColor ? theme.colors[backgroundColor] : 'transparent'
      }`,
    }}
  />
);
