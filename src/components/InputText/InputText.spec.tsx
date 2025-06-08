import userEvent from '@testing-library/user-event';
import { InputText, InputTextProps } from '.';
import { render, screen } from '@testing-library/react';

type Props = Partial<InputTextProps>;

const makeInput = (props: Props = {}) => {
  return (
    <InputText
      labelText='label'
      placeholder='placeholder example'
      type='text'
      disabled={false}
      required={true}
      readOnly={false}
      {...props}
    />
  );
};

const renderInput = (props?: Props) => {
  const renderResult = render(makeInput(props));
  const input = screen.getByRole('textbox');
  return { input, renderResult };
};

const input = (props?: Props) => renderInput(props).input;

describe('<InputText/>', () => {
  describe('default behavior', () => {
    test('render label', async () => {
      const el = input({ labelText: 'new label' });
      const label = screen.getByText('new label');
      expect(el).toBeInTheDocument();
      expect(label).toBeInTheDocument();
    });
    test('render placeholder', async () => {
      const el = input({ placeholder: 'new placeholder' });
      expect(el).toHaveAttribute('placeholder', 'new placeholder');
    });
    test('render without placeholder', async () => {
      const el = input({ placeholder: undefined });
      expect(el).not.toHaveAttribute('placeholder');
    });
    test('render without placeholder', async () => {
      input({ labelText: undefined });
      const label = screen.queryByRole('new label');
      expect(label).not.toBeInTheDocument();
    });
    test('use labelText like aria-label when possible', async () => {
      expect(input()).toHaveAttribute('aria-label', 'label');
    });
    test('use placeholder like fallback aria-label', async () => {
      expect(input({ labelText: undefined })).toHaveAttribute(
        'aria-label',
        'placeholder example',
      );
    });
    test('show value default right', async () => {
      expect(input({ defaultValue: 'value' })).toHaveValue('value');
    });
    test('accepted other props in JSX (name, maxlength)', async () => {
      const el = input({ name: 'name', maxLength: 10 });
      expect(el).toHaveAttribute('name', 'name');
      expect(el).toHaveAttribute('maxLength', '10');
    });
  });
  describe('accessibility', () => {
    test('not show error message for default', async () => {
      const el = input();
      expect(el).toHaveAttribute('aria-invalid', 'false');
      expect(el).not.toHaveAttribute('aria-describedby');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
    test('not mark input like invalid for default', async () => {
      const el = input();
      expect(el).toHaveAttribute('aria-invalid', 'false');
    });
    test('render error message when errorMessage is passed', async () => {
      const el = input({ errorMessage: 'have wrongs' });
      const error = screen.getByRole('alert');
      const errorId = error.getAttribute('id');
      console.log(errorId);
      expect(el).toHaveAttribute('aria-invalid', 'true');
      expect(el).toHaveAttribute('aria-describedby', errorId);
      expect(error).toBeInTheDocument();
    });
  });
  describe('behavior interactive', () => {
    test('update value as the user types', async () => {
      const user = userEvent.setup();
      const el = input();
      await user.type(el, 'text');
      expect(el).toHaveValue('text');
    });
  });
  describe('states visuals', () => {
    test('apply classes visuals when disabled', async () => {
      const el = input({ disabled: true });
      expect(el).toHaveClass(
        'disabled:bg-slate-200 disabled:placeholder-slate-300',
      );
    });
    test('apply classes visuals when readOnly', async () => {
      const el = input({ readOnly: true });
      expect(el).toHaveClass('read-only:bg-slate-100');
    });
    test('adds class error (ring red) when invalid', async () => {
      const el = input({ errorMessage: 'Error' });
      expect(el).toHaveClass(
        'ring-red-500 focus:ring-red-700 placeholder-red-200',
      );
    });
    test('keep class personalize of developer', async () => {
      const el = input({ className: 'custom' });
      expect(el).toHaveClass('custom');
    });
  });
});

//    test('render placeholder', async () => {});
