const showAboutDialog = () => {
  const resolution = `${window.innerWidth}x${window.innerHeight}`;
  const currentDate = new Date().toLocaleDateString();

  jsLoader.utils.createDialog(0, `О сборке ${nameMod}`, '', '', 'Закрыть', `Сегодняшняя дата: {12c5ed}${currentDate} {FFFFFF}<n>Разрешение: {12c5ed}${resolution}{FFFFFF}<n><n>Версия: {12c5ed}${vol}{FFFFFF}<n>Комплектация: {12c5ed}${lvl}{FFFFFF}<n>Автор: {12c5ed}vk.com/oneasstudio{FFFFFF}`);
};

/*jsLoader.playerInteraction.addNewItem(`О сборке ${nameMod}`, 'Loading', showAboutDialog);*/