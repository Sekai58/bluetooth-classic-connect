import React, {FC} from 'react';

import {SvgXml} from 'react-native-svg';
import Icons from '../../assets/svg';
import {theme} from '../../utils/theme';

interface SVGProps {
  source: keyof typeof Icons;
  width?: number;
  height?: number;
  color?: any;
  style?: any;
}

const SVG: FC<SVGProps> = ({
  source,
  width = 24,
  height = 24,
  color = theme.colors.primaryTextColor,
  style,
}) => {
  return (
    <SvgXml
      xml={Icons[source]}
      width={width}
      height={height}
      color={color}
      style={style}
    />
  );
};

export default SVG;
