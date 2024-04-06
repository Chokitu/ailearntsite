// styles.js
import styled from "@emotion/styled";
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

export const MyStyledComponent = styled.div`
  color: ${(props) => props.theme.palette.primary.main};
  padding: ${(props) => props.theme.spacing(3)};
  background-color: lightgrey;
`;

export const MyTypography = styled(Typography)`
  color: white;
  background-color: black;
`;

export const MyStyledButton = styled(Button)`
  margin-top: 40px;
`;

export const MyStyledPhotoCamera = styled(PhotoCamera)`
  margin-right: 20px;
`;

export const MyContainer = styled(Container)`
  padding: 60px 0;
  background-color: #e9f2f6;
`;

export const MyCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url("/images/tabs.png");
  background-size: cover;
  background-color: #e9f2f6;
  padding: 60px;
`;

export const MyCardMedia = styled(CardMedia)`
  padding-top: 56.25%;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
  background-color: #e9f2f6;
`;

export const MyCardContent = styled(CardContent)`
  flex-grow: 1;
`;

export const MyFooter = styled.footer`
  padding: 50px 0;
  background-color: black;
  color: white;
`;
