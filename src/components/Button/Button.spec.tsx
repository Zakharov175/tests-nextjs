import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Button } from '.';

const variantsForTests = () => {
  const colorDefault = 'bg-blue-600 hover:bg-blue-700 text-blue-100';
  const sizeSmall =
    'text-xs/tight py-1 px-2 rounded-sm [&_svg]:w-3 [&_svg]:h-3 gap-1';
  const sizeMedium =
    'text-base/tight py-2 px-4 rounded-md [&_svg]:w-4 [&_svg]:h-4 gap-2';
  const sizeLarge =
    'text-lg/tight py-4 px-6 rounded-lg [&_svg]:w-5 [&_svg]:h-5 gap-3';
  const colorDanger = 'bg-red-600 hover:bg-red-700 text-red-100';
  const colorGhost = 'bg-slate-300 hover:bg-slate-400 text-slate-950';
  const disabled =
    'disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed';
  return {
    colorDefault,
    colorDanger,
    colorGhost,
    sizeSmall,
    sizeMedium,
    sizeLarge,
    disabled,
  };
};

describe('<Button/>', () => {
  describe('props template and JSX', () => {
    test('should renderer button with props default (only with children)', () => {
      //   const result = render(<Button>Enviar formulário</Button>);
      //   result.debug();
      render(<Button>Enviar formulário</Button>);
      const button = screen.getByRole('button', { name: /enviar formulário/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(variantsForTests().colorDefault);
      expect(button).toHaveClass(variantsForTests().sizeMedium);
      expect(button).toMatchSnapshot();
    });
    test('check if proprietys of the JSX its worker correctly', async () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} type='submit' arial-hidden='false'>
          Enviar formulário
        </Button>,
      );
      const button = screen.getByText('Enviar formulário');
      await userEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('arial-hidden', 'false');
    });
  });
  describe('variants (colors)', () => {
    test('check if default apply right color', async () => {
      render(
        <Button variant='default' title='buttonForTest'>
          Enviar formulário
        </Button>,
      );
      const button = screen.getByTitle(/buttonForTest/i);
      expect(button).toHaveClass(variantsForTests().colorDefault);
    });
    test('check if danger apply right color', async () => {
      render(
        <Button variant='danger' title='buttonForTest'>
          Enviar formulário
        </Button>,
      );
      const button = screen.getByTitle(/buttonForTest/i);
      expect(button).toHaveClass(variantsForTests().colorDanger);
    });
    test('check if ghost apply right color', async () => {
      render(
        <Button variant='ghost' title='buttonForTest'>
          Enviar formulário
        </Button>,
      );
      const button = screen.getByTitle(/buttonForTest/i);
      expect(button).toHaveClass(variantsForTests().colorGhost);
    });
  });
  describe('variants (sizes)', () => {
    test('size should be sm', async () => {
      render(
        <Button size='sm' data-testid='idForTest'>
          Enviar formulário
        </Button>,
      );
      const button = screen.getByTestId(/idForTest/i);
      expect(button).toHaveClass(variantsForTests().sizeSmall);
    });
    test('size should be md', async () => {
      render(
        <Button size='md' title='buttonForTest'>
          Enviar formulário
        </Button>,
      );
      const button = screen.getByTitle(/buttonForTest/i);
      expect(button).toHaveClass(variantsForTests().sizeMedium);
    });
    test('size should be lg', async () => {
      // render(
      //   <Button size='lg' title='buttonForTest'>
      //     Enviar formulário
      //   </Button>,
      // );
      // const button = screen.getByTitle(/buttonForTest/i);
      // expect(button).toHaveClass(variantsForTests().sizeLarge);
      const { container } = render(
        <Button size='lg' id='this-id' title='buttonForTest'>
          Enviar formulário
        </Button>,
      );
      const button = container.querySelector('#this-id');
      expect(button).toHaveClass(variantsForTests().sizeLarge);
    });
  });
  describe('disabled', () => {
    test('classes for disabled cases', async () => {
      render(<Button disabled>Enviar formulário</Button>);
      const button = screen.getByRole('button', {
        name: /enviar formulário/i,
      });
      expect(button).toHaveClass(variantsForTests().disabled);
      expect(button).toBeDisabled();
    });
  });
});
