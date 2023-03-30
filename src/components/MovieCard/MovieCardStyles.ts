import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const CustomizedBox = styled(Box)`
  cursor: pointer;
  transition: all 0.3s;
  min-height: 450px;
  height: 100%;
  margin: 10px;

  &:hover {
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;
