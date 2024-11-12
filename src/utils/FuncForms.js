export const onSumbit = (event, ...other) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const data = Object.fromEntries(formData);

  other;
};

export const onEdit = (event, dispatch) => {};
export const onDelete = (event, dispatch) => {};
