function handleEditAction(form) {
  const password = prompt("Enter admin password (admin123):");
  if (password === null) return false;
  form.querySelector("#adminPasswordField").value = password;
  return true;
}

function handleDeleteAction(form, itemType) {
  if (!confirm(`Are you sure you want to delete this ${itemType}?`))
    return false;
  const password = prompt("Enter admin password (admin123):");
  if (password === null) return false;
  form.querySelector(".adminPasswordField").value = password;
  return true;
}
