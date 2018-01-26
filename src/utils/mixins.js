// eslint-disable-next-line import/prefer-default-export
export const generateColor = (index) => {
  const colors = [
    '27BDDB', 'FF455A', '32CD90', '5330A2', 'FFDD52', '077187', 'F4F1BB', '74A57F',
    '9ECE9A', 'E4C5AF', 'ED6A5A', '9BC1BC', '5CA4A9', '074F57', 'E6EBE0', 'DCEDFF',
    '94B0DA', '8F91A2', 'A63446', '58B09C', 'F3B3A6', '1282A2', '62929E', 'DB5461',
  ];
  return `${index < 24 ? colors[index] : generateColor(index - 24)}`;
};
