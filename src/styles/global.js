import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`

* {
  --okButton: #2ecc71;
  --hoverButtonColor: #2ecc71;
  --cancelButton: #c0392b;
  --focusedInput: #3498db;
  --errorColor:#e74c3c;
  margin:0;
  padding:0;
  outline: 0;
  box-sizing: border-box;
}
*:focus {
  outline:0;
}

.react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
  display: none;
}

.react-horizontal-scrolling-menu--scroll-container {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

html,body,#root {
  height:100%
}
body {
  -webkit-font-smoothing: antialiased;
  background-color:#EBEBEB;
}
body,input,button {
  font: 14px 'Roboto', sans-serif;
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
}
button {
  cursor: pointer;
}
`;
