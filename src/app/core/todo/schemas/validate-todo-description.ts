type ValidateTodoDescription = {
  success: boolean;
  errors: string[];
};

export const validateTodoDescription = (
  description: string
): ValidateTodoDescription => {
  const errors = [];
  if (description.length <= 3) {
    errors.push("Description must have more than 3 characters");
  }
  return {
    success: errors.length === 0,
    errors,
  };
};
