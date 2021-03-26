const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileAvatarChooser = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileAccomodationChooser = document.querySelector('.ad-form__input');
const previewAccomodation = document.querySelector('.ad-form__photo');

fileAvatarChooser.addEventListener('change', () => {
  const file = fileAvatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

fileAccomodationChooser.addEventListener('change', () => {
  const file = fileAccomodationChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAccomodation.style.backgroundImage = `url(${reader.result})`;
      previewAccomodation.style.backgroundRepeat = 'no-repeat';
      previewAccomodation.style.backgroundPosition = 'center';
      previewAccomodation.style.backgroundSize = '70px 70px';

    });

    reader.readAsDataURL(file);
  }
});

