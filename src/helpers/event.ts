const handlePassword = async () => {
  const el = document.getElementById('password-input');
  if (!el) return;
  const type = el.getAttribute('type');
  if (type === 'password') {
    el.setAttribute('type', 'text');
  } else {
    el.setAttribute('type', 'password');
  }
  const icon = document.getElementById('password-icon');
  if (!icon) return;
  if (icon.classList.contains('mdi mdi-eye-outline')) {
    icon.classList.remove('mdi-eye-outline');
    icon.classList.add('mdi-eye-off-outline');
  }
  if (icon.classList.contains('mdi mdi-eye-off-outline')) {
    icon.classList.remove('mdi-eye-off-outline');
    icon.classList.add('mdi-eye-outline');
  }
}

const enableLoader = () => {
  document.getElementById("layer")!.classList.remove("d-none");
}

const disableLoader = () => {
  document.getElementById('layer')!.classList.add('d-none');
}

const formatedDate = (date: any) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}



export {
  handlePassword,
  formatedDate,
  enableLoader,
  disableLoader
}